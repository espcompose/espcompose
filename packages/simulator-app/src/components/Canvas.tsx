import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Typography } from 'antd';
import type { RuntimeNode } from '../runtime';
import { LvglWidget } from '../renderer/LvglWidget';

const { Text } = Typography;

interface CanvasProps {
  nodes: RuntimeNode[];
  displayWidth: number;
  displayHeight: number;
  themeStyleHtml?: string;
  defaultThemeName?: string;
  onAction?: (nodeId: string, event: string) => void;
  /** Changes when reactive state is flushed, forcing a re-render. */
  _renderVersion: number;
}

/**
 * Canvas area — contains the zoom-fitted LVGL viewport.
 *
 * The viewport is rendered at its native pixel size and scaled with
 * CSS `transform: scale()` to fit the available canvas area.
 */
export function Canvas({
  nodes,
  displayWidth,
  displayHeight,
  themeStyleHtml,
  defaultThemeName,
  onAction,
  _renderVersion,
}: CanvasProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const recalcZoom = useCallback(() => {
    const body = bodyRef.current;
    if (!body) return;
    const rect = body.getBoundingClientRect();
    const pad = 32;
    const availW = rect.width - pad;
    const availH = rect.height - pad;
    if (availW <= 0 || availH <= 0) return;
    const s = Math.min(availW / displayWidth, availH / displayHeight, 2);
    setScale(s);
  }, [displayWidth, displayHeight]);

  // Recalculate on resize
  useEffect(() => {
    recalcZoom();
    const ro = new ResizeObserver(() => recalcZoom());
    if (bodyRef.current) ro.observe(bodyRef.current);
    return () => ro.disconnect();
  }, [recalcZoom]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d0d' }}>
      <div
        ref={bodyRef}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Inject theme CSS custom properties */}
        {themeStyleHtml && <style dangerouslySetInnerHTML={{ __html: themeStyleHtml }} />}

        <div
          className="sim-viewport"
          style={{
            width: displayWidth,
            height: displayHeight,
            transform: `scale(${scale})`,
          }}
          data-theme={defaultThemeName}
        >
          {nodes.map((node) => (
            <LvglWidget key={node.id} node={node} onAction={onAction} />
          ))}
        </div>

        <Text
          type="secondary"
          style={{
            position: 'absolute',
            bottom: 8,
            right: 12,
            fontSize: 11,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          {Math.round(scale * 100)}%
        </Text>
      </div>
    </div>
  );
}
