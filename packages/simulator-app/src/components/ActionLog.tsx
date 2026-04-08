import React, { useEffect, useRef } from 'react';
import { Button, List, Typography } from 'antd';
import { ClearOutlined } from '@ant-design/icons';

const { Text } = Typography;

export interface ActionLogEntry {
  id: number;
  timestamp: string;
  text: string;
}

interface ActionLogProps {
  entries: ActionLogEntry[];
  onClear: () => void;
}

/**
 * Action log panel — displays timestamped action events from widget interactions.
 */
export function ActionLog({ entries, onClear }: ActionLogProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top on new entries (newest first)
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [entries.length]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <Button
          type="text"
          size="small"
          icon={<ClearOutlined />}
          onClick={onClear}
          disabled={entries.length === 0}
        >
          Clear
        </Button>
      </div>
      <div ref={listRef} style={{ maxHeight: 250, overflow: 'auto' }}>
        {entries.length === 0 ? (
          <Text type="secondary" style={{ fontSize: 12 }}>No actions recorded</Text>
        ) : (
          <List
            size="small"
            dataSource={entries}
            renderItem={(entry) => (
              <List.Item style={{ padding: '4px 0', border: 'none' }}>
                <Text type="secondary" style={{ fontSize: 11, marginRight: 8 }}>
                  {entry.timestamp}
                </Text>
                <Text style={{ fontSize: 11, color: '#4fc3f7' }}>
                  {entry.text}
                </Text>
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}
