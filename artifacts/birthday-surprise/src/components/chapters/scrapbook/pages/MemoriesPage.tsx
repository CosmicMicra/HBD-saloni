import React from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { Paperclip, Pin } from 'lucide-react';

export default function MemoriesPage() {
  // A muted, pastel palette for sticky notes
  const colors = [
    'bg-[#fef08a]', // Soft yellow
    'bg-[#fbcfe8]', // Soft pink
    'bg-[#bfdbfe]', // Soft blue
    'bg-[#bbf7d0]', // Soft green
  ];
  
  const rotations = [-5, 4, -7, 6, -3, 5];
  const margins = ['mt-4', 'mt-12', 'mt-2', 'mt-16'];

  return (
    <div className="max-w-5xl mx-auto pt-16 pb-24 relative min-h-[70vh]">
      <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 px-4">
        {config.memories.map((memory, i) => {
          const color = colors[i % colors.length];
          const rotate = rotations[i % rotations.length];
          const margin = margins[i % margins.length];
          const isPinned = i % 2 === 0;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotate: rotate - 15 }}
              animate={{ opacity: 1, y: 0, rotate }}
              transition={{ duration: 0.5, delay: i * 0.15, type: 'spring', stiffness: 100 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              className={`relative w-64 h-64 md:w-72 md:h-72 ${color} ${margin} p-6 flex flex-col justify-center items-center shadow-[2px_4px_10px_rgba(0,0,0,0.15)] group transition-shadow hover:shadow-[4px_8px_16px_rgba(0,0,0,0.2)]`}
              style={{
                borderBottomRightRadius: '24px 8px',
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)'
              }}
            >
              {/* Attachment detail: Pin or Paperclip */}
              {isPinned ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 drop-shadow-md z-10">
                  <Pin className="w-8 h-8 fill-red-400 stroke-red-600 -rotate-12" />
                </div>
              ) : (
                <div className="absolute -top-5 right-8 drop-shadow-sm z-10 opacity-70">
                  <Paperclip className="w-10 h-10 stroke-slate-500 rotate-[30deg]" />
                </div>
              )}
              
              <div className="text-4xl mb-4 mt-2">
                {memory.emoji}
              </div>
              
              <p className="font-handwriting text-2xl md:text-3xl text-center text-slate-800 leading-snug">
                {memory.text}
              </p>
              
              {/* Bottom right fold effect */}
              <div 
                className="absolute bottom-0 right-0 w-8 h-8 opacity-20"
                style={{
                  background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.3) 50%)',
                  borderTopLeftRadius: '100%'
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
