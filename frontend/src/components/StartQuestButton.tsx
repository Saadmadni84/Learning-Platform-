'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { startInitialization, setSession, setError } from '@/store/features/quest/questSlice'
import type { InitializeQuestResponse, DifficultyLevel } from '@/types/quest'
import { Sparkles, Loader2, Check } from 'lucide-react'

interface StartQuestButtonProps {
  userId: string
  difficulty?: DifficultyLevel
  className?: string
}

export default function StartQuestButton({ userId, difficulty = 'easy', className = '' }: StartQuestButtonProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleStart = async () => {
    try {
      setLoading(true)
      setSuccess(false)
      dispatch(startInitialization())

      const res = await fetch('/api/quest/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, difficulty })
      })

      if (!res.ok) throw new Error('Failed to start quest')
      const data = (await res.json()) as InitializeQuestResponse
      dispatch(setSession(data.session))

      setSuccess(true)
      setTimeout(() => {
        router.push(`/student/courses`)
      }, 600)
    } catch (e: any) {
      console.error(e)
      dispatch(setError(e.message || 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleStart}
      disabled={loading}
      className={`group relative inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold text-white transition-all
        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow' }
        ${className}`}
    >
      <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition bg-white" />
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          Setting up quest...
        </span>
      ) : success ? (
        <span className="flex items-center gap-2">
          <Check className="w-5 h-5" />
          Quest Ready!
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Start Quest
        </span>
      )}
    </button>
  )
}


