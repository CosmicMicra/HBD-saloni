import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChaseProps {
  onComplete: () => void;
}

export default function TheChase({ onComplete }: ChaseProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [attemptCount, setAttemptCount] = useState(0);
  const [surrendered, setSurrendered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const captions = [
    "Are you ready for your birthday surprise?",
    "Wait, you actually clicked no?",
    "Nice try, but you can't escape your birthday.",
    "Seriously, stop chasing it.",
    "Okay, this is getting ridiculous.",
    "Fine, I give up. Just click Yes."
  ];

  const currentCaption = captions[Math.min(attemptCount, captions.length - 1)];

  const handleNoHover = () => {
    if (surrendered) return;
    
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      // Keep it within a reasonable bound
      const maxX = containerRect.width / 2 - 60;
      const maxY = containerRect.height / 2 - 40;
      
      const newX = (Math.random() * 2 - 1) * maxX;
      const newY = (Math.random() * 2 - 1) * maxY;
      
      setNoPosition({ x: newX, y: newY });
      setNoScale(prev => Math.max(prev * 0.9, 0.4));
      
      setAttemptCount(prev => {
        const next = prev + 1;
        if (next >= 5) setSurrendered(true);
        return next;
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full max-w-2xl mx-auto flex flex-col items-center justify-center relative">
      <motion.h2 
        key={currentCaption}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-serif text-foreground text-center mb-16 h-20"
      >
        {currentCaption}
      </motion.h2>

      <div className="flex items-center justify-center gap-8 relative w-full h-64">
        <motion.button
          onClick={onComplete}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-primary text-white font-medium rounded-full shadow-lg hover:shadow-primary/30 transition-shadow text-xl"
        >
          YES!
        </motion.button>

        <motion.button
          onMouseEnter={handleNoHover}
          onClick={handleNoHover} // For touch devices
          animate={surrendered ? { x: 0, y: 0, scale: 1, opacity: 0.5 } : { x: noPosition.x, y: noPosition.y, scale: noScale }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`absolute px-8 py-3 bg-muted text-muted-foreground font-medium rounded-full shadow border border-border text-lg
            ${surrendered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ right: '20%' }}
        >
          {surrendered ? "Okay fine..." : "No"}
        </motion.button>
      </div>
    </div>
  );
}
