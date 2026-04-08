import React from 'react';
import { Collapse, theme } from 'antd';
import { EntityPanel } from './EntityPanel';
import { ActionLog } from './ActionLog';
import type { MockProvider } from '@espcompose/target-simulator/browser';
import type { ActionLogEntry } from './ActionLog';

const { useToken } = theme;

interface SidebarProps {
  provider: MockProvider | null;
  actionLog: ActionLogEntry[];
  onClearLog: () => void;
  onEntityChange: () => void;
}

/**
 * Sidebar with collapsible panels for entity controls and action log.
 */
export function Sidebar({ provider, actionLog, onClearLog, onEntityChange }: SidebarProps) {
  const { token } = useToken();

  const items = [
    {
      key: 'entities',
      label: 'Entity Controls',
      children: <EntityPanel provider={provider} onEntityChange={onEntityChange} />,
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
