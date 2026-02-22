import { cn } from '@/lib/utils';
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={cn('glass rounded-xl p-4', className)} />; }
