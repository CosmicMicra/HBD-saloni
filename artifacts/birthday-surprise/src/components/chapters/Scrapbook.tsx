import React from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

import BookShell, { BookPage } from './scrapbook/BookShell';
import LetterPage from './scrapbook/pages/LetterPage';
import PhotosPage from './scrapbook/pages/PhotosPage';
import MemoriesPage from './scrapbook/pages/MemoriesPage';
import RemindersPage from './scrapbook/pages/RemindersPage';
import BTSPage from './scrapbook/pages/BTSPage';
import AnimePage from './scrapbook/pages/AnimePage';
import KDramaPage from './scrapbook/pages/KDramaPage';
import MusicPage from './scrapbook/pages/MusicPage';
import BucketListPage from './scrapbook/pages/BucketListPage';
import WishesPage from './scrapbook/pages/WishesPage';
import DecorationPage from './scrapbook/pages/DecorationPage';
import CakePage from './scrapbook/pages/CakePage';

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#c084fc', '#f472b6', '#6ee7b7', '#fcd34d'],
  });
}

export default function Scrapbook({ 
  onReset,
  musicMuted,
  setMusicMuted,
  onTabChange
}: { 
  onReset?: () => void;
  musicMuted?: boolean;
  setMusicMuted?: (val: boolean) => void;
  onTabChange?: (tabId: string) => void;
}) {
  const [showFinale, setShowFinale] = React.useState(false);

  const handleMakeWish = () => {
    triggerConfetti();
    setTimeout(() => setShowFinale(true), 3000);
  };

  const handleCloseFinale = () => {
    setShowFinale(false);
    if (onReset) {
      onReset();
    }
  };

  if (showFinale) {
    return <FinaleSection onClose={handleCloseFinale} />;
  }

  const pages: BookPage[] = [
    { id: 'letter', label: 'A Letter For You', tabColor: 'bg-pink-400', Component: LetterPage },
    { id: 'photos', label: 'Photos', tabColor: 'bg-purple-400', Component: PhotosPage },
    { id: 'memories', label: 'Memories', tabColor: 'bg-blue-400', Component: MemoriesPage },
    { id: 'reminders', label: 'Things That Remind Me of You', tabColor: 'bg-rose-400', Component: RemindersPage },
    { id: 'bts', label: 'Borahae', tabColor: 'bg-indigo-500', Component: BTSPage },
    { id: 'anime', label: 'Love & Drama', tabColor: 'bg-rose-400', Component: AnimePage },
    { id: 'kdrama', label: 'Midnight Binge', tabColor: 'bg-rose-500', Component: KDramaPage },
    { id: 'music', label: 'Our Playlist', tabColor: 'bg-teal-400', Component: MusicPage },
    { id: 'bucketlist', label: 'Bucket List', tabColor: 'bg-amber-500', Component: BucketListPage },
    { id: 'wishes', label: 'Birthday Wishes', tabColor: 'bg-fuchsia-400', Component: WishesPage },
    { id: 'decoration', label: 'Decorate!', tabColor: 'bg-green-500', Component: DecorationPage },
    {
      id: 'cake',
      label: 'Make a Wish',
      tabColor: 'bg-orange-400',
      Component: () => <CakePage onMakeWish={handleMakeWish} />,
    },
  ];

  return (
    <BookShell 
      pages={pages} 
      musicMuted={musicMuted} 
      setMusicMuted={setMusicMuted} 
      onTabChange={onTabChange} 
    />
  );
}

function FinaleSection({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
    >
      <div className="absolute inset-0 grain-overlay opacity-10" />

      {/* Elegant Close (X) Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/10 hover:bg-white/25 active:bg-white/35 text-white hover:text-pink-300 p-3 rounded-full transition-all duration-300 border border-white/10 shadow-lg backdrop-blur-sm z-50 group cursor-pointer"
        title="Close & Go to First Page"
        aria-label="Close"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>

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
    </motion.div>
  );
}
