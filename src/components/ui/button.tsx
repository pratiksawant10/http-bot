import * as React from 'react';
import { cn } from '@/lib/utils';
export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded-lg px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50', className)} {...props} />;
}
