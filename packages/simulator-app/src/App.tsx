import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ConfigProvider, Layout, Splitter, Tag, Typography, theme } from 'antd';
import { ApiOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useSimulator } from './hooks/use-simulator';
import { Canvas } from './components/Canvas';
import { Sidebar } from './components/Sidebar';
import { BuildOverlay } from './components/BuildOverlay';
import { generateThemeStyleBlock } from './runtime';
import type { ActionLogEntry } from './components/ActionLog';

const { Header } = Layout;
const { Text } = Typography;

export function App() {
  const sim = useSimulator();
  const [actionLog, setActionLog] = useState<ActionLogEntry[]>([]);
  const nextLogIdRef = useRef(1);

  // Generate theme CSS from current IR
  const themeStyleHtml = useMemo(() => {
    const scopes = sim.ir?.espcompose.themeScopes;
    if (!scopes || scopes.length === 0) return '';
    return generateThemeStyleBlock(scopes);
  }, [sim.ir]);

  const defaultThemeName = useMemo(() => {
    const scopes = sim.ir?.espcompose.themeScopes;
    if (!scopes || scopes.length === 0) return undefined;
    // Use the first scope's default theme name for the viewport data-theme attr
    const first = scopes[0];
    return first.themeNames[first.defaultIndex] ?? undefined;
  }, [sim.ir]);

  const handleAction = useCallback((nodeId: string, event: string) => {
    setActionLog((prev) => [
      {
        id: nextLogIdRef.current++,
        timestamp: new Date().toLocaleTimeString(),
        text: `${event} on ${nodeId}`,
      },
      ...prev.slice(0, 199), // Keep max 200 entries
    ]);
  }, []);

  const handleClearLog = useCallback(() => {
    setActionLog([]);
  }, []);

  const handleToggle = useCallback((entityId: string, domain: string) => {
    sim.sendEntityInteraction(domain, 'toggle', entityId);
  }, [sim.sendEntityInteraction]);

  const handleSensorChange = useCallback((entityId: string, value: number) => {
    sim.sendEntityInteraction(entityId.split('.')[0], 'set_value', entityId, { state: String(value) });
  }, [sim.sendEntityInteraction]);

  // Connection status indicator
  const statusTag = useMemo(() => {
    switch (sim.connectionStatus) {
      case 'connected':
        return <Tag icon={<CheckCircleOutlined />} color="success">Connected</Tag>;
      case 'connecting':
        return <Tag icon={<SyncOutlined spin />} color="processing">Connecting</Tag>;
      case 'disconnected':
        return <Tag icon={<CloseCircleOutlined />} color="error">Disconnected</Tag>;
    }
  }, [sim.connectionStatus]);

  // Build status indicator
  const buildTag = useMemo(() => {
    switch (sim.buildStatus) {
      case 'ready':
        return <Tag color="success">Ready</Tag>;
      case 'building':
        return <Tag icon={<SyncOutlined spin />} color="processing">Building</Tag>;
      case 'error':
        return <Tag color="error">Error</Tag>;
      case 'idle':
        return <Tag color="default">Idle</Tag>;
    }
  }, [sim.buildStatus]);

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '0 16px',
            height: 48,
            lineHeight: '48px',
            background: '#141414',
            borderBottom: '1px solid #303030',
          }}
        >
          <ApiOutlined style={{ fontSize: 18, color: '#1890ff' }} />
          <Text strong style={{ fontSize: 14 }}>ESPCompose Simulator</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {sim.projectName} · {sim.displayWidth}×{sim.displayHeight}
          </Text>
          <div style={{ flex: 1 }} />
          {statusTag}
          {buildTag}
        </Header>

        <Splitter style={{ flex: 1 }}>
          <Splitter.Panel defaultSize="70%" min="30%" max="85%">
            <div style={{ position: 'relative', height: '100%' }}>
              <Canvas
                nodes={sim.nodes}
                displayWidth={sim.displayWidth}
                displayHeight={sim.displayHeight}
                themeStyleHtml={themeStyleHtml}
                defaultThemeName={defaultThemeName}
                onAction={handleAction}
                _renderVersion={sim.renderVersion}
                getCurrentPageIndex={sim.getCurrentPageIndex}
              />
              <BuildOverlay
                buildStatus={sim.buildStatus}
                buildError={sim.buildError}
                connectionStatus={sim.connectionStatus}
              />
            </div>
          </Splitter.Panel>

          <Splitter.Panel defaultSize="30%" min="15%" max="50%">
            <Sidebar
              entityStore={sim.entityStore}
              actionLog={actionLog}
              onClearLog={handleClearLog}
              onToggle={handleToggle}
              onSensorChange={handleSensorChange}
            />
          </Splitter.Panel>
        </Splitter>
      </Layout>
    </ConfigProvider>
  );
}
