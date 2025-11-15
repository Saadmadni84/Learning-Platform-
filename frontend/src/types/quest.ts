export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface QuestObjective {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface QuestProgress {
  currentObjectiveIndex: number
  completedObjectives: number
  totalObjectives: number
  xpEarned: number
  points: number
  startedAt: string
}

export interface QuestSession {
  sessionId: string
  userId: string
  title: string
  difficulty: DifficultyLevel
  objectives: QuestObjective[]
  progress: QuestProgress
}

export interface InitializeQuestRequest {
  userId: string
  difficulty: DifficultyLevel
  goals?: string[]
}

export interface InitializeQuestResponse {
  success: boolean
  session: QuestSession
}


