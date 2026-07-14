import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart, Star } from 'lucide-react';
import { config } from '../../../../config/birthday.config';

const Tape = ({ className }: { className?: string }) => (
  <div className={`absolute w-12 h-4 bg-white/40 backdrop-blur-md border border-white/20 shadow-sm z-20 ${className}`} />
);

const PassportStamp = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ delay: 0.3 }}
    className="w-32 h-32 border-[3px] border-dashed border-primary/50 rounded-full flex items-center justify-center transform -rotate-[15deg] pointer-events-none"
  >
    <div className="w-28 h-28 border-[2px] border-primary/40 rounded-full flex flex-col items-center justify-center">
      <span className="font-sans font-black text-primary/60 text-2xl tracking-[0.2em] uppercase">ARMY</span>
      <span className="font-sans font-bold text-primary/60 text-[10px] tracking-widest border-t border-primary/40 pt-1 mt-1">EST. 2013</span>
    </div>
  </motion.div>
);

const AlbumShelf = () => (
  <motion.div 
    initial={{ x: 30, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.4 }}
    className="flex flex-col items-center transform rotate-3"
  >
    <div className="w-24 h-5 bg-primary/70 rounded-sm shadow-sm border border-black/10 transform -skew-x-12 mb-0.5 flex items-center justify-end px-2">
      <span className="text-[6px] font-sans font-bold text-white tracking-wider">LOVE YOURSELF</span>
    </div>
    <div className="w-24 h-6 bg-secondary/80 rounded-sm shadow-sm border border-black/10 transform -skew-x-12 mb-0.5 flex items-center justify-end px-2">
      <span className="text-[7px] font-sans font-bold text-gray-700 tracking-wider">MAP OF THE SOUL</span>
    </div>
    <div className="w-24 h-5 bg-accent/80 rounded-sm shadow-sm border border-black/10 transform -skew-x-12 flex items-center justify-end px-2">
      <span className="text-[6px] font-sans font-bold text-gray-700 tracking-wider">PROOF</span>
    </div>
  </motion.div>
);

const ArmyBomb = () => (
  <motion.div 
    initial={{ rotate: -20, opacity: 0 }}
    animate={{ rotate: -10, opacity: 1 }}
    transition={{ delay: 0.9 }}
    className="relative flex flex-col items-center transform scale-90 md:scale-100"
  >
    <div className="w-12 h-12 rounded-full bg-white border-[3px] border-gray-300 relative shadow-[0_0_15px_rgba(255,255,255,1)] flex items-center justify-center z-10">
      <div className="w-10 h-10 rounded-full border border-gray-200 absolute"></div>
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm"></div>
    </div>
    <div className="w-4 h-14 bg-gray-800 rounded-b-md relative -mt-2 shadow-md border-r-2 border-gray-700 z-0"></div>
    <div className="absolute top-[60%] text-[8px] font-sans font-bold text-white tracking-widest transform -rotate-90 z-10">BTS</div>
  </motion.div>
);

const Cassette = () => (
  <motion.div 
    initial={{ rotate: 30, opacity: 0, scale: 0.8 }}
    animate={{ rotate: 15, opacity: 1, scale: 1 }}
    transition={{ delay: 1 }}
    className="w-28 h-16 bg-[#f8f9fa] rounded-lg shadow-md border-2 border-gray-200 p-1 flex flex-col relative transform scale-90 md:scale-100"
  >
    <div className="w-full flex-1 bg-primary/20 rounded border border-primary/30 flex flex-col items-center p-1">
      <div className="w-3/4 bg-white/70 h-2.5 rounded text-[6px] text-center font-bold text-primary mb-1 flex items-center justify-center tracking-widest">MIXTAPE</div>
      <div className="flex justify-between w-full px-3 mt-0.5">
        <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white"></div></div>
        <div className="w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-white"></div></div>
      </div>
    </div>
  </motion.div>
);

