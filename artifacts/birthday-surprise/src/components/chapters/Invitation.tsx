import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { config } from '@/config/birthday.config';

interface InvitationProps {
  onOpen: () => void;
}

export default function Invitation({ onOpen }: InvitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    // After envelope opens, reveal the invitation card with a slight delay
    setTimeout(() => {
      setShowCard(true);
    }, 800);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-radial from-[#fff5f6] to-[#fcf0f5]">
      {/* Decorative Floating Sparkles in the background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 md:left-20 text-pink-300"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 right-10 md:right-20 text-purple-300"
        >
          <Sparkles className="w-8 h-8" />
        </motion.div>
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-1/4 text-purple-200"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Header text with elegant entry */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center mb-8 z-10"
      >
        <span className="text-xs font-mono tracking-widest text-primary/60 uppercase bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
          A Very Special Delivery
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground font-medium mt-4">
          For {config.name} 🌸
        </h1>
      </motion.div>

      {/* Interactive Envelope Area */}
      <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center z-20">
        <AnimatePresence mode="wait">
          {!showCard ? (
            <motion.div
              key="envelope-view"
              className="relative w-[340px] h-[240px] md:w-[380px] md:h-[270px] cursor-pointer"
              onClick={handleOpen}
              whileHover={!isOpen ? { scale: 1.02 } : {}}
              whileTap={!isOpen ? { scale: 0.98 } : {}}
              exit={{
                scale: 0.8,
                opacity: 0,
                y: 100,
                rotateX: -30,
                filter: 'blur(5px)',
                transition: { duration: 0.8, ease: 'easeInOut' },
              }}
            >
              {/* Envelope Body/Shadow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffeef1] to-[#fce4ec] rounded-2xl shadow-[0_20px_50px_rgba(255,143,171,0.15)] border border-pink-100/50 flex flex-col justify-between overflow-hidden">
                {/* Diagonal lines crossing to style standard envelope back */}
                <div className="absolute inset-0 bg-[linear-gradient(225deg,transparent_49%,rgba(255,143,171,0.05)_50%,transparent_51%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49%,rgba(255,143,171,0.05)_50%,transparent_51%)]" />
              </div>

              {/* Top Flap */}
              <motion.div
                className="absolute top-0 inset-x-0 h-1/2 origin-top"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: isOpen ? 180 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  zIndex: isOpen ? 5 : 25,
                }}
              >
                <svg
                  className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.03)]"
                  viewBox="0 0 100 50"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0,0 L 50,48 L 100,0 Z"
                    fill="url(#envelopeGradient)"
                    stroke="rgba(255, 143, 171, 0.2)"
                    strokeWidth="0.5"
                  />
                  <defs>
                    <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fff3f5" />
                      <stop offset="100%" stopColor="#fde2e8" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Side and Bottom flaps of Envelope (placed inside for overlaps) */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <svg className="w-full h-full" viewBox="0 0 100 70" preserveAspectRatio="none">
                  {/* Left Flap */}
                  <path d="M 0,0 L 48,35 L 0,70 Z" fill="#fde6eb" opacity="0.9" />
                  {/* Right Flap */}
                  <path d="M 100,0 L 52,35 L 100,70 Z" fill="#fde6eb" opacity="0.9" />
                  {/* Bottom Flap */}
                  <path d="M 0,70 L 50,32 L 100,70 Z" fill="#fbdbe3" />
                </svg>
              </div>

              {/* Clickable Wax Seal */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10px] z-30"
                animate={
                  isOpen
                    ? { scale: [1, 1.2, 0], opacity: 0 }
                    : { scale: [1, 1.05, 1] }
                }
                transition={
                  isOpen
                    ? { duration: 0.6, ease: 'easeInOut' }
                    : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <button
                  type="button"
                  aria-label="Open invitation"
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-[#9381ff] to-[#ff8fab] flex items-center justify-center shadow-[0_6px_20px_rgba(147,129,255,0.4)] border-2 border-white/40 hover:scale-105 active:scale-95 transition-transform duration-200 group relative"
                >
                  <span className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:block hidden" />
                  <Heart className="w-7 h-7 text-white fill-white animate-pulse" />
                </button>
              </motion.div>

              {/* Click Guidance text */}
              <motion.p
                className="absolute bottom-4 inset-x-0 text-center text-xs font-mono text-primary/40 tracking-wider z-30 uppercase"
                animate={{ opacity: isOpen ? 0 : [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Break the Seal
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="card-view"
              initial={{ scale: 0.6, opacity: 0, y: 150, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 15 }}
              className="relative w-[340px] md:w-[400px] bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-[0_20px_60px_rgba(255,143,171,0.2)] text-center flex flex-col items-center justify-center z-30"
            >
              {/* Card Decorative Borders */}
              <div className="absolute inset-3 border border-pink-100/60 rounded-2xl pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-purple-200/40 rounded-xl pointer-events-none" />

              {/* Sparkles icon */}
              <div className="w-12 h-12 bg-pink-100/50 rounded-full flex items-center justify-center text-[#ff8fab] mb-6">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>

              <h2 className="font-serif text-xl tracking-wider text-primary/70 uppercase mb-2">
                Save the Date
              </h2>

              <h3 className="font-serif text-3xl md:text-4xl text-primary font-semibold leading-snug mb-4">
                You Are Cordially Invited
              </h3>

              <p className="font-sans text-sm md:text-base text-muted-foreground/90 max-w-xs leading-relaxed mb-8">
                To a magical celebration of laughter, shared jokes, and the wonderful, bubbly person that is you.
              </p>

              <motion.button
                onClick={onOpen}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(147, 129, 255, 0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="relative py-3.5 px-8 bg-gradient-to-r from-[#9381ff] to-[#ff8fab] text-white font-medium rounded-full shadow-[0_8px_20px_rgba(147,129,255,0.2)] flex items-center gap-2 overflow-hidden group border border-white/20"
              >
                {/* Shine Animation */}
                <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/25 opacity-40 group-hover:animate-shine" />
                
                <span className="tracking-wide">Step Inside the Magic</span>
                <span>✨</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative credit lines conforming to minimal instructions */}
      <div className="mt-12 text-[10px] font-mono tracking-widest text-primary/30 uppercase z-10">
        Saloni's Special Keepsake • July 2026
      </div>
    </div>
  );
}
