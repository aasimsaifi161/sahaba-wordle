'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Grid from '../components/Grid';
import Keyboard from '../components/Keyboard';
import HelpModal from '../components/HelpModal';
import StatsModal from '../components/StatsModal';
import HintModal from '../components/HintModal';
import { useGameStore } from '../lib/store';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export default function Home() {
  const initGame = useGameStore((state) => state.initGame);
  const addLetter = useGameStore((state) => state.addLetter);
  const deleteLetter = useGameStore((state) => state.deleteLetter);
  const submitGuess = useGameStore((state) => state.submitGuess);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const guesses = useGameStore((state) => state.guesses);
  const isHydrated = useGameStore((state) => state.isHydrated);
  const solution = useGameStore((state) => state.solution);

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHintOpen, setIsHintOpen] = useState(false);

  // Initialize game from localStorage
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Handle opening HelpModal automatically on first visit, or showing StatsModal if game finished
  useEffect(() => {
    if (isHydrated) {
      // First visit check
      const firstVisit = localStorage.getItem('sahaba-wordle-first-visit');
      if (firstVisit !== 'false') {
        setIsHelpOpen(true);
        localStorage.setItem('sahaba-wordle-first-visit', 'false');
      }

      // If game is already won or lost, open stats modal
      if (gameStatus !== 'IN_PROGRESS') {
        setIsStatsOpen(true);
      }
    }
  }, [isHydrated, gameStatus]);

  // Trigger win confetti
  const triggerConfetti = () => {
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti burst from left and right corners
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleWin = () => {
    triggerConfetti();
    // Delay opening the stats modal to let user watch the tiles flip
    setTimeout(() => {
      setIsStatsOpen(true);
      toast.success('Congratulations! You found the Sahabi!');
    }, 1800);
  };

  const handleInvalidGuess = (msg: string) => {
    toast.error(msg, {
      duration: 1500,
    });
  };

  // Keyboard listener for desktop players
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if modals are open
      if (isHelpOpen || isStatsOpen || isHintOpen) return;
      if (gameStatus !== 'IN_PROGRESS') return;

      // Ignore meta keys
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

      const key = e.key.toUpperCase();

      if (key === 'ENTER') {
        submitGuess(handleInvalidGuess, handleWin);
      } else if (key === 'BACKSPACE') {
        deleteLetter();
      } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStatus, isHelpOpen, isStatsOpen, isHintOpen, submitGuess, addLetter, deleteLetter]);

  // Open stats modal automatically when game transitions to LOST
  useEffect(() => {
    if (gameStatus === 'LOST') {
      setTimeout(() => {
        setIsStatsOpen(true);
        toast.info('Nice try! Check today\'s answer.');
      }, 1800);
    }
  }, [gameStatus]);

  return (
    <div className="flex flex-col h-[100dvh] w-full overflow-hidden transition-colors duration-200">
      <Header 
        onOpenHelp={() => setIsHelpOpen(true)} 
        onOpenHint={() => setIsHintOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)} 
      />

      <main className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full select-none">
        {/* Playable Grid */}
        <Grid />

        {/* Screen Keyboard */}
        <Keyboard 
          onInvalid={handleInvalidGuess} 
          onWin={handleWin} 
        />
      </main>

      {/* Modal dialogs */}
      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />

      <HintModal 
        isOpen={isHintOpen} 
        onClose={() => setIsHintOpen(false)} 
      />

      <StatsModal 
        isOpen={isStatsOpen} 
        onClose={() => setIsStatsOpen(false)} 
      />
    </div>
  );
}
