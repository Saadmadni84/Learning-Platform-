export interface GameScore {
  gameId: string;
  score: number;
  timeCompleted: number;
  starsEarned: number;
}

export interface GameState {
  active: boolean;
  score: number;
  timeLeft: number;
  currentRound: number;
}

export interface MiniChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: number;
  color: 'pink' | 'green' | 'purple' | 'cyan';
  maxScore: number;
  timeLimit: number;
}
