"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NavBar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between w-full max-w-[1200px] bg-white/95 backdrop-blur-md rounded-[16px] px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        {/* Logo */}
        <div className="text-black font-semibold text-xl tracking-tight">
          HBD.
        </div>
        
        {/* Menu */}
        <div className="hidden md:flex items-center gap-10 text-[#222] font-medium text-[14px]">
          <Link href="/" className="hover:text-black/60 transition-colors">Home</Link>
          <Link href="/#gallery" className="hover:text-black/60 transition-colors">Photo Gallery</Link>
          <Link href="/music" className="hover:text-black/60 transition-colors">Music</Link>
          <Link href="/#card" className="hover:text-black/60 transition-colors">Card</Link>
          <Link href="/#surprise" className="hover:text-black/60 transition-colors">Surprise</Link>
          <Link href="/#countdown" className="hover:text-black/60 transition-colors">Countdown</Link>
        </div>

        {/* CTA */}
        
      </nav>
    </div>
  );
}