export default function BTSPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 pb-24 flex flex-col items-center relative min-h-[85vh]">
      
      {/* Boarding Pass */}
      <motion.div 
        initial={{ rotate: -5, x: -20, opacity: 0 }}
        animate={{ rotate: -2, x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-sm md:max-w-md bg-white shadow-xl rounded-xl flex overflow-hidden border border-border transform z-10 self-start md:ml-8"
      >
        {/* Main body */}
        <div className="flex-1 p-4 md:p-5 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase mb-1">Boarding Pass</div>
          <div className="text-xl md:text-2xl font-serif font-bold text-primary tracking-wide">{config.bts.boardingPass.destination}</div>
          <div className="flex justify-between mt-5 text-sm font-sans">
             <div><span className="block text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Flight</span><span className="font-medium text-foreground">{config.bts.boardingPass.flight}</span></div>
             <div><span className="block text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Gate</span><span className="font-medium text-foreground">{config.bts.boardingPass.gate}</span></div>
             <div><span className="block text-[9px] text-muted-foreground uppercase tracking-widest font-bold mb-0.5">Seat</span><span className="font-medium text-foreground">{config.bts.boardingPass.seat}</span></div>
          </div>
        </div>
        {/* Stub */}
        <div className="w-16 md:w-20 border-l-2 border-dashed border-primary/30 p-2 flex flex-col justify-center items-center bg-primary/5 relative overflow-hidden">
          <Plane className="text-primary w-5 h-5 md:w-6 md:h-6 rotate-45 mb-2" />
          <span className="text-[9px] md:text-[10px] font-bold text-primary transform -rotate-90 origin-center whitespace-nowrap mt-6 tracking-widest">ONE WAY</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[hsl(var(--background))] rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[hsl(var(--background))] rounded-full" />
        </div>
      </motion.div>

      {/* Album shelf + Passport stamp */}
      <div className="flex w-full justify-between items-center mt-6 px-2 md:px-12 z-0">
        <PassportStamp />
        <AlbumShelf />
      </div>

      {/* Photocards + Sticky Notes Area */}
      <div className="flex flex-col md:flex-row w-full mt-8 md:mt-2 gap-10 md:gap-16 justify-center items-center z-20">
        
        {/* Sticky Notes */}
        <div className="flex flex-col gap-3 transform rotate-[-4deg] self-start md:self-center ml-4 md:ml-0">
          {config.bts.songs.map((song, i) => (
            <motion.div
              key={song}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="w-40 md:w-48 p-3 md:p-4 bg-primary/20 shadow-md rounded-br-2xl relative"
              style={{ rotate: `${(i % 2 === 0 ? 1 : -1) * (i * 1.5 + 2)}deg`, marginLeft: `${i * 8}px` }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/10 rounded-full blur-sm" />
              <Tape className="-top-2 left-1/2 -translate-x-1/2 rotate-0 w-10" />
              <div className="font-handwriting text-lg md:text-xl text-foreground/90 font-medium text-center">{song}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Photocards */}
        <div className="relative w-64 h-72 md:w-72 md:h-80 self-end md:self-center mr-4 md:mr-0 mt-8 md:mt-0">
          {/* PC 1 (Jimin) */}
          <motion.div
            initial={{ rotate: -10, y: 30, opacity: 0 }}
            animate={{ rotate: -6, y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-0 left-0 w-40 h-56 md:w-44 md:h-64 bg-white p-2 md:p-2.5 shadow-lg rounded-sm border border-border/50"
          >
            <Tape className="-top-2 -left-4 -rotate-12" />
            <div className="w-full h-[82%] bg-primary/10 flex items-center justify-center relative overflow-hidden border border-primary/10 group">
              <img 
                src="/jimin_yet_to_come.jpg" 
                alt="Jimin" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white/60 backdrop-blur-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="text-pink-500 fill-pink-500 w-4 h-4" />
              </div>
            </div>
            <div className="h-[18%] w-full flex items-center justify-center pt-1 relative">
               <span className="font-handwriting text-2xl text-foreground font-bold tracking-wide">Jimin</span>
               <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-primary/50" />
            </div>
          </motion.div>
          
          {/* PC 2 (Jungkook) */}
          <motion.div
            initial={{ rotate: 15, y: 30, opacity: 0 }}
            animate={{ rotate: 8, y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute top-12 right-0 md:-right-4 w-44 h-60 md:w-48 md:h-64 bg-white p-2 md:p-2.5 shadow-xl rounded-sm border border-border/50 z-10"
          >
            <Tape className="-top-3 right-8 rotate-6 w-14" />
            <div className="w-full h-[82%] bg-secondary/30 flex items-center justify-center relative overflow-hidden border border-secondary/20 group">
              <img 
                src="/jungkook_yet_to_come.jpg" 
                alt="Jungkook" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-white/60 backdrop-blur-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Star className="text-amber-500 fill-amber-500 w-4 h-4" />
              </div>
            </div>
            <div className="h-[18%] w-full flex items-center justify-center pt-1 relative">
               <span className="font-handwriting text-2xl text-foreground font-bold tracking-wide">{config.bts.bias}</span>
               <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-secondary/50" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Elements: Ticket, Cassette & ARMY Bomb */}
      <div className="flex w-full mt-16 justify-between items-end px-4 z-30 relative">
        <ArmyBomb />
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-48 md:w-60 h-20 md:h-24 bg-[#1a1a1a] text-white flex shadow-2xl transform -rotate-6 md:-rotate-12 translate-y-4 md:translate-y-0 relative z-20"
        >
          <div className="flex-1 p-2 md:p-3 flex flex-col justify-between border-r-2 border-dashed border-white/20">
            <div className="text-[7px] md:text-[9px] text-primary tracking-[0.2em] uppercase">World Tour</div>
            <div className="font-sans font-bold text-sm md:text-base leading-tight tracking-tight uppercase">Permission to Dance</div>
            <div className="text-[9px] md:text-[10px] text-white/50 tracking-wider">VIP STANDING</div>
          </div>
          <div className="w-12 md:w-16 flex items-center justify-center bg-primary">
            <span className="transform rotate-90 font-bold tracking-widest text-[10px] md:text-xs">ADMIT</span>
          </div>
        </motion.div>

        <Cassette />
      </div>

    </div>
  );
}
