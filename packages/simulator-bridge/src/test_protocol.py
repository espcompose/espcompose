"""Tests for the JSON-line stdio protocol module."""

from __future__ import annotations

import io
import json
import sys
from unittest import mock

import pytest

from protocol import read_message, write_message


class TestReadMessage:
    """Tests for read_message()."""

    def test_reads_valid_json_line(self) -> None:
        msg = {"type": "define_node", "payload": {"name": "test"}}
        fake_stdin = io.StringIO(json.dumps(msg) + "\n")
        with mock.patch.object(sys, "stdin", fake_stdin):
            result = read_message()
        assert result == msg

    def test_returns_none_on_eof(self) -> None:
        fake_stdin = io.StringIO("")
        with mock.patch.object(sys, "stdin", fake_stdin):
            result = read_message()
        assert result is None

    def test_returns_none_on_blank_line(self) -> None:
        fake_stdin = io.StringIO("   \n")
        with mock.patch.object(sys, "stdin", fake_stdin):
            result = read_message()
        assert result is None

    def test_raises_on_invalid_json(self) -> None:
        fake_stdin = io.StringIO("not json\n")
        with mock.patch.object(sys, "stdin", fake_stdin):
            with pytest.raises(json.JSONDecodeError):
                read_message()

    def test_reads_multiple_messages_sequentially(self) -> None:
        msg1 = {"type": "a"}
        msg2 = {"type": "b"}
        fake_stdin = io.StringIO(json.dumps(msg1) + "\n" + json.dumps(msg2) + "\n")
        with mock.patch.object(sys, "stdin", fake_stdin):
            assert read_message() == msg1
            assert read_message() == msg2


class TestWriteMessage:
    """Tests for write_message()."""

    def test_writes_json_line_to_stdout(self) -> None:
        msg = {"type": "bridge_ready", "payload": {"port": 6053}}
        fake_stdout = io.StringIO()
        with mock.patch.object(sys, "stdout", fake_stdout):
            write_message(msg)
        output = fake_stdout.getvalue()
        assert output.endswith("\n")
        assert json.loads(output.strip()) == msg

    def test_flushes_after_write(self) -> None:
        fake_stdout = mock.MagicMock()
        with mock.patch.object(sys, "stdout", fake_stdout):
            write_message({"type": "test"})
        fake_stdout.flush.assert_called_once()
