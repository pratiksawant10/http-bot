import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function Requests(){return <div className='space-y-4'><div className='flex justify-between'><h1 className='text-2xl'>Requests</h1><Link href='/app/requests/new'><Button>New</Button></Link></div><p className='text-muted-foreground'>Search and filter requests.</p></div>}
