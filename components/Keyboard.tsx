'use client';

import React, { useEffect } from 'react';
import { Delete } from 'lucide-react';
import { useGameStore } from '../lib/store';
import { getKeyboardStatuses } from '../lib/statuses';

interface KeyboardProps {
  onInvalid: (msg: string) => void;
  onWin: () => void;
}

export default function Keyboard({ onInvalid, onWin }: KeyboardProps) {
  const guesses = useGameStore((state) => state.guesses);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const solution = useGameStore((state) => state.solution);
  const addLetter = useGameStore((state) => state.addLetter);
  const deleteLetter = useGameStore((state) => state.deleteLetter);
  const submitGuess = useGameStore((state) => state.submitGuess);
  const isHydrated = useGameStore((state) => state.isHydrated);

  // Compute key statuses to style each key correctly
  const keyStatuses = isHydrated && solution 
    ? getKeyboardStatuses(guesses, solution.name) 
    : {};

  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const handleKeyClick = (key: string) => {
    if (gameStatus !== 'IN_PROGRESS') return;

    if (key === 'ENTER') {
      submitGuess(onInvalid, onWin);
    } else if (key === 'BACKSPACE') {
      deleteLetter();
    } else {
      addLetter(key);
    }
  };

  const getKeyBg = (key: string) => {
    if (key === 'ENTER' || key === 'BACKSPACE') {
      return 'bg-key-bg text-key-text hover:bg-zinc-300 dark:hover:bg-zinc-700 active:bg-zinc-400 dark:active:bg-zinc-600 font-bold';
    }

    const status = keyStatuses[key];
    if (status === 'correct') {
      return 'bg-correct text-white border-transparent active:opacity-90';
    }
    if (status === 'present') {
      return 'bg-present text-white border-transparent active:opacity-90';
    }
    if (status === 'absent') {
      return 'bg-absent text-white opacity-60 border-transparent';
    }

    return 'bg-key-bg text-key-text hover:bg-zinc-300 dark:hover:bg-zinc-700 active:bg-zinc-400 dark:active:bg-zinc-600 border-transparent';
  };

  return (
    <div className="w-full max-w-md mx-auto px-2 pb-6 pt-2 select-none">
      <div className="flex flex-col gap-1.5 xs:gap-2">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 xs:gap-1.5 w-full">
            {row.map((key) => {
              const isControl = key === 'ENTER' || key === 'BACKSPACE';
              
              // Handle special flex-grow or sizing
              let keyWidthClass = 'flex-1 h-14';
              if (key === 'ENTER') {
                keyWidthClass = 'px-3 xs:px-4 h-14 text-xs xs:text-sm font-extrabold flex-[1.5]';
              } else if (key === 'BACKSPACE') {
                keyWidthClass = 'px-3 xs:px-4 h-14 flex-[1.5] flex items-center justify-center';
              } else {
                keyWidthClass = 'w-8 xs:w-10 h-14 text-base xs:text-lg font-bold';
              }

              return (
                <button
                  key={key}
                  onClick={() => handleKeyClick(key)}
                  className={`${keyWidthClass} ${getKeyBg(key)} rounded-md flex items-center justify-center uppercase cursor-pointer border transition-all duration-100 active:scale-95`}
                  type="button"
                >
                  {key === 'BACKSPACE' ? (
                    <Delete className="w-5 h-5 xs:w-6 xs:h-6" />
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
