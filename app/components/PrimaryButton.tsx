"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'small' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  className?: string;
}

export function PrimaryButton({ 
  children, 
  variant = 'default', 
  color = 'primary',
  fullWidth = false,
  onClick, 
  disabled = false,
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  type = 'button',
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const colorClasses = {
    primary: 'bg-accent hover:bg-accent/90 text-white',
    secondary: 'bg-surface hover:bg-surface/80 text-text border border-gray-200',
    success: 'bg-success hover:bg-success/90 text-white',
    danger: 'bg-danger hover:bg-danger/90 text-white',
    warning: 'bg-warning hover:bg-warning/90 text-black'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${colorClasses[color]}
        ${sizeClasses[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
        ${className}
        rounded-lg transition-all duration-200 font-medium shadow-sm
        flex items-center justify-center gap-2
        focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2
      `}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="inline-flex">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {icon && iconPosition === 'right' && (
        <span className="inline-flex">{icon}</span>
      )}
    </button>
  );
}
