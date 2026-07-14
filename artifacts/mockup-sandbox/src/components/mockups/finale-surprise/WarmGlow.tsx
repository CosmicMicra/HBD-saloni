import './_group.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music, X } from 'lucide-react';
import { useState } from 'react';

const config = {
  nickname: 'Salo',
  finalMessage:
    'To many more years of laughing at random things, dreaming big, and making beautiful memories together.',
  music: {
    spotifyLink:
      'https://open.spotify.com/embed/track/2bJvI42r8EF3wxjOuDavnw?utm_source=generator&theme=0',
  },
};

export function WarmGlow() {
  const [showMusic, setShowMusic] = useState(false);
  const words = config.finalMessage.split(' ');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] as const },
    },
  };

  return (
    <div className="finale-scope min-h-screen relative flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-[#05010A]">
      {/* Background Gradient & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#38114A]/50 via-[#100518] to-transparent" />
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Grain */}
      <div className="absolute inset-0 grain-overlay opacity-[0.08]" />

      <div className="max-w-4xl relative z-10 flex flex-col items-center pt-12">
        {/* Sparkle with ambient glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
          className="relative mb-14"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#9D4EDD]/20 rounded-full blur-[40px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#E0AAFF]/20 rounded-full blur-[20px]" />
          <Sparkles className="w-10 h-10 text-[#E0AAFF] relative z-10" strokeWidth={1.5} />
        </motion.div>

        {/* Staggered Word Reveal */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-5xl lg:text-[4rem] font-serif text-white/95 leading-[1.3] mb-16 max-w-3xl"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={item}
              className="inline-block mr-[0.25em] mb-[0.1em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 4.5, duration: 2, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <p className="text-3xl md:text-4xl font-handwriting text-[#E0AAFF]/90 mb-12 drop-shadow-[0_0_15px_rgba(224,170,255,0.3)]">
            Happy Birthday, {config.nickname}
          </p>

          {/* Music Expander */}
          <div className="h-44 flex items-start justify-center relative">
            <AnimatePresence mode="wait">
              {!showMusic ? (
                <motion.button
                  key="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                  transition={{ delay: showMusic ? 0 : 5.5, duration: 1 }}
                  onClick={() => setShowMusic(true)}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#3C096C]/20 border border-[#7B2CBF]/30 text-[#E0AAFF]/80 hover:text-[#E0AAFF] hover:bg-[#3C096C]/40 hover:border-[#7B2CBF]/50 hover:shadow-[0_0_30px_-5px_rgba(123,44,191,0.4)] transition-all duration-500 backdrop-blur-md"
                >
                  <Music className="w-4 h-4 group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-xs font-sans font-medium tracking-[0.2em] uppercase">Play our song</span>
                </motion.button>
              ) : (
                <motion.div
                  key="player"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.3 }}
                  className="relative max-w-sm w-[320px] rounded-[18px] p-1.5 shadow-[0_10px_40px_-10px_rgba(60,9,108,0.5)] border border-[#7B2CBF]/30 bg-black/40 backdrop-blur-xl"
                >
                  <div className="absolute -top-3 -right-3 z-20">
                    <button 
                      onClick={() => setShowMusic(false)}
                      className="p-1.5 bg-[#1A0B2E] hover:bg-[#2D114A] rounded-full text-[#E0AAFF]/70 hover:text-[#E0AAFF] transition-colors border border-[#7B2CBF]/30 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative z-10 rounded-[12px] overflow-hidden bg-black">
                    <iframe
                      src={config.music.spotifyLink}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title="finale-music"
                      className="block"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
