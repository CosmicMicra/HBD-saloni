import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';

interface LoadingProps {
  onComplete: () => void;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

export default function LoadingMagic({ onComplete }: LoadingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = useMemo(() => [
    "Gathering stardust...",
    "Weaving dreams...",
    "Unlocking your scrapbook...",
    "Summoning birthday magic...",
    "Preparing your favorite songs...",
    "Finalizing friendship calculations..."
  ], []);

  // Generate 18 floating stardust sparkles
  const sparkles: Sparkle[] = useMemo(() => {
    const colors = ['#ff8fab', '#9381ff', '#fcd34d', '#6ee7b7', '#ffffff'];
    return Array.from({ length: 18 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100,
      y: Math.random() * 80 + 10,
      size: Math.random() * 6 + 4,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  useEffect(() => {
    // Cycle loading texts every 800ms
    const messageInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    }, 800);

    // Progress updates smoothly over 4.8 seconds
    const totalTime = 4800;
    const intervalTime = 40;
    const increment = 100 / (totalTime / intervalTime);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [messages.length, onComplete]);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-6 overflow-hidden bg-gradient-to-br from-[#0c0714] via-[#120c24] to-[#08050e]">
      
      {/* Starry Night Canvas Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Tiny twinkling background stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-40 animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}

        {/* Floating, drifting magical sparkles */}
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 0, y: '100dvh' }}
            animate={{
              opacity: [0, 0.8, 0],
              y: '-20dvh',
              x: `${sparkle.x + (Math.random() * 10 - 5)}%`,
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: 'linear',
            }}
            className="absolute"
            style={{
              left: `${sparkle.x}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
            }}
          >
            <Sparkles className="w-full h-full" style={{ color: sparkle.color }} />
          </motion.div>
        ))}
      </div>

      {/* Central Spinning Magic Star and Loading Glows */}
      <div className="relative flex flex-col items-center z-10">
        <div className="absolute -inset-10 bg-[#9381ff]/15 rounded-full blur-3xl" />
        
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="w-24 h-24 bg-gradient-to-tr from-[#9381ff] to-[#ff8fab] rounded-full flex items-center justify-center p-0.5 shadow-[0_0_40px_rgba(147,129,255,0.4)] border border-white/20 mb-12 relative"
        >
          {/* Inner ring */}
          <div className="absolute inset-1 rounded-full bg-[#120c24] flex items-center justify-center">
            <Star className="w-10 h-10 text-white fill-[#ff8fab]/20 drop-shadow-[0_0_10px_rgba(255,143,171,0.6)]" />
          </div>
        </motion.div>

        {/* Floating loading text phrase */}
        <div className="h-10 mb-6 relative w-72 flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="text-lg font-serif font-medium text-pink-100 absolute text-center select-none"
            >
              {messages[currentIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar container */}
        <div className="w-64 bg-white/5 backdrop-blur-sm p-1 rounded-full border border-white/10 shadow-inner flex items-center mb-3">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-[#9381ff] via-[#ff8fab] to-[#fcd34d] shadow-[0_0_12px_rgba(255,143,171,0.5)]"
            style={{ width: `${progress}%` }}
            layout
          />
        </div>

        {/* Percentage Counter */}
        <span className="text-xs font-mono text-[#ff8fab] tracking-widest uppercase bg-pink-950/40 px-2.5 py-0.5 rounded-full border border-pink-500/20 shadow-sm">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Decorative subtitle */}
      <div className="absolute bottom-6 font-mono text-[9px] tracking-widest text-[#9381ff]/40 uppercase select-none">
        Borahae Gateways • Dream Engine
      </div>
    </div>
  );
}
