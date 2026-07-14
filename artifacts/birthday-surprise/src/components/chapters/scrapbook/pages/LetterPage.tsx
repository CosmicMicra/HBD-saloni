import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { Heart } from 'lucide-react';

export default function LetterPage() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = config.message;
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="max-w-2xl mx-auto pt-10 flex flex-col items-center pb-20 relative">
      <motion.div 
        initial={{ y: 20, opacity: 0, rotate: -2 }}
        animate={{ y: 0, opacity: 1, rotate: -1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#fdfbf7] p-8 md:p-12 shadow-[2px_4px_16px_rgba(0,0,0,0.1)] border border-black/5 w-full"
        style={{
          backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.08) 31px, rgba(0,0,0,0.08) 32px)',
          backgroundAttachment: 'local',
          lineHeight: '32px'
        }}
      >
        {/* Tape piece top center */}
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-9 shadow-sm rotate-2 z-10" 
          style={{ 
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderImage: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent) 1'
          }} 
        />
        
        {/* Coffee stain rings */}
        <div 
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border-[4px] border-[#8b5a2b]/20 rotate-12 opacity-30 pointer-events-none" 
          style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} 
        />
        <div 
          className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border-[2px] border-[#8b5a2b]/15 rotate-45 opacity-20 pointer-events-none" 
          style={{ borderRadius: '50% 40% 30% 70% / 50% 40% 60% 50%' }} 
        />

        <div className="absolute top-10 right-10 opacity-60 text-primary">
          <Heart className="w-8 h-8 fill-primary/10 stroke-[1.5]" />
        </div>
        
        <p className="font-handwriting text-2xl md:text-3xl text-foreground/80 whitespace-pre-wrap leading-[32px] pt-4">
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1.5 h-6 bg-primary/60 ml-1 align-middle"
          />
        </p>
      </motion.div>
    </div>
  );
}
