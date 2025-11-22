'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'pricing';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const baseClasses =
    'rounded-xl border border-border bg-card/80 backdrop-blur-xl p-6 shadow-lg';

  const variantClasses = {
    default: '',
    pricing: 'hover:border-primary/50 transition-all duration-normal',
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

