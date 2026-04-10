import React, { useCallback, useEffect, useState } from 'react';
import { InputNumber, Switch, Tag, Typography } from 'antd';
import type { EntityStore, EntityState } from '../runtime';
import { domainFromEntityId } from '../runtime';
import { getEntityDomain } from '@espcompose/core/internals';

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
export function EntityPanel({ entityStore, onToggle, onSensorChange }: EntityPanelProps) {
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

  const handleToggle = (entityId: string) => {
    const domain = domainFromEntityId(entityId);
    onToggle(entityId, domain);
  };

  const handleSensorChange = (entityId: string, value: number | null) => {
    if (value == null) return;
    onSensorChange(entityId, value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from(entityStates.entries()).map(([entityId, state]) => {
        const domain = domainFromEntityId(entityId);
        const desc = getEntityDomain(domain);

        // Use sensorType from the IR metadata to determine the right control.
        // binary_sensor → toggle, sensor → number input, text_sensor → read-only.
        const sensorType = state.sensorType;
        const isBinary = sensorType === 'binary_sensor';
        const isNumeric = sensorType === 'sensor';
        const isOn = desc?.activeState ? state.state === desc.activeState : false;

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

            <Tag color={isBinary && isOn ? 'green' : 'default'} style={{ margin: 0, minWidth: 36, textAlign: 'center' }}>
              {state.state || '–'}
            </Tag>

            {isBinary && (
              <Switch
                size="small"
                checked={isOn}
                onChange={() => handleToggle(entityId)}
              />
            )}

            {isNumeric && (
              <InputNumber
                size="small"
                style={{ width: 80 }}
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
