import React from 'react';
import { Alert, Spin } from 'antd';
import { LoadingOutlined, DisconnectOutlined } from '@ant-design/icons';
import type { BuildStatus } from '../hooks/use-simulator';
import type { ConnectionStatus } from '../hooks/use-websocket';

interface BuildOverlayProps {
  buildStatus: BuildStatus;
  buildError: string | null;
  connectionStatus: ConnectionStatus;
}

/**
 * Overlay shown on the canvas during builds, errors, or disconnection.
 */
export function BuildOverlay({ buildStatus, buildError, connectionStatus }: BuildOverlayProps) {
  if (connectionStatus === 'disconnected') {
    return (
      <OverlayContainer>
        <Alert
          type="warning"
          icon={<DisconnectOutlined />}
          showIcon
          message="Disconnected"
          description="Connection to the simulator server lost. Reconnecting..."
        />
      </OverlayContainer>
    );
  }

  if (buildStatus === 'building') {
    return (
      <OverlayContainer>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} />} tip="Rebuilding...">
          <div style={{ width: 200, height: 80 }} />
        </Spin>
      </OverlayContainer>
    );
  }

  if (buildStatus === 'error' && buildError) {
    return (
      <OverlayContainer>
        <Alert
          type="error"
          showIcon
          message="Build Error"
          description={<pre style={{ whiteSpace: 'pre-wrap', fontSize: 11, maxHeight: 300, overflow: 'auto', margin: 0 }}>{buildError}</pre>}
        />
      </OverlayContainer>
    );
  }

  return null;
}

function OverlayContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 100,
        padding: 24,
      }}
    >
      {children}
    </div>
  );
}
