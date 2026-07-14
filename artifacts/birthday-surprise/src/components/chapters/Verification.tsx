import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Award, Heart, CheckCircle2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { config } from '@/config/birthday.config';

interface VerificationProps {
  onComplete: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  successFeedback: string;
}

export default function Verification({ onComplete }: VerificationProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnimatingNext, setIsAnimatingNext] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hasShaken, setHasShaken] = useState<number | null>(null);

  const questions: Question[] = [
    {
      id: 1,
      question: `Who is Saloni's absolute, undisputed BTS bias? (The one who owns her heart 💜)`,
      options: [
        "Jungkook (The Golden Maknae)",
        "Jimin (The Charming Prince)",
        "V (The Velvet Vocalist)",
        "Suga (The Legendary Producer)"
      ],
      correctAnswer: 0,
      successFeedback: "CORRECT! The Golden Maknae himself. Borahae! Jungkook is definitely proud! 💜✨"
    },
    {
      id: 2,
      question: "What is the only socially acceptable amount of time for us to sit in a café together?",
      options: [
        "30 minutes (just a quick coffee)",
        "1 hour (classic & polite)",
        "2 hours (a standard catchup)",
        "Until they literally start sweeping around our feet and flipping chairs onto tables"
      ],
      correctAnswer: 3,
      successFeedback: "EXACTLY! If the baristas aren't drafting a lease agreement for us, we haven't stayed long enough! ☕"
    }
  ];

  const handleOptionClick = (optionIdx: number) => {
    if (selectedAnswer !== null || isAnimatingNext) return;

    if (optionIdx === questions[currentQuestionIdx].correctAnswer) {
      setSelectedAnswer(optionIdx);
      
      // Trigger a mini stardust confetti burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#9381ff', '#ff8fab', '#ffb7b2', '#e2f0cb']
      });

      // Wait 1.5s then go to next question or end quiz
      setIsAnimatingNext(true);
      setTimeout(() => {
        if (currentQuestionIdx < questions.length - 1) {
          setCurrentQuestionIdx(prev => prev + 1);
          setSelectedAnswer(null);
          setIsAnimatingNext(false);
        } else {
          setQuizFinished(true);
        }
      }, 1800);
    } else {
      // Shakes the wrong answer button to give immediate humorous error feedback
      setHasShaken(optionIdx);
      setTimeout(() => setHasShaken(null), 500);
    }
  };

  const handleFinish = () => {
    // Big confetti burst
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#c084fc', '#f472b6', '#6ee7b7', '#fcd34d']
    });
    
    // Complete gateway
    setTimeout(onComplete, 500);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto p-4 z-20 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key={currentQuestionIdx}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/60 shadow-[0_15px_45px_rgba(147,129,255,0.12)] relative overflow-hidden"
          >
            {/* Top colorful accent bar */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#9381ff] via-[#ff8fab] to-[#fcd34d]" />

            {/* Pastel Pill Indicator */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono font-semibold tracking-wider text-[#9381ff] uppercase bg-[#9381ff]/10 px-3 py-1 rounded-full border border-[#9381ff]/20">
                Friendship Level Quiz • {currentQuestionIdx + 1} of {questions.length}
              </span>
              <div className="flex gap-1">
                <div className={`w-2.5 h-2.5 rounded-full ${currentQuestionIdx >= 0 ? 'bg-[#9381ff]' : 'bg-muted'}`} />
                <div className={`w-2.5 h-2.5 rounded-full ${currentQuestionIdx >= 1 ? 'bg-[#ff8fab]' : 'bg-muted'}`} />
              </div>
            </div>

            {/* Question Text */}
            <h2 className="font-serif text-xl md:text-2xl text-foreground font-semibold leading-snug mb-6">
              {questions[currentQuestionIdx].question}
            </h2>

            {/* Multiple Choice Options */}
            <div className="flex flex-col gap-3.5 mb-6">
              {questions[currentQuestionIdx].options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = questions[currentQuestionIdx].correctAnswer === idx;
                const isShaking = hasShaken === idx;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selectedAnswer !== null}
                    animate={isShaking ? { x: [-8, 8, -6, 6, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`w-full py-4 px-5 rounded-2xl font-medium text-left transition-all duration-200 border shadow-sm text-sm md:text-base flex items-center justify-between
                      ${isSelected
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-md ring-1 ring-emerald-300'
                        : isShaking
                        ? 'bg-rose-50 border-rose-200 text-rose-800'
                        : 'bg-white/50 hover:bg-white border-pink-100 hover:border-[#ff8fab]/40 hover:shadow-md hover:translate-y-[-1px] text-foreground/80'
                      }`}
                  >
                    <span>{option}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-2" />}
                    {isShaking && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 ml-2" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback messages */}
            <div className="h-14 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-2xl flex items-center gap-2 text-emerald-800 font-sans text-xs md:text-sm text-center"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{questions[currentQuestionIdx].successFeedback}</span>
                  </motion.div>
                )}
                {hasShaken !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-2xl flex items-center gap-2 text-rose-800 font-sans text-xs md:text-sm text-center"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Incorrect! Salo would laugh at you. Try another! 😄</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* Playful "Certificate of Best Friendship" Screen */
          <motion.div
            key="certificate"
            initial={{ opacity: 0, rotate: -2, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 80, damping: 12 }}
            className="w-full bg-[#faf6f0] border-8 border-double border-[#d4af37]/70 p-6 md:p-10 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col items-center text-center"
          >
            {/* Elegant Vintage Corner Decorations */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/40 pointer-events-none" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/40 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/40 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/40 pointer-events-none" />

            {/* Glowing Golden Badge/Ribbon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-16 h-16 bg-gradient-to-tr from-[#e5c060] via-[#ffd700] to-[#f9e7b9] rounded-full flex items-center justify-center shadow-lg border border-white/40 mb-6 relative"
            >
              <Award className="w-10 h-10 text-amber-800" />
              {/* Ribbon hanging tails */}
              <div className="absolute -bottom-4 left-3 w-4 h-8 bg-amber-500/70 transform -rotate-12 clip-ribbon border-r border-amber-600/30" />
              <div className="absolute -bottom-4 right-3 w-4 h-8 bg-amber-500/70 transform rotate-12 clip-ribbon border-l border-amber-600/30" />
            </motion.div>

            <span className="font-serif text-[#d4af37] font-semibold tracking-[0.2em] text-xs uppercase mb-3 block">
              Official Validation Complete
            </span>

            <h2 className="font-serif text-2xl md:text-3xl text-stone-800 font-bold tracking-wide mb-2 uppercase border-b-2 border-stone-200 pb-2 px-6">
              Certificate of Best Friendship
            </h2>

            <p className="font-serif italic text-stone-500 text-sm mb-6 mt-4">
              This document officially certifies that
            </p>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-handwriting text-4xl md:text-5xl text-[#ff8fab] font-bold mb-4 drop-shadow-sm"
            >
              Saloni ({config.nickname}) 💜
            </motion.h3>

            <p className="font-sans text-xs md:text-sm text-stone-600 max-w-sm leading-relaxed mb-8">
              has successfully passed the ultimate friendship verification quiz, scored 100% on bias recognition, and is legally decreed as the absolute bestest best friend in the universe.
            </p>

            {/* Tiny Signatures Row */}
            <div className="flex justify-between w-full max-w-xs border-t border-stone-200 pt-4 mb-8 text-[10px] font-mono text-stone-400 uppercase">
              <div className="flex flex-col items-center">
                <span className="font-handwriting text-stone-500 text-base italic leading-none mb-1">Your Bestie</span>
                <span>Signature</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-handwriting text-stone-500 text-base italic leading-none mb-1">ARMY 07</span>
                <span>The BTS Council</span>
              </div>
            </div>

            {/* Glowing Unlock Keepsake Button */}
            <motion.button
              onClick={handleFinish}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(147, 129, 255, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              className="py-4 px-10 bg-gradient-to-r from-[#9381ff] to-[#ff8fab] text-white font-semibold rounded-2xl shadow-[0_8px_25px_rgba(147,129,255,0.35)] hover:shadow-[0_12px_35px_rgba(147,129,255,0.45)] transition-all duration-200 border border-white/20 flex items-center gap-2 text-sm md:text-base cursor-pointer"
            >
              <span>Unlock Keepsake Book</span>
              <Heart className="w-5 h-5 fill-white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
