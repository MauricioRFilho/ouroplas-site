import { siteConfig } from "@/data/site-data";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsSection from "./components/NewsSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";
import LazyFeatures from "./components/LazyFeatures";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero title={siteConfig.hero_title} />
      <NewsSection />
      <AboutSection title={siteConfig.about_title} text={siteConfig.about_text} />
      <ServicesSection />
      <LazyFeatures config={siteConfig} />
      <Footer config={siteConfig} />
    </main>
  );
}
