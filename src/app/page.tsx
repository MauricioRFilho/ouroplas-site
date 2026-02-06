"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ContactModal from "./components/ContactModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import InstagramFeed from "./components/InstagramFeed";
import { getSiteConfig } from "@/lib/siteConfig";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [config, setConfig] = useState<any>({
    hero_title: "Injeção de Plásticos com Precisão e Qualidade",
    whatsapp_number: "5541998202737",
    contact_email: "contato@ouroplas.com.br",
    about_title: "Soluções em Plásticos desde 2010",
    about_text: "A Ouroplas é referência em injeção de plásticos técnicos, unindo tecnologia de ponta e compromisso com o cliente.",
    instagram_username: "@ouroplas"
  });
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const data = await getSiteConfig();
      if (Object.keys(data).length > 0) {
        setConfig((prev: any) => ({ ...prev, ...data }));
      }

      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .order("order_index");
      
      if (servicesData && servicesData.length > 0) {
        setServices(servicesData);
      } else {
        setServices([
          { title: "Injeção Técnica", description: "Produção de peças complexas com maquinário de alta precisão e tecnologia de ponta." },
          { title: "Desenvolvimento de Moldes", description: "Soluções completas no projeto, fabricação e manutenção de moldes industriais." },
          { title: "Montagem e Acabamento", description: "Processos integrados de montagem e acabamento para entregar seu produto finalizado." }
        ]);
      }
    }
    loadData();
  }, []);

  const closeMenu = () => setIsMenuActive(false);

  return (
    <main>
      <header>
        <ContactModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          whatsappNumber={config.whatsapp_number}
        />
        <WhatsAppFloat onClick={() => setIsModalOpen(true)} />
        
        {/* Navigation */}
        <nav className="nav" aria-label="Navegação principal">
          <div className="container nav-container">
            <a href="#home" className="logo" aria-label="Ouroplas Home">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                <Image 
                  src="/ouroplas-logo.jpg" 
                  alt="Logo Ouroplas" 
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="logo-text">OUROPLAS</span>
            </a>

            {/* Mobile Toggle */}
            <button 
              className={`menu-toggle ${isMenuActive ? 'active' : ''}`} 
              onClick={() => setIsMenuActive(!isMenuActive)}
              aria-expanded={isMenuActive}
              aria-label="Abrir menu de navegação"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className={`nav-links ${isMenuActive ? 'active' : ''}`}>
              <a href="#home" onClick={closeMenu}>Início</a>
              <a href="#sobre" onClick={closeMenu}>Sobre</a>
              <a href="#servicos" onClick={closeMenu}>Serviços</a>
              <a href="#contato" onClick={closeMenu}>Contato</a>
              {/* Optional: mobile version of the CTA button inside the menu */}
              <button 
                className="btn btn-primary nav-links-btn" 
                style={{ display: isMenuActive ? 'block' : 'none', marginTop: '20px' }}
                onClick={() => { setIsModalOpen(true); closeMenu(); }}
              >
                Orçamento Rápido
              </button>
            </div>

            <button 
              className="btn btn-primary nav-cta" 
              onClick={() => setIsModalOpen(true)}
            >
              Falar com Especialista
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
          poster="/ouroplas-logo.jpg"
          aria-hidden="true"
        >
          <source src="/hero-optimized.mp4" type="video/mp4" />
          <source src="/hero-background.mov" type="video/quicktime" />
        </video>
        <div className="video-overlay"></div>

        <div className="container hero-content">
          <h1 dangerouslySetInnerHTML={{ __html: config.hero_title.replace('Precisão', '<span class="text-secondary">Precisão</span>') }}></h1>
          <p>Potencialize sua indústria com peças plásticas de alta performance. Atendimento especializado em injeção técnica para projetos complexos.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Solicitar Orçamento</button>
            <a href="#sobre" className="btn btn-outline">Nossa Fábrica</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="section">
        <div className="container about-grid">
          <div>
            <span className="text-secondary font-bold uppercase tracking-wider text-sm">Qualidade Industrial</span>
            <h2 className="mb-6 mt-2">{config.about_title}</h2>
            <p className="text-muted mb-8 leading-relaxed">{config.about_text}</p>
            <div className="flex gap-4">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Falar com Comercial</button>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden shadow-2xl">
             <Image 
               src="/ouroplas-logo.jpg" 
               alt="Processo de injeção plástica Ouroplas" 
               fill
               className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
             />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <h2 className="mb-4">Nossas Soluções industriais</h2>
            <p>Infraestrutura completa para atender demandas de alta complexidade com rigor documental e técnico.</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="card" key={service.id || index}>
                <h3 className="mb-3">{service.title}</h3>
                <p>{service.description}</p>
              </article>
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
          <h2 className="text-white mb-4">Pronto para elevar sua produção?</h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">Nossa equipe está pronta para analisar seu projeto e oferecer a melhor solução em injeção plástica.</p>
          <button className="btn btn-primary btn-lg" onClick={() => setIsModalOpen(true)}>Falar no WhatsApp agora</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-brand">
            <h3 className="mb-4">OUROPLAS</h3>
            <p className="max-w-xs">Indústria e Comércio de Plásticos focada em excelência técnica e parcerias de longo prazo.</p>
          </div>
          <div className="footer-links">
            <h4>Institucional</h4>
            <nav className="flex flex-col">
              <a href="#home">Início</a>
              <a href="#sobre">Sobre Nós</a>
              <a href="#servicos">Nossas Soluções</a>
            </nav>
          </div>
          <div className="footer-contact">
            <h4>Contato Direto</h4>
            <p>{config.contact_email}</p>
            <p className="font-bold text-white text-lg">
              {config.whatsapp_number.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4')}
            </p>
            <p className="text-sm opacity-50 mt-4">Curitiba - Paraná</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Ouroplas Indústria e Comércio de Plásticos Ltda. CNPJ: 00.000.000/0001-00</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
