'use client';

import { SelectHTMLAttributes, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export function Select({ label, children, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-normal appearance-none cursor-pointer ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394A3B8' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          paddingRight: '2.5rem',
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

