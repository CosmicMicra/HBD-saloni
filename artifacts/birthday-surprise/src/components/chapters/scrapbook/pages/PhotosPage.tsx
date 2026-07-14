import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { X } from 'lucide-react';

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Pre-calculated randomish rotations and positions so they don't jump around on re-renders
  const transforms = [
    { rotate: -6, x: -15, y: 10, zIndex: 1 },
    { rotate: 5, x: 20, y: -5, zIndex: 2 },
    { rotate: -3, x: -10, y: 25, zIndex: 3 },
    { rotate: 7, x: 15, y: 5, zIndex: 4 },
    { rotate: -8, x: -5, y: 15, zIndex: 1 },
  ];

  return (
    <div className="max-w-5xl mx-auto pt-16 pb-24">
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 px-4">
        {config.photos.map((photo, i) => {
          const t = transforms[i % transforms.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, rotate: t.rotate - 10 }}
              animate={{ opacity: 1, scale: 1, rotate: t.rotate, x: t.x, y: t.y }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative cursor-pointer group"
              style={{ zIndex: t.zIndex }}
              onClick={() => setSelectedPhoto(i)}
              whileHover={{ scale: 1.05, rotate: t.rotate > 0 ? t.rotate + 2 : t.rotate - 2, zIndex: 50, transition: { duration: 0.2 } }}
            >
              {/* Tape Piece */}
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-7 z-20"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(2px)',
                  transform: `rotate(${i % 2 === 0 ? '-4deg' : '3deg'})`,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              />
              
              <div className="bg-white p-3 pb-12 shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/5 w-64 md:w-72">
                <div className="aspect-square w-full overflow-hidden bg-gray-100 mb-4 border border-black/5">
                  <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" />
                </div>
                <p className="font-handwriting text-2xl text-center text-foreground/80 leading-tight">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-black/20 p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-4 pb-14 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 overflow-hidden min-h-0 bg-gray-50 flex items-center justify-center border border-black/5">
                <img 
                  src={config.photos[selectedPhoto].src} 
                  alt={config.photos[selectedPhoto].caption}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-handwriting text-3xl md:text-4xl text-center text-foreground/90 mt-6 shrink-0">
                {config.photos[selectedPhoto].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
