"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Pre-defined star positions (avoids Math.random() hydration mismatch)
const STARS = Array.from({ length: 20 }, (_, i) => ({
  left: `${((i * 37 + 11) % 97).toFixed(2)}%`,
  top: `${((i * 53 + 7) % 91).toFixed(2)}%`,
}));

interface HeartItem {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  collected: boolean;
}

export default function HeartsGame() {
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(0);
  const frameRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);
  const nextIdRef = useRef(0);

  const spawnHeart = useCallback(() => {
    const id = nextIdRef.current++;
    setHearts(prev => [...prev, {
      id,
      x: Math.random() * 85 + 5,
      y: -10,
      size: 24 + Math.random() * 24,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.6 + Math.random() * 0.4,
      collected: false,
    }]);
  }, []);

  const tick = useCallback((timestamp: number) => {
    if (timestamp - lastSpawnRef.current > 600) {
      spawnHeart();
      lastSpawnRef.current = timestamp;
    }
    setHearts(prev =>
      prev
        .map(h => ({ ...h, y: h.y + h.speed }))
        .filter(h => h.y < 115 && !h.collected)
    );
    frameRef.current = requestAnimationFrame(tick);
  }, [spawnHeart]);

  useEffect(() => {
    if (gameActive) {
      frameRef.current = requestAnimationFrame(tick);
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer);
            setGameActive(false);
            cancelAnimationFrame(frameRef.current);
            setHearts([]);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      return () => { clearInterval(timer); cancelAnimationFrame(frameRef.current); };
    }
  }, [gameActive, tick]);

  const collectHeart = (id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id));
    setScore(prev => {
      const next = prev + 1;
      setHighScore(hs => Math.max(hs, next));
      return next;
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
    setGameActive(true);
  };

  return (
    <section className="w-full min-h-[90vh] bg-black flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-[500px] flex flex-col items-center gap-6"
      >
        <div className="text-center">
          <span className="text-[#97bbf4]/60 text-[11px] tracking-[0.3em] uppercase font-semibold">Mini Game</span>
          <h2 className="text-4xl md:text-5xl font-light text-white mt-2 tracking-tight">Catch the Hearts ❤️</h2>
          <p className="text-white/40 text-sm mt-3">Tap the falling hearts before they float away!</p>
        </div>

        {/* HUD */}
        <div className="flex gap-6 w-full justify-center">
          {[
            { label: "Score", value: score },
            { label: "Time", value: `${timeLeft}s` },
            { label: "Best", value: highScore },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center bg-[#111] border border-[#97bbf4]/15 rounded-2xl px-5 py-3 min-w-[80px]">
              <span className="text-[#97bbf4] text-2xl font-bold">{value}</span>
              <span className="text-white/30 text-[10px] tracking-widest uppercase">{label}</span>
            </div>
          ))}
        </div>

        {/* Game area */}
        <div className="relative w-full h-[400px] bg-[#0a0a0a] border border-[#97bbf4]/10 rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(151,187,244,0.05)]">
          {/* Stars background - stable positions to avoid hydration error */}
          {STARS.map((star, i) => (
            <div key={i} className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
              style={{ left: star.left, top: star.top }} />
          ))}

          {hearts.map(h => (
            <button
              key={h.id}
              onClick={() => collectHeart(h.id)}
              className="absolute transition-transform hover:scale-125 active:scale-90 touch-none"
              style={{ left: `${h.x}%`, top: `${h.y}%`, opacity: h.opacity }}
            >
              <Heart
                size={h.size}
                className="text-[#97bbf4] drop-shadow-[0_0_8px_rgba(151,187,244,0.8)]"
                fill="currentColor"
              />
            </button>
          ))}

          {!gameActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm rounded-[32px]">
              {timeLeft === 0 && score > 0 && (
                <div className="text-center mb-2">
                  <p className="text-white/60 text-sm">Game Over!</p>
                  <p className="text-[#97bbf4] text-3xl font-bold">{score} hearts caught 💙</p>
                </div>
              )}
              <motion.button
                onClick={startGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#97bbf4] text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_0_40px_rgba(151,187,244,0.4)] hover:shadow-[0_0_60px_rgba(151,187,244,0.6)] transition-all"
              >
                {timeLeft === 0 ? "Play Again 🎮" : "Start Game ❤️"}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
