import { describe, it, expect, vi } from 'vitest';
import type { SemanticIR, IRUIRegistry } from './types';
import { brandArray, irAction, irNull, irRef, irScalar, irObject, irEntry, irSection, irArray } from './types';
import type { IRWidget } from './widget-types';
import type { IRActionNode } from './action-types';
import type { AttachTriggerContribution } from './contribution-types';
import type { AttachStyleTransitionContribution } from './contribution-types';
import { applyContributions } from './apply-contributions';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeNativeAction(domain: string, operation: string): IRActionNode {
  return {
    kind: 'action:native',
    domain,
    operation,
    config: { kind: 'scalar', value: 'test_id' },
  };
}

function makeWidget(id: string | undefined, props: Record<string, unknown> = {}): IRWidget {
  return {
    kind: 'page',
    id,
    props: props as IRWidget['props'],
    children: [],
  };
}

function makeIR(pages: IRWidget[], widgets: IRWidget[] = []): SemanticIR {
  const ui: IRUIRegistry = {
    kind: 'ui_registry',
    lvgl: 'r_test_lvgl',
    config: {},
    pages,
    widgets,
    overlays: [],
    animations: [],
    styleTransitions: [],
  };
  return {
    kind: 'semantic_ir',
    sections: brandArray([], 'section_registry'),
    entities: brandArray([], 'entity_registry'),
    components: brandArray([], 'component_registry'),
    scripts: brandArray([], 'script_registry'),
    themes: brandArray([], 'theme_registry'),
    reactives: { kind: 'reactive_registry', bindings: [], memos: [], effects: [] },
    uis: [ui],
  };
}

function makeSectionIR(...sectionValues: { key: string; value: ReturnType<typeof irObject> }[]): SemanticIR {
  return {
    kind: 'semantic_ir',
    sections: brandArray(
      sectionValues.map(s => irSection(s.key, s.value)),
      'section_registry',
    ),
    entities: brandArray([], 'entity_registry'),
    components: brandArray([], 'component_registry'),
    scripts: brandArray([], 'script_registry'),
    themes: brandArray([], 'theme_registry'),
    reactives: { kind: 'reactive_registry', bindings: [], memos: [], effects: [] },
    uis: [],
  };
}

