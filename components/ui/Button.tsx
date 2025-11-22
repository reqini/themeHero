'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'px-6 py-3 rounded-lg font-medium transition-all duration-normal cursor-pointer border';

  const variantClasses = {
    primary:
      'bg-primary text-white border-primary hover:opacity-90 active:scale-95 shadow-md',
    ghost:
      'bg-transparent text-foreground border-border hover:bg-muted hover:border-primary/50',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  );
}

