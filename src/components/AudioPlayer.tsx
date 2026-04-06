"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

interface TrackEvent {
  src: string;
  name: string;
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEverPlayed, setHasEverPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false); 
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // They previously configured /music/tumse.mp3, so we use it as the default!
  const [trackInfo, setTrackInfo] = useState({ src: "/music/tumse.mp3", name: "Premium Track" });
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handlePlayTrack = (e: CustomEvent<TrackEvent>) => {
      setTrackInfo(e.detail);
      if (audioRef.current) {
        audioRef.current.src = e.detail.src;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasEverPlayed(true);
          setIsMuted(false);
        }).catch(err => console.log('Autoplay blocked:', err));
      }
    };
    
    // Type casting because strict TS expects standard Event types
    window.addEventListener('play-track', handlePlayTrack as EventListener);
    return () => window.removeEventListener('play-track', handlePlayTrack as EventListener);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasEverPlayed(true);
      }).catch(console.error);
      if (isMuted) setIsMuted(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.5;
    }
  }, [isMuted]);

  // Only render the wrapper once a track has ever been triggered (avoids layout shift on initial load)
  if (!hasEverPlayed) {
    return (
      <audio
        ref={audioRef}
        src={trackInfo.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        loop
        playsInline
      />
    );
  }

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[400px] transition-all duration-500"
      style={{
        opacity: isPlaying ? 1 : 0,
        transform: `translateX(-50%) translateY(${isPlaying ? '0' : '20px'})`,
        pointerEvents: isPlaying ? 'auto' : 'none',
      }}
    >
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl px-5 py-4 flex flex-col gap-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all hover:bg-black/70">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between w-full">
           <div className="flex items-center gap-3 overflow-hidden">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 shadow-inner">
               <Music size={16} className="text-white/80" />
             </div>
             <span className="text-[15px] font-medium tracking-tight text-white/90 truncate mr-2">{trackInfo.name}</span>
           </div>
           
           <div className="flex items-center gap-4 shrink-0 pr-1">
             <button onClick={() => setIsMuted(!isMuted)} className="text-white/50 hover:text-white transition-colors">
               {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
             </button>
             <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 hover:bg-gray-200 transition-all shadow-xl shrink-0">
               {isPlaying ? <Pause size={18} className="fill-black" /> : <Play size={18} className="translate-x-[1px] fill-black" />}
             </button>
           </div>
        </div>

        {/* Premium Seek Bar */}
        <div className="flex items-center gap-3 w-full px-1">
          <span className="text-[10px] text-white/40 font-mono w-8 text-right">{formatTime(progress)}</span>
          <input 
            type="range"
            min={0}
            max={duration || 100}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-white/10 rounded-full appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:shadow-lg"
          />
          <span className="text-[10px] text-white/40 font-mono w-8">{formatTime(duration)}</span>
        </div>

      </div>

      <audio
        ref={audioRef}
        src={trackInfo.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        loop
        playsInline
      />
    </div>
  );
}
