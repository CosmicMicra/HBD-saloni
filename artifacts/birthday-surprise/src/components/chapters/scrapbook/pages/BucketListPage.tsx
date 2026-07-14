import React from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { Plane, Map, Camera } from 'lucide-react';

export default function BucketListPage() {
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto pt-8 pb-16 px-4 md:px-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-[#fdfdfc] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden rounded-sm border border-border/20 rotate-[-1deg]"
        style={{
          backgroundImage: 'linear-gradient(transparent 95%, hsl(var(--primary)/0.08) 95%)',
          backgroundSize: '100% 3rem',
          lineHeight: '3rem'
        }}
      >
        {/* Binder holes on the left */}
        <div className="absolute top-0 left-4 h-full flex flex-col justify-evenly py-10 opacity-80 z-20">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-5 h-5 rounded-full bg-background shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-border/40" />
          ))}
        </div>

        {/* Doodle decorations */}
        <div className="absolute top-8 right-8 text-primary/30 rotate-[15deg]">
          <Plane size={40} strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-12 left-16 text-secondary/50 -rotate-[20deg]">
          <Map size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute top-1/2 right-6 text-accent/50 rotate-[10deg]">
          <Camera size={32} strokeWidth={1.5} />
        </div>

        <div className="pl-6 md:pl-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-handwriting text-4xl md:text-5xl text-foreground/80 mb-6 pb-2 inline-block -rotate-2 origin-left relative"
          >
            Someday...
            <svg className="absolute w-full h-4 -bottom-3 left-0 text-primary/40" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.h2>

          <div className="flex flex-col gap-8 mt-10 relative z-10">
            {config.bucketList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-start gap-4 md:gap-6 group"
              >
                {/* Hand-drawn looking checkbox */}
                <div className="mt-3 w-7 h-7 border-2 border-foreground/50 rounded-sm group-hover:border-primary/60 transition-colors flex shrink-0 items-center justify-center rotate-[-4deg] bg-white/50 shadow-sm" />
                
                <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                  <span className="text-3xl md:text-4xl drop-shadow-sm -rotate-6">{item.emoji}</span>
                  <span className="font-handwriting text-3xl md:text-4xl text-foreground/90 leading-tight">
                    {item.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
