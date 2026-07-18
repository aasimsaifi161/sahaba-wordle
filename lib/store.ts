import { create } from 'zustand';
import { Sahabi, getDailyWord, isValidWord } from './words';

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessesDistribution: number[]; // size 6
  lastCompletedDate: string | null; // YYYY-MM-DD
}

export interface GameState {
  guesses: string[];
  currentGuess: string;
  gameStatus: 'IN_PROGRESS' | 'WON' | 'LOST';
  solution: Sahabi | null;
  dayIndex: number;
  shakeRow: number | null;
  isHydrated: boolean;
  stats: UserStats;
  
  // Actions
  initGame: () => void;
  addLetter: (char: string) => void;
  deleteLetter: () => void;
  submitGuess: (onInvalid: (msg: string) => void, onWin: () => void) => void;
  setShakeRow: (row: number | null) => void;
}

const DEFAULT_STATS: UserStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessesDistribution: [0, 0, 0, 0, 0, 0],
  lastCompletedDate: null,
};

const getLocalDateString = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getYesterdayDateString = (date: Date = new Date()) => {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return getLocalDateString(yesterday);
};

export const useGameStore = create<GameState>((set, get) => ({
  guesses: [],
  currentGuess: '',
  gameStatus: 'IN_PROGRESS',
  solution: null,
  dayIndex: 0,
  shakeRow: null,
  isHydrated: false,
  stats: DEFAULT_STATS,

  initGame: () => {
    if (typeof window === 'undefined') return;

    const todayStr = getLocalDateString();
    const yesterdayStr = getYesterdayDateString();
    const { sahabi, dayIndex } = getDailyWord();

    // 1. Load Stats
    let stats: UserStats = DEFAULT_STATS;
    try {
      const savedStats = localStorage.getItem('sahaba-wordle-stats');
      if (savedStats) {
        stats = JSON.parse(savedStats);
      }
    } catch (e) {
      console.error("Failed to parse stats", e);
    }

    // Check if the streak was broken (last completed game was before yesterday and not today)
    if (
      stats.lastCompletedDate &&
      stats.lastCompletedDate !== todayStr &&
      stats.lastCompletedDate !== yesterdayStr
    ) {
      stats.currentStreak = 0;
      localStorage.setItem('sahaba-wordle-stats', JSON.stringify(stats));
    }

    // 2. Load Daily Game State
    let guesses: string[] = [];
    let gameStatus: 'IN_PROGRESS' | 'WON' | 'LOST' = 'IN_PROGRESS';

    try {
      const savedGameState = localStorage.getItem(`sahaba-wordle-state-${todayStr}`);
      if (savedGameState) {
        const parsed = JSON.parse(savedGameState);
        guesses = parsed.guesses || [];
        gameStatus = parsed.gameStatus || 'IN_PROGRESS';
      }
    } catch (e) {
      console.error("Failed to parse game state", e);
    }

    set({
      guesses,
      currentGuess: '',
      gameStatus,
      solution: sahabi,
      dayIndex,
      shakeRow: null,
      isHydrated: true,
      stats,
    });
  },

  addLetter: (char: string) => {
    const { gameStatus, currentGuess, solution } = get();
    if (gameStatus !== 'IN_PROGRESS') return;
    
    // Dynamic length matching today's target word
    const targetLength = solution ? solution.name.length : 5;
    if (currentGuess.length >= targetLength) return;
    
    const letter = char.toUpperCase();
    if (/^[A-Z]$/.test(letter)) {
      set({ currentGuess: currentGuess + letter });
    }
  },

  deleteLetter: () => {
    const { gameStatus, currentGuess } = get();
    if (gameStatus !== 'IN_PROGRESS') return;
    if (currentGuess.length === 0) return;
    set({ currentGuess: currentGuess.slice(0, -1) });
  },

  submitGuess: (onInvalid: (msg: string) => void, onWin: () => void) => {
    const { guesses, currentGuess, gameStatus, solution, stats } = get();
    if (gameStatus !== 'IN_PROGRESS' || !solution) return;

    const targetLength = solution.name.length;
    const rowIdx = guesses.length;

    // Validation: Word length
    if (currentGuess.length < targetLength) {
      set({ shakeRow: rowIdx });
      onInvalid("Not enough letters");
      return;
    }

    // Validation: Character format
    if (!isValidWord(currentGuess, targetLength)) {
      set({ shakeRow: rowIdx });
      onInvalid("Letters must be A-Z");
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    let newStatus: 'IN_PROGRESS' | 'WON' | 'LOST' = 'IN_PROGRESS';

    if (currentGuess === solution.name) {
      newStatus = 'WON';
    } else if (newGuesses.length >= 6) {
      newStatus = 'LOST';
    }

    const todayStr = getLocalDateString();
    
    // Save daily state
    localStorage.setItem(
      `sahaba-wordle-state-${todayStr}`,
      JSON.stringify({ guesses: newGuesses, gameStatus: newStatus })
    );

    // Update Stats if game ended and not already recorded for today
    let newStats = { ...stats };
    if (newStatus !== 'IN_PROGRESS' && stats.lastCompletedDate !== todayStr) {
      newStats.gamesPlayed += 1;
      newStats.lastCompletedDate = todayStr;

      if (newStatus === 'WON') {
        newStats.gamesWon += 1;
        newStats.currentStreak += 1;
        if (newStats.currentStreak > newStats.maxStreak) {
          newStats.maxStreak = newStats.currentStreak;
        }
        newStats.guessesDistribution[newGuesses.length - 1] += 1;
        onWin();
      } else {
        newStats.currentStreak = 0;
      }

      localStorage.setItem('sahaba-wordle-stats', JSON.stringify(newStats));
    }

    set({
      guesses: newGuesses,
      currentGuess: '',
      gameStatus: newStatus,
      stats: newStats,
    });
  },

  setShakeRow: (row: number | null) => set({ shakeRow: row }),
}));
