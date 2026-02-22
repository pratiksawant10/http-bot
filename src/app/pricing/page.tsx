import { Card } from '@/components/ui/card';
export default function Pricing(){return <main className='p-10 grid md:grid-cols-3 gap-4'>{['Free','Pro','Team'].map(t=><Card key={t}><h2 className='text-2xl'>{t}</h2><p>$0/$12/$39</p></Card>)}</main>}
