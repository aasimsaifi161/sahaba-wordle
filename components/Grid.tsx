'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGameStore } from '../lib/store';
import { getGuessStatuses, LetterStatus } from '../lib/statuses';

interface CellProps {
  letter: string;
  status: LetterStatus | 'empty' | 'active';
  index: number;
  isSubmitted: boolean;
  wordLength: number;
}

function Cell({ letter, status, index, isSubmitted, wordLength }: CellProps) {
  const controls = useAnimation();

  // Pop animation when a letter is entered (only when active and letter is not empty)
  useEffect(() => {
    if (status === 'active' && letter) {
      controls.start({
        scale: [1, 1.15, 1],
        transition: { duration: 0.12 },
      });
    }
  }, [letter, status, controls]);

  // Determine styling classes for the back face
  let backBgClass = 'bg-absent';
  if (status === 'correct') {
    backBgClass = 'bg-correct';
  } else if (status === 'present') {
    backBgClass = 'bg-present';
  }

  // Determine border and text styling for the front face
  let frontClass = 'border-border-cell text-foreground';
  if (status === 'active' && letter) {
    frontClass = 'border-border-cell-active text-foreground scale-100';
  } else if (status === 'active') {
    frontClass = 'border-border-cell text-foreground';
  }

  // Responsive font size class based on word length
  const getFontSizeClass = (len: number) => {
    if (len <= 5) return 'text-xl xs:text-2xl';
    if (len <= 7) return 'text-lg xs:text-xl';
    return 'text-sm xs:text-base';
  };

  const fontSizeClass = getFontSizeClass(wordLength);

  return (
    <div className="relative aspect-square flex-1 max-w-[56px] min-w-[28px] [perspective:1000px] select-none">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={isSubmitted ? { rotateY: 180 } : { rotateY: 0 }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.6,
          delay: index * 0.15,
        }}
      >
        {/* Front Face (unsubmitted / active / empty) */}
        <motion.div
          animate={controls}
          className={`absolute inset-0 flex items-center justify-center border-2 rounded-lg font-extrabold uppercase font-sans [backface-visibility:hidden] bg-background ${frontClass} ${fontSizeClass}`}
        >
          {letter}
        </motion.div>

        {/* Back Face (submitted result) */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-lg font-extrabold uppercase font-sans text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${backBgClass} ${fontSizeClass}`}
        >
          {letter}
        </div>
      </motion.div>
    </div>
  );
}

interface RowProps {
  guess: string;
  solution: string;
  isSubmitted: boolean;
  isActive: boolean;
  shake: boolean;
  onShakeComplete: () => void;
}

function Row({ guess, solution, isSubmitted, isActive, shake, onShakeComplete }: RowProps) {
  const rowLength = solution.length;
  const letters = guess.split('');
  const statuses = isSubmitted ? getGuessStatuses(guess, solution) : [];

  // Generate elements for the cells
  const cells = Array.from({ length: rowLength }).map((_, i) => {
    const letter = letters[i] || '';
    let status: LetterStatus | 'empty' | 'active' = 'empty';

    if (isSubmitted) {
      status = statuses[i];
    } else if (isActive) {
      status = 'active';
    }

    return (
      <Cell
        key={i}
        letter={letter}
        status={status}
        index={i}
        isSubmitted={isSubmitted}
        wordLength={rowLength}
      />
    );
  });

  return (
    <motion.div
      className="flex justify-center gap-1 xs:gap-1.5 w-full max-w-md px-4 mx-auto"
      animate={shake ? { x: [-8, 8, -6, 6, -4, 4, -2, 2, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => {
        if (shake) onShakeComplete();
      }}
    >
      {cells}
    </motion.div>
  );
}

export default function Grid() {
  const guesses = useGameStore((state) => state.guesses);
  const currentGuess = useGameStore((state) => state.currentGuess);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const solution = useGameStore((state) => state.solution);
  const shakeRow = useGameStore((state) => state.shakeRow);
  const setShakeRow = useGameStore((state) => state.setShakeRow);
  const isHydrated = useGameStore((state) => state.isHydrated);

  if (!isHydrated || !solution) {
    // Render an empty skeleton while hydration completes to avoid flashes
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="flex flex-col gap-1.5 xs:gap-2 w-full">
          {Array.from({ length: 6 }).map((_, r) => (
            <div key={r} className="flex justify-center gap-1 xs:gap-1.5 w-full max-w-md px-4 mx-auto">
              {Array.from({ length: 5 }).map((_, c) => (
                <div key={c} className="relative aspect-square flex-1 max-w-[56px] min-w-[28px] border-2 border-border-cell rounded-lg bg-background" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center py-6 xs:py-8 max-w-full overflow-hidden">
      <div className="flex flex-col gap-1.5 xs:gap-2 w-full">
        {Array.from({ length: 6 }).map((_, r) => {
          const isSubmitted = r < guesses.length;
          const isActive = r === guesses.length && gameStatus === 'IN_PROGRESS';
          
          let guessVal = '';
          if (isSubmitted) {
            guessVal = guesses[r];
          } else if (isActive) {
            guessVal = currentGuess;
          }

          return (
            <Row
              key={r}
              guess={guessVal}
              solution={solution.name}
              isSubmitted={isSubmitted}
              isActive={isActive}
              shake={shakeRow === r}
              onShakeComplete={() => setShakeRow(null)}
            />
          );
        })}
      </div>
    </div>
  );
}
