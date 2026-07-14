import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { config } from '@/config/birthday.config';

// Component imports
import Invitation from '@/components/chapters/Invitation';
import Verification from '@/components/chapters/Verification';
import LoadingMagic from '@/components/chapters/LoadingMagic';
import Scrapbook from '@/components/chapters/Scrapbook';
import { Toaster } from '@/components/ui/sonner';

export type Chapter = 1 | 2 | 3 | 4;

function BirthdayExperience() {
  const [currentChapter, setCurrentChapter] = useState<Chapter>(1);
  const [musicMuted, setMusicMuted] = useState(true); // Wait for first tap (browser autoplay rules)
  const [bgmActiveTab, setBgmActiveTab] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBgm = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Autoplay may still be blocked until a direct user gesture
    });
  };

  // Sync mute / scrapbook playlist tab with the audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    const shouldPlay = !musicMuted && bgmActiveTab !== 'music';
    if (shouldPlay) {
      playBgm();
    } else {
      audio.pause();
    }
  }, [musicMuted, bgmActiveTab]);

  // Resume after the first tap/click (envelope, buttons, etc.)
  useEffect(() => {
    const handleGesture = () => {
      if (musicMuted || bgmActiveTab === 'music') return;
      const audio = audioRef.current;
      if (audio?.paused) playBgm();
    };

    window.addEventListener('click', handleGesture);
    window.addEventListener('touchstart', handleGesture);
    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, [musicMuted, bgmActiveTab]);

  const nextChapter = () => {
    setCurrentChapter(prev => Math.min(prev + 1, 4) as Chapter);
  };

  const openInvitation = () => {
    setMusicMuted(false);
    playBgm();
    nextChapter();
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-background">
      <div className="grain-overlay" />

      <audio
        ref={audioRef}
        src={config.music.bgmUrl}
        loop
        preload="auto"
        playsInline
      />

      {/* Floating BGM toggle for early chapters */}
      {currentChapter !== 4 && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-white/80 hover:bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-pink-100/50 transition-all">
          {musicMuted && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[11px] md:text-xs font-handwriting text-pink-500 font-bold select-none cursor-pointer flex items-center gap-1"
              onClick={() => {
                setMusicMuted(false);
                playBgm();
              }}
            >
              Play BGM 🎵
            </motion.span>
          )}
          <button
            onClick={() => {
              const next = !musicMuted;
              setMusicMuted(next);
              if (!next) playBgm();
            }}
            className={`text-primary hover:scale-110 transition-transform p-1 rounded-full ${!musicMuted ? 'text-pink-500 animate-[pulse_2s_infinite]' : ''}`}
            aria-label="Toggle music"
          >
            {musicMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-pink-500" />}
          </button>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {currentChapter === 1 && (
          <motion.div key="chapter-1" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="absolute inset-0 flex items-center justify-center"
            transition={{ duration: 0.8, ease: "easeInOut" }}>
            <Invitation
              onOpen={openInvitation}
              onFirstInteract={() => {
                setMusicMuted(false);
                playBgm();
              }}
            />
          </motion.div>
        )}
        
        {currentChapter === 2 && (
          <motion.div key="chapter-2" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
            transition={{ duration: 0.8 }}>
            <LoadingMagic onComplete={nextChapter} />
          </motion.div>
        )}
        
        {currentChapter === 3 && (
          <motion.div key="chapter-3" 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
            transition={{ duration: 0.5 }}>
            <Verification onComplete={nextChapter} />
          </motion.div>
        )}
        
        {currentChapter === 4 && (
          <motion.div key="chapter-4" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
            transition={{ duration: 1.5, ease: "easeInOut" }}>
            <Scrapbook 
              onReset={() => setCurrentChapter(1)} 
              musicMuted={musicMuted}
              setMusicMuted={setMusicMuted}
              onTabChange={(tabId) => setBgmActiveTab(tabId)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  // Single-page experience — no client router needed (avoids blank page on static hosts)
  return (
    <>
      <BirthdayExperience />
      <Toaster />
    </>
  );
}

export default App;
