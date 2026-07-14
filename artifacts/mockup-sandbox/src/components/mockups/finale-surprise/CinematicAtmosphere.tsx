import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X, Sparkles as SparklesIcon } from 'lucide-react';
import './_group.css';

const config = {
  nickname: 'Salo',
  finalMessage:
    'To many more years of laughing at random things, dreaming big, and making beautiful memories together.',
  music: {
    spotifyLink:
      'https://open.spotify.com/embed/track/2bJvI42r8EF3wxjOuDavnw?utm_source=generator&theme=0',
  },
};

const Particles = () => {
  const stars = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 2,
    opacity: Math.random() * 0.6 + 0.2
  })), []);

  const petals = useMemo(() => Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${-10 - Math.random() * 20}%`, 
    delay: Math.random() * 15,
    duration: Math.random() * 15 + 15, 
    xEnd: `${(Math.random() - 0.5) * 60}vw`,
    rEnd: `${Math.random() * 360 + 180}deg`,
    scale: Math.random() * 0.4 + 0.3,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.05; transform: scale(0.8); }
          50% { opacity: var(--max-opacity); transform: scale(1.2); }
        }
        @keyframes float-petal {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate3d(var(--x-end), 120vh, 0) rotate(var(--r-end)); opacity: 0; }
        }
        .star { animation: twinkle var(--duration) ease-in-out infinite; animation-delay: var(--delay); }
        .petal { animation: float-petal var(--duration) linear infinite; animation-delay: var(--delay); }
      `}</style>

      {stars.map(star => (
        <div
          key={`star-${star.id}`}
          className="star absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
            '--max-opacity': star.opacity,
          } as React.CSSProperties}
        />
      ))}

      {petals.map(petal => (
        <div
          key={`petal-${petal.id}`}
          className="petal absolute"
          style={{
            left: petal.left,
            top: petal.top,
            '--duration': `${petal.duration}s`,
            '--delay': `${petal.delay}s`,
            '--x-end': petal.xEnd,
            '--r-end': petal.rEnd,
            transform: `scale(${petal.scale})`,
          } as React.CSSProperties}
        >
          <svg width="24" height="24" viewBox="0 0 30 30" fill="currentColor" className="text-pink-200/40 drop-shadow-md">
            <path d="M 15 2 C 5 2 2 12 8 20 C 12 25 15 28 15 28 C 15 28 18 25 22 20 C 28 12 25 2 15 2 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

const EntryBurst = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
        transition={{ duration: 4, ease: "easeOut", times: [0, 0.2, 1] }}
        className="absolute w-[50vw] h-[50vw] rounded-full bg-pink-400/20 blur-[120px]"
      />
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/80"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0.5, 1.2, 0.5],
            x: Math.cos(i * (Math.PI / 6)) * (150 + Math.random() * 50),
            y: Math.sin(i * (Math.PI / 6)) * (150 + Math.random() * 50),
            rotate: 180,
          }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.1 + Math.random() * 0.3 }}
        >
          <SparklesIcon className="w-5 h-5" />
        </motion.div>
      ))}
    </div>
  );
};

export function CinematicAtmosphere() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="finale-scope min-h-screen">
      <div className="fixed inset-0 z-50 bg-[#050508] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        {/* Atmosphere */}
        <div className="absolute inset-0 grain-overlay opacity-15" />
        <Particles />
        <EntryBurst />

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 2.5, ease: "easeOut" }}
          className="max-w-4xl relative z-20 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white/95 leading-[1.15] tracking-tight mb-16 drop-shadow-lg">
            {config.finalMessage}
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 2 }}
            className="flex flex-col items-center"
          >
            <p className="text-3xl md:text-5xl font-handwriting text-pink-200/90 mb-2">
              Happy Birthday, {config.nickname}
            </p>
            <div className="w-12 h-[1px] bg-pink-300/30 mt-4 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Interactive Audio Element */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!showPlayer ? (
              <motion.button
                key="pill"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ delay: 4.5, duration: 1 }}
                onClick={() => setShowPlayer(true)}
                className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md font-sans text-sm tracking-wide shadow-lg"
              >
                <Music className="w-4 h-4 text-pink-300 group-hover:scale-110 transition-transform" />
                <span>Play our song</span>
              </motion.button>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-[320px] rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 bg-black/60 backdrop-blur-xl"
              >
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 border-b border-white/5">
                  <span className="text-xs font-sans text-white/50 uppercase tracking-wider font-semibold">Our Song</span>
                  <button 
                    onClick={() => setShowPlayer(false)} 
                    className="text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <iframe
                  style={{ borderRadius: '0', display: 'block' }}
                  src={config.music.spotifyLink}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="finale-music"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
