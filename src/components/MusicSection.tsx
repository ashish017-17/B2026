"use client";

import { Music } from "lucide-react";

export default function MusicSection() {
  const playTrack = (track: { name: string, src: string }) => {
     window.dispatchEvent(new CustomEvent('play-track', { 
       detail: { name: track.name, src: track.src }
     }));
  };

  return (
    <section id="music" className="w-full bg-black flex flex-col items-center py-32 px-4 text-white relative overflow-hidden">
      {/* Subtle blue themed background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#97bbf4]/10 to-transparent pointer-events-none h-[500px]"></div>
      
      <div className="max-w-[700px] w-full flex flex-col items-center text-center relative z-10">
        <div className="w-24 h-24 md:w-32 md:h-32 bg-[#97bbf4] rounded-full flex items-center justify-center mb-8 md:mb-12 shadow-[0_0_60px_rgba(151,187,244,0.3)] hover:shadow-[0_0_80px_rgba(151,187,244,0.5)] transition-all duration-500 cursor-pointer">
          <Music size={40} className="text-white drop-shadow-md" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-[-2px]">Your Playlist 🎵</h2>

        <div className="w-full bg-[#97bbf4] p-4 md:p-6 rounded-[32px] border border-white/20 flex flex-col gap-3 text-left shadow-[0_0_50px_rgba(151,187,244,0.3)]">
          {[
            { id: 1,  name: "Tumse",           artist: "Jubin Nautiyal",    src: "/music/tumse.mp3" },
            { id: 2,  name: "Song 2",           artist: "Artist",           src: "/music/song2.mp3" },
            { id: 3,  name: "Song 3",           artist: "Artist",           src: "/music/song3.mp3" },
            { id: 4,  name: "Song 4",           artist: "Artist",           src: "/music/song4.mp3" },
            { id: 5,  name: "Song 5",           artist: "Artist",           src: "/music/song5.mp3" },
            { id: 6,  name: "Song 6",           artist: "Artist",           src: "/music/song6.mp3" },
            { id: 7,  name: "Song 7",           artist: "Artist",           src: "/music/song7.mp3" },
            { id: 8,  name: "Song 8",           artist: "Artist",           src: "/music/song8.mp3" },
            { id: 9,  name: "Song 9",           artist: "Artist",           src: "/music/song9.mp3" },
            { id: 10, name: "Song 10",          artist: "Artist",           src: "/music/song10.mp3" },
          ].map(track => (
            <div 
               key={track.id} 
               onClick={() => playTrack(track)}
               className="flex items-center justify-between p-4 md:p-5 bg-white/10 hover:bg-white/20 hover:scale-[1.01] transition-all duration-300 rounded-2xl cursor-pointer group border border-white/10 hover:border-white/30"
            >
              <div className="flex items-center gap-5">
                <span className="text-white/50 font-mono text-sm group-hover:text-white transition-colors w-6 text-center">{track.id}</span>
                <div className="flex flex-col">
                  <span className="text-white font-medium tracking-tight text-[15px]">{track.name}</span>
                  <span className="text-white/50 text-xs">{track.artist}</span>
                </div>
              </div>
              <span className="text-white/60 text-sm font-mono group-hover:text-white/90">▶</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
