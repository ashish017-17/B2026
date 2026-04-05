"use client";

import { Music } from "lucide-react";

export default function MusicPage() {
  const playTrack = (track: { name: string, src: string }) => {
     window.dispatchEvent(new CustomEvent('play-track', { 
       detail: { name: track.name, src: track.src }
     }));
  };

  return (
    <main className="w-full min-h-[100vh] bg-[#050505] flex flex-col items-center pt-32 px-4 pb-32 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none h-[400px]"></div>
      
      <div className="max-w-[700px] w-full flex flex-col items-center text-center relative z-10">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center mb-8 md:mb-12 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
          <Music size={40} className="text-white/60" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-[-2px]">only for you</h1>
        <p className="text-lg text-white/40 mb-16 font-light max-w-md mx-auto leading-relaxed">
          Click any track below to instantly play it through the premium audio player.
        </p>
        
        <div className="w-full bg-[#111] p-4 md:p-6 rounded-[32px] border border-white/5 flex flex-col gap-3 text-left">
          <h3 className="text-white/40 text-[11px] tracking-[0.2em] uppercase mb-2 ml-4">only for you</h3>
          {[
            { id: 1, name: "Tumse By Jubin N.", duration: "Full Track", src: "/music/tumse.mp3" },
          ].map(track => (
            <div 
               key={track.id} 
               onClick={() => playTrack(track)}
               className="flex items-center justify-between p-4 md:p-5 bg-white/[0.03] hover:bg-white-[0.06] hover:scale-[1.01] transition-all rounded-2xl cursor-pointer group"
            >
              <div className="flex items-center gap-5">
                <span className="text-white/20 font-mono text-sm group-hover:text-white/60 transition-colors">0{track.id}</span>
                <span className="text-white/90 font-medium tracking-tight text-[15px]">{track.name}</span>
              </div>
              <span className="text-white/30 text-sm font-mono">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
