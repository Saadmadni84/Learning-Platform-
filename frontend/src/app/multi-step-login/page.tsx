'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Sparkles, Trophy, Star } from 'lucide-react';
import MultiStepForm from '@/components/multi-step-login/MultiStepForm';
import { MultiStepLoginFormData } from '@/validations/multi-step-login.validation';

interface MultiStepLoginPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const MultiStepLoginPage: React.FC<MultiStepLoginPageProps> = ({ searchParams }) => {
  const router = useRouter();
  const [isFormVisible, setIsFormVisible] = useState(true);
  
  // Get phone and user type from URL parameters
  const phoneNumber = searchParams?.phone as string;
  const userType = searchParams?.type as string;

  const handleFormComplete = (data: MultiStepLoginFormData) => {
    console.log('Form completed with data:', data);
    
    // Store user data in localStorage or send to API
    const completeUserData = {
      ...data,
      phoneNumber,
      userType
    };
    
    localStorage.setItem('userProfile', JSON.stringify(completeUserData));
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to home page after successful login
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  const handleFormCancel = () => {
    router.push('/');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Enhanced Animated Background with Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-3xl transform rotate-45"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-cyan-400/30 rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-60 left-1/4 w-28 h-28 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-2xl transform -rotate-12"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-50 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            onClick={handleGoHome}
            className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20"
            whileHover={{ x: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </motion.button>

          <motion.button
            onClick={handleGoHome}
            className="flex items-center space-x-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
              <span className="text-lg">🎯</span>
            </div>
            <span className="font-bold text-white text-lg">Acadevia</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content with Right-Aligned Layout */}
      <div className="min-h-screen flex">
        {/* Left Side - Decorative Content (Hidden on Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex lg:w-2/5 xl:w-1/2 flex-col justify-center items-center p-12 relative"
        >
          {/* Decorative Content */}
          <div className="max-w-md text-center space-y-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl"
            >
              <span className="text-6xl">🚀</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h1 className="text-5xl font-black text-white bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Welcome to Acadevia!
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed">
                Your gamified learning journey starts here. Complete your profile to unlock achievements and start earning points!
              </p>
            </motion.div>

            {/* Achievement Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">Achievements</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="text-white font-bold">Profile Setup</div>
                      <div className="text-purple-200 text-sm">+50 Points</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="text-white font-bold">First Steps</div>
                      <div className="text-purple-200 text-sm">+25 Points</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4">
                    <Trophy className="w-6 h-6 text-green-400" />
                    <div>
                      <div className="text-white font-bold">Completion Badge</div>
                      <div className="text-purple-200 text-sm">Unlock Achievement</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Form Content */}
        <div className="w-full lg:w-3/5 xl:w-1/2 flex items-center justify-center p-6 lg:p-12">
          {isFormVisible && (
            <MultiStepForm
              onComplete={handleFormComplete}
              onCancel={handleFormCancel}
            />
          )}

          {/* Success Page (shown after form completion) */}
          {!isFormVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <span className="text-6xl">🎉</span>
              </motion.div>
              
              <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Welcome to Acadevia!
              </h1>
              
              <p className="text-xl text-purple-100 mb-8">
                Your profile has been successfully set up. You're now ready to start your learning journey!
              </p>
              
              <motion.button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Home Page
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepLoginPage;
