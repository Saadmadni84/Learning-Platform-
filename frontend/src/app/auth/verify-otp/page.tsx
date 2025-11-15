'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function VerifyOTPPage({ searchParams }: PageProps) {
  const router = useRouter();
  const phoneNumber = searchParams.phone as string;
  const userType = searchParams.type as string;
  
  useEffect(() => {
    // Redirect to the multi-step verification page with the phone and user type
    if (phoneNumber && userType) {
      router.push(`/multi-step-login?phone=${phoneNumber}&type=${userType}`);
    } else {
      // If no parameters, redirect to login
      router.push('/auth/login');
    }
  }, [phoneNumber, userType, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to verification...</p>
      </div>
    </div>
  );
}
