'use client';

import React from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

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
          className="relative w-full max-w-md bg-modal-bg border border-border-cell rounded-2xl p-6 shadow-2xl overflow-hidden z-10 text-foreground transition-colors duration-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-border-cell text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-correct" /> How To Play
          </h2>

          <div className="text-sm space-y-3.5 leading-relaxed text-foreground/80">
            <p>
              Guess the <strong>Sahaba Wordle</strong> in 6 attempts. Each daily word is the transliterated name of a <strong>Sahabi or Sahabiyah</strong> (companion of the Prophet). The length of the name **varies daily** (ranging from 3 to 9 letters), and the board grid will adapt to that day's target!
            </p>
            <p>
              Each guess must be of the correct daily length. Because transliterated Arabic names have various spellings, **any letter combination is accepted** as a guess so you don't get stuck on spelling variations.
            </p>
            <p>
              The colors of the tiles will change to show how close your guess was to the name.
            </p>

            <hr className="border-border-cell my-3" />

            {/* Examples */}
            <div className="space-y-3">
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-foreground/60 font-mono">
                Examples
              </h3>

              {/* Correct Example */}
              <div className="space-y-1.5">
                <div className="flex gap-1.5">
                  <div className="w-9 h-9 border-2 border-transparent rounded-md bg-correct text-white font-extrabold flex items-center justify-center text-sm">B</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">I</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">L</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">A</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">L</div>
                </div>
                <p className="text-xs text-foreground/60">
                  The letter <strong>B</strong> is in the name and in the correct spot.
                </p>
              </div>

              {/* Present Example */}
              <div className="space-y-1.5">
                <div className="flex gap-1.5">
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">H</div>
                  <div className="w-9 h-9 border-2 border-transparent rounded-md bg-present text-white font-extrabold flex items-center justify-center text-sm">A</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">M</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">Z</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">A</div>
                </div>
                <p className="text-xs text-foreground/60">
                  The letter <strong>A</strong> is in the name but in the wrong spot.
                </p>
              </div>

              {/* Absent Example */}
              <div className="space-y-1.5">
                <div className="flex gap-1.5">
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">M</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">U</div>
                  <div className="w-9 h-9 border-2 border-transparent rounded-md bg-absent text-white font-extrabold flex items-center justify-center text-sm">S</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">A</div>
                  <div className="w-9 h-9 border-2 border-border-cell rounded-md text-foreground font-extrabold flex items-center justify-center text-sm bg-background">B</div>
                </div>
                <p className="text-xs text-foreground/60">
                  The letter <strong>S</strong> is not in the name in any spot.
                </p>
              </div>
            </div>

            <hr className="border-border-cell my-3" />

            <p className="text-xs text-foreground/50 text-center font-mono">
              A new Sahabi companion name is selected every day!
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
