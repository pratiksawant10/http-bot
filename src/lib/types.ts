export type KV = { key: string; value: string; enabled: boolean };
export type RequestBody = { mode: 'none'|'json'|'raw'; json?: string; raw?: string };
export type RequestAuth = { type: 'none'|'bearer'|'basic'|'apikey'; token?: string; username?: string; password?: string; key?: string; value?: string; addTo?: 'header'|'query' };
export type ApiRequest = { id?: string; name: string; method: string; url: string; params: KV[]; headers: KV[]; body: RequestBody; auth: RequestAuth; };
