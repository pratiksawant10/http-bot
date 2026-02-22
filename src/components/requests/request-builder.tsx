'use client';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { toCurl } from '@/lib/curl';
import { interpolate } from '@/lib/interpolation';

export function RequestBuilder({initialRequest,environments}:{initialRequest:any;environments:{id:string;name:string}[]}){
  const {toast}=useToast();
  const [req,setReq]=useState<any>(initialRequest);
  const [envId,setEnvId]=useState(environments[0]?.id);
  const [resp,setResp]=useState<any>(null);
  const [runMode,setRunMode]=useState<'server'|'browser'>('server');
  const [saving,setSaving]=useState(false);
  const resolvedUrl = useMemo(()=>interpolate(req?.url ?? '', []),[req?.url]);
  useEffect(()=>{const t=setTimeout(async()=>{setSaving(true);await fetch(`/api/requests/${req.id}`,{method:'PATCH',headers:{'content-type':'application/json'},body:JSON.stringify(req)}).catch(()=>{});setSaving(false);},600);return()=>clearTimeout(t);},[req]);
  useEffect(()=>{const fn=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();run();}};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);});
  async function run(){ if(runMode==='browser'){ const br=await fetch(req.url,{method:req.method,headers:Object.fromEntries((req.headers??[]).filter((h:any)=>h.enabled).map((h:any)=>[h.key,h.value])),body:req.body?.json||req.body?.raw}); const t=await br.text(); setResp({status:br.status,ok:br.ok,latency_ms:0,size_bytes:t.length,response_body_text:t}); return; } const r=await fetch('/api/run',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({requestId:req.id,environmentId:envId,runMode:'server'})});const j=await r.json();setResp(j);toast('Run complete');}
  return <div className='grid grid-cols-12 gap-4'><aside className='col-span-3 glass p-4 rounded-xl space-y-3'><Input value={req.name ?? ''} onChange={e=>setReq({...req,name:e.target.value})}/><p className='text-xs'>{saving?'Saving...':'Saved'}</p><Badge>{req.method}</Badge></aside><section className='col-span-6 glass p-4 rounded-xl space-y-3'><div className='flex gap-2'><Input value={req.method} onChange={e=>setReq({...req,method:e.target.value})} className='max-w-24'/><Input value={req.url ?? ''} onChange={e=>setReq({...req,url:e.target.value})}/><select className='bg-input rounded px-2' value={envId} onChange={e=>setEnvId(e.target.value)}>{environments.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}</select><select className='bg-input rounded px-2' value={runMode} onChange={e=>setRunMode(e.target.value as any)}><option value='server'>Run from server</option><option value='browser'>Run from browser</option></select><Button onClick={run}>Send</Button></div><Tabs tabs={[{key:'params',label:'Params',content:<Textarea value={JSON.stringify(req.params ?? [],null,2)} onChange={e=>setReq({...req,params:JSON.parse(e.target.value||'[]')})}/>},{key:'headers',label:'Headers',content:<Textarea value={JSON.stringify(req.headers ?? [],null,2)} onChange={e=>setReq({...req,headers:JSON.parse(e.target.value||'[]')})}/>},{key:'body',label:'Body',content:<Textarea value={req.body?.json ?? ''} onChange={e=>setReq({...req,body:{...req.body,mode:'json',json:e.target.value}})}/>}]}/><div className='text-xs text-muted-foreground'>Resolved URL: {resolvedUrl}</div><div className='flex gap-2'><Button onClick={()=>{navigator.clipboard.writeText(toCurl(req));toast('Copied cURL');}}>Copy as cURL</Button><Button onClick={()=>{const blob=new Blob([JSON.stringify({version:1,request:req},null,2)]);const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${req.name}.json`;a.click();}}>Export JSON</Button></div></section><aside className='col-span-3 glass p-4 rounded-xl'>{resp?<div><Badge>{resp.status ?? 'ERR'}</Badge><p>{resp.latency_ms} ms / {resp.size_bytes} bytes</p><Textarea value={resp.response_body_text ?? ''} readOnly/></div>:<p className='text-muted-foreground'>No response yet.</p>}</aside></div>;
}
