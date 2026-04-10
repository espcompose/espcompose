"""
ESPHome Native API server — minimal implementation.

Implements the plaintext variant of the ESPHome Native API wire protocol
so that Home Assistant's ESPHome integration can connect to the simulator
as if it were a real ESPHome device.

Wire format (plaintext):
  - Each frame: 0x00 | varint(payload_length) | varint(msg_type) | protobuf_payload
  - msg_type is 1-indexed into MESSAGE_TYPE_TO_PROTO from aioesphomeapi

Handshake sequence (HA sends → we respond):
  1. HelloRequest (1)        → HelloResponse (2)
  2. ConnectRequest (3)      → ConnectResponse (4)  [same as AuthenticationRequest/Response]
  3. DeviceInfoRequest (9)   → DeviceInfoResponse (10)
  4. ListEntitiesRequest (11)→ per-entity responses + ListEntitiesDoneResponse (19)
  5. SubscribeStatesRequest (20) → push entity states

After handshake, we must respond to:
  - PingRequest (7)  → PingResponse (8)
  - DisconnectRequest (5) → DisconnectResponse (6) + close
  - *CommandRequest → forwarded to Node as entity_command
"""

from __future__ import annotations

import asyncio
import logging
import socket
from typing import Any, Callable

from google.protobuf.message import Message as ProtoMessage

try:
    from zeroconf import ServiceInfo
    from zeroconf.asyncio import AsyncZeroconf
    _HAS_ZEROCONF = True
except ImportError:
    _HAS_ZEROCONF = False

from aioesphomeapi.api_pb2 import (  # type: ignore
    HelloRequest,
    HelloResponse,
    AuthenticationRequest,
    AuthenticationResponse,
    DeviceInfoRequest,
    DeviceInfoResponse,
    DisconnectRequest,
    DisconnectResponse,
    PingRequest,
    PingResponse,
    ListEntitiesRequest,
    ListEntitiesDoneResponse,
    SubscribeStatesRequest,
    SubscribeHomeAssistantStatesRequest,
    SubscribeHomeAssistantStateResponse,
    HomeAssistantStateResponse,
    HomeassistantActionRequest,
    HomeassistantServiceMap,
    SubscribeHomeassistantServicesRequest,
    LightCommandRequest,
    SwitchCommandRequest,
    FanCommandRequest,
    CoverCommandRequest,
    ClimateCommandRequest,
    NumberCommandRequest,
    SelectCommandRequest,
    ButtonCommandRequest,
)
from aioesphomeapi.core import MESSAGE_TYPE_TO_PROTO

logger = logging.getLogger("espcompose_bridge.native_api")

# Reverse mapping: protobuf class → message type number
PROTO_TO_MSG_TYPE: dict[type[ProtoMessage], int] = {
    v: k for k, v in MESSAGE_TYPE_TO_PROTO.items()
}


# ── Varint helpers ────────────────────────────────────────────────────────────

def encode_varint(value: int) -> bytes:
    """Encode an integer as a protobuf varint."""
    result = bytearray()
    while value > 0x7F:
        result.append((value & 0x7F) | 0x80)
        value >>= 7
    result.append(value & 0x7F)
    return bytes(result)


async def read_varint(reader: asyncio.StreamReader) -> int | None:
    """Read a varint from the stream. Returns None on EOF."""
    result = 0
    shift = 0
    while True:
        raw = await reader.read(1)
        if not raw:
            return None
        byte = raw[0]
        result |= (byte & 0x7F) << shift
        if (byte & 0x80) == 0:
            return result
        shift += 7
        if shift > 35:
            raise ValueError("Varint too long")


# ── Frame encode / decode ─────────────────────────────────────────────────────

def encode_frame(msg: ProtoMessage) -> bytes:
    """Encode a protobuf message into an ESPHome Native API frame."""
    msg_type = PROTO_TO_MSG_TYPE[type(msg)]
    payload = msg.SerializeToString()
    return b'\x00' + encode_varint(len(payload)) + encode_varint(msg_type) + payload


async def read_frame(reader: asyncio.StreamReader) -> tuple[int, bytes] | None:
    """Read one frame from the stream. Returns (msg_type, payload) or None on EOF."""
    # Read preamble byte
    preamble = await reader.read(1)
    if not preamble:
        return None
    if preamble[0] == 0x01:
        logger.error("Received Noise protocol frame (0x01) — client expects encryption. "
                      "Plaintext-only server cannot handle this.")
        return None
    if preamble[0] != 0x00:
        logger.error("Invalid preamble: 0x%02x", preamble[0])
        return None

    length = await read_varint(reader)
    if length is None:
        return None

    msg_type = await read_varint(reader)
    if msg_type is None:
        return None

    payload = b''
    if length > 0:
        payload = await reader.readexactly(length)

    return msg_type, payload