function makeContribution(
  targetRef: string,
  event: string,
  actions: IRActionNode[],
  sourceId: string = 'test/Component',
): AttachTriggerContribution {
  return { kind: 'attach-trigger', targetRef, event, actions, sourceId };
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe('applyContributions', () => {
  it('creates a new trigger prop when none exists', () => {
    const page = makeWidget('ref_page1', {});
    const ir = makeIR([page]);
    const action = makeNativeAction('light', 'toggle');

    applyContributions(ir, [makeContribution('ref_page1', 'onShow', [action])]);

    const onShow = page.props['onShow'];
    expect(onShow).toBeDefined();
    expect(onShow.kind).toBe('action');
    expect((onShow as { actions: IRActionNode[] }).actions).toEqual([action]);
  });

  it('appends contributed actions after existing user-authored actions', () => {
    const userAction = makeNativeAction('switch', 'turn_on');
    const page = makeWidget('ref_page1', {
      onShow: irAction([userAction]),
    });
    const ir = makeIR([page]);
    const contributedAction = makeNativeAction('light', 'toggle');

    applyContributions(ir, [makeContribution('ref_page1', 'onShow', [contributedAction])]);

    const onShow = page.props['onShow'] as { actions: IRActionNode[] };
    expect(onShow.actions).toHaveLength(2);
    expect(onShow.actions[0]).toEqual(userAction);
    expect(onShow.actions[1]).toEqual(contributedAction);
  });

  it('sorts contributions by sourceId for deterministic ordering', () => {
    const page = makeWidget('ref_page1', {});
    const ir = makeIR([page]);

    const actionB = makeNativeAction('light', 'toggle');
    const actionA = makeNativeAction('switch', 'turn_on');

    applyContributions(ir, [
      makeContribution('ref_page1', 'onShow', [actionB], 'z/ComponentB'),
      makeContribution('ref_page1', 'onShow', [actionA], 'a/ComponentA'),
    ]);

    const onShow = page.props['onShow'] as { actions: IRActionNode[] };
    expect(onShow.actions).toHaveLength(2);
    // 'a/ComponentA' sorts before 'z/ComponentB'
    expect(onShow.actions[0]).toEqual(actionA);
    expect(onShow.actions[1]).toEqual(actionB);
  });

  it('warns and skips when target ref is not found', () => {
    const page = makeWidget('ref_page1', {});
    const ir = makeIR([page]);
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const action = makeNativeAction('light', 'toggle');
    applyContributions(ir, [makeContribution('ref_nonexistent', 'onShow', [action])]);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ref_nonexistent'),
    );
    // Original page remains unmodified
    expect(page.props['onShow']).toBeUndefined();
    consoleSpy.mockRestore();
  });

  it('does nothing when there are no contributions', () => {
    const page = makeWidget('ref_page1', {});
    const ir = makeIR([page]);

    applyContributions(ir, []);

    expect(page.props['onShow']).toBeUndefined();
  });

  it('does nothing when there are no targets in the IR tree', () => {
    const ir: SemanticIR = {
      kind: 'semantic_ir',
      sections: brandArray([], 'section_registry'),
      entities: brandArray([], 'entity_registry'),
      components: brandArray([], 'component_registry'),
      scripts: brandArray([], 'script_registry'),
      themes: brandArray([], 'theme_registry'),
      reactives: { kind: 'reactive_registry', bindings: [], memos: [], effects: [] },
      uis: [],
    };

    // Should not throw — no targets to match, so silently skipped
    applyContributions(ir, [makeContribution('ref_x', 'onShow', [makeNativeAction('light', 'toggle')])]);
  });

  it('finds widgets in nested children', () => {
    const childWidget = makeWidget('ref_child', {});
    const page = makeWidget('ref_page', {});
    (page as { children: IRWidget[] }).children = [childWidget];
    const ir = makeIR([page]);

    const action = makeNativeAction('light', 'toggle');
    applyContributions(ir, [makeContribution('ref_child', 'onPress', [action])]);

    const onPress = childWidget.props['onPress'];
    expect(onPress).toBeDefined();
    expect(onPress.kind).toBe('action');
  });

  it('replaces null prop with new action', () => {
    const page = makeWidget('ref_page1', { onLoad: irNull() });
    const ir = makeIR([page]);
    const action = makeNativeAction('light', 'toggle');

    applyContributions(ir, [makeContribution('ref_page1', 'onLoad', [action])]);

    const onLoad = page.props['onLoad'];
    expect(onLoad.kind).toBe('action');
    expect((onLoad as { actions: IRActionNode[] }).actions).toEqual([action]);
  });

  it('handles multiple contributions to different events on the same widget', () => {
    const page = makeWidget('ref_page1', {});
    const ir = makeIR([page]);
    const showAction = makeNativeAction('light', 'toggle');
    const loadAction = makeNativeAction('switch', 'turn_on');

    applyContributions(ir, [
      makeContribution('ref_page1', 'onShow', [showAction]),
      makeContribution('ref_page1', 'onLoad', [loadAction]),
    ]);

    expect(page.props['onShow']).toBeDefined();
    expect(page.props['onLoad']).toBeDefined();
    expect((page.props['onShow'] as { actions: IRActionNode[] }).actions).toEqual([showAction]);
    expect((page.props['onLoad'] as { actions: IRActionNode[] }).actions).toEqual([loadAction]);
  });

  // ── Section item targets ───────────────────────────────────────────────

  it('attaches a trigger to a section item identified by ref', () => {
    const sensorObj = irObject([
      irEntry('id', irRef('ref_sensor1')),
      irEntry('platform', irScalar('dht')),
    ]);
    const ir = makeSectionIR({ key: 'sensor', value: sensorObj });
    const action = makeNativeAction('light', 'toggle');

    applyContributions(ir, [makeContribution('ref_sensor1', 'onValue', [action])]);

    const onValueEntry = sensorObj.entries.find(e => e.key === 'onValue');
    expect(onValueEntry).toBeDefined();
    expect(onValueEntry!.value.kind).toBe('action');
    expect((onValueEntry!.value as { actions: IRActionNode[] }).actions).toEqual([action]);
  });

  it('appends to an existing trigger on a section item', () => {
    const userAction = makeNativeAction('switch', 'turn_on');
    const sensorObj = irObject([
      irEntry('id', irRef('ref_sensor1')),
      irEntry('onValue', irAction([userAction])),
    ]);
    const ir = makeSectionIR({ key: 'sensor', value: sensorObj });
    const contributedAction = makeNativeAction('light', 'toggle');

    applyContributions(ir, [makeContribution('ref_sensor1', 'onValue', [contributedAction])]);

    const onValueEntry = sensorObj.entries.find(e => e.key === 'onValue');
    const actions = (onValueEntry!.value as { actions: IRActionNode[] }).actions;
    expect(actions).toHaveLength(2);
    expect(actions[0]).toEqual(userAction);
    expect(actions[1]).toEqual(contributedAction);
  });

  it('finds section items nested in arrays', () => {
    const sensor1 = irObject([
      irEntry('id', irRef('ref_s1')),
      irEntry('platform', irScalar('dht')),
    ]);
    const sensor2 = irObject([
      irEntry('id', irRef('ref_s2')),
      irEntry('platform', irScalar('adc')),
    ]);
    const ir = makeSectionIR({ key: 'sensor', value: irObject([]) });
    // Replace section value with an array of sensor objects (common pattern)
    ir.sections[0].value = irArray([sensor1, sensor2]);

    const action1 = makeNativeAction('light', 'toggle');
    const action2 = makeNativeAction('switch', 'turn_on');

    applyContributions(ir, [
      makeContribution('ref_s1', 'onValue', [action1]),
      makeContribution('ref_s2', 'onRawValue', [action2]),
    ]);

    expect(sensor1.entries.find(e => e.key === 'onValue')!.value.kind).toBe('action');
    expect(sensor2.entries.find(e => e.key === 'onRawValue')!.value.kind).toBe('action');
  });

  it('ignores section items without a ref-based id', () => {
    const sensorObj = irObject([
      irEntry('id', irScalar('my_manual_id')),
      irEntry('platform', irScalar('dht')),
    ]);
    const ir = makeSectionIR({ key: 'sensor', value: sensorObj });

    applyContributions(ir, [makeContribution('my_manual_id', 'onValue', [makeNativeAction('light', 'toggle')])]);

    // Manual string ID should NOT match — only ref tokens are contribution targets
    expect(sensorObj.entries.find(e => e.key === 'onValue')).toBeUndefined();
  });
});

