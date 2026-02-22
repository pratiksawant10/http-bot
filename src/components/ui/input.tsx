import * as React from 'react';
import { cn } from '@/lib/utils';
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input {...props} className={cn('w-full rounded-lg border border-border bg-input px-3 py-2', props.className)} />; }
