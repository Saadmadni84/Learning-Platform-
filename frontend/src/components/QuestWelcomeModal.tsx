'use client'

import React from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { DifficultyLevel } from '@/types/quest'

interface QuestWelcomeModalProps {
  open: boolean
  onClose: () => void
  onConfirm: (difficulty: DifficultyLevel, goals: string[]) => void
}

export default function QuestWelcomeModal({ open, onClose, onConfirm }: QuestWelcomeModalProps) {
  const [difficulty, setDifficulty] = React.useState<DifficultyLevel>('easy')
  const [goal, setGoal] = React.useState('Learn something new today')

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <div className="p-0 sm:p-2">
        <Card className="p-6 max-w-xl w-[92vw] sm:w-[520px]">
          <h3 className="text-2xl font-bold mb-2">Welcome to your Quest</h3>
          <p className="text-gray-600 mb-6">Set difficulty and a simple goal to personalize your adventure.</p>

          <div className="mb-5">
            <div className="text-sm font-semibold mb-2">Difficulty</div>
            <div className="flex gap-2">
              {(['easy','medium','hard'] as DifficultyLevel[]).map(l => (
                <button key={l} onClick={() => setDifficulty(l)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition
                    ${difficulty===l? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {l.charAt(0).toUpperCase()+l.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm font-semibold mb-2">Your Goal</div>
            <input value={goal} onChange={(e)=>setGoal(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={()=> onConfirm(difficulty, [goal])}>Start</Button>
          </div>
        </Card>
      </div>
    </Dialog>
  )
}


