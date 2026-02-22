'use client';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

type Run = { id:string; created_at:string; status:number; latency_ms:number; request_snapshot:any; response_body_text?:string };
export default function History(){
  const [active,setActive]=useState<Run|null>(null);
  const {data=[]}=useQuery<Run[]>({queryKey:['runs'],queryFn:async()=>{const r=await fetch('/api/runs');return r.json();}});
  const columnHelper = createColumnHelper<Run>();
  const columns = useMemo(()=>[
    columnHelper.accessor('created_at',{header:'Created',cell:info=>new Date(info.getValue()).toLocaleString()}),
    columnHelper.accessor('status',{header:'Status'}),
    columnHelper.accessor('latency_ms',{header:'Latency'})
  ],[]);
  const table = useReactTable({data,columns,getCoreRowModel:getCoreRowModel()});
  return <div className='grid grid-cols-12 gap-3'><div className='col-span-8 glass p-4 rounded-xl'><h1 className='text-2xl mb-3'>History</h1><table className='w-full text-sm'><thead>{table.getHeaderGroups().map(hg=><tr key={hg.id}>{hg.headers.map(h=><th key={h.id}>{flexRender(h.column.columnDef.header,h.getContext())}</th>)}</tr>)}</thead><tbody>{table.getRowModel().rows.map(r=><tr key={r.id} className='cursor-pointer hover:bg-white/5' onClick={()=>setActive(r.original)}>{r.getVisibleCells().map(c=><td key={c.id}>{flexRender(c.column.columnDef.cell,c.getContext())}</td>)}</tr>)}</tbody></table></div><aside className='col-span-4 glass p-4 rounded-xl'>{active?<Textarea readOnly value={JSON.stringify(active,null,2)}/>:<p>Select a run</p>}</aside></div>;
}
