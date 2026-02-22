'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type V={key:string;value:string;is_secret:boolean};
export default function Environments(){const [vars,setVars]=useState<V[]>([{key:'baseUrl',value:'https://httpbin.org',is_secret:false}]);
return <div className='space-y-3'><h1 className='text-2xl'>Environments</h1><div className='glass p-4 rounded-xl space-y-2'>{vars.map((v,i)=><div key={i} className='grid grid-cols-4 gap-2'><Input value={v.key} onChange={e=>setVars(vars.map((x,idx)=>idx===i?{...x,key:e.target.value}:x))}/><Input value={v.value} type={v.is_secret?'password':'text'} onChange={e=>setVars(vars.map((x,idx)=>idx===i?{...x,value:e.target.value}:x))}/><label className='flex items-center gap-2'><input type='checkbox' checked={v.is_secret} onChange={e=>setVars(vars.map((x,idx)=>idx===i?{...x,is_secret:e.target.checked}:x))}/>secret</label><Button onClick={()=>setVars(vars.filter((_,idx)=>idx!==i))}>Delete</Button></div>)}<Button onClick={()=>setVars([...vars,{key:'',value:'',is_secret:false}])}>Add variable</Button></div></div>}
