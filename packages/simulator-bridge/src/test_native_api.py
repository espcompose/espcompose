"""Tests for the Native API wire protocol and server."""

from __future__ import annotations

import asyncio
from unittest import mock

import pytest
import pytest_asyncio

from aioesphomeapi.api_pb2 import (
    HelloRequest,
    HelloResponse,
    AuthenticationRequest,
    AuthenticationResponse,
    DeviceInfoRequest,
    DeviceInfoResponse,
    PingRequest,
    PingResponse,
    DisconnectRequest,
    DisconnectResponse,
    ListEntitiesRequest,
    ListEntitiesDoneResponse,
    SubscribeStatesRequest,
    LightCommandRequest,
    SwitchCommandRequest,
    ListEntitiesLightResponse,
    LightStateResponse,
)

from native_api import (
    encode_varint,
    read_varint,
    encode_frame,
    read_frame,
    decode_message,
    PROTO_TO_MSG_TYPE,
    NativeAPIServer,
)


# ── Varint tests ──────────────────────────────────────────────────────────────


class TestVarint:
    """Tests for varint encoding and decoding."""

    def test_encode_zero(self) -> None:
        assert encode_varint(0) == b"\x00"

    def test_encode_single_byte(self) -> None:
        assert encode_varint(1) == b"\x01"
        assert encode_varint(127) == b"\x7f"

    def test_encode_two_bytes(self) -> None:
        assert encode_varint(128) == b"\x80\x01"
        assert encode_varint(300) == b"\xac\x02"

    def test_encode_large_value(self) -> None:
        # 16384 = 0x4000 → needs 3 bytes
        encoded = encode_varint(16384)
        assert len(encoded) == 3
        assert encoded == b"\x80\x80\x01"

    @pytest.mark.asyncio
    async def test_read_single_byte(self) -> None:
        reader = asyncio.StreamReader()
        reader.feed_data(b"\x01")
        reader.feed_eof()
        result = await read_varint(reader)
        assert result == 1

    @pytest.mark.asyncio
    async def test_read_multi_byte(self) -> None:
        reader = asyncio.StreamReader()
        reader.feed_data(b"\xac\x02")
        reader.feed_eof()
        result = await read_varint(reader)
        assert result == 300

    @pytest.mark.asyncio
    async def test_read_returns_none_on_eof(self) -> None:
        reader = asyncio.StreamReader()
        reader.feed_eof()
        result = await read_varint(reader)
        assert result is None

    @pytest.mark.asyncio
    async def test_encode_decode_roundtrip(self) -> None:
        """Encoding then decoding should return the original value."""
        for value in [0, 1, 127, 128, 255, 300, 16384, 65535, 1_000_000]:
            reader = asyncio.StreamReader()
            reader.feed_data(encode_varint(value))
            reader.feed_eof()
            assert await read_varint(reader) == value


# ── Frame codec tests ─────────────────────────────────────────────────────────


class TestFrameCodec:
    """Tests for frame encoding and decoding."""

    def test_encode_frame_starts_with_preamble(self) -> None:
        msg = PingResponse()
        frame = encode_frame(msg)
        assert frame[0:1] == b"\x00"

    def test_encode_decode_roundtrip_empty_payload(self) -> None:
        """PingResponse has an empty payload — test the minimal case."""
        msg = PingResponse()
        frame = encode_frame(msg)
        # Frame: 0x00 | varint(0) | varint(msg_type)
        assert frame[0:1] == b"\x00"

    @pytest.mark.asyncio
    async def test_read_frame_roundtrip(self) -> None:
        """Encoding a message and reading it back should yield the same type and payload."""
        msg = HelloResponse(
            api_version_major=1,
            api_version_minor=10,
            server_info="test",
            name="device",
        )
        frame = encode_frame(msg)

        reader = asyncio.StreamReader()
        reader.feed_data(frame)
        reader.feed_eof()

        result = await read_frame(reader)
        assert result is not None
        msg_type, payload = result
        assert msg_type == PROTO_TO_MSG_TYPE[HelloResponse]

        decoded = HelloResponse()
        decoded.MergeFromString(payload)
        assert decoded.api_version_major == 1
        assert decoded.api_version_minor == 10
        assert decoded.server_info == "test"
        assert decoded.name == "device"

    @pytest.mark.asyncio
    async def test_read_frame_returns_none_on_eof(self) -> None:
        reader = asyncio.StreamReader()
        reader.feed_eof()
        result = await read_frame(reader)
        assert result is None

    @pytest.mark.asyncio
    async def test_read_frame_invalid_preamble(self) -> None:
        reader = asyncio.StreamReader()
        reader.feed_data(b"\x01\x00\x08")
        reader.feed_eof()
        result = await read_frame(reader)
        assert result is None


