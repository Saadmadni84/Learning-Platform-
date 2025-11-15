'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FiPhone, FiUser, FiShield, ArrowLeft, Home, Sparkles, Trophy, Star, Zap } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          userType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('OTP sent successfully!');
        router.push(`/auth/verify-otp?phone=${phoneNumber}&type=${userType}`);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
            onClick={() => router.push('/')}
            className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20"
            whileHover={{ x: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </motion.button>

          <motion.button
            onClick={() => router.push('/')}
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
                Your gamified learning journey starts here. Enter your details to unlock achievements and start earning points!
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
                  <span className="text-2xl font-bold text-white">Login Rewards</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="text-white font-bold">Daily Login</div>
                      <div className="text-purple-200 text-sm">+25 Points</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4">
                    <Sparkles className="w-6 h-6 text-blue-400" />
                    <div>
                      <div className="text-white font-bold">First Login</div>
                      <div className="text-purple-200 text-sm">+50 Points</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 bg-white/10 rounded-2xl p-4">
                    <Zap className="w-6 h-6 text-green-400" />
                    <div>
                      <div className="text-white font-bold">Streak Bonus</div>
                      <div className="text-purple-200 text-sm">+100 Points</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-3/5 xl:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-full max-w-2xl"
          >
            {/* Enhanced Login Form Card */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden relative">
              {/* Enhanced glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>
              
              {/* Header with Enhanced Design */}
              <div className="bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-indigo-600/90 p-8 text-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10"
                >
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mr-6 shadow-2xl"
                    >
                      <span className="text-3xl">🎮</span>
                    </motion.div>
                    <div className="text-left">
                      <div className="text-sm text-yellow-200 font-bold">Welcome Back</div>
                      <div className="text-3xl font-black text-white">Acadevia</div>
                      <div className="text-xs text-yellow-300">Gamified Learning Platform</div>
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                    Let's Get Started! 🚀
                  </h1>
                  <p className="text-purple-100 text-lg">
                    Enter your details to continue your learning journey
                  </p>
                  
                  {/* Enhanced Points Preview */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 inline-flex items-center space-x-6 bg-white/15 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/30 shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <div className="text-white font-black text-lg">+25 Points</div>
                        <div className="text-yellow-200 text-xs">Login Reward</div>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-white/40"></div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <div className="text-white font-black text-lg">Achievements</div>
                        <div className="text-green-200 text-xs">Unlock Badges</div>
                      </div>
                    </div>
                    <div className="w-px h-6 bg-white/40"></div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <div className="text-white font-black text-lg">Quick Login</div>
                        <div className="text-blue-200 text-xs">Get Started</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {/* User Type Selection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserType('student')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      userType === 'student'
                        ? 'border-purple-400 bg-purple-500/20 text-purple-100 shadow-lg shadow-purple-500/30'
                        : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <FiUser className="w-8 h-8 mx-auto mb-3" />
                    <span className="font-bold text-lg">Student</span>
                    <div className="text-sm mt-1 opacity-80">Learn & Earn</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserType('admin')}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      userType === 'admin'
                        ? 'border-blue-400 bg-blue-500/20 text-blue-100 shadow-lg shadow-blue-500/30'
                        : 'border-white/20 bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <FiShield className="w-8 h-8 mx-auto mb-3" />
                    <span className="font-bold text-lg">Admin</span>
                    <div className="text-sm mt-1 opacity-80">Manage & Monitor</div>
                  </motion.button>
                </div>

                {/* Phone Number Input */}
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white mb-3">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-5 top-1/2 transform -translate-y-1/2 text-purple-300 w-6 h-6" />
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full pl-14 pr-4 py-4 border-2 border-white/20 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200/30 transition-all duration-300 bg-white/10 backdrop-blur-xl text-white placeholder-purple-200 focus:bg-white/20 hover:bg-white/15 shadow-xl"
                        maxLength={10}
                        pattern="[0-9]*"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-8 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white font-black rounded-2xl hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl relative overflow-hidden group border-2 border-white/20 hover:border-white/40"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center justify-center space-x-3">
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                          />
                          <span className="text-lg font-bold">Sending OTP...</span>
                        </>
                      ) : (
                        <>
                          <motion.span
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{ 
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="text-2xl"
                          >
                            🚀
                          </motion.span>
                          <span className="text-lg font-bold">Get Started</span>
                          <motion.span
                            animate={{ x: [0, 6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-2xl"
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">
                  <p className="text-sm text-purple-200">
                    New to Acadevia?{' '}
                    <Link href="/auth/register" className="text-yellow-300 hover:text-yellow-200 font-bold hover:underline">
                      Create Account
                    </Link>
                  </p>
                  <p className="text-xs text-purple-300">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="underline hover:text-white">Terms</Link> and{' '}
                    <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}