'use client';
import { createClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Login(){const [email,setEmail]=useState('');const [password,setPassword]=useState('');const supabase=createClient();
  return <main className='p-10 max-w-md mx-auto space-y-3'><h1 className='text-3xl font-bold'>Login</h1><Input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)}/><Input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}/><Button onClick={async()=>{await supabase.auth.signInWithPassword({email,password});location.href='/app';}}>Sign in</Button><Button className='w-full bg-white/10' onClick={async()=>{await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${location.origin}/app`}})}}>Continue with Google</Button></main>}
