'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary:
    'bg-pastel-mint text-foreground hover:shadow-lg hover:scale-105 active:scale-100',
  secondary:
    'bg-pastel-lavender text-foreground hover:shadow-lg hover:scale-105 active:scale-100',
  outline:
    'bg-transparent border-2 border-pastel-mint text-foreground hover:bg-pastel-mint/20',
  ghost: 'bg-transparent text-foreground hover:bg-gray-100',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-semibold rounded-full
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
