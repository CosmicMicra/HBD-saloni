import React from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';

export default function RemindersPage() {
  const rotations = [-4, 6, -5, 3, -7, 4];

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto pt-8 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 relative"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-foreground/80 text-center z-10 relative">
          Things That Remind Me of You
        </h2>
        <div className="absolute -bottom-2 left-[-10%] w-[120%] h-4 bg-secondary/30 -rotate-1 -z-0" />
      </motion.div>

      <div className="flex flex-col w-full gap-10 md:gap-14">
        {config.remindersOfYou.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isEven ? -40 : 40, rotate: rotations[i % rotations.length] - 5 }}
              animate={{ opacity: 1, x: 0, rotate: rotations[i % rotations.length] }}
              transition={{ delay: i * 0.15, type: 'spring', bounce: 0.4 }}
              className={`relative w-[90%] md:w-3/4 bg-[hsl(var(--card))] p-6 md:p-8 shadow-sm border border-border/50 ${
                isEven ? 'self-start' : 'self-end'
              }`}
              whileHover={{ scale: 1.05, rotate: isEven ? -1 : 1, zIndex: 10 }}
            >
              {/* Washi Tape */}
              <div 
                className="absolute -top-3 right-8 w-24 h-7 bg-accent/30 backdrop-blur-sm mix-blend-multiply border border-accent/20 shadow-sm"
                style={{ transform: `rotate(${isEven ? 8 : -6}deg)` }}
              />
              <div 
                className="absolute -bottom-3 left-8 w-16 h-7 bg-primary/20 backdrop-blur-sm mix-blend-multiply border border-primary/10 shadow-sm"
                style={{ transform: `rotate(${isEven ? -12 : 4}deg)` }}
              />
              
              <div className="flex items-center md:items-start gap-4 md:gap-6">
                <div className="text-5xl md:text-6xl drop-shadow-sm shrink-0">
                  {item.emoji}
                </div>
                <p className="font-handwriting text-2xl md:text-4xl text-foreground/90 leading-relaxed md:leading-normal mt-1">
                  {item.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
