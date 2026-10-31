import AboutHero from "../components/about/AboutHero";
import GlobalMarket from "../components/about/GlobalMarket";
import MissionVision from "../components/about/MissionVision";
import CoreValues from "../components/about/CoreValues";
import QualityControl from "../components/about/QualityControl";
import ContactSection from "../components/about/ContactSection";

import "./AboutPage.css";

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutHero />
      <GlobalMarket />
      <MissionVision />
      <CoreValues />
      <QualityControl />
      <ContactSection />
    </main>
  );
}
