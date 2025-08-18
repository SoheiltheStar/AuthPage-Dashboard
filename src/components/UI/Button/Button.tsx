'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'medium', 
    fullWidth = false, 
    loading = false, 
    className, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={`
          ${styles.button} 
          ${styles[variant]} 
          ${styles[size]} 
          ${fullWidth ? styles.fullWidth : ''} 
          ${loading ? styles.loading : ''} 
          ${className || ''}
        `}
        disabled={isDisabled}
        {...props}
      >
        {loading && <span className={styles.spinner}></span>}
        <span className={loading ? styles.loadingText : ''}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
