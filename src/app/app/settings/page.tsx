'use client';
import { createClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
export default function Settings(){const s=createClient();return <div><h1 className='text-2xl mb-3'>Settings</h1><Button onClick={async()=>{await s.auth.signOut();location.href='/login';}}>Sign out</Button></div>}
