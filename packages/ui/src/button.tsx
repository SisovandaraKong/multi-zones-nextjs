"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary' 
}: ButtonProps) => {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all';
  const variantStyles = variant === 'primary' 
    ? 'bg-blue-600 text-white hover:bg-blue-700' 
    : 'bg-gray-200 text-gray-900 hover:bg-gray-300';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};