class TestDecodeMessage:
    """Tests for decode_message()."""

    def test_decode_known_message_type(self) -> None:
        msg = HelloRequest(client_info="test-client")
        data = msg.SerializeToString()
        msg_type = PROTO_TO_MSG_TYPE[HelloRequest]

        decoded = decode_message(msg_type, data)
        assert decoded is not None
        assert isinstance(decoded, HelloRequest)
        assert decoded.client_info == "test-client"

    def test_decode_unknown_message_type(self) -> None:
        result = decode_message(99999, b"")
        assert result is None

    def test_decode_empty_payload(self) -> None:
        msg_type = PROTO_TO_MSG_TYPE[PingRequest]
        decoded = decode_message(msg_type, b"")
        assert decoded is not None
        assert isinstance(decoded, PingRequest)


# ── NativeAPIServer unit tests ────────────────────────────────────────────────


class TestNativeAPIServer:
    """Tests for NativeAPIServer logic (no TCP)."""

    def test_set_entities(self) -> None:
        server = NativeAPIServer()
        entities = [
            ListEntitiesLightResponse(key=1, name="Light 1"),
            ListEntitiesLightResponse(key=2, name="Light 2"),
        ]
        server.set_entities(entities)
        assert len(server.list_entities_responses) == 2

    def test_current_state_responses_empty(self) -> None:
        server = NativeAPIServer()
        assert server.current_state_responses() == []

    def test_update_state_stores_and_returns(self) -> None:
        server = NativeAPIServer()
        state = LightStateResponse(key=42, state=True, brightness=1.0)
        server.update_state(42, state)
        responses = server.current_state_responses()
        assert len(responses) == 1
        assert responses[0].key == 42

    def test_update_state_overwrites_previous(self) -> None:
        server = NativeAPIServer()
        state1 = LightStateResponse(key=42, state=True, brightness=1.0)
        state2 = LightStateResponse(key=42, state=False, brightness=0.0)
        server.update_state(42, state1)
        server.update_state(42, state2)
        responses = server.current_state_responses()
        assert len(responses) == 1
        assert responses[0].state is False

    def test_command_callback_invoked(self) -> None:
        callback = mock.MagicMock()
        server = NativeAPIServer(on_command_callback=callback)
        msg = SwitchCommandRequest(key=1, state=True)
        server.on_command(msg)
        callback.assert_called_once_with(msg)

    def test_client_connected_callback(self) -> None:
        callback = mock.MagicMock()
        server = NativeAPIServer(on_client_connected_callback=callback)
        client = mock.MagicMock()
        client.address = "127.0.0.1:5555"
        client.client_info = "test"
        server.on_client_connected(client)
        callback.assert_called_once_with("127.0.0.1:5555", "test")

    @pytest.mark.asyncio
    async def test_send_ha_action_targets_subscribers(self) -> None:
        """send_ha_action uses _subscribers when _service_subscribers is empty."""
        server = NativeAPIServer()
        client = mock.MagicMock()
        client._closed = False
        client.flush = mock.AsyncMock()
        server.add_subscriber(client)
        # _service_subscribers is empty — should still send
        server.send_ha_action("light.toggle", {"entity_id": "light.office"})
        client.send.assert_called_once()
        msg = client.send.call_args[0][0]
        assert msg.service == "light.toggle"

    @pytest.mark.asyncio
    async def test_send_ha_action_prefers_subscribers_over_service_subs(self) -> None:
        """send_ha_action sends to _subscribers even when _service_subscribers exists."""
        server = NativeAPIServer()
        sub_client = mock.MagicMock()
        sub_client._closed = False
        sub_client.flush = mock.AsyncMock()
        svc_client = mock.MagicMock()
        svc_client._closed = False
        svc_client.flush = mock.AsyncMock()
        server.add_subscriber(sub_client)
        server.add_service_subscriber(svc_client)
        server.send_ha_action("light.turn_on", {"entity_id": "light.gym"})
        # Both _subscribers and _service_subscribers are non-empty;
        # _subscribers takes priority
        sub_client.send.assert_called_once()
        svc_client.send.assert_not_called()


# ── Integration: full TCP handshake ───────────────────────────────────────────


