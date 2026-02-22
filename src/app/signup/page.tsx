'use client';
import { createClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
export default function Signup(){const [email,setEmail]=useState('');const [password,setPassword]=useState('');const supabase=createClient();
return <main className='p-10 max-w-md mx-auto space-y-3'><h1 className='text-3xl font-bold'>Sign up</h1><Input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email'/><Input type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password'/><Button onClick={async()=>{await supabase.auth.signUp({email,password});location.href='/app';}}>Create account</Button></main>}
