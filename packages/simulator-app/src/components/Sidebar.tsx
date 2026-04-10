import React from 'react';
import { Collapse, theme } from 'antd';
import { EntityPanel } from './EntityPanel';
import { ActionLog } from './ActionLog';
import type { EntityStore } from '../runtime';
import type { ActionLogEntry } from './ActionLog';

const { useToken } = theme;

interface SidebarProps {
  entityStore: EntityStore | null;
  actionLog: ActionLogEntry[];
  onClearLog: () => void;
  onToggle: (entityId: string, domain: string) => void;
  onSensorChange: (entityId: string, value: number) => void;
}

/**
 * Sidebar with collapsible panels for entity controls and action log.
 */
export function Sidebar({ entityStore, actionLog, onClearLog, onToggle, onSensorChange }: SidebarProps) {
  const { token } = useToken();

  const items = [
    {
      key: 'entities',
      label: 'Entity Controls',
      children: <EntityPanel entityStore={entityStore} onToggle={onToggle} onSensorChange={onSensorChange} />,
    },
    {
      key: 'actions',
      label: 'Action Log',
      children: <ActionLog entries={actionLog} onClear={onClearLog} />,
    },
  ];

  return (
    <div
      style={{
        height: '100%',
        overflow: 'auto',
        background: token.colorBgContainer,
      }}
    >
      <Collapse
        defaultActiveKey={['entities', 'actions']}
        items={items}
        bordered={false}
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
