'use client';

import React from 'react';
import { X, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../lib/store';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HintModal({ isOpen, onClose }: HintModalProps) {
  const solution = useGameStore((state) => state.solution);
  const isHydrated = useGameStore((state) => state.isHydrated);

  if (!isOpen || !isHydrated || !solution) return null;

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
          className="relative w-full max-w-sm bg-modal-bg border border-border-cell rounded-2xl p-6 shadow-2xl overflow-hidden z-10 text-foreground transition-colors duration-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-border-cell text-foreground/60 hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-correct animate-pulse" /> Today's Hint
          </h2>

          <div className="bg-correct/5 border border-correct/10 p-4 rounded-xl mb-2 text-center">
            <span className="inline-block text-[9px] font-black uppercase tracking-widest text-correct mb-1.5 font-mono">
              Companion Fact Sheet
            </span>
            <p className="text-sm text-foreground/80 dark:text-foreground/90 leading-relaxed italic">
              "{solution.fact}"
            </p>
          </div>

          <p className="text-xs text-foreground/50 text-center font-mono mt-4">
            Use this historical fact to guess the companion's transliterated name!
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
