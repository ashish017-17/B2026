"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Play, Pause, Volume2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Pre-computed bar heights to avoid Math.random() hydration mismatch
const BAR_HEIGHTS = Array.from({ length: 40 }, (_, i) =>
  20 + Math.sin(i * 0.8) * 15 + ((i * 17 + 5) % 15)
);

export default function VoiceNote() {
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const bars = Array.from({ length: 40 });

  useGSAP(() => {
    gsap.fromTo(".voice-card",
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );
    gsap.fromTo(".voice-bar",
      { scaleY: 0 },
      { scaleY: 1, duration: 0.6, ease: "expo.out", stagger: 0.02,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );
  }, { scope: sectionRef });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
    };
    const onLoad = () => setDuration(audio.duration);
    const onEnd = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", onLoad);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", onLoad);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play(); setIsPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <section ref={sectionRef} className="w-full min-h-[70vh] bg-black flex flex-col items-center justify-center px-6 py-28">
      <audio ref={audioRef} src="/music/voice-note.mp3" />

      <div className="voice-card max-w-[520px] w-full bg-[#0a0a0a] border border-[#97bbf4]/15 rounded-[40px] p-8 md:p-10 flex flex-col gap-8 shadow-[0_0_60px_rgba(151,187,244,0.08)] opacity-0">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-14 h-14 bg-[#97bbf4] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(151,187,244,0.4)] mb-2">
            <Volume2 size={24} className="text-white" />
          </div>
          <h2 className="text-2xl text-white font-light tracking-tight">A message just for you</h2>
          <p className="text-white/40 text-sm">❤️ Press play to listen</p>
        </div>

        {/* Waveform */}
        <div className="flex items-end justify-center gap-[3px] h-14">
          {bars.map((_, i) => {
            const height = 20 + Math.sin(i * 0.8) * 15 + Math.random() * 15;
            const filled = (i / bars.length) * 100 <= progress;
            return (
              <div
                key={i}
                className={`voice-bar w-1 rounded-full transition-colors duration-300 origin-bottom ${filled ? "bg-[#97bbf4]" : "bg-white/15"}`}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2">
          <div
            className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden"
            onClick={seek}
          >
            <div
              className="h-full bg-[#97bbf4] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-white/30 text-xs font-mono">
            <span>{fmt(currentTime)}</span>
            <span>{duration ? fmt(duration) : "--:--"}</span>
          </div>
        </div>

        {/* Play button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="w-full py-4 bg-[#97bbf4] hover:bg-[#7aaaf0] text-white rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg shadow-[0_0_30px_rgba(151,187,244,0.3)] transition-all duration-300"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          {isPlaying ? "Pause" : "Play Message"}
        </motion.button>
      </div>
    </section>
  );
}