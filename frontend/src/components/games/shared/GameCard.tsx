'use client';

import React, { useState } from 'react';
import { GameWrapper } from './GameWrapper';
import { MathSprint } from '../ MathSprint';
import { ScienceGuess } from '../ScienceGuess';
import { WordBuilder } from '../WordBuilder';
import { LogicPuzzle } from '../LogicPuzzle';
import { useGameStats } from '@/hooks/useGameStats';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: number;
  color: string;
}

interface GameCardProps {
  game: Game;
}

const colorClasses = {
  pink: 'bg-pink-100 border-pink-200',
  green: 'bg-emerald-100 border-emerald-200',
  purple: 'bg-purple-100 border-purple-200',
  cyan: 'bg-cyan-100 border-cyan-200'
};

const buttonColors = {
  pink: 'bg-pink-500 hover:bg-pink-600',
  green: 'bg-emerald-500 hover:bg-emerald-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
  cyan: 'bg-cyan-500 hover:bg-cyan-600'
};

export function GameCard({ game }: GameCardProps) {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const { getGamePerformance } = useGameStats();
  
  const gamePerformance = getGamePerformance(game.id);

  const renderGame = () => {
    const gameProps = {
      onGameEnd: () => setIsGameOpen(false)
    };

    switch (game.id) {
      case 'math-sprint':
        return <MathSprint />;
      case 'science-guess':
        return <ScienceGuess />;
      case 'word-builder':
        return <WordBuilder />;
      case 'logic-puzzle':
        return <LogicPuzzle {...gameProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`rounded-xl border-2 p-6 transition-all hover:shadow-lg ${colorClasses[game.color as keyof typeof colorClasses]}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-3xl">{game.icon}</div>
          <div className="flex flex-col items-end gap-1">
            {game.difficulty > 0 && (
              <div className="bg-gray-500 text-white px-2 py-1 rounded text-sm">
                {game.difficulty}
              </div>
            )}
            {gamePerformance && (
              <div className="text-xs text-gray-500">
                Best: {gamePerformance.bestScore}
              </div>
            )}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{game.description}</p>
        
        {gamePerformance && (
          <div className="bg-white bg-opacity-50 p-2 rounded-lg mb-3 text-xs">
            <div className="flex justify-between">
              <span>Played: {gamePerformance.gamesPlayed}</span>
              <span>Avg: {Math.round(gamePerformance.averageScore)}</span>
            </div>
          </div>
        )}
        
        <button
          onClick={() => {
            if (game.id === 'math-sprint') {
              window.location.href = '/student/challenges/math-sprint';
            } else {
              setIsGameOpen(true);
            }
          }}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 transform hover:scale-105 ${buttonColors[game.color as keyof typeof buttonColors]}`}
        >
          Play
        </button>
        
        {game.id === 'math-sprint' && (
          <button 
            onClick={() => window.location.href = '/student/challenges/math-sprint'}
            className="w-full mt-2 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
          >
            Test Page
          </button>
        )}
      </div>

      {isGameOpen && (
        <GameWrapper 
          title={game.title}
          onClose={() => setIsGameOpen(false)}
        >
          {renderGame()}
        </GameWrapper>
      )}
    </>
  );
}
