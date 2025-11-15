import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { QuestSession, QuestProgress } from '@/types/quest'

export interface QuestState {
  session: QuestSession | null
  status: 'idle' | 'initializing' | 'active' | 'error'
  error?: string
}

const initialState: QuestState = {
  session: null,
  status: 'idle'
}

const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    startInitialization(state) {
      state.status = 'initializing'
      state.error = undefined
    },
    setSession(state, action: PayloadAction<QuestSession>) {
      state.session = action.payload
      state.status = 'active'
    },
    updateProgress(state, action: PayloadAction<Partial<QuestProgress>>) {
      if (state.session) {
        state.session.progress = { ...state.session.progress, ...action.payload }
      }
    },
    setError(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.error = action.payload
    },
    resetQuest() {
      return initialState
    }
  }
})

export const { startInitialization, setSession, updateProgress, setError, resetQuest } = questSlice.actions
export default questSlice.reducer