// ────────────────────────────────────────────────────────────────────────────
// attach-style-transition contributions
// ────────────────────────────────────────────────────────────────────────────

describe('applyContributions — style transitions', () => {
  function makeTransitionContribution(
    targetRef: string,
    properties: string[],
    sourceId: string = 'test/Component',
    options?: { part?: string; state?: string },
  ): AttachStyleTransitionContribution {
    return {
      kind: 'attach-style-transition',
      targetRef,
      descriptors: [
        { properties, durationMs: 200, easing: 'ease_out', delayMs: 0 },
      ],
      sourceId,
      ...options,
    };
  }

  it('adds a style transition to the UI registry', () => {
    const widget = makeWidget('ref_btn');
    const ir = makeIR([widget]);

    applyContributions(ir, [
      makeTransitionContribution('ref_btn', ['bgColor', 'opa']),
    ]);

    expect(ir.uis[0].styleTransitions).toEqual([
      {
        kind: 'style_transition',
        targetRef: 'ref_btn',
        descriptors: [{ properties: ['bgColor', 'opa'], durationMs: 200, easing: 'ease_out', delayMs: 0 }],
      },
    ]);
  });

  it('preserves part and state when provided', () => {
    const widget = makeWidget('ref_btn');
    const ir = makeIR([widget]);

    applyContributions(ir, [
      makeTransitionContribution('ref_btn', ['bgColor'], 'test/A', { state: 'pressed', part: 'indicator' }),
    ]);

    expect(ir.uis[0].styleTransitions[0]).toMatchObject({
      targetRef: 'ref_btn',
      state: 'pressed',
      part: 'indicator',
    });
  });

  it('sorts contributions by sourceId for deterministic output', () => {
    const widget = makeWidget('ref_btn');
    const ir = makeIR([widget]);

    applyContributions(ir, [
      makeTransitionContribution('ref_btn', ['opa'], 'z/Late'),
      makeTransitionContribution('ref_btn', ['bgColor'], 'a/Early'),
    ]);

    expect(ir.uis[0].styleTransitions).toHaveLength(2);
    expect(ir.uis[0].styleTransitions[0].descriptors[0].properties).toEqual(['bgColor']);
    expect(ir.uis[0].styleTransitions[1].descriptors[0].properties).toEqual(['opa']);
  });

  it('warns and skips when target ref is not found', () => {
    const ir = makeIR([makeWidget('ref_other')]);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    applyContributions(ir, [
      makeTransitionContribution('ref_missing', ['bgColor']),
    ]);

    expect(ir.uis[0].styleTransitions).toHaveLength(0);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('ref_missing'),
    );
    warnSpy.mockRestore();
  });
});
