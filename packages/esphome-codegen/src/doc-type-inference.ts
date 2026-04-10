const NUMERIC_DOC_TYPES = new Set([
  'integer',
  'int',
  'float',
  'number',
  'positive integer',
  'positive number',
  'percentage',
  'port',
]);

function normalizeDocTypeLabel(label: string): string {
  return label
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalizeDocsText(docs: string): string {
  return docs
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function extractLeadingDocTypeLabel(docs?: string): string | null {
  if (!docs) return null;

  const match = docs.trim().match(/^\*\*(.+?)\*\*\s*:/s);
  if (!match) return null;

  const normalized = normalizeDocTypeLabel(match[1]);
  return normalized.length > 0 ? normalized : null;
}

export function inferDocTypeString(docs?: string): string | null {
  const label = extractLeadingDocTypeLabel(docs);
  if (!label) return null;

  const normalizedDocs = docs ? normalizeDocsText(docs) : '';

  if (label === 'mac address') return 'MACAddress';
  if (label === 'ipv4 address') return 'IPv4Address';
  if (label === 'time') return 'TimePeriod';
  if (label === 'string' || label === 'icon' || label === 'url' || label === 'file path') return 'string';
  if (label === 'boolean' || label === 'bool') return 'boolean';
  if (label === 'action' || label === 'automation') return 'TriggerHandler';
  if (label === 'action or boolean' || label === 'automation or boolean') return 'TriggerHandler | boolean';
  if (label === 'list of strings') return 'string[]';
  if (label === 'string or list of bytes') return 'string | number[]';
  if (label === 'list of bytes') return 'number[]';
  if (normalizedDocs.includes('a string, or list of strings')) return 'string | string[]';
  if (NUMERIC_DOC_TYPES.has(label)) return 'number';

  return null;
}