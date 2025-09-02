"use client";

import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  variant?: 'default' | 'small';
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function PrimaryButton({ 
  children, 
  variant = 'default', 
  onClick, 
  disabled = false,
  icon,
  className = ''
}: PrimaryButtonProps) {
  const sizeClasses = {
    default: 'px-lg py-sm text-base',
    small: 'px-md py-xs text-sm'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        btn-primary 
        ${sizeClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-glow'}
        ${className}
        flex items-center justify-center space-x-2
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