class TestNativeAPIHandshake:
    """End-to-end test: connect via TCP, complete handshake."""

    @pytest.mark.asyncio
    async def test_full_handshake(self) -> None:
        """Simulate an HA client connecting and performing the full handshake."""
        server = NativeAPIServer(
            device_name="test-device",
            mac_address="11:22:33:44:55:66",
            port=0,  # Let OS pick a free port
        )

        light = ListEntitiesLightResponse(key=1, name="Test Light", object_id="light_1")
        server.set_entities([light])

        light_state = LightStateResponse(key=1, state=True, brightness=0.5)
        server.update_state(1, light_state)

        # Start on port 0 to get a random free port
        tcp_server = await asyncio.start_server(
            server._handle_connection, "127.0.0.1", 0
        )
        port = tcp_server.sockets[0].getsockname()[1]

        try:
            reader, writer = await asyncio.open_connection("127.0.0.1", port)

            # 1. Hello
            hello = HelloRequest(client_info="pytest")
            writer.write(encode_frame(hello))
            await writer.drain()

            resp = await _read_one_message(reader)
            assert isinstance(resp, HelloResponse)
            assert resp.name == "test-device"
            assert resp.api_version_major == 1

            # 2. Authentication
            auth = AuthenticationRequest(password="")
            writer.write(encode_frame(auth))
            await writer.drain()

            resp = await _read_one_message(reader)
            assert isinstance(resp, AuthenticationResponse)
            assert resp.invalid_password is False

            # 3. DeviceInfo
            writer.write(encode_frame(DeviceInfoRequest()))
            await writer.drain()

            resp = await _read_one_message(reader)
            assert isinstance(resp, DeviceInfoResponse)
            assert resp.name == "test-device"
            assert resp.mac_address == "11:22:33:44:55:66"
            assert resp.manufacturer == "ESPCompose"

            # 4. ListEntities
            writer.write(encode_frame(ListEntitiesRequest()))
            await writer.drain()

            resp = await _read_one_message(reader)
            assert isinstance(resp, ListEntitiesLightResponse)
            assert resp.name == "Test Light"

            resp = await _read_one_message(reader)
            assert isinstance(resp, ListEntitiesDoneResponse)

            # 5. SubscribeStates — should push the current light state
            writer.write(encode_frame(SubscribeStatesRequest()))
            await writer.drain()

            resp = await _read_one_message(reader)
            assert isinstance(resp, LightStateResponse)
            assert resp.key == 1
            assert resp.state is True
            assert abs(resp.brightness - 0.5) < 0.01

            # 6. Ping
            writer.write(encode_frame(PingRequest()))
            await writer.drain()

            resp = await _read_one_message(reader)
            assert isinstance(resp, PingResponse)

            # 7. Disconnect
            writer.write(encode_frame(DisconnectRequest()))
            await writer.drain()

            resp = await _read_one_message(reader)
            assert isinstance(resp, DisconnectResponse)

            writer.close()
            await writer.wait_closed()
        finally:
            tcp_server.close()
            await tcp_server.wait_closed()

    @pytest.mark.asyncio
    async def test_command_forwarding(self) -> None:
        """Commands sent by HA should be forwarded via the callback."""
        received_commands: list = []

        def on_cmd(msg):
            received_commands.append(msg)

        server = NativeAPIServer(
            device_name="test",
            port=0,
            on_command_callback=on_cmd,
        )

        tcp_server = await asyncio.start_server(
            server._handle_connection, "127.0.0.1", 0
        )
        port = tcp_server.sockets[0].getsockname()[1]

        try:
            reader, writer = await asyncio.open_connection("127.0.0.1", port)

            # Complete handshake quickly
            writer.write(encode_frame(HelloRequest(client_info="pytest")))
            await writer.drain()
            await _read_one_message(reader)  # HelloResponse

            writer.write(encode_frame(AuthenticationRequest(password="")))
            await writer.drain()
            await _read_one_message(reader)  # AuthResponse

            # Send a light command
            cmd = LightCommandRequest(key=42, has_state=True, state=True)
            writer.write(encode_frame(cmd))
            await writer.drain()

            # Give the server a moment to process
            await asyncio.sleep(0.05)

            assert len(received_commands) == 1
            assert isinstance(received_commands[0], LightCommandRequest)
            assert received_commands[0].key == 42
            assert received_commands[0].state is True

            writer.close()
            await writer.wait_closed()
        finally:
            tcp_server.close()
            await tcp_server.wait_closed()


async def _read_one_message(reader: asyncio.StreamReader):
    """Helper: read one frame and decode the protobuf message."""
    result = await asyncio.wait_for(read_frame(reader), timeout=2.0)
    assert result is not None, "Expected a message but got EOF"
    msg_type, payload = result
    msg = decode_message(msg_type, payload)
    assert msg is not None, f"Could not decode message type {msg_type}"
    return msg
