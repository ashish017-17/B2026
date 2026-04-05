"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Basic text entrance animation handled by Framer Motion
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative w-full h-screen min-h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        className="hero-video absolute inset-0 w-full h-full object-cover z-0"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Hero Content positioned above video without any color overlays */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center mt-12">
        <motion.h1 
          className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[1.1] font-bold text-white mix-blend-difference"
          style={{ fontFamily: "var(--font-birthday)" }}
          initial={{ y: 100, opacity: 0, rotateX: -20 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          Happy Birthday
        </motion.h1>
        
        <motion.div
           className="mt-6 text-white text-lg md:text-2xl font-light tracking-wide mix-blend-difference"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.8 }}
        >
          To the most amazing person.
        </motion.div>
      </div>
    </section>
  );
}
