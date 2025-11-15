'use client';

import React, { useEffect, useState } from 'react';

interface GameWrapperProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function GameWrapper({ title, children, onClose }: GameWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => setIsVisible(true), 10);
    
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle ESC key press
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      clearTimeout(timer);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
      // Remove event listener
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 overflow-hidden ${
        isVisible ? 'bg-opacity-100' : 'bg-opacity-0'
      }`}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-white dark:bg-gray-800 w-full h-full flex flex-col transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ maxHeight: '100vh', maxWidth: '100vw' }}
      >
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <h2 className="text-2xl font-bold text-center flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {title}
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 text-3xl font-light transition-colors duration-200 hover:scale-110 transform"
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Game Content */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 overflow-y-auto" style={{ backgroundColor: 'white' }}>
          {children}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            🎮 Press ESC to close or click outside the window
          </p>
        </div>
      </div>
    </div>
  );
}