def decode_message(msg_type: int, data: bytes) -> ProtoMessage | None:
    """Decode a message from its type number and payload bytes."""
    klass = MESSAGE_TYPE_TO_PROTO.get(msg_type)
    if klass is None:
        return None
    msg = klass()
    msg.MergeFromString(data)
    return msg


# ── Client connection ─────────────────────────────────────────────────────────

class NativeAPIClient:
    """Represents a single HA client connected to our API server."""

    def __init__(
        self,
        reader: asyncio.StreamReader,
        writer: asyncio.StreamWriter,
        server: "NativeAPIServer",
    ) -> None:
        self._reader = reader
        self._writer = writer
        self._server = server
        self._subscribed_states = False
        self._closed = False
        addr = writer.get_extra_info("peername")
        self.address: str = f"{addr[0]}:{addr[1]}" if addr else "unknown"
        self.client_info: str = ""

    async def run(self) -> None:
        """Main read loop for this client."""
        try:
            while not self._closed:
                frame = await read_frame(self._reader)
                if frame is None:
                    break
                msg_type, payload = frame
                logger.debug("← msg_type=%d len=%d from %s", msg_type, len(payload), self.address)
                msg = decode_message(msg_type, payload)
                if msg is None:
                    logger.warning("Unknown message type %d from %s", msg_type, self.address)
                    continue
                await self._handle_message(msg)
        except (ConnectionError, asyncio.IncompleteReadError):
            logger.info("Connection lost from %s", self.address)
        except Exception:
            logger.exception("Error handling client %s", self.address)
        finally:
            self._close()

    def send(self, msg: ProtoMessage) -> None:
        """Send a protobuf message to this client."""
        if self._closed:
            return
        try:
            self._writer.write(encode_frame(msg))
        except (ConnectionError, RuntimeError):
            self._close()

    async def flush(self) -> None:
        """Flush pending writes."""
        if self._closed:
            return
        try:
            await self._writer.drain()
        except (ConnectionError, RuntimeError):
            self._close()

    async def _handle_message(self, msg: ProtoMessage) -> None:
        """Dispatch an incoming message to the appropriate handler."""
        if isinstance(msg, HelloRequest):
            self.client_info = msg.client_info
            logger.info("Hello from %s (%s) api=%d.%d",
                        self.client_info, self.address,
                        msg.api_version_major, msg.api_version_minor)
            resp = HelloResponse(
                api_version_major=1,
                api_version_minor=14,
                server_info="ESPCompose Simulator",
                name=self._server.device_name,
            )
            self.send(resp)
            await self.flush()

        elif isinstance(msg, AuthenticationRequest):
            logger.info("Auth from %s (password=%r)", self.address, bool(msg.password))
            resp = AuthenticationResponse(invalid_password=False)
            self.send(resp)
            await self.flush()

        elif isinstance(msg, DeviceInfoRequest):
            logger.info("DeviceInfo requested by %s", self.address)
            resp = DeviceInfoResponse(
                uses_password=False,
                name=self._server.device_name,
                friendly_name=self._server.device_name,
                mac_address=self._server.mac_address,
                compilation_time="",
                model="ESPCompose Simulator",
                manufacturer="ESPCompose",
                has_deep_sleep=False,
                esphome_version="2024.12.0",
                project_name="espcompose.simulator",
                project_version="0.1.0",
            )
            self.send(resp)
            await self.flush()

        elif isinstance(msg, ListEntitiesRequest):
            logger.info("ListEntities requested by %s (%d entities)",
                        self.address, len(self._server.list_entities_responses))
            for entity_msg in self._server.list_entities_responses:
                self.send(entity_msg)
            self.send(ListEntitiesDoneResponse())
            await self.flush()

        elif isinstance(msg, SubscribeStatesRequest):
            logger.info("SubscribeStates from %s — firing on_client_connected", self.address)
            self._subscribed_states = True
            self._server.add_subscriber(self)
            # Push current states immediately
            for state_msg in self._server.current_state_responses():
                self.send(state_msg)
            await self.flush()
            # Notify Node that an HA client connected
            self._server.on_client_connected(self)

        elif isinstance(msg, PingRequest):
            self.send(PingResponse())
            await self.flush()

        elif isinstance(msg, DisconnectRequest):
            logger.info("Disconnect requested by %s", self.address)
            self.send(DisconnectResponse())
            await self.flush()
            self._close()

        elif isinstance(msg, SubscribeHomeAssistantStatesRequest):
            logger.info("SubscribeHomeAssistantStates from %s", self.address)
            # Tell HA which HA entities the device wants to track
            for sub in self._server.ha_state_subscriptions:
                resp = SubscribeHomeAssistantStateResponse(
                    entity_id=sub["entity_id"],
                    attribute=sub.get("attribute", ""),
                    once=False,
                )
                self.send(resp)
            await self.flush()

        elif isinstance(msg, SubscribeHomeassistantServicesRequest):
            logger.info("SubscribeHomeassistantServices from %s", self.address)
            self._server.add_service_subscriber(self)

        elif isinstance(msg, HomeAssistantStateResponse):
            logger.info("HA state update: %s = %s (attr=%s)",
                        msg.entity_id, msg.state, msg.attribute)
            self._server.on_ha_state(msg.entity_id, msg.state, msg.attribute)

        elif isinstance(msg, (
            LightCommandRequest,
            SwitchCommandRequest,
            FanCommandRequest,
            CoverCommandRequest,
            ClimateCommandRequest,
            NumberCommandRequest,
            SelectCommandRequest,
            ButtonCommandRequest,
        )):
            logger.info("Command %s from %s", type(msg).__name__, self.address)
            self._server.on_command(msg)

        else:
            logger.warning("Unhandled message from %s: %s", self.address, type(msg).__name__)

    def _close(self) -> None:
        if self._closed:
            return
        self._closed = True
        self._server.remove_subscriber(self)
        self._server.remove_service_subscriber(self)
        try:
            self._writer.close()
        except Exception:
            pass
        self._server.on_client_disconnected(self)


