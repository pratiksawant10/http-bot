import { ApiRequest } from './types';
export function toCurl(req: ApiRequest) {
  const parts = [`curl -X ${req.method.toUpperCase()}`, `'${req.url}'`];
  req.headers.filter(h=>h.enabled && h.key).forEach(h=>parts.push(`-H '${h.key}: ${h.value}'`));
  if (req.body.mode === 'json' && req.body.json) parts.push(`--data '${req.body.json}'`);
  if (req.body.mode === 'raw' && req.body.raw) parts.push(`--data '${req.body.raw}'`);
  return parts.join(' ');
}
