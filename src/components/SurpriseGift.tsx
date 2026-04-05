"use client";

import { useState } from "react";
import { Gift, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    title: "Hold on!",
    subtitle: "Can you guess what kind of surprise awaits you?",
    options: [
      { id: 1, text: "A Box of Chocolates", correct: false },
      { id: 2, text: "Something New", correct: true },
      { id: 3, text: "Dinner Date", correct: false },
    ]
  },
  {
    title: "Question 2",
    subtitle: "Who is the most amazing person today?",
    options: [
      { id: 1, text: "ME 🥲", correct: false },
      { id: 2, text: "ME 😁", correct: false },
      { id: 3, text: "You! ❤️", correct: true },
    ]
  },
  {
    title: "Almost right!",
    subtitle: "Who loves you the most in the entire world?",
    options: [
      { id: 2, text: "Everyone", correct: false },
      { id: 3, text: "Me obviously 🙄", correct: true },
    ]
  },
  {
    title: "Question 4",
    subtitle: "What is your primary job for today?",
    options: [
      { id: 1, text: "Working hard", correct: false },
      { id: 2, text: "Relaxing and Celebrating 🎉", correct: true },
      { id: 3, text: "Doing chores", correct: false },
    ]
  },
  {
    title: "Question 5",
    subtitle: "How long do you think it took to plan this?",
    options: [
      { id: 1, text: "Fifty years", correct: false },
      { id: 2, text: "Two seconds", correct: false },
      { id: 3, text: "Longer than I'll admit 😉", correct: true },
    ]
  },
  {
    title: "Halfway there...",
    subtitle: "If I could give you the whole world, would I?",
    options: [
      { id: 1, text: "In a heartbeat ❤️", correct: true },
      { id: 2, text: "Probably not", correct: false },
      { id: 3, text: "Let me think about it", correct: false },
    ]
  },
  {
    title: "Question 7",
    subtitle: "Are you having a good birthday so far?",
    options: [
      { id: 1, text: "It's the best! ✨", correct: true },
      { id: 2, text: "It's okay", correct: false },
      { id: 3, text: "Not really", correct: false },
    ]
  },
  {
    title: "Question 8",
    subtitle: "Wait, one more important thing. Do you promise to love the gift?",
    options: [
      { id: 1, text: "I'll try", correct: false },
      { id: 2, text: "I promise! 🤞", correct: true },
      { id: 3, text: "No guarantees", correct: false },
    ]
  },
  {
    title: "Question 9",
    subtitle: "Okay okay... seriously. Just one more click to go.",
    options: [
      { id: 1, text: "Hurry up!", correct: true },
      { id: 2, text: "Take your time", correct: false },
      { id: 3, text: "I changed my mind", correct: false },
    ]
  },
  {
    title: "Final Check",
    subtitle: "Are you absolutely, 100% ready to finally unwrap it?",
    options: [
      { id: 1, text: "No, let me wait", correct: false },
      { id: 2, text: "YES! Show me! 🎁", correct: true },
      { id: 3, text: "Maybe tomorrow", correct: false },
    ]
  }
];

export default function SurpriseGift() {
  // 0: Initial Gift Box
  // 1: Quiz Phase
  // 2: Revealed Picture
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [wrongGuessId, setWrongGuessId] = useState<number | null>(null);

  const handleGuess = (id: number, isCorrect: boolean) => {
    if (isCorrect) {
      if (quizIndex < questions.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        setStep(2);
      }
    } else {
      setWrongGuessId(id);
      setTimeout(() => setWrongGuessId(null), 500);
    }
  };

  const currentQuestion = questions[quizIndex];

  return (
    <section id="surprise" className="w-full py-32 bg-black flex flex-col items-center px-4 relative overflow-hidden">
      {/* Background glow when fully revealed */}
      <motion.div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0"
        animate={{ opacity: step === 2 ? 1 : 0 }}
        transition={{ duration: 2 }}
      >
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#97bbf4]/10 rounded-full blur-[100px] absolute" />
      </motion.div>

      <h2 className="text-4xl md:text-5xl font-light text-[#97bbf4] drop-shadow-[0_0_15px_rgba(151,187,244,0.3)] mb-20 tracking-tight text-center z-10">
        A Secret Surprise
      </h2>
      
      <div className="z-10 relative min-h-[400px] flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {/* STEP 0: The Gift Box */}
          {step === 0 && (
            <motion.button
              key="box"
              onClick={() => setStep(1)}
              className="w-48 h-48 bg-[#97bbf4] hover:bg-[#7aaaf0] transition-all duration-300 border border-white/20 rounded-[40px] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(151,187,244,0.4)] hover:shadow-[0_0_80px_rgba(151,187,244,0.6)] group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0, scale: 0.5, y: -50, rotate: 10 }}
            >
              <Gift size={56} className="text-white drop-shadow-md mb-5" strokeWidth={1.5} />
              <span className="text-white/80 text-[10px] tracking-[0.2em] uppercase font-semibold">Tap to unwrap</span>
            </motion.button>
          )}

          {/* STEP 1: The Guessing Game */}
          {step === 1 && (
            <motion.div
              key={`quiz-${quizIndex}`} // Key ensures smooth flip between questions Document transition
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="max-w-[400px] w-full bg-[#111] border border-[#97bbf4]/15 rounded-[40px] p-8 md:p-10 flex flex-col items-center shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative"
            >
              <div className="w-12 h-12 bg-[#97bbf4]/10 rounded-full flex items-center justify-center mb-6 border border-[#97bbf4]/20">
                <Lock size={20} className="text-[#97bbf4]/70" />
              </div>
              <div className="text-[10px] text-[#97bbf4]/40 tracking-widest uppercase mb-4">
                Question {quizIndex + 1} of {questions.length}
              </div>
              <h3 className="text-2xl text-white font-light text-center mb-2 tracking-tight">{currentQuestion.title}</h3>
              <p className="text-white/50 text-center mb-8 font-light text-[15px]">
                {currentQuestion.subtitle}
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                {currentQuestion.options.map((option) => (
                  <motion.button 
                    key={option.id}
                    onClick={() => handleGuess(option.id, option.correct)} 
                    animate={wrongGuessId === option.id ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`w-full py-4 rounded-2xl font-medium text-[15px] transition-all duration-200 border ${
                      wrongGuessId === option.id 
                      ? "bg-red-500/10 border-red-500/30 text-red-500" 
                      : "bg-white/5 hover:bg-[#97bbf4]/15 hover:border-[#97bbf4]/30 hover:text-white text-white/80 border-white/5"
                    }`}
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: The Picture Reveal */}
          {step === 2 && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="max-w-[450px] w-full bg-[#111] border border-[#97bbf4]/20 rounded-[40px] p-4 flex flex-col items-center shadow-[0_0_60px_rgba(151,187,244,0.15)] relative"
            >
              <img 
                src="/images/1.jpg" 
                alt="Surprise"
                className="w-full h-auto object-cover rounded-[32px] hover:scale-[1.02] transition-transform duration-700 cursor-pointer"
              />
              <p className="absolute bottom-10 text-pink/90 text-4xl drop-shadow-xl" style={{ fontFamily: "var(--font-birthday)" }}>
                Surprise!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
