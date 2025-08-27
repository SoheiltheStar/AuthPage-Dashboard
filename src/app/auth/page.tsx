'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import { loginSchema, LoginFormData } from '@/utils/validation';
import { User, ApiResponse } from '@/types/user';
import styles from './auth.module.scss';

const AuthPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ phone?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const { setUser, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const validateForm = (): boolean => {
    try {
      loginSchema.parse({ phone });
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: { phone?: string } = {};
      error.errors?.forEach((err: any) => {
        if (err.path[0] === 'phone') {
          fieldErrors.phone = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://randomuser.me/api/?results=1');
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data: ApiResponse = await response.json();
      const fetchedUser: User | undefined = data.results?.[0];
      if (!fetchedUser) {
        throw new Error('Invalid response');
      }
      setUser(fetchedUser);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ phone: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.leftSection}>
        <div className={styles.brandContainer}>
          <div className={styles.logoSection}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 40 40" className={styles.logoSvg}>
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
                <circle cx="20" cy="20" r="8" fill="white" fillOpacity="0.9" />
                <circle cx="20" cy="20" r="4" fill="url(#logoGradient)" />
              </svg>
            </div>
            <h1 className={styles.brandName}>Dekamond</h1>
          </div>
          
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>
              Secure Authentication
              <span className={styles.heroSubtitle}>Made Simple</span>
            </h2>
            <p className={styles.heroDescription}>
              Experience seamless login with enterprise-grade security. Your data protected, your access instant.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <span>Bank-level Security</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <span>Lightning Fast</span>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22,4 12,14.01 9,11.01"/>
                </svg>
              </div>
              <span>Always Reliable</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h3>Welcome Back</h3>
            <p>Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <Input
                type="tel"
                placeholder="09123456789"
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                fullWidth
                variant="outlined"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isLoading}
              className={styles.loginButton}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className={styles.loginFooter}>
              <div className={styles.securityBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <span>Secured by Dekamond</span>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.helpText}>
          Need help? <a href="#" className={styles.helpLink}>Contact Support</a>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
