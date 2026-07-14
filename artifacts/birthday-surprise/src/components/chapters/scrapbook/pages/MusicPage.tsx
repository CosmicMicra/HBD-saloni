import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { Music, Heart, Pause, Play } from 'lucide-react';

export default function MusicPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const song = config.music.customSong;

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      audio.volume = 0.85;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-32">
      <div className="flex flex-col items-center gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-md"
        >
          {/* Tape piece */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-7 bg-white/50 backdrop-blur-sm shadow-sm rotate-[-4deg] z-20 border border-white/30" />

          <div className="bg-[#fbf9f4] p-4 shadow-[2px_4px_12px_rgba(0,0,0,0.1)] border border-black/5 rounded-sm transform origin-top">
            <div className="mb-3 flex justify-between items-center opacity-70 px-1">
              <span className="font-handwriting text-xl text-foreground">Current obsession</span>
              <Music className="w-4 h-4 text-foreground" />
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/10 bg-gradient-to-b from-[#1a1224] to-[#0c0714] text-white shadow-inner">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={config.music.coverUrl}
                  alt="Crown of Gold cover"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0714] via-[#0c0714]/35 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-amber-200/80">
                    A custom song
                  </p>
                  <h3 className="font-serif text-2xl text-amber-50 leading-tight mt-0.5">
                    {song.title}
                  </h3>
                  <p className="text-sm text-pink-200/90 mt-1 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-pink-300/80 text-pink-300/80" />
                    {song.artistCredit}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-3 space-y-4">
                <p className="font-handwriting text-lg text-amber-50/95 leading-relaxed whitespace-pre-line">
                  {song.dedication}
                </p>

                <audio
                  ref={audioRef}
                  src={config.music.bgmUrl}
                  preload="metadata"
                  loop
                  onEnded={() => setPlaying(false)}
                  onPause={() => setPlaying(false)}
                  onPlay={() => setPlaying(true)}
                />

                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-pink-300 text-[#2a1830] font-medium py-3 shadow-[0_8px_24px_rgba(251,191,36,0.25)] hover:brightness-105 active:scale-[0.98] transition"
                >
                  {playing ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      Pause Crown of Gold
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      Play Crown of Gold
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] tracking-wide text-white/45 uppercase">
                  {song.note}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="max-w-sm text-center font-handwriting text-2xl text-foreground/55 rotate-[-1deg]"
        >
          No Spotify. No YouTube. Just this — made for you.
        </motion.p>
      </div>
    </div>
  );
}
