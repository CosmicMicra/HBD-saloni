import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Music } from 'lucide-react';
import { config } from '@/config/birthday.config';

export interface BookPage {
  id: string;
  label: string;
  tabColor: string; // tailwind bg-* class for the side tab
  Component: React.ComponentType;
}

interface BookShellProps {
  pages: BookPage[];
  musicMuted?: boolean;
  setMusicMuted?: (val: boolean) => void;
  onTabChange?: (tabId: string) => void;
}

export default function BookShell({ 
  pages, 
  musicMuted = true, 
  setMusicMuted, 
  onTabChange 
}: BookShellProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = (next: number) => {
    if (next < 0 || next >= pages.length || next === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const current = pages[index];

  // Inform parent when tab changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange(current.id);
    }
  }, [current.id, onTabChange]);

  const variants = {
    enter: (dir: 1 | -1) => ({
      rotateY: dir === 1 ? 60 : -60,
      opacity: 0,
      x: dir === 1 ? 40 : -40,
    }),
    center: { rotateY: 0, opacity: 1, x: 0 },
    exit: (dir: 1 | -1) => ({
      rotateY: dir === 1 ? -60 : 60,
      opacity: 0,
      x: dir === 1 ? -40 : 40,
    }),
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col relative notebook-paper overflow-hidden">
      {/* Top chrome: page label + music toggle */}
      <div className="sticky top-0 z-40 w-full p-3 md:p-4 flex items-center justify-between backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="font-handwriting text-lg md:text-xl text-primary px-2 flex items-center gap-2">
          {!musicMuted && current.id !== 'music' && (
            <span className="flex gap-0.5 items-end h-3 w-4">
              <span className="w-0.75 bg-pink-500 rounded-xs animate-[bounce_0.8s_infinite_100ms]" style={{ height: '60%' }} />
              <span className="w-0.75 bg-pink-500 rounded-xs animate-[bounce_0.8s_infinite_300ms]" style={{ height: '100%' }} />
              <span className="w-0.75 bg-pink-500 rounded-xs animate-[bounce_0.8s_infinite_200ms]" style={{ height: '40%' }} />
            </span>
          )}
          {current.label}
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-border">
          {musicMuted && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[11px] md:text-xs font-handwriting text-pink-500 font-bold select-none cursor-pointer flex items-center gap-1"
              onClick={() => setMusicMuted?.(false)}
            >
              Play BGM 🎵
            </motion.span>
          )}
          <button
            onClick={() => setMusicMuted?.(!musicMuted)}
            className={`text-primary hover:scale-110 transition-transform p-1 rounded-full ${!musicMuted ? 'text-pink-500 animate-[pulse_2s_infinite]' : ''}`}
            aria-label="Toggle music"
          >
            {musicMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-pink-500" />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-stretch w-full relative">
        {/* Side tabs -- like sticky bookmarks poking out of a binder */}
        <div className="hidden md:flex flex-col gap-1.5 py-8 pl-1 z-30 shrink-0">
          {pages.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              title={p.label}
              className={`${p.tabColor} ${i === index ? 'translate-x-1 shadow-md ring-2 ring-white' : 'opacity-80 hover:opacity-100 hover:translate-x-0.5'} 
                text-white text-[10px] font-semibold tracking-wide uppercase px-2 py-2 rounded-r-md rounded-l-sm shadow transition-all writing-mode-vertical`}
              style={{ writingMode: 'vertical-rl' as any, minHeight: '64px' }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Page surface */}
        <div className="flex-1 relative overflow-hidden" style={{ perspective: '1600px' }}>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden px-4 md:px-10 pt-4 pb-28"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <current.Component />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav: prev / next + page dots, styled like a page-turn control */}
      <div className="sticky bottom-0 z-40 w-full p-4 flex items-center justify-center gap-4 backdrop-blur-md bg-background/70 border-t border-border/50">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-full bg-white border border-border shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md transition-shadow"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <div className="flex gap-1.5 items-center px-2">
          {pages.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${p.label}`}
              className={`rounded-full transition-all ${i === index ? 'w-2.5 h-2.5 bg-primary' : 'w-1.5 h-1.5 bg-primary/30 hover:bg-primary/50'}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(index + 1)}
          disabled={index === pages.length - 1}
          className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-full bg-white border border-border shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md transition-shadow"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
