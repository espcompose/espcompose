import { describe, it, expect } from 'vitest';
import { optimizeExpr } from './optimize-expr';
import type { IRExpression, IROpExpression, IRLiteralExpression } from './expr-types';
import { irBinary, irTernary, irUnary, irLiteralExpression, irGroup } from './expr-builders';

// ── Helpers ──────────────────────────────────────────────────────────────────

const sigRead: IRExpression = { kind: 'expr:signal_read', signalIndex: 0 };
const themeA: IRExpression = { kind: 'expr:theme_read', scope: 's', scopeId: 'abc', path: 'a', type: 'color' };
const themeB: IRExpression = { kind: 'expr:theme_read', scope: 's', scopeId: 'abc', path: 'b', type: 'color' };
const themeC: IRExpression = { kind: 'expr:theme_read', scope: 's', scopeId: 'abc', path: 'c', type: 'color' };
const themeD: IRExpression = { kind: 'expr:theme_read', scope: 's', scopeId: 'abc', path: 'd', type: 'color' };
const themeE: IRExpression = { kind: 'expr:theme_read', scope: 's', scopeId: 'abc', path: 'e', type: 'color' };

const litTrue: IRLiteralExpression = { kind: 'expr:literal', value: true, type: 'bool' };
const litFalse: IRLiteralExpression = { kind: 'expr:literal', value: false, type: 'bool' };

// ── Dead branch elimination ──────────────────────────────────────────────────

describe('dead branch elimination', () => {
  it('ternary(true, A, B) → A', () => {
    const node = irTernary(litTrue, themeA, themeB);
    expect(optimizeExpr(node)).toBe(themeA);
  });

  it('ternary(false, A, B) → B', () => {
    const node = irTernary(litFalse, themeA, themeB);
    expect(optimizeExpr(node)).toBe(themeB);
  });

  it('ternary with truthy string literal → consequent', () => {
    const node = irTernary(irLiteralExpression('nonempty'), themeA, themeB);
    expect(optimizeExpr(node)).toBe(themeA);
  });

  it('ternary with 0 → alternate', () => {
    const node = irTernary(irLiteralExpression(0), themeA, themeB);
    expect(optimizeExpr(node)).toBe(themeB);
  });
});

// ── Ternary-literal equality folding ─────────────────────────────────────────

describe('ternary-literal equality folding', () => {
  // (sig ? "primary" : "secondary") == "primary"  →  sig
  it('(cond ? X : Y) == X → cond', () => {
    const input = irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary'));
    const node = irBinary('==', input, irLiteralExpression('primary'));
    expect(optimizeExpr(node)).toBe(sigRead);
  });

  // (sig ? "primary" : "secondary") == "secondary"  →  !sig
  it('(cond ? X : Y) == Y → !cond', () => {
    const input = irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary'));
    const node = irBinary('==', input, irLiteralExpression('secondary'));
    const result = optimizeExpr(node) as IROpExpression;
    expect(result.kind).toBe('expr:op');
    expect(result.op).toEqual({ tag: 'unary', op: '!' });
    expect(result.children[0]).toBe(sigRead);
  });

  // (sig ? "primary" : "secondary") == "danger"  →  false
  it('(cond ? X : Y) == Z where Z ∉ {X, Y} → false', () => {
    const input = irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary'));
    const node = irBinary('==', input, irLiteralExpression('danger'));
    const result = optimizeExpr(node) as IRLiteralExpression;
    expect(result).toEqual({ kind: 'expr:literal', value: false, type: 'bool' });
  });

  // literal == ternary (reversed operand order)
  it('handles reversed operand order: Z == (cond ? X : Y)', () => {
    const input = irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary'));
    const node = irBinary('==', irLiteralExpression('primary'), input);
    expect(optimizeExpr(node)).toBe(sigRead);
  });

  // Both branches produce the same literal: always equal
  it('(cond ? X : X) == X → true', () => {
    const input = irTernary(sigRead, irLiteralExpression('same'), irLiteralExpression('same'));
    const node = irBinary('==', input, irLiteralExpression('same'));
    const result = optimizeExpr(node) as IRLiteralExpression;
    expect(result).toEqual({ kind: 'expr:literal', value: true, type: 'bool' });
  });

  // != operator
  it('(cond ? X : Y) != X → !cond', () => {
    const input = irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary'));
    const node = irBinary('!=', input, irLiteralExpression('primary'));
    const result = optimizeExpr(node) as IROpExpression;
    expect(result.kind).toBe('expr:op');
    expect(result.op).toEqual({ tag: 'unary', op: '!' });
    expect(result.children[0]).toBe(sigRead);
  });

  it('(cond ? X : Y) != Z where Z ∉ {X, Y} → true', () => {
    const input = irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary'));
    const node = irBinary('!=', input, irLiteralExpression('danger'));
    const result = optimizeExpr(node) as IRLiteralExpression;
    expect(result).toEqual({ kind: 'expr:literal', value: true, type: 'bool' });
  });

  // Numeric literals
  it('works with numeric literals', () => {
    const input = irTernary(sigRead, irLiteralExpression(1), irLiteralExpression(2));
    const node = irBinary('==', input, irLiteralExpression(1));
    expect(optimizeExpr(node)).toBe(sigRead);
  });
});

