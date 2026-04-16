import React from 'react';

/** Inject a scoped <style> tag for state and part-state CSS rules. */
export function StyleInjector({ cssText }: { cssText: string }) {
  if (!cssText) return null;
  return <style dangerouslySetInnerHTML={{ __html: cssText }} />;
}
