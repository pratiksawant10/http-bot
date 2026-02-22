'use client';
import { useState } from 'react';
export function Tabs({ tabs }: { tabs: {key:string;label:string;content:React.ReactNode}[] }) { const [active,setActive]=useState(tabs[0]?.key); const t=tabs.find(x=>x.key===active); return <div><div className='flex gap-2 mb-3'>{tabs.map(tab=><button key={tab.key} onClick={()=>setActive(tab.key)} className={`px-3 py-1 rounded ${active===tab.key?'bg-primary':''}`}>{tab.label}</button>)}</div><div>{t?.content}</div></div>; }
