import * as React from 'react';
import { cn } from '@/lib/utils';
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea {...props} className={cn('w-full rounded-lg border border-border bg-input px-3 py-2 min-h-32', props.className)} />; }
