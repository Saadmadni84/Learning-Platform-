import { NextResponse } from 'next/server'
import type { InitializeQuestRequest, InitializeQuestResponse, QuestSession } from '@/types/quest'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InitializeQuestRequest
    const { userId, difficulty = 'easy', goals = [] } = body

    const now = new Date().toISOString()
    const session: QuestSession = {
      sessionId: `qs_${Math.random().toString(36).slice(2)}`,
      userId,
      title: 'Starter Quest',
      difficulty,
      objectives: [
        { id: 'obj1', title: 'Warm-up', description: 'Complete the warm-up challenge', completed: false },
        { id: 'obj2', title: 'Core Task', description: 'Solve the main challenge', completed: false },
        { id: 'obj3', title: 'Bonus', description: 'Attempt the bonus challenge', completed: false },
      ],
      progress: {
        currentObjectiveIndex: 0,
        completedObjectives: 0,
        totalObjectives: 3,
        xpEarned: 0,
        points: 0,
        startedAt: now,
      }
    }

    const response: InitializeQuestResponse = { success: true, session }
    return NextResponse.json(response)
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || 'Invalid request' }, { status: 400 })
  }
}


