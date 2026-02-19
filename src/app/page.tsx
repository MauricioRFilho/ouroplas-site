import { supabase } from "@/lib/supabaseClient";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsSection from "./components/NewsSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";
import LazyFeatures from "./components/LazyFeatures";

// Server Component Fetching
async function getSiteConfig() {
  const { data } = await supabase.from('site_config').select('*');
  
  const defaultConfig = {
    hero_title: "Injeção Plástica com <span class='text-secondary'>Precisão</span> Industrial",
    about_title: "Qualidade de Ponta a Ponta",
    about_text: "A Ouroplas atua na prestação de serviços de injeção de peças plásticas, atendendo às necessidades atuais e futuras de indústrias que buscam qualidade, confiabilidade e eficiência produtiva. Contamos com máquinas de diferentes portes, atendendo diversos setores.",
    whatsapp_number: "5541998202737",
    contact_email: "wcdopradoinjecao@gmail.com",
    instagram_username: "@ouroplas",
    instagram_url: "https://www.instagram.com/ouroplas/"
  };

  if (data && data.length > 0) {
    const configMap = data.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    return { ...defaultConfig, ...configMap };
  }

  return defaultConfig;
}

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function Home() {
  const config = await getSiteConfig();

  return (
    <main>
      <Navbar />
      <Hero title={config.hero_title} />
      <NewsSection />
      <AboutSection title={config.about_title} text={config.about_text} />
      <ServicesSection />
      <LazyFeatures config={config} />
      <Footer config={config} />
    </main>
  );
}
