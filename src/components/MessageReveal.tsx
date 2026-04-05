"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MESSAGE = "You are the kind of person who makes everything around you a little more beautiful, a little more warm, and a little more worth living. Today, on your birthday, I want you to know — you are deeply loved, endlessly appreciated, and absolutely irreplaceable. Here's to another year of your magic in this world. 🌸";

export default function MessageReveal() {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      }
    );
  }, { scope: sectionRef });

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    gsap.fromTo(glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    );
  };

  const words = MESSAGE.split(" ");

  return (
    <section ref={sectionRef} className="relative w-full min-h-[90vh] bg-black flex flex-col items-center justify-center px-6 py-32 overflow-hidden">
      {/* Background glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none opacity-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#97bbf4]/10 rounded-full blur-[120px]" />
      </div>

      <div ref={containerRef} className="max-w-[720px] w-full flex flex-col items-center text-center gap-12 opacity-0">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[#97bbf4]/60 text-[11px] tracking-[0.3em] uppercase font-semibold">A message for you</span>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">Hidden Words</h2>
        </div>

        {/* Message Box */}
        <div className="relative w-full bg-[#0a0a0a] border border-white/8 rounded-[32px] p-8 md:p-12 overflow-hidden">
          {/* Blur overlay before reveal */}
          <AnimatePresence>
            {!revealed && (
              <motion.div
                key="blur"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-[32px] bg-black/60 backdrop-blur-md z-10 flex items-center justify-center"
              >
                <motion.button
                  onClick={handleReveal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#97bbf4] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-[0_0_40px_rgba(151,187,244,0.4)] hover:shadow-[0_0_60px_rgba(151,187,244,0.6)] transition-all duration-300"
                >
                  Tap to Reveal 💌
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message text */}
          <p className="text-white/80 text-lg md:text-xl font-light leading-loose text-center select-none">
            {words.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 20 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: revealed ? i * 0.04 : 0, ease: "power3.out" as never }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>

        {revealed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: words.length * 0.04 + 0.3 }}
            className="text-[#97bbf4]/60 text-sm tracking-widest uppercase"
          >
            With all my love ✨
          </motion.p>
        )}
      </div>
    </section>
  );
}
