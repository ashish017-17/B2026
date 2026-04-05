import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import CardSection from "@/components/CardSection";
import SurpriseGift from "@/components/SurpriseGift";
import MusicSection from "@/components/MusicSection";
import VoiceNote from "@/components/VoiceNote";
import HeartsGame from "@/components/HeartsGame";
import StarryNight from "@/components/StarryNight";
import CinematicEnd from "@/components/CinematicEnd";

export default function Home() {
  return (
    <main className="w-full flex-col min-h-screen bg-black">
      <Hero />
      <Gallery />
      <CardSection />
      <SurpriseGift />
      <VoiceNote />
      <HeartsGame />
      <StarryNight />
      <CinematicEnd />
      <MusicSection />
      <Countdown />
    </main>
  );
}
