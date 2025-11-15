'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  className?: string;
  max?: number;
}

export function Progress({ value, className, max = 100 }: ProgressProps) {
  return (
    <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(Math.max(value, 0), max)}%` }}
      />
    </div>
  );
}
