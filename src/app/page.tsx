import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SystemsSimulator } from "@/components/sections/SystemsSimulator";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { EngineeringDirection } from "@/components/sections/EngineeringDirection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <SystemsSimulator />
        <ExperienceTimeline />
        <EngineeringDirection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
