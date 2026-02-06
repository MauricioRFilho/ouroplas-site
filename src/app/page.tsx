"use client";

import { useState, useEffect } from "react";
import ContactModal from "./components/ContactModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import InstagramFeed from "./components/InstagramFeed";
import { getSiteConfig } from "@/lib/siteConfig";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [config, setConfig] = useState<any>({
    hero_title: "Injeção de Plásticos com Precisão e Qualidade",
    whatsapp_number: "5541998202737",
    contact_email: "contato@ouroplas.com.br",
    about_title: "Soluções em Plásticos desde 2010",
    about_text: "A Ouroplas é referência em injeção de plásticos técnicos, unindo tecnologia de ponta e compromisso com o cliente."
  });
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      // Load Config
      const data = await getSiteConfig();
      if (Object.keys(data).length > 0) {
        setConfig((prev: any) => ({ ...prev, ...data }));
      }

      // Load Services
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .order("order_index");
      
      if (servicesData && servicesData.length > 0) {
        setServices(servicesData);
      } else {
        // Fallback
        setServices([
          { title: "Injeção Técnica", description: "Produção de peças complexas com maquinário de alta precisão." },
          { title: "Desenvolvimento de Moldes", description: "Parceria no desenvolvimento e manutenção de moldes." },
          { title: "Montagem e Acabamento", description: "Serviços complementares para o produto final." }
        ]);
      }
    }
    loadData();
  }, []);

  return (
    <main>
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        whatsappNumber={config.whatsapp_number}
      />
      <WhatsAppFloat onClick={() => setIsModalOpen(true)} />
      
      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-container">
          <div className="logo">
             <div className="relative h-12 w-auto aspect-square overflow-hidden rounded-full">
                <img 
                  src="/ouroplas-logo.jpg" 
                  alt="Ouroplas Logo" 
                  style={{ height: '50px', width: 'auto' }}
                />
             </div>
            <span className="logo-text">OUROPLAS</span>
          </div>
          <div className="nav-links">
            <a href="#home">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#contato">Contato</a>
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Falar com Especialista</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero video-hero">
        <div className="video-overlay"></div>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
        >
          <source src="/hero-background.mov" type="video/quicktime" />
          <source src="/hero-background.mov" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>

        <div className="container hero-content relative z-10">
          <h1 dangerouslySetInnerHTML={{ __html: config.hero_title.replace('Precisão', '<span class="text-secondary">Precisão</span>') }}></h1>
          <p>Transformamos sua ideia em produto. Especialistas em fabricação de peças técnicas para a indústria.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Solicitar Orçamento</button>
            <button className="btn btn-outline">Conheça Nossa Fábrica</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 className="mb-4">{config.about_title}</h2>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>{config.about_text}</p>
            <div className="mt-8">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Nossa História</button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
             <img src="/ouroplas-logo.jpg" alt="Fábrica Ouroplas" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2>Nossas Soluções</h2>
            <p>Do design à entrega final, cuidamos de todo o processo.</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="card" key={service.id || index}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed 
        username={config.instagram_username} 
        url={config.instagram_url} 
      />

      {/* CTA Section */}
      <section id="contato" className="section cta-section">
        <div className="container">
          <h2>Pronto para escalar sua produção?</h2>
          <p>Entre em contato com nossa equipe comercial e descubra como podemos ajudar.</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Iniciar Conversa no WhatsApp</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3>OUROPLAS</h3>
            <p>Indústria e Comércio de Plásticos</p>
          </div>
          <div className="footer-links">
            <h4>Links Rápidos</h4>
            <a href="#home">Início</a>
            <a href="#sobre">Sobre Nós</a>
            <a href="#privacidade">Política de Privacidade</a>
          </div>
          <div className="footer-contact">
            <h4>Contato</h4>
            <p>{config.contact_email}</p>
            <p>{config.whatsapp_number.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4')}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ouroplas Indústria e Comércio de Plásticos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}


