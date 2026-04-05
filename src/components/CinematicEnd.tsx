"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicEnd() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      }
    });

    tl.fromTo(".cinematic-line",
      { opacity: 0, y: 30, letterSpacing: "0.5em" },
      { opacity: 1, y: 0, letterSpacing: "0.05em", duration: 2, ease: "power3.out", stagger: 0.6 }
    )
    .fromTo(".cinematic-heart",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
      "-=0.5"
    )
    .fromTo(".cinematic-sub",
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" },
      "-=0.3"
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] bg-black flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-[#97bbf4]/5 via-transparent to-black pointer-events-none" />

      {/* Thin horizontal line */}
      <div ref={lineRef} className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#97bbf4]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <span className="cinematic-line text-[#97bbf4]/50 text-[11px] tracking-[0.3em] uppercase font-semibold opacity-0">
          Until next year
        </span>

        <h2 className="cinematic-line text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-tight opacity-0" style={{ fontFamily: "var(--font-birthday)" }}>
          Once again…
        </h2>

        <h2 className="cinematic-line text-5xl md:text-7xl lg:text-8xl font-light text-[#97bbf4] leading-tight tracking-tight opacity-0" style={{ fontFamily: "var(--font-birthday)" }}>
          Happy Birthday
        </h2>

        <div className="cinematic-heart text-5xl opacity-0 mt-2">❤️</div>

        <p className="cinematic-sub text-white/30 text-sm md:text-base font-light tracking-widest mt-4 opacity-0">
          Made with love, just for you.
        </p>
      </div>
    </section>
  );
}
