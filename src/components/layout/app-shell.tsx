'use client';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

const links=[['/app','Overview'],['/app/requests','Requests'],['/app/collections','Collections'],['/app/environments','Environments'],['/app/history','History'],['/app/settings','Settings']];
export function AppShell({children}:{children:React.ReactNode}){const {theme,setTheme}=useTheme();const [open,setOpen]=useState(false);
useEffect(()=>{const fn=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(v=>!v);} if(e.key==='/'){(document.getElementById('global-search') as HTMLInputElement)?.focus();}};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn);},[]);
return <div className='flex min-h-screen'><aside className='w-60 p-4 border-r border-border'><h2 className='font-bold mb-4'>HTTPBot</h2><nav className='space-y-1'>{links.map(([href,label])=><Link key={href} href={href} className='block rounded px-3 py-2 hover:bg-white/10'>{label}</Link>)}</nav></aside><div className='flex-1'><header className='p-4 border-b border-border flex justify-between gap-4'><Input id='global-search' placeholder='Search... (/)'/><div className='flex gap-2'><button onClick={()=>setOpen(true)} className='px-3 py-2 rounded border border-border'>⌘K</button><button onClick={()=>setTheme(theme==='dark'?'light':'dark')} className='px-3 py-2 rounded border border-border'>Theme</button></div></header><motion.main initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className='p-6'>{children}</motion.main></div>{open&&<div className='fixed inset-0 bg-black/50 grid place-items-center' onClick={()=>setOpen(false)}><div className='glass p-6 w-[520px]' onClick={e=>e.stopPropagation()}><p className='mb-3'>Command Palette</p>{links.map(([href,label])=><Link key={href} href={href} className='block py-2'>{label}</Link>)}</div></div>}</div>}
