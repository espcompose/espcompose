import React, { useCallback, useEffect, useState } from 'react';
import { InputNumber, Switch, Tag, Typography, Space } from 'antd';
import type { MockProvider, EntityState } from '@espcompose/target-simulator/browser';

const { Text } = Typography;

interface EntityPanelProps {
  provider: MockProvider | null;
  onEntityChange: () => void;
}

const TOGGLEABLE_DOMAINS = new Set(['light', 'switch', 'fan', 'cover']);
const SENSOR_DOMAINS = new Set(['sensor', 'number']);

/**
 * Entity control panel — lists all registered entities with
 * controls appropriate to each entity's domain.
 */
export function EntityPanel({ provider, onEntityChange }: EntityPanelProps) {
  const [entityStates, setEntityStates] = useState<Map<string, EntityState>>(new Map());

  // Sync state from provider
  const syncAll = useCallback(() => {
    if (!provider) return;
    const map = new Map<string, EntityState>();
    for (const id of provider.getEntityIds()) {
      map.set(id, provider.getEntityState(id));
    }
    setEntityStates(map);
  }, [provider]);

  useEffect(() => {
    syncAll();
  }, [syncAll]);

  // Subscribe to entity change events from provider
  useEffect(() => {
    if (!provider) return;
    const unsubscribers: (() => void)[] = [];
    for (const id of provider.getEntityIds()) {
      unsubscribers.push(
        provider.onEntityChange(id, () => {
          setEntityStates((prev) => {
            const next = new Map(prev);
            next.set(id, provider.getEntityState(id));
            return next;
          });
        }),
      );
    }
    return () => unsubscribers.forEach((unsub) => unsub());
  }, [provider]);

  if (!provider || entityStates.size === 0) {
    return <Text type="secondary">No entities registered</Text>;
  }

  const handleToggle = (entityId: string) => {
    const domain = entityId.split('.')[0];
    provider!.callService(domain, 'toggle', entityId);
    onEntityChange();
  };

  const handleSensorChange = (entityId: string, value: number | null) => {
    if (value == null) return;
    provider!.setEntityState(entityId, { state: String(value) });
    onEntityChange();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from(entityStates.entries()).map(([entityId, state]) => {
        const domain = entityId.split('.')[0];
        const isOn = state.state === 'on' || state.state === 'open';

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
            <Text code style={{ flex: 1, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {entityId}
            </Text>

            <Tag color={isOn ? 'green' : 'default'} style={{ margin: 0, minWidth: 36, textAlign: 'center' }}>
              {state.state}
            </Tag>

            {TOGGLEABLE_DOMAINS.has(domain) && (
              <Switch
                size="small"
                checked={isOn}
                onChange={() => handleToggle(entityId)}
              />
            )}

            {SENSOR_DOMAINS.has(domain) && (
              <InputNumber
                size="small"
                style={{ width: 70 }}
                value={Number(state.state) || 0}
                onChange={(v) => handleSensorChange(entityId, v)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
