'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/UI/Button/Button';
import styles from './dashboard.module.scss';

const DashboardPage: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>Dekamond</div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeSection}>
          <div className={styles.profileImage}>
            <img 
              src={user.picture.large} 
              alt={`${user.name.first} ${user.name.last}`}
              className={styles.avatar}
            />
          </div>
          <div className={styles.welcomeText}>
            <h1>Welcome to the Dashboard</h1>
            <p>Hello, {user.name.title} {user.name.first} {user.name.last}!</p>
          </div>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Personal Information</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Full Name:</span>
                <span className={styles.value}>{user.name.title} {user.name.first} {user.name.last}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Gender:</span>
                <span className={styles.value}>{user.gender}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Date of Birth:</span>
                <span className={styles.value}>{formatDate(user.dob.date)} ({user.dob.age} years old)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Nationality:</span>
                <span className={styles.value}>{user.nat}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Contact Information</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{user.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Phone:</span>
                <span className={styles.value}>{user.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Cell:</span>
                <span className={styles.value}>{user.cell}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Address</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Street:</span>
                <span className={styles.value}>{user.location.street.number} {user.location.street.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>City:</span>
                <span className={styles.value}>{user.location.city}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>State:</span>
                <span className={styles.value}>{user.location.state}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Country:</span>
                <span className={styles.value}>{user.location.country}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Postal Code:</span>
                <span className={styles.value}>{user.location.postcode}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Account Details</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Username:</span>
                <span className={styles.value}>{user.login.username}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>UUID:</span>
                <span className={styles.value}>{user.login.uuid}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Registered:</span>
                <span className={styles.value}>{formatDate(user.registered.date)} ({user.registered.age} years ago)</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>ID:</span>
                <span className={styles.value}>{user.id.name}: {user.id.value}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Location Details</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Coordinates:</span>
                <span className={styles.value}>{user.location.coordinates.latitude}, {user.location.coordinates.longitude}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Timezone:</span>
                <span className={styles.value}>{user.location.timezone.offset} ({user.location.timezone.description})</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
