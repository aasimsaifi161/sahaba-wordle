/**
 * Evaluates the statuses of guess letters relative to the solution word.
 * Returns an array of 'correct' | 'present' | 'absent' for each letter index.
 * Matches standard Wordle duplicate letter logic.
 */
export type LetterStatus = 'correct' | 'present' | 'absent';

export function getGuessStatuses(guess: string, solution: string): LetterStatus[] {
  const solutionUpper = solution.toUpperCase();
  const guessUpper = guess.toUpperCase();
  const len = solutionUpper.length;
  
  const statuses = Array(len).fill('absent') as LetterStatus[];
  const solutionLetters = solutionUpper.split('');
  const guessLetters = guessUpper.split('');
  
  // First pass: check for exact matches (green)
  guessLetters.forEach((letter, i) => {
    if (letter === solutionLetters[i]) {
      statuses[i] = 'correct';
      solutionLetters[i] = '_'; // Mark as consumed
      guessLetters[i] = ''; // Clear so second pass ignores it
    }
  });
  
  // Second pass: check for misplaced matches (yellow)
  guessLetters.forEach((letter, i) => {
    if (letter === '') return; // Already processed in first pass
    
    const targetIdx = solutionLetters.indexOf(letter);
    if (targetIdx !== -1) {
      statuses[i] = 'present';
      solutionLetters[targetIdx] = '_'; // Mark as consumed
    }
  });
  
  return statuses;
}

/**
 * Returns a map of all letters guessed so far and their highest status.
 * This is used to color the virtual keyboard.
 * Priority: correct > present > absent.
 */
export function getKeyboardStatuses(guesses: string[], solution: string): Record<string, LetterStatus> {
  const keyboardStatuses: Record<string, LetterStatus> = {};
  
  guesses.forEach((guess) => {
    const statuses = getGuessStatuses(guess, solution);
    const guessLetters = guess.toUpperCase().split('');
    
    guessLetters.forEach((letter, i) => {
      const currentStatus = keyboardStatuses[letter];
      const newStatus = statuses[i];
      
      if (!currentStatus) {
        keyboardStatuses[letter] = newStatus;
      } else if (currentStatus === 'present' && newStatus === 'correct') {
        keyboardStatuses[letter] = 'correct';
      } else if (currentStatus === 'absent' && (newStatus === 'present' || newStatus === 'correct')) {
        keyboardStatuses[letter] = newStatus;
      }
    });
  });
  
  return keyboardStatuses;
}
