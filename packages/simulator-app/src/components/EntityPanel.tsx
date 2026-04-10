import React, { useCallback, useEffect, useState } from 'react';
import { Tag, Tooltip, Typography } from 'antd';
import { HomeOutlined, ApiOutlined } from '@ant-design/icons';
import type { EntityStore, EntityState } from '../runtime';

const { Text } = Typography;

interface EntityPanelProps {
  entityStore: EntityStore | null;
  onToggle: (entityId: string, domain: string) => void;
  onSensorChange: (entityId: string, value: number) => void;
}

/**
 * Entity control panel — lists all registered entities with
 * controls appropriate to each entity's domain.
 */
export function EntityPanel({ entityStore, onToggle: _onToggle, onSensorChange: _onSensorChange }: EntityPanelProps) {
  const [entityStates, setEntityStates] = useState<Map<string, EntityState>>(new Map());

  // Sync state from entity store
  const syncAll = useCallback(() => {
    if (!entityStore) return;
    const map = new Map<string, EntityState>();
    for (const id of entityStore.getEntityIds()) {
      map.set(id, entityStore.getEntityState(id));
    }
    setEntityStates(map);
  }, [entityStore]);

  useEffect(() => {
    syncAll();
  }, [syncAll]);

  // Subscribe to entity change events from store
  useEffect(() => {
    if (!entityStore) return;
    const unsubscribers: (() => void)[] = [];

    // Re-subscribe when the set of entities changes (new entities added)
    unsubscribers.push(
      entityStore.onStoreChange(() => syncAll()),
    );

    for (const id of entityStore.getEntityIds()) {
      unsubscribers.push(
        entityStore.onEntityChange(id, () => {
          setEntityStates((prev) => {
            const next = new Map(prev);
            next.set(id, entityStore.getEntityState(id));
            return next;
          });
        }),
      );
    }
    return () => unsubscribers.forEach((unsub) => unsub());
  }, [entityStore]);

  if (!entityStore || entityStates.size === 0) {
    return <Text type="secondary">No entities registered</Text>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from(entityStates.entries()).map(([entityId, state]) => {
        const isImported = entityId.startsWith('ha_');

        return (
          <div
            key={entityId}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 0',
            }}
          >
            <Tooltip title={isImported ? 'Imported from Home Assistant' : 'Native entity'}>
              {isImported
                ? <HomeOutlined style={{ fontSize: 14, color: '#1890ff' }} />
                : <ApiOutlined style={{ fontSize: 14, color: '#52c41a' }} />}
            </Tooltip>

            <Text code style={{ flex: 1, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {entityId}
            </Text>

            <Tag style={{ margin: 0, minWidth: 36, textAlign: 'center' }}>
              {state.state || '–'}
            </Tag>
          </div>
        );
      })}
    </div>
  );
}
