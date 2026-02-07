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
    hero_title: "Escalamos seu Projeto com Injeção de Precisão",
    whatsapp_number: "5541998202737",
    contact_email: "contato@ouroplas.com.br",
    about_title: "Do Molde à Peça: Solução Completa em Plásticos",
    about_text: "Localizada em Curitiba, a Ouroplas é especialista em transformar projetos técnicos em produção real. Unimos o desenvolvimento de moldes sob medida com processos de injeção de alta performance para entregar peças com rigor industrial.",
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
          { title: "Desenvolvimento de Moldes", description: "Engenharia dedicada para criar moldes industriais sob medida, focados em durabilidade e precisão técnica." },
          { title: "Injeção de Alta Performance", description: "Infraestrutura com máquinas Tederic de última geração para injeção de peças técnicas em larga escala." },
          { title: "Logística e Distribuição", description: "Localização estratégica em Curitiba para atender indústrias em todo o Brasil com agilidade e compromisso." }
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
                  className="object-contain" /* Changed to contain to avoid stretching/clipping */
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
          className="hero-video gold-filter"
          aria-hidden="true"
        >
          <source src="/hero-new.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>

        <div className="container hero-content">
          <h1 dangerouslySetInnerHTML={{ __html: config.hero_title.replace('Precisão', '<span class="text-secondary">Precisão</span>') }}></h1>
          <p>Seu projeto nasce no papel e ganha escala industrial na Ouroplas. Atendimento técnico especializado em moldes e injeção técnica para grandes demandas.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Solicitar Orçamento</button>
            <a href="#sobre" className="btn btn-outline">Nossa Fábrica</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="section bg-section">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="text-secondary font-bold uppercase tracking-wider text-sm">📍 Curitiba | Atendimento Nacional</span>
          <h2 className="mb-6 mt-2">{config.about_title}</h2>
          <p className="text-muted mb-8 leading-relaxed text-lg">{config.about_text}</p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Conheça nossa tecnologia</button>
          </div>
        </div>
      </section>

      {/* Process Section (Preserving the GIF) */}
      <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'white', overflow: 'hidden' }}>
        <div className="container about-grid">
           <div 
             className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl gold-filter"
             style={{ 
               backgroundImage: 'url("/hero.gif")', 
               backgroundSize: 'cover', 
               backgroundPosition: 'center',
               opacity: 0.8
             }}
           >
             <div className="absolute inset-0 bg-black/20"></div>
           </div>
           <div>
             <span className="text-secondary font-bold uppercase tracking-wider text-sm">Nossa Tecnologia</span>
             <h2 className="mb-6 mt-2 text-white">Produção de Alta Performance</h2>
             <p className="opacity-80 mb-8 leading-relaxed">
               Utilizamos processos automatizados e monitoramento constante para garantir que cada peça injetada atenda aos mais rigorosos padrões de qualidade do mercado industrial.
             </p>
             <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-2">✅ Ciclos de injeção otimizados</li>
                <li className="flex items-center gap-2">✅ Matéria-prima de primeira linha</li>
                <li className="flex items-center gap-2">✅ Rigoroso controle de qualidade</li>
             </ul>
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
            <h4>📍 Unidade Curitiba</h4>
            <p>Rua Exemplo, 123 - Cidade Industrial</p>
            <p>{config.contact_email}</p>
            <p className="font-bold text-white text-lg">
              {config.whatsapp_number.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4')}
            </p>
            <p className="text-sm opacity-50 mt-4">Atendimento para todo o Brasil</p>
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
