"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";

export default function Countdown() {
  // Target: 23 September 2026
  const targetDate = new Date("2026-09-23T00:00:00");
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = differenceInSeconds(targetDate, now);
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (3600 * 24)),
          hours: Math.floor((diff % (3600 * 24)) / 3600),
          minutes: Math.floor((diff % 3600) / 60),
          seconds: Math.floor(diff % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section id="countdown" className="py-32 bg-black flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#97bbf4] drop-shadow-[0_0_15px_rgba(151,187,244,0.3)] mb-12">
        The Countdown Begins
      </h2>
      
      <div className="flex gap-4 md:gap-8 items-center justify-center font-mono">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINS", value: timeLeft.minutes },
          { label: "SECS", value: timeLeft.seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center w-20 h-24 md:w-32 md:h-36 bg-[#111] rounded-2xl border border-[#97bbf4]/20 shadow-[0_0_20px_rgba(151,187,244,0.05)] hover:shadow-[0_0_40px_rgba(151,187,244,0.2)] hover:border-[#97bbf4]/50 transition-all duration-300 cursor-default group">
            <span className="text-4xl md:text-6xl font-light text-white group-hover:text-[#97bbf4] transition-colors">{item.value.toString().padStart(2, "0")}</span>
            <span className="text-[10px] md:text-xs text-[#97bbf4]/50 group-hover:text-[#97bbf4]/90 tracking-[0.2em] mt-3 font-medium transition-colors">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
