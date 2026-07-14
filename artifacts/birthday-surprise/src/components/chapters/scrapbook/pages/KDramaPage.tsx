import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Music, Heart } from 'lucide-react';
import { config } from '../../../../config/birthday.config';

export default function KDramaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 pb-24 flex flex-col items-center gap-10 md:gap-14 relative min-h-[85vh]">
      {config.kdramas.map((drama, i) => (
        <motion.div
          key={drama.title}
          initial={{ y: 40, opacity: 0, rotate: i % 2 === 0 ? -4 : 4 }}
          animate={{ y: 0, opacity: 1, rotate: i % 2 === 0 ? -2 : 2 }}
          transition={{ delay: i * 0.2 }}
          className="w-full max-w-[95%] md:max-w-[600px] bg-white shadow-xl flex flex-row relative hover:scale-[1.02] transition-transform duration-300"
          style={{
            maskImage: 'radial-gradient(circle at 0 50%, transparent 10px, black 11px), radial-gradient(circle at 100% 50%, transparent 10px, black 11px)',
            maskSize: '51% 100%',
            maskPosition: 'left, right',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: 'radial-gradient(circle at 0 50%, transparent 10px, black 11px), radial-gradient(circle at 100% 50%, transparent 10px, black 11px)',
            WebkitMaskSize: '51% 100%',
            WebkitMaskPosition: 'left, right',
            WebkitMaskRepeat: 'no-repeat'
          }}
        >
          {/* Main Body */}
          <div className="flex-1 p-5 md:p-6 flex flex-col justify-between border-r-2 border-dashed border-gray-300 relative bg-gradient-to-br from-white to-[#FAF9F6]">
            <div>
              <div className="text-[9px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3 font-sans font-bold flex items-center gap-1.5">
                <Ticket className="w-3 h-3 md:w-4 md:h-4 text-primary" /> K-Drama Cinema
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight mb-5 pr-2">{drama.title}</h3>
              
              <div className="space-y-4 mt-2">
                 <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-1.5 md:p-2 rounded-full shrink-0"><Music className="w-3 h-3 md:w-4 md:h-4 text-primary" /></div>
                    <div className="pt-0.5">
                       <div className="text-[8px] md:text-[9px] uppercase text-muted-foreground tracking-widest font-bold mb-0.5">Now Playing (OST)</div>
                       <div className="font-sans font-medium text-sm md:text-base text-foreground/90">{drama.ost}</div>
                    </div>
                 </div>
                 
                 <div className="flex items-start gap-3">
                    <div className="bg-secondary/30 p-1.5 md:p-2 rounded-full shrink-0"><Heart className="w-3 h-3 md:w-4 md:h-4 text-secondary-foreground" /></div>
                    <div className="pt-0.5">
                       <div className="text-[8px] md:text-[9px] uppercase text-muted-foreground tracking-widest font-bold mb-0.5">Favorite Scene</div>
                       <div className="font-handwriting text-lg md:text-xl leading-tight text-foreground/80 mt-1">{drama.scene}</div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 pt-4 border-t border-gray-100 flex justify-between text-xs font-sans text-muted-foreground">
               <div>
                 <span className="block text-[8px] md:text-[9px] uppercase tracking-widest mb-0.5 font-bold">Admission</span>
                 <span className="font-medium text-foreground text-xs md:text-sm">{config.kdramaTicket.admission}</span>
               </div>
               <div className="text-right">
                 <span className="block text-[8px] md:text-[9px] uppercase tracking-widest mb-0.5 font-bold">Seat</span>
                 <span className="font-medium text-foreground text-xs md:text-sm">{config.kdramaTicket.seat}</span>
               </div>
            </div>
          </div>

          {/* Ticket Stub */}
          <div className="w-20 md:w-28 bg-primary/5 flex flex-col items-center justify-center p-2 relative overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, var(--color-foreground) 0, var(--color-foreground) 1px, transparent 1px, transparent 10px)' }}></div>
            
            <span className="transform -rotate-90 whitespace-nowrap font-sans font-black text-xl md:text-2xl text-primary/30 tracking-[0.2em] uppercase select-none">
              ADMIT ONE
            </span>
            
            <div className="absolute bottom-6 w-full text-center">
               <span className="font-handwriting text-primary text-lg md:text-xl font-bold block transform -rotate-12 drop-shadow-sm">One more</span>
               <span className="font-handwriting text-primary text-lg md:text-xl font-bold block transform -rotate-12 drop-shadow-sm mt-0.5">episode...</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
