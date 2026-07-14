import './_group.css';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const config = {
  nickname: 'Salo',
  finalMessage:
    'To many more years of laughing at random things, dreaming big, and making beautiful memories together.',
  music: {
    spotifyLink:
      'https://open.spotify.com/embed/track/2bJvI42r8EF3wxjOuDavnw?utm_source=generator&theme=0',
  },
};

// Extracted as-is from artifacts/birthday-surprise/src/components/chapters/Scrapbook.tsx (FinaleSection)
export function Current() {
  return (
    <div className="finale-scope min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
      >
        <div className="absolute inset-0 grain-overlay opacity-10" />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="max-w-2xl relative z-10"
        >
          <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
            {config.finalMessage}
          </h1>
          <p className="text-xl font-handwriting text-pink-300">
            Happy Birthday, {config.nickname}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="absolute bottom-8 right-8 max-w-sm rounded-xl overflow-hidden shadow-2xl border border-white/10"
        >
          <iframe
            style={{ borderRadius: '12px' }}
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
      </motion.div>
    </div>
  );
}