# ── Server ────────────────────────────────────────────────────────────────────

class NativeAPIServer:
    """Minimal ESPHome Native API server.

    Listens for HA connections on a TCP port and speaks the plaintext
    Native API wire protocol.
    """

    def __init__(
        self,
        device_name: str = "espcompose",
        mac_address: str = "AA:BB:CC:DD:EE:FF",
        port: int = 6053,
        on_command_callback: Callable[[ProtoMessage], None] | None = None,
        on_client_connected_callback: Callable[[str, str], None] | None = None,
        on_client_disconnected_callback: Callable[[str], None] | None = None,
        on_ha_state_callback: Callable[[str, str, str], None] | None = None,
        enable_mdns: bool = False,
    ) -> None:
        self.device_name = device_name
        self.mac_address = mac_address
        self.port = port
        self._on_command = on_command_callback
        self._on_client_connected = on_client_connected_callback
        self._on_client_disconnected = on_client_disconnected_callback
        self._on_ha_state = on_ha_state_callback
        self._enable_mdns = enable_mdns

        self.list_entities_responses: list[ProtoMessage] = []
        self._entity_states: dict[str, ProtoMessage] = {}
        self._subscribers: set[NativeAPIClient] = set()
        self._service_subscribers: set[NativeAPIClient] = set()
        self._server: asyncio.Server | None = None
        self._zeroconf: Any | None = None
        self._service_info: Any | None = None
        self.ha_state_subscriptions: list[dict[str, str]] = []

    async def start(self) -> None:
        """Start listening for connections and announce via mDNS."""
        self._server = await asyncio.start_server(
            self._handle_connection,
            "0.0.0.0",
            self.port,
        )
        logger.info("Native API server listening on port %d", self.port)
        if self._enable_mdns:
            await self._register_mdns()

    async def stop(self) -> None:
        """Stop the server, unregister mDNS, and close all clients."""
        await self._unregister_mdns()
        if self._server:
            self._server.close()
            await self._server.wait_closed()
            self._server = None
        for client in list(self._subscribers):
            client._close()
        self._subscribers.clear()

    def set_entities(self, list_responses: list[ProtoMessage]) -> None:
        """Set the list of entity responses returned during ListEntities."""
        self.list_entities_responses = list_responses

    def update_state(self, entity_key: int, state_msg: ProtoMessage) -> None:
        """Update a cached entity state and push to all subscribed clients."""
        self._entity_states[entity_key] = state_msg
        for client in list(self._subscribers):
            client.send(state_msg)
            # Fire-and-forget drain — we don't want to block state pushes
            asyncio.ensure_future(client.flush())

    def get_state(self, entity_key: int) -> ProtoMessage | None:
        """Return the cached state for a given entity key, or None."""
        return self._entity_states.get(entity_key)

    def current_state_responses(self) -> list[ProtoMessage]:
        """Return all current entity state messages."""
        return list(self._entity_states.values())

    def add_subscriber(self, client: NativeAPIClient) -> None:
        self._subscribers.add(client)

    def remove_subscriber(self, client: NativeAPIClient) -> None:
        self._subscribers.discard(client)

    def add_service_subscriber(self, client: NativeAPIClient) -> None:
        self._service_subscribers.add(client)

    def remove_service_subscriber(self, client: NativeAPIClient) -> None:
        self._service_subscribers.discard(client)

    def send_ha_action(self, service: str, data: dict[str, str] | None = None) -> None:
        """Send a HomeassistantActionRequest to all connected HA clients.

        This tells HA to execute a service call (e.g. light.toggle) on behalf
        of the device — used when buttons interact with HA entities.

        Real ESPHome devices send this to any connected API client, so we
        use ``_subscribers`` (clients that have subscribed to device states)
        rather than ``_service_subscribers`` which may be empty if HA does
        not send ``SubscribeHomeassistantServicesRequest``.
        """
        msg = HomeassistantActionRequest()
        msg.service = service
        if data:
            for key, value in data.items():
                entry = msg.data.add()
                entry.key = key
                entry.value = str(value)
        targets = self._subscribers or self._service_subscribers
        for client in list(targets):
            client.send(msg)
            asyncio.ensure_future(client.flush())
        logger.info("HA action sent to %d client(s): %s %s",
                    len(targets), service, data or {})

    def on_client_connected(self, client: NativeAPIClient) -> None:
        if self._on_client_connected:
            self._on_client_connected(client.address, client.client_info)

    def on_client_disconnected(self, client: NativeAPIClient) -> None:
        if self._on_client_disconnected:
            self._on_client_disconnected(client.address)

    def on_command(self, msg: ProtoMessage) -> None:
        if self._on_command:
            self._on_command(msg)

    def on_ha_state(self, entity_id: str, state: str, attribute: str) -> None:
        """Called when HA pushes a state update for a subscribed HA entity."""
        if self._on_ha_state:
            self._on_ha_state(entity_id, state, attribute)

    async def _register_mdns(self) -> None:
        """Register the device on mDNS so Home Assistant can auto-discover it."""
        if not _HAS_ZEROCONF:
            logger.warning("zeroconf not installed — mDNS discovery disabled")
            return
        try:
            # Build a clean hostname from the device name
            hostname = self.device_name.replace(" ", "-").lower()
            local_ip = self._get_local_ip()

            self._service_info = ServiceInfo(
                type_="_esphomelib._tcp.local.",
                name=f"{hostname}._esphomelib._tcp.local.",
                server=f"{hostname}.local.",
                addresses=[socket.inet_aton(local_ip)],
                port=self.port,
                properties={
                    "mac": self.mac_address.replace(":", "").lower(),
                    "version": "2024.12.0",
                    "project_name": "espcompose",
                    "project_version": "0.1.0",
                    "network": "wifi",
                },
            )
            self._zeroconf = AsyncZeroconf()
            await self._zeroconf.async_register_service(self._service_info)
            logger.info("mDNS registered: %s @ %s:%d", hostname, local_ip, self.port)
        except Exception:
            logger.exception("Failed to register mDNS service")

    async def _unregister_mdns(self) -> None:
        """Unregister the mDNS service."""
        if self._zeroconf and self._service_info:
            try:
                await self._zeroconf.async_unregister_service(self._service_info)
                await self._zeroconf.async_close()
            except Exception:
                logger.debug("Error unregistering mDNS", exc_info=True)
            self._zeroconf = None
            self._service_info = None

    @staticmethod
    def _get_local_ip() -> str:
        """Get the local network IP address (best effort)."""
        try:
            # Connect to a public address to determine the outbound interface
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.settimeout(0.1)
            s.connect(("8.8.8.8", 80))
            ip = s.getsockname()[0]
            s.close()
            return ip
        except Exception:
            return "127.0.0.1"

    async def _handle_connection(
        self,
        reader: asyncio.StreamReader,
        writer: asyncio.StreamWriter,
    ) -> None:
        client = NativeAPIClient(reader, writer, self)
        logger.info("New connection from %s", client.address)
        await client.run()
