'use client';

import React, { useEffect, useState } from 'react';
import { HelpCircle, BarChart2, Sun, Moon, Lightbulb } from 'lucide-react';
import { useGameStore } from '../lib/store';

interface HeaderProps {
  onOpenHelp: () => void;
  onOpenHint: () => void;
  onOpenStats: () => void;
}

export default function Header({ onOpenHelp, onOpenHint, onOpenStats }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const isHydrated = useGameStore((state) => state.isHydrated);

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sahaba-wordle-theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const initialTheme = (savedTheme as 'light' | 'dark') || systemTheme;
      
      setTheme(initialTheme);
      if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('sahaba-wordle-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="w-full border-b border-border-cell py-3 px-4 bg-background/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left Side: Help and Hint Buttons */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-lg hover:bg-border-cell text-foreground/80 hover:text-foreground transition-colors duration-150"
            aria-label="How to play"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
          
          <button
            onClick={onOpenHint}
            disabled={!isHydrated}
            className="p-2 rounded-lg hover:bg-border-cell text-foreground/80 hover:text-foreground transition-colors duration-150 disabled:opacity-50"
            aria-label="Today's Hint"
          >
            <Lightbulb className="w-5 h-5 text-correct" />
          </button>
        </div>

        {/* Center: Branding */}
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold tracking-wider text-foreground select-none flex items-center gap-1 font-sans">
            SAHABA <span className="text-correct font-extrabold">WORDLE</span>
          </h1>
          <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 font-mono">
            Daily Companion Guess
          </span>
        </div>

        {/* Right Side: Stats and Theme Toggle */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onOpenStats}
            disabled={!isHydrated}
            className="p-2 rounded-lg hover:bg-border-cell text-foreground/80 hover:text-foreground transition-colors duration-150 disabled:opacity-50"
            aria-label="Statistics"
          >
            <BarChart2 className="w-5 h-5" />
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-border-cell text-foreground/80 hover:text-foreground transition-colors duration-150"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
