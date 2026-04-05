import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import Countdown from "@/components/Countdown";
import CardSection from "@/components/CardSection";
import SurpriseGift from "@/components/SurpriseGift";

export default function Home() {
  return (
    <main className="w-full flex-col min-h-screen bg-black">
      <Hero />
      <Gallery />
      <CardSection />
      <SurpriseGift />
      <Countdown />
    </main>
  );
}
