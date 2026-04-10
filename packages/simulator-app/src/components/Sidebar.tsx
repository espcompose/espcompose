import React from 'react';
import { Splitter, Typography, theme } from 'antd';
import { EntityPanel } from './EntityPanel';
import { ActionLog } from './ActionLog';
import type { EntityStore } from '../runtime';
import type { ActionLogEntry } from './ActionLog';

const { Text } = Typography;
const { useToken } = theme;

interface SidebarProps {
  entityStore: EntityStore | null;
  actionLog: ActionLogEntry[];
  onClearLog: () => void;
  onToggle: (entityId: string, domain: string) => void;
  onSensorChange: (entityId: string, value: number) => void;
}

const sectionLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  padding: '8px 12px 4px',
};

/**
 * Sidebar with resizable panels for entity controls and action log.
 */
export function Sidebar({ entityStore, actionLog, onClearLog, onToggle, onSensorChange }: SidebarProps) {
  const { token } = useToken();

  return (
    <Splitter layout="vertical" style={{ height: '100%', background: token.colorBgContainer }}>
      <Splitter.Panel defaultSize="50%" min="10%" max="90%">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Text type="secondary" style={sectionLabel}>Entity Controls</Text>
          <div style={{ flex: 1, overflow: 'auto', padding: '4px 12px 8px' }}>
            <EntityPanel entityStore={entityStore} onToggle={onToggle} onSensorChange={onSensorChange} />
          </div>
        </div>
      </Splitter.Panel>
      <Splitter.Panel min="10%" max="90%">
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Text type="secondary" style={sectionLabel}>Action Log</Text>
          <div style={{ flex: 1, overflow: 'auto', padding: '4px 12px 8px' }}>
            <ActionLog entries={actionLog} onClear={onClearLog} />
          </div>
        </div>
      </Splitter.Panel>
    </Splitter>
  );
}
