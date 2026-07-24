import NetworkBackground from "@/components/home/NetworkBackground";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import MetricsSection from "@/components/home/MetricsSection";
import Specializations from "@/components/home/Specializations";
import ExploreSection from "@/components/home/ExploreSection";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#09090B]">
      <SmoothScroll />
      <NetworkBackground />
      <div className="relative z-[1]">
        <Hero />
        <AboutSection />
        <MetricsSection />
        <Specializations />
        <ExploreSection />
      </div>
    </div>
  );
}
