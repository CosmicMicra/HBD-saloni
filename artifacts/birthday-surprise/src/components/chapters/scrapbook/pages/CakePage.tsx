import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CakePage({ onMakeWish }: { onMakeWish?: () => void }) {
  const totalCandles = 3;
  const [litCandles, setLitCandles] = useState<boolean[]>(Array(totalCandles).fill(true));
  const [wishMade, setWishMade] = useState(false);

  const toggleCandle = (index: number) => {
    if (!litCandles[index]) return; // Only allow blowing out
    
    const newCandles = [...litCandles];
    newCandles[index] = false;
    setLitCandles(newCandles);
  };

  useEffect(() => {
    if (litCandles.every(c => !c) && !wishMade) {
      setWishMade(true);
      setTimeout(() => {
        onMakeWish?.();
      }, 1500); // Small delay to enjoy the blown-out cake before advancing
    }
  }, [litCandles, wishMade, onMakeWish]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-primary mb-4 relative inline-block">
          Make a Wish
          <svg className="absolute -bottom-3 left-0 w-full h-3 text-secondary/40" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </h2>
        <p className="font-handwriting text-2xl md:text-3xl text-foreground/60 mt-4">
          (Tap the candles to blow them out!)
        </p>
      </motion.div>

      <div className="relative mt-8">
        {/* Hand-drawn Cake SVG */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-64 h-56 md:w-80 md:h-64"
        >
          <svg width="100%" height="100%" viewBox="0 0 240 220" className="drop-shadow-xl overflow-visible">
            {/* Cake Stand */}
            <path d="M 60 200 C 60 210 180 210 180 200" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-foreground/80" />
            <path d="M 120 180 L 120 200" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-foreground/80" />
            <path d="M 40 180 C 40 190 200 190 200 180 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className="text-foreground/80" />
            
            {/* Bottom tier */}
            <path d="M 50 180 C 50 190 190 190 190 180 L 190 110 C 190 100 50 100 50 110 Z" fill="hsl(var(--secondary)/0.5)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className="text-foreground/80" />
            
            {/* Bottom Frosting Details */}
            <path d="M 45 110 C 60 125 75 130 90 110 C 105 130 135 130 150 110 C 165 130 180 125 195 110" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/80" />
            
            {/* Top tier */}
            <path d="M 75 110 L 75 60 C 75 50 165 50 165 60 L 165 110" fill="hsl(var(--primary)/0.4)" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className="text-foreground/80" />
            
            {/* Top Frosting Details */}
            <path d="M 70 60 C 85 75 100 75 110 60 C 120 75 140 75 150 60 C 160 75 170 70 170 60" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/80" />
            
            {/* Sprinkles on top tier */}
            <line x1="90" y1="80" x2="95" y2="85" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
            <line x1="140" y1="75" x2="145" y2="70" stroke="hsl(var(--foreground)/0.4)" strokeWidth="3" strokeLinecap="round" />
            <line x1="115" y1="95" x2="110" y2="90" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinecap="round" />
            <line x1="150" y1="95" x2="155" y2="95" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
          </svg>

          {/* Interactive Candles layered on top of SVG */}
          <div 
            className="absolute flex justify-between px-2 overflow-visible"
            style={{ left: '31.25%', width: '37.5%', bottom: '72.73%', height: '40px' }}
          >
            {litCandles.map((isLit, i) => {
              // Position candles horizontally
              const leftOffset = i === 0 ? '0%' : i === 1 ? '50%' : '100%';
              return (
                <div 
                  key={i}
                  className="absolute bottom-0 cursor-pointer group"
                  style={{ left: leftOffset, transform: 'translateX(-50%)' }}
                  onClick={() => toggleCandle(i)}
                >
                  {/* Candle Body */}
                  <div className="w-3 h-10 bg-accent border-2 border-foreground/80 rounded-t-sm relative overflow-hidden">
                    {/* Stripes */}
                    <div className="w-[150%] h-[2px] bg-white/70 rotate-[30deg] absolute top-1 -left-1" />
                    <div className="w-[150%] h-[2px] bg-white/70 rotate-[30deg] absolute top-4 -left-1" />
                    <div className="w-[150%] h-[2px] bg-white/70 rotate-[30deg] absolute top-7 -left-1" />
                  </div>
                  
                  {/* Flame */}
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [1, 1.15, 0.9, 1.05, 1],
                          rotate: [0, -4, 4, -2, 0]
                        }}
                        exit={{ scale: 0, opacity: 0, y: -10 }}
                        transition={{ 
                          scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
                          rotate: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                        }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 w-4 h-6 bg-[#ffb703] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_12px_#ffb703]"
                      >
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-white/80 rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Smoke puff when blown out */}
                  <AnimatePresence>
                    {!isLit && (
                      <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 0.6, 0], y: -30, scale: 1.5 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full blur-sm"
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 text-center"
          >
            <p className="font-handwriting text-4xl md:text-5xl text-primary font-bold drop-shadow-sm -rotate-2">
              Yay! Happy Birthday! 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
