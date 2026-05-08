/**
 * Overlay Payload Injector
 *
 * Scans for useTransientOverlay<P>(...) and useOverlay<P>(...) calls whose
 * factory callback has a second parameter (the params proxy). Injects
 * `__overlayPayloadGlobals` metadata onto the factory function so the runtime
 * hook can allocate matching globals and wire the show script.
 *
 * Injection pattern:
 *   useTransientOverlay(config, Object.assign((ctrl, params) => ..., { __overlayPayloadGlobals: [...] }))
 *
 * Runs as part of the reactive transformer pass (before the script transformer).
 */

import ts from 'typescript';
import { isCoreExportCall, inferIRTypeFromTsType, type SourceEdit } from './type-brands.js';
import { type IRType, generateDeterministicId } from '@espcompose/core/internals';

/**
 * Walk the AST looking for `useOverlay()` and `useTransientOverlay()` calls
 * with a 2-param factory. Injects `__overlayPayloadGlobals` metadata by
 * wrapping the factory in `Object.assign(factory, { ... })`.
 */
export function injectOverlayPayloadMeta(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker,
  edits: SourceEdit[],
): void {
  const walk = (node: ts.Node): void => {
    if (
      ts.isCallExpression(node)
      && isCoreExportCall(node, ['useTransientOverlay', 'useOverlay'], checker)
    ) {
      const factoryArg = findFactoryArg(node);
      if (factoryArg && factoryArg.parameters.length >= 2) {
        const paramsParam = factoryArg.parameters[1];
        if (ts.isIdentifier(paramsParam.name)) {
          const paramFields = extractOverlayPayloadDeclsFromType(paramsParam, node, checker);
          if (paramFields.length > 0) {
            // Wrap factory in Object.assign(factory, { __overlayPayloadGlobals: [...] })
            const factoryStart = factoryArg.getStart(sourceFile);
            const factoryEnd = factoryArg.getEnd();
            const meta = JSON.stringify(paramFields);
            edits.push({ position: factoryStart, text: 'Object.assign(' });
            edits.push({ position: factoryEnd, text: `, { __overlayPayloadGlobals: ${meta} })` });
          }
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sourceFile);
}

function findFactoryArg(call: ts.CallExpression): ts.ArrowFunction | ts.FunctionExpression | null {
  for (const arg of call.arguments) {
    if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
      return arg;
    }
  }
  return null;
}

/**
 * Extract overlay payload field declarations from the factory's `ctx.payload`
 * type. Returns an array of { name, globalId, irType } for each field.
 */
function extractOverlayPayloadDeclsFromType(
  paramsParam: ts.ParameterDeclaration,
  call: ts.CallExpression,
  checker: ts.TypeChecker,
): Array<{ name: string; globalId: string; irType: IRType }> {
  const ctxType = checker.getTypeAtLocation(paramsParam);
  const fields: Array<{ name: string; globalId: string; irType: IRType }> = [];

  // User-declared payload fields live under `ctx.payload.<field>` for both
  // useOverlay and useTransientOverlay.
  const payloadProp = ctxType.getProperty('payload');
  if (!payloadProp) return fields;
  const payloadType = checker.getTypeOfSymbolAtLocation(payloadProp, paramsParam);

  // Derive base key from the variable hosting this call
  let varName = 'overlay';
  const parent = call.parent;
  if (ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
    varName = parent.name.text;
  }

  for (const prop of payloadType.getProperties()) {
    const propName = prop.name;
    const propType = checker.getTypeOfSymbolAtLocation(prop, paramsParam);
    const irType = inferIRTypeFromTsType(propType, checker);
    if (!irType) continue;
    const globalId = generateDeterministicId('g', `${varName}_${propName}`);
    fields.push({ name: propName, globalId, irType });
  }

  return fields;
}


