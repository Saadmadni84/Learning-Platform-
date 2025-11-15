'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './common/LoadingSpinner';

const LoginRedirect: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userProfile = localStorage.getItem('userProfile');

    if (isLoggedIn && userProfile) {
      // User is logged in, go to home page
      router.push('/');
    } else {
      // User is not logged in, go to login page
      router.push('/multi-step-login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen font-inter">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Checking login status...
        </p>
      </div>
    </div>
  );
};

export default LoginRedirect;
