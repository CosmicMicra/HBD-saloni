import React from 'react';
import { motion } from 'framer-motion';
import { config } from '@/config/birthday.config';
import { Music, Disc3, Heart } from 'lucide-react';

export default function MusicPage() {
  return (
    <div className="max-w-4xl mx-auto pt-16 pb-32">
      <div className="flex flex-col items-center gap-20">
        
        {/* Cassette / YouTube Embed Container */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-2xl"
        >
          {/* Tape strips */}
          <div className="absolute -top-5 -left-8 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-[12deg] z-20 border border-white/20" />
          <div className="absolute -bottom-5 -right-8 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-[15deg] z-20 border border-white/20" />
          
          <div className="bg-[#e8e5df] p-4 md:p-6 rounded-md shadow-[4px_6px_20px_rgba(0,0,0,0.15)] border-2 border-[#d3cebc] relative overflow-hidden">
            {/* Cassette screws detailing */}
            <div className="absolute top-3 left-4 flex gap-1.5 opacity-30">
              <div className="w-2.5 h-2.5 rounded-full bg-black/60 shadow-inner" />
            </div>
            <div className="absolute top-3 right-4 flex gap-1.5 opacity-30">
              <div className="w-2.5 h-2.5 rounded-full bg-black/60 shadow-inner" />
            </div>
            <div className="absolute bottom-3 left-4 flex gap-1.5 opacity-30">
              <div className="w-2.5 h-2.5 rounded-full bg-black/60 shadow-inner" />
            </div>
            <div className="absolute bottom-3 right-4 flex gap-1.5 opacity-30">
              <div className="w-2.5 h-2.5 rounded-full bg-black/60 shadow-inner" />
            </div>

            {/* Label Area */}
            <div className="bg-[#fcfbf9] border-2 border-black/10 rounded-sm p-3 mb-5 mx-8 flex items-center justify-between">
              <Disc3 className="w-6 h-6 text-primary/60 animate-[spin_4s_linear_infinite]" />
              <div className="flex flex-col items-center">
                <span className="font-handwriting text-3xl text-foreground/80 font-bold -mt-1">
                  Salo's Mixtape
                </span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Vol. 24</span>
              </div>
              <Heart className="w-5 h-5 fill-primary/40 text-primary/60" />
            </div>

            {/* The actual video player */}
            <div className="bg-[#1a1a1a] p-3 rounded-lg shadow-inner border border-black/20 w-full">
              <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${config.music.youtubeId}?autoplay=0&controls=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            {/* Bottom trapezoid area of cassette */}
            <div className="mt-4 mx-auto w-3/4 h-8 border-t-2 border-x-2 border-black/10 rounded-t-lg bg-[#dfdbc8] shadow-inner" />
          </div>
        </motion.div>

        {/* Spotify Embed Container - smaller note taped below */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 4 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-md"
        >
          {/* Tape piece */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-7 bg-white/50 backdrop-blur-sm shadow-sm rotate-[-4deg] z-20 border border-white/30" />
          
          <div className="bg-[#fbf9f4] p-4 shadow-[2px_4px_12px_rgba(0,0,0,0.1)] border border-black/5 rounded-sm transform origin-top hover:rotate-2 transition-transform duration-300">
            <div className="mb-3 flex justify-between items-center opacity-70 px-1">
              <span className="font-handwriting text-xl text-foreground">Current obsession</span>
              <Music className="w-4 h-4 text-foreground" />
            </div>
            
            <div className="border border-black/10 p-1 bg-black/5 rounded-[14px]">
              <iframe
                style={{ borderRadius: '10px' }}
                src={config.music.spotifyLink}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
