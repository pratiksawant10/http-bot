export type EnvVar = { key: string; value: string; is_secret?: boolean };
export function interpolate(input: string, vars: EnvVar[]) {
  const map = new Map(vars.map(v => [v.key, v.value]));
  return input.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, k) => map.get(k) ?? `{{${k}}}`);
}
export function maskSecrets(input: string, vars: EnvVar[]) {
  let out = input;
  vars.filter(v=>v.is_secret).forEach(v=>{ if (v.value) out = out.split(v.value).join('******'); });
  return out;
}