// ── Double negation collapse ─────────────────────────────────────────────────

describe('double negation', () => {
  it('!!A → A', () => {
    const node = irUnary('!', irUnary('!', sigRead));
    expect(optimizeExpr(node)).toBe(sigRead);
  });

  it('!true → false', () => {
    const node = irUnary('!', litTrue);
    const result = optimizeExpr(node) as IRLiteralExpression;
    expect(result).toEqual({ kind: 'expr:literal', value: false, type: 'bool' });
  });

  it('!false → true', () => {
    const node = irUnary('!', litFalse);
    const result = optimizeExpr(node) as IRLiteralExpression;
    expect(result).toEqual({ kind: 'expr:literal', value: true, type: 'bool' });
  });
});

// ── Group unwrapping ─────────────────────────────────────────────────────────

describe('group unwrapping', () => {
  it('strips unnecessary group wrapper', () => {
    const node = irGroup(sigRead);
    expect(optimizeExpr(node)).toBe(sigRead);
  });

  it('folds ternary-equality through group wrappers', () => {
    // This is the real-world pattern: ((sig ? "primary" : "secondary")) == "primary"
    const input = irGroup(irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary')));
    const node = irBinary('==', input, irLiteralExpression('primary'));
    expect(optimizeExpr(node)).toBe(sigRead);
  });
});

// ── Passthrough ──────────────────────────────────────────────────────────────

describe('passthrough', () => {
  it('non-matching expressions pass through unchanged', () => {
    const node = irBinary('+', sigRead, irLiteralExpression(1));
    const result = optimizeExpr(node);
    expect(result).toBe(node);
  });

  it('leaf nodes pass through', () => {
    expect(optimizeExpr(sigRead)).toBe(sigRead);
    expect(optimizeExpr(irLiteralExpression(42))).toStrictEqual(irLiteralExpression(42));
  });

  it('ternary without literal branches passes through', () => {
    const node = irTernary(sigRead, themeA, themeB);
    const eq = irBinary('==', node, irLiteralExpression('primary'));
    const result = optimizeExpr(eq);
    // Cannot fold because ternary branches aren't literals
    expect(result).toBe(eq);
  });
});

// ── Full variant chain collapse ──────────────────────────────────────────────

describe('full variant chain collapse', () => {
  it('collapses 5-member useReactiveMap chain to boolean ternary (no string comparisons)', () => {
    // Simulates the IR produced by expandReactiveUnion with StatusToken:
    // input = sig ? "primary" : "secondary"
    // chain = input == "primary" ? thm_A
    //       : input == "secondary" ? thm_B
    //       : input == "success" ? thm_C
    //       : input == "warning" ? thm_D
    //       : thm_E
    const input = irTernary(sigRead, irLiteralExpression('primary'), irLiteralExpression('secondary'));

    const chain = irTernary(
      irBinary('==', input, irLiteralExpression('primary')),
      themeA,
      irTernary(
        irBinary('==', input, irLiteralExpression('secondary')),
        themeB,
        irTernary(
          irBinary('==', input, irLiteralExpression('success')),
          themeC,
          irTernary(
            irBinary('==', input, irLiteralExpression('warning')),
            themeD,
            themeE,
          ),
        ),
      ),
    );

    const result = optimizeExpr(chain) as IROpExpression;

    // After folding:
    //   input == "primary" → sigRead (matches true branch)
    //   input == "secondary" → !sigRead (matches false branch)
    //   input == "success" → false (unreachable)
    //   input == "warning" → false (unreachable)
    // Dead branch elimination collapses false-guarded ternaries.
    // Result: ternary(sigRead, themeA, ternary(!sigRead, themeB, themeE))
    //
    // The inner ternary(!sigRead, ...) is semantically always-true when we
    // reach it (sigRead was false), but the optimizer doesn't track data flow
    // across ternary branches — that's OK, all string ops are eliminated.

    expect(result.kind).toBe('expr:op');
    expect(result.op.tag).toBe('ternary');
    // Outer condition is sigRead (no string comparison)
    expect(result.children[0]).toBe(sigRead);
    expect(result.children[1]).toBe(themeA);

    // Alternate: ternary(!sigRead, themeB, themeE)
    const alt = result.children[2] as IROpExpression;
    expect(alt.op.tag).toBe('ternary');
    const altCond = alt.children[0] as IROpExpression;
    expect(altCond.op).toEqual({ tag: 'unary', op: '!' });
    expect(altCond.children[0]).toBe(sigRead);
    expect(alt.children[1]).toBe(themeB);
    expect(alt.children[2]).toBe(themeE);
  });

  it('collapses chain where input matches the fallback branch', () => {
    // input can be "danger" or "secondary", chain tests primary → secondary → success → warning → danger(fallback)
    const input = irTernary(sigRead, irLiteralExpression('danger'), irLiteralExpression('secondary'));

    const chain = irTernary(
      irBinary('==', input, irLiteralExpression('primary')),
      themeA,
      irTernary(
        irBinary('==', input, irLiteralExpression('secondary')),
        themeB,
        irTernary(
          irBinary('==', input, irLiteralExpression('success')),
          themeC,
          irTernary(
            irBinary('==', input, irLiteralExpression('warning')),
            themeD,
            themeE, // danger fallback
          ),
        ),
      ),
    );

    const result = optimizeExpr(chain);

    // primary → false → skip to alternate
    // secondary → !sig (sig=true → "danger", so "secondary" is the false branch)
    // success → false → skip
    // warning → false → skip, fallback = themeE
    // After folding: !sig ? themeB : themeE
    // Which is: sig ? themeE : themeB
    // Let's verify structurally:
    const r = result as IROpExpression;
    expect(r.kind).toBe('expr:op');
    expect(r.op.tag).toBe('ternary');

    // The condition should be !sigRead (since secondary == Y, it becomes !cond)
    // After dead branch elimination on the outer ternary:
    // ternary(false, themeA, ternary(!sig, themeB, ternary(false, themeC, ternary(false, themeD, themeE))))
    // → ternary(!sig, themeB, themeE)
    const cond = r.children[0] as IROpExpression;
    expect(cond.op).toEqual({ tag: 'unary', op: '!' });
    expect(cond.children[0]).toBe(sigRead);
    expect(r.children[1]).toBe(themeB);
    expect(r.children[2]).toBe(themeE);
  });
});
