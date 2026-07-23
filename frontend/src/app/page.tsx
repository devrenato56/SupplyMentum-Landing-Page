import NetworkBackground from "@/components/home/NetworkBackground";
import Hero from "@/components/home/Hero";
import MetricsSection from "@/components/home/MetricsSection";
import Specializations from "@/components/home/Specializations";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-[#09090B]">
      <NetworkBackground />
      <div className="relative z-[1]">
        <Hero />
        <MetricsSection />
        <Specializations />
      </div>
    </div>
  );
}
