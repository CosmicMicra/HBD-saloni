import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Sparkles } from 'lucide-react';
import { config } from '../../../../config/birthday.config';

const Tape = ({ className }: { className?: string }) => (
  <div className={`absolute w-12 h-4 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm z-20 ${className}`} />
);

const Petals = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '-10vh', x: `${Math.random() * 100}%`, rotate: 0 }}
          animate={{
            y: '110vh',
            x: `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
            rotate: 720
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 12
          }}
          className="absolute top-0 w-2.5 h-3.5 md:w-3 md:h-4 bg-rose-300/40 rounded-tl-full rounded-br-full backdrop-blur-[1px] shadow-[0_0_8px_rgba(244,63,94,0.25)]"
        />
      ))}
    </div>
  )
}

const LoveSprite = ({ top, left, delay, className }: { top?: string, left?: string, delay: number, className?: string }) => (
  <motion.div
    initial={{ y: 10, opacity: 0, scale: 0.5 }}
    animate={{ y: [0, -4, 0], opacity: 1, scale: 1 }}
    transition={{ y: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay }, opacity: { delay }, scale: { delay } }}
    className={`absolute w-7 h-7 md:w-9 md:h-9 bg-rose-50/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-10 shadow-md border border-rose-200 group ${className}`}
    style={top || left ? { top, left } : {}}
  >
    <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-500 fill-rose-400 group-hover:scale-125 transition-transform" />
  </motion.div>
);

const ClickableStar = ({ top, left, delay, msg }: { top: string, left: string, delay: number, msg: string }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="absolute z-20" style={{ top, left }}>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: clicked ? 0 : 1, opacity: clicked ? 0 : 1 }}
        transition={{ delay: clicked ? 0 : delay }}
        onClick={() => setClicked(true)}
        className="text-pink-400 hover:scale-110 transition-transform animate-pulse"
      >
        <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-400 fill-rose-400/50 drop-shadow-sm" />
      </motion.button>
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-handwriting shadow-md border border-pink-200 text-pink-600 whitespace-nowrap pointer-events-none"
          >
            {msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DramaSpines = () => (
  <div className="flex flex-col items-center transform rotate-1 relative">
    {config.animeShelf.titles.map((title, i) => (
      <motion.div
        key={title}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 + i * 0.1 }}
        className={`h-8 md:h-9 w-52 md:w-60 mb-0.5 rounded-sm shadow-sm flex flex-row items-center justify-between px-2 md:px-3 border-y border-r border-rose-100 relative z-10
          ${i % 3 === 0 ? 'bg-rose-50 border-rose-200/50 text-rose-700 transform -translate-x-1.5' : ''}
          ${i % 3 === 1 ? 'bg-pink-50 border-pink-200/50 text-pink-700 transform translate-x-1' : ''}
          ${i % 3 === 2 ? 'bg-fuchsia-50 border-fuchsia-200/50 text-fuchsia-700 transform -translate-x-0.5' : ''}
        `}
      >
        <span className="font-sans font-black text-[7px] md:text-[8px] uppercase tracking-widest opacity-60">
          VOL. {i + 1}
        </span>
        <span className="font-serif font-bold text-[11px] md:text-xs tracking-wide truncate ml-2">
          {title}
        </span>
      </motion.div>
    ))}
  </div>
);

const Fortune = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-30 transform -rotate-3 hover:-rotate-1 transition-transform cursor-pointer group" onClick={() => setOpen(!open)}>
      <motion.div 
        layout
        className={`w-44 md:w-52 ${open ? 'min-h-[140px] bg-[#fffafb] p-4 border-rose-100' : 'h-24 md:h-28 bg-rose-50/80 p-0 border-rose-100'} shadow-md border flex items-center justify-center relative overflow-hidden rounded-sm`}
      >
        {!open && (
           <>
             <div className="absolute inset-0 border-2 border-dashed border-rose-200/40 m-1.5 pointer-events-none rounded-sm"></div>
             <div className="absolute w-full h-px bg-rose-200/30 top-1/2 transform -translate-y-1/2 pointer-events-none"></div>
             <div className="absolute h-full w-px bg-rose-200/30 left-1/2 transform -translate-x-1/2 pointer-events-none"></div>
             <div className="font-handwriting text-lg md:text-xl text-rose-500 drop-shadow-sm transition-transform group-hover:scale-105 flex items-center gap-1">
               <Heart className="w-4 h-4 fill-rose-300 stroke-rose-400" /> Open Love Note
             </div>
           </>
        )}
        {open && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
             className="text-center font-handwriting text-base md:text-lg text-rose-600 leading-relaxed px-1"
           >
             {config.animeShelf.fortune}
           </motion.div>
        )}
      </motion.div>
      <Tape className="-top-2 -right-3 rotate-12 w-10" />
    </div>
  )
}

export default function AnimePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-10 pb-24 flex flex-col relative min-h-[85vh]">
      <Petals />
      
      {/* Top Section: Shelf */}
      <div className="self-start md:ml-12 mb-8 md:mb-12 z-20 relative mt-4 md:mt-0">
        <DramaSpines />
        <LoveSprite className="-top-4 -right-6 md:-top-5 md:-right-7" delay={0.2} />
      </div>

      {/* Middle Section: Quotes scattered */}
      <div className="self-center flex flex-col gap-5 md:gap-7 w-full max-w-md z-20 relative mt-2 md:mt-0">
        {config.animeShelf.quotes.map((quote, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="bg-white p-4 md:p-5 shadow-sm rounded-xs border border-pink-50 relative transform hover:scale-[1.01] transition-transform"
            style={{ 
              rotate: `${(i % 2 === 0 ? -1 : 1) * ((i % 3) * 1.5 + 1)}deg`,
              marginLeft: i % 3 === 1 ? '15px' : i % 3 === 2 ? '-15px' : '0px'
            }}
          >
            <Tape className="-top-2 left-1/2 -translate-x-1/2 rotate-[-1deg]" />
            <p className="font-handwriting text-base md:text-lg text-foreground/85 leading-relaxed text-center px-2">{quote}</p>
          </motion.div>
        ))}
      </div>

      {/* Interactive Heart Bubbles */}
      <ClickableStar top="12%" left="78%" delay={0.8} msg="You make my day sparkle! ✨" />
      <ClickableStar top="40%" left="6%" delay={1.1} msg="You deserve all the love! ❤️" />
      <ClickableStar top="85%" left="82%" delay={1.4} msg="Sending warm hugs! 🤗" />

      {/* Bottom Section: Love Note Teller */}
      <div className="self-end mt-10 md:mt-12 md:mr-16 z-30 relative">
        <Fortune />
        <LoveSprite className="-bottom-3 -left-4 md:-bottom-4 md:-left-5" delay={0.5} />
      </div>
    </div>
  );
}
