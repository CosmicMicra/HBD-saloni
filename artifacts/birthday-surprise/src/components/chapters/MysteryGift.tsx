import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Cat, Coffee, Ghost } from 'lucide-react';

interface MysteryProps {
  onComplete: () => void;
}

export default function MysteryGift({ onComplete }: MysteryProps) {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [showJoke, setShowJoke] = useState<number | null>(null);

  const boxes = [
    { id: 1, correct: false, icon: Cat, joke: "Meow! Just kidding, it's not a cat." },
    { id: 2, correct: false, icon: Coffee, joke: "An iced americano? Close, but no." },
    { id: 3, correct: true, icon: Gift, joke: "You found it!" },
    { id: 4, correct: false, icon: Ghost, joke: "Boo! Wrong box." }
  ];

  // Shuffle on mount just to be safe, but keep it deterministic for UI simplicity
  // We'll just map them as is for now

  const handleBoxClick = (box: any) => {
    if (openedBoxes.includes(box.id)) return;

    setOpenedBoxes(prev => [...prev, box.id]);
    setShowJoke(box.id);

    if (box.correct) {
      setTimeout(onComplete, 2000);
    } else {
      setTimeout(() => setShowJoke(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-serif text-foreground mb-4 text-center">Pick a Gift Box</h2>
      <p className="text-muted-foreground mb-12 text-center">Only one of them holds the real surprise.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full px-4">
        {boxes.map((box) => (
          <div key={box.id} className="relative flex flex-col items-center">
            <motion.button
              onClick={() => handleBoxClick(box)}
              disabled={openedBoxes.includes(box.id)}
              whileHover={!openedBoxes.includes(box.id) ? { scale: 1.05, rotate: [-2, 2, -2, 0] } : {}}
              whileTap={!openedBoxes.includes(box.id) ? { scale: 0.95 } : {}}
              className={`w-32 h-32 rounded-2xl flex items-center justify-center shadow-lg transition-colors border-2
                ${openedBoxes.includes(box.id) 
                  ? (box.correct ? 'bg-primary/20 border-primary' : 'bg-muted border-border opacity-50') 
                  : 'bg-white border-primary/20 hover:border-primary/50 cursor-pointer'}`}
            >
              <AnimatePresence mode="wait">
                {!openedBoxes.includes(box.id) ? (
                  <motion.div
                    key="closed"
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <Gift className="w-12 h-12 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <box.icon className={`w-10 h-10 ${box.correct ? 'text-primary' : 'text-muted-foreground'}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {showJoke === box.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-4 w-48 text-center bg-white px-3 py-2 rounded-lg shadow border border-border text-sm z-10"
                >
                  {box.joke}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-border rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
