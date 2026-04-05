"use client";

import { useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="w-full bg-black flex flex-col items-center justify-start">
        
        {/* Exact native aspect ratio image scaling - zero cropping */}
        <div className="w-full max-w-[1600px] px-2 md:px-4">
          <img 
            className="w-full h-auto object-contain rounded-[20px] md:rounded-[28px] shadow-2xl"
            src="/videos/SWARA1.jpg"
            alt="Hero Background"
            style={{ maxHeight: "95vh" }}
          />
        </div>

    </section>
  );
}
