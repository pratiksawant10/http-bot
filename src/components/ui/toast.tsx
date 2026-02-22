'use client';
import { createContext, useContext, useState } from 'react';
const Ctx=createContext({toast:(m:string)=>{}});
export function ToastProvider({children}:{children:React.ReactNode}){const [msg,setMsg]=useState('');return <Ctx.Provider value={{toast:(m)=>{setMsg(m);setTimeout(()=>setMsg(''),2200);}}}>{children}{msg&&<div className='fixed bottom-4 right-4 glass px-4 py-2 rounded'>{msg}</div>}</Ctx.Provider>}
export const useToast=()=>useContext(Ctx);
