import AboutHero from "../components/about/AboutHero";
import MissionVision from "../components/about/MissionVision";
import CoreValues from "../components/about/CoreValues";
import QualityControl from "../components/about/QualityControl";
import ContactSection from "../components/about/ContactSection";

export default function AboutPage() {
  return (
    <main className="relative w-full bg-black">
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <QualityControl />
      <ContactSection />
    </main>
  );
}
