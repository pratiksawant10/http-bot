import { Card } from '@/components/ui/card';
export default function Dashboard(){return <div className='grid md:grid-cols-3 gap-4'>{['Requests','Collections','Runs 7d'].map(k=><Card key={k}><p className='text-muted-foreground'>{k}</p><h3 className='text-3xl font-bold'>--</h3></Card>)}</div>}
