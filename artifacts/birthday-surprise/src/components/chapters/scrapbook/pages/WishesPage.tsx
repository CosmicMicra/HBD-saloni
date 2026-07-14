import React from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { Heart } from 'lucide-react';

export default function WishesPage() {
  const noteColors = [
    'bg-[#fffae6]', // pale yellow
    'bg-[#f0fdf4]', // pale green
    'bg-[#fdf2f8]', // pale pink
    'bg-[#f0f9ff]', // pale blue
  ];

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto pt-10 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 flex flex-col items-center relative"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-primary text-center mb-4 z-10 relative">
          Birthday Wishes for You
        </h2>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <Heart className="text-secondary fill-secondary/50 w-8 h-8 -rotate-12" />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-3xl">
        {config.wishes.map((wish, i) => {
          const rotate = [-6, 4, 8, -5][i % 4];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotate: rotate - 15 }}
              animate={{ opacity: 1, scale: 1, rotate }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              transition={{ delay: i * 0.15, type: 'spring' }}
              className={`${noteColors[i % noteColors.length]} p-6 md:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-sm relative`}
            >
              {/* Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white/70" />
              </div>
              
              <div className="flex flex-col items-center justify-center min-h-[120px]">
                <p className="font-handwriting text-3xl md:text-4xl text-foreground/80 text-center leading-relaxed">
                  {wish}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
