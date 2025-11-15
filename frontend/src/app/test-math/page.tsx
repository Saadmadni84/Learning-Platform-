'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function TestMathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Math Quiz Test Page</h1>
        
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Test Navigation</h2>
          <p className="text-gray-600 mb-6">This is a simple test page to verify routing is working.</p>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/student/challenges/math-sprint">
                Go to Math Sprint Quiz
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Test Results</h3>
          <p className="text-green-700">
            If you can see this page, the routing is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
}
