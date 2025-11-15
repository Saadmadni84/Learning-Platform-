import React from 'react';
import { cn } from '@/lib/utils'; // Optional utility for class merging

// Type definitions
type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

// Style configurations
const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

// Base styles that apply to all buttons
const baseStyles = [
  'font-medium',
  'rounded-md',
  'transition-colors',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'focus:ring-blue-500',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
].join(' ');

// Main Button Component
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled = false,
  ...props
}: ButtonProps) {
  // Construct class names
  const buttonClasses = [
    baseStyles,
    buttonVariants[variant],
    buttonSizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <button 
      className={buttonClasses} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Export types for external use
export type { ButtonProps, ButtonVariant, ButtonSize };
