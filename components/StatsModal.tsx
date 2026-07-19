'use client';

import React, { useEffect, useState } from 'react';
import { X, Share2, Award, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../lib/store';
import { getGuessStatuses } from '../lib/statuses';
import { toast } from 'sonner';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const guesses = useGameStore((state) => state.guesses);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const solution = useGameStore((state) => state.solution);
  const dayIndex = useGameStore((state) => state.dayIndex);
  const stats = useGameStore((state) => state.stats);
  const isHydrated = useGameStore((state) => state.isHydrated);

  const [timeRemaining, setTimeRemaining] = useState('');

  // 1. Countdown timer to next midnight local time
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0, 0
      );
      const diffMs = nextDay.getTime() - now.getTime();
      
      const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0');
      
      setTimeRemaining(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen || !isHydrated || !solution) return null;

  // Compute stats metrics
  const winPercent = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  // Find max distribution value for scaling chart bars
  const maxDistribution = Math.max(...stats.guessesDistribution, 1);

  // 2. Share Grid Generator
  const handleShare = () => {
    try {
      const grid = guesses
        .map((guess) => {
          const statuses = getGuessStatuses(guess, solution.name);
          return statuses
            .map((status) => {
              if (status === 'correct') return '🟩';
              if (status === 'present') return '🟨';
              return '⬛';
            })
            .join('');
        })
        .join('\n');

      const attemptText = gameStatus === 'WON' ? `${guesses.length}/6` : 'X/6';
      const shareText = `Sahaba Wordle #${dayIndex + 1} ${attemptText}\n\n${grid}\n\nPlay here: https://sahaba-wordle.vercel.app`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText);
        toast.success('Results copied to clipboard!');
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (err) {
      toast.error('Could not copy results to clipboard');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-sm bg-modal-bg border border-border-cell rounded-2xl p-4 shadow-2xl overflow-hidden z-10 max-h-[90vh] overflow-y-auto transition-colors duration-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-1 rounded-lg hover:bg-border-cell text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Headline for ended games */}
          {gameStatus !== 'IN_PROGRESS' && (
            <div className="text-center mb-3.5 mt-1">
              <h2 className="text-lg font-black text-foreground tracking-tight flex items-center gap-1.5 justify-center">
                <Award className="w-5 h-5 text-correct" />
                {gameStatus === 'WON' ? 'Alhamdulillah! You Won' : 'SubhanAllah! Try Again'}
              </h2>
              <p className="text-xs text-foreground/50 mt-0.5">
                The companion of today was:
              </p>
              <div className="text-base font-extrabold text-correct tracking-wide uppercase select-all">
                {solution.fullName}
              </div>
              <div className="text-[10px] text-foreground/40 font-mono tracking-wider">
                ({solution.name})
              </div>
            </div>
          )}

          {/* Stats Header */}
          <div className="flex items-center mb-3 mt-1.5">
            <h2 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
              <Info className="w-4 h-4 text-correct" /> Statistics
            </h2>
          </div>

          {/* Stats Dashboard Grid */}
          <div className="grid grid-cols-4 gap-1.5 mb-4 text-center">
            {[
              { label: 'Played', val: stats.gamesPlayed },
              { label: 'Win %', val: `${winPercent}%` },
              { label: 'Streak', val: stats.currentStreak },
              { label: 'Max Streak', val: stats.maxStreak },
            ].map((stat, i) => (
              <div key={i} className="bg-border-cell/30 py-1.5 px-1 rounded-lg border border-border-cell/10">
                <div className="text-base font-black text-foreground">{stat.val}</div>
                <div className="text-[8px] uppercase tracking-wider text-foreground/40 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Guess Distribution */}
          <div className="mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-2 font-mono">
              Guess Distribution
            </h3>
            <div className="flex flex-col gap-1.5">
              {stats.guessesDistribution.map((count, index) => {
                const isCurrentGuessesRow = gameStatus === 'WON' && guesses.length === index + 1;
                const widthPercent = maxDistribution > 0 
                  ? Math.max(8, (count / maxDistribution) * 100) 
                  : 8;

                return (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <span className="w-3 font-bold font-mono text-foreground/50 text-right">
                      {index + 1}
                    </span>
                    <div className="flex-1 bg-border-cell/20 rounded h-4.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full flex items-center justify-end px-1.5 text-[10px] font-bold text-white rounded ${
                          isCurrentGuessesRow ? 'bg-correct font-extrabold' : 'bg-zinc-400 dark:bg-zinc-600'
                        }`}
                      >
                        {count}
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Interactive Actions */}
          <div className="flex items-center justify-between border-t border-border-cell/60 pt-3 mt-1 gap-3">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase font-bold tracking-wider text-foreground/40 font-mono">
                Next Companion In
              </span>
              <span className="text-sm font-black tracking-wider text-foreground font-mono">
                {timeRemaining}
              </span>
            </div>

            {gameStatus !== 'IN_PROGRESS' && (
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-correct hover:bg-correct/90 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-correct/10 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" /> Share Results
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
