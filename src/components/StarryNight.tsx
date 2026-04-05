"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WISHES = [
  "May you always find light in the darkest of days ✨",
  "Your dreams are valid — chase every single one 🌙",
  "You are loved more than the stars in this sky 💙",
  "May this birthday mark the beginning of your best chapter 📖",
  "Every wish you make has a way of coming true 🌠",
  "The universe conspires in your favour today 🌌",
  "You are someone the world is lucky to have 💫",
  "May joy follow you wherever you go today 🎉",
  "This year belongs to you — make it extraordinary ✨",
  "You are magic. Don't ever forget that 🌟",
];

interface Star { x: number; y: number; r: number; alpha: number; speed: number; }
interface Sparkle { x: number; y: number; id: number; }

export default function StarryNight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const [wish, setWish] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const sparkleIdRef = useRef(0);

  // Setup canvas stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    starsRef.current = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: 0.003 + Math.random() * 0.01,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(star => {
        star.alpha += star.speed;
        const a = (Math.sin(star.alpha) + 1) / 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(151,187,244,${a * 0.8 + 0.1})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = sparkleIdRef.current++;

    setWish(WISHES[Math.floor(Math.random() * WISHES.length)]);
    setSparkles(prev => [...prev, { x, y, id }]);
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 900);
  }, []);

  return (
    <section
      className="relative w-full min-h-[90vh] bg-[#01010a] flex flex-col items-center justify-center overflow-hidden cursor-pointer px-6 py-24"
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Sparkle bursts */}
      {sparkles.map(s => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#97bbf4] rounded-full"
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: Math.cos((i / 8) * Math.PI * 2) * 40, y: Math.sin((i / 8) * Math.PI * 2) * 40, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      ))}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="text-white/30 text-sm mt-3">Tap anywhere to make a wish</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {wish && (
            <motion.div
              key={wish}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.5 }}
              className="max-w-[400px] bg-white/5 backdrop-blur-md border border-[#97bbf4]/20 rounded-[24px] px-8 py-6 text-center shadow-[0_0_40px_rgba(151,187,244,0.1)]"
            >
              <p className="text-white/90 text-lg font-light leading-relaxed">{wish}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
