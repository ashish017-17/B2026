"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CardSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="card" className="w-full py-32 bg-[#020202] flex flex-col items-center px-4">
      <h2 className="text-4xl md:text-5xl font-light text-white mb-20 tracking-tight text-center">Your Special Card</h2>
      
      <div 
        className="relative w-full max-w-[480px] h-[550px] cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        style={{ perspective: 1800 }}
      >
        <motion.div
           className="w-full h-full relative"
           animate={{ rotateY: isOpen ? -180 : 0 }}
           transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 20 }}
           style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of Card */}
          <div 
            className="absolute inset-0 w-full h-full rounded-[32px] bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex flex-col items-center justify-center p-8 text-center shadow-2xl backdrop-blur-md group-hover:border-white/20 transition-colors" 
            style={{ backfaceVisibility: "hidden" }}
          >
             <h3 className="text-6xl text-white/90 drop-shadow-lg" style={{ fontFamily: "var(--font-birthday)" }}>Open Me</h3>
             <p className="mt-8 text-white/40 text-[11px] tracking-[0.3em] uppercase">Tap to open your card</p>
          </div>
          
          {/* Back of Card (Inside) */}
          <div 
            className="absolute inset-0 w-full h-full rounded-[32px] bg-white border border-white/20 flex flex-col items-center p-12 text-center shadow-[0_0_80px_rgba(255,255,255,0.1)]" 
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
             <h3 className="text-6xl text-black/90 mb-10 mt-4 leading-tight" style={{ fontFamily: "var(--font-birthday)" }}>Happy<br/>Birthday</h3>
             <p className="text-[17px] text-black/70 font-light leading-relaxed">
               May your day be as incredibly bright, loving, and beautiful as you are. I hope this year brings you everything your heart desires, and creates memories you will cherish forever.
             </p>
             <div className="mt-auto flex flex-col items-center">
                 <p className="text-black/30 text-[10px] uppercase tracking-widest mb-1">With all my love</p>
                 <div className="w-12 h-[1px] bg-black/10"></div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
