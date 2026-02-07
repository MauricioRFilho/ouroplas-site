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
    hero_title: "Injeção Plástica com <span class='text-secondary'>Precisão</span> Industrial",
    about_title: "Qualidade de Ponta a Ponta",
    about_text: "A Ouroplas atua na prestação de serviços de injeção de peças plásticas, atendendo às necessidades atuais e futuras de indústrias que buscam qualidade, confiabilidade e eficiência produtiva. Contamos com máquinas de diferentes portes, atendendo diversos setores.",
    whatsapp_number: "5541998202737",
    contact_email: "wcdopradoinjecao@gmail.com",
    instagram_username: "@ouroplas",
    instagram_url: "https://www.instagram.com/ouroplas/"
  });

  const services = [
    { title: "Desenvolvimento de Moldes", description: "Criação técnica e precisa para garantir o melhor produtividade da sua peça." },
    { title: "Injeção Técnica", description: "Capacidade produtiva com injetoras de 80 a 300 toneladas para diversos setores." },
    { title: "Controle de Qualidade", description: "Processos rigorosos e padronizados para garantir excelência em cada lote." },
    { title: "Logística Nacional", description: "Entrega gratuita em Curitiba e envios ágeis para todo o território nacional." }
  ];

  useEffect(() => {
    async function loadConfig() {
      const { data, error } = await supabase
        .from('site_config')
        .select('*');
      
      if (data && data.length > 0) {
        const configMap = data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setConfig((prev: any) => ({ ...prev, ...configMap }));
      }
    }
    loadConfig();
  }, []);

  return (
    <main>
      <header className="header">
        <nav className="container nav-container">
          <div className="logo-container">
             <div className="relative w-10 h-10 mr-3">
               <Image 
                 src="/ouroplas-logo.jpg" 
                 alt="Ouroplas Logo" 
                 fill
                 className="object-contain rounded-md"
               />
             </div>
             <span className="font-bold text-xl tracking-tighter text-primary">OUROPLAS</span>
          </div>

          <button 
            className={`menu-toggle ${isMenuActive ? 'active' : ''}`}
            onClick={() => setIsMenuActive(!isMenuActive)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${isMenuActive ? 'active' : ''}`}>
            <a href="#home" onClick={() => setIsMenuActive(false)}>Início</a>
            <a href="#sobre" onClick={() => setIsMenuActive(false)}>Fábrica</a>
            <a href="#especialista" onClick={() => setIsMenuActive(false)}>Diferenciais</a>
            <a href="#contato" onClick={() => setIsMenuActive(false)}>Contato</a>
            <div className="sm:hidden mt-8 w-full">
              <button 
                className="btn btn-primary w-full"
                onClick={() => { setIsModalOpen(true); setIsMenuActive(false); }}
              >
                Falar com Especialista
              </button>
            </div>
          </div>

          <button 
            className="btn btn-primary nav-cta hidden sm:block"
            onClick={() => setIsModalOpen(true)}
          >
            Falar com Especialista
          </button>
        </nav>
      </header>

      {/* Hero Section - Immersive Video */}
      <section id="home" className="hero">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video gold-filter"
          aria-hidden="true"
        >
          <source src="/hero-optimized.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="container hero-content text-center sm:text-left">
          <h1 
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: config.hero_title.replace('Precisão', '<span class="text-secondary">Precisão</span>') }}
          ></h1>
          <p className="max-w-2xl text-lg sm:text-xl mb-10 opacity-95 leading-relaxed">
            Sua produção plástica com escala industrial, qualidade técnica e o rigor que seu projeto exige. Especialistas em moldagem técnica de alta precisão.
          </p>
          <div className="hero-buttons flex flex-wrap gap-4 justify-center sm:justify-start">
            <button className="btn btn-primary btn-lg px-10" onClick={() => setIsModalOpen(true)}>Solicitar Orçamento</button>
            <a href="#sobre" className="btn btn-outline btn-lg px-10">Ver Nossa Fábrica</a>
          </div>
        </div>
      </section>

      {/* Section 1: Qualidade Técnica (GIF Highlights) */}
      <section id="sobre" className="section bg-white overflow-hidden">
        <div className="container">
          <div className="about-grid">
            <div className="relative group">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl gold-filter border-4 border-light">
                 <Image 
                   src="/hero.gif" 
                   alt="Processo de Injeção Plástica Ouroplas" 
                   fill 
                   className="object-cover" 
                   unoptimized
                 />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full flex items-center justify-center shadow-xl hidden lg:flex">
                <span className="text-primary font-bold text-center text-xs p-2">QUALIDADE<br/>TESTADA</span>
              </div>
            </div>
            <div className="pl-0 lg:pl-12">
              <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">📍 Ouroplas Indústria</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6 leading-tight">{config.about_title}</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                {config.about_text}
                <br /><br />
                <strong>Objetivamos construir parcerias sólidas e entregar resultados que superam expectativas técnicos industriais.</strong>
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-secondary font-bold text-3xl mb-1">24/7</h4>
                  <p className="text-xs text-muted font-bold uppercase tracking-tighter">Produção Contínua</p>
                </div>
                <div>
                  <h4 className="text-secondary font-bold text-3xl mb-1">300T</h4>
                  <p className="text-xs text-muted font-bold uppercase tracking-tighter">Capacidade Máxima</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Workflow (Cards with Overlap) */}
      <section id="especialista" className="section bg-section relative overflow-hidden">
        <div className="container relative z-10">
          <div className="section-header text-center lg:text-left mb-16">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Diferenciais Estratégicos</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">Tecnologia que Move o Setor</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Desenvolvimento de Moldes", 
                desc: "Equipe especializada na análise e criação de moldes otimizados para redução de ciclo.", 
                img: "/gallery/como_trabalhamos.jpg",
                feat: "Alta Precisão"
              },
              { 
                title: "Injeção em Escala", 
                desc: "Máquinas robustas de 80 a 300 toneladas prontas para demandas de alta complexidade.", 
                img: "/gallery/oquefazemos_ouroplas.jpg",
                feat: "Agilidade Industrial"
              },
              { 
                title: "Soluções Sustentáveis", 
                desc: "Foco no reaproveitamento inteligente e economia circular em todo o processo.", 
                img: "/gallery/nossos_diferenciais.jpg",
                feat: "Eco-Friendly"
              }
            ].map((step, idx) => (
              <div key={idx} className="group glass-card overflow-hidden">
                <div className="relative h-64 -mx-10 -mt-10 mb-8 rounded-b-3xl overflow-hidden">
                  <Image src={step.img} alt={step.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" />
                  <div className="absolute top-12 left-10 bg-secondary text-primary px-3 py-1 font-bold text-[10px] rounded-full uppercase tracking-widest">
                    {step.feat}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                <p className="text-muted leading-relaxed text-sm mb-6">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Industrial Trust (Banner) */}
      <section className="relative py-32 sm:py-48 overflow-hidden bg-primary">
        <Image 
          src="/gallery/garantia ouroplas.jpg" 
          alt="Garantia Industrial" 
          fill 
          className="object-cover opacity-30 select-none"
        />
        <div className="container relative z-10 text-center">
            <div className="max-w-4xl mx-auto px-6">
              <span className="text-secondary font-bold uppercase tracking-[0.3em] text-sm mb-6 block">Nosso Compromisso</span>
              <h2 className="text-white text-4xl sm:text-6xl font-bold mb-8 leading-tight">
                "Quando a produção termina, o compromisso continua."
              </h2>
              <p className="text-white/80 text-lg sm:text-2xl font-light italic mb-12 max-w-2xl mx-auto">
                Injeção técnica com escala industrial e entrega pronta para o seu negócio crescer sem gargalos.
              </p>
              <button className="btn btn-secondary btn-lg px-12" onClick={() => setIsModalOpen(true)}>Consultoria Técnica Gratuita</button>
            </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed username={config.instagram_username} url={config.instagram_url} />

      {/* Simple Service Grid (Diferenciais) */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service, index) => (
              <div key={index} className="border-l-2 border-secondary/20 pl-8">
                <h4 className="text-primary font-bold text-xl mb-3">{service.title}</h4>
                <p className="text-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-primary text-white">
        <div className="container footer-content pt-20">
          <div className="footer-brand">
            <div className="flex items-center gap-3 mb-6">
               <div className="relative w-12 h-12">
                 <Image src="/ouroplas-logo.jpg" alt="Ouroplas Logo" fill className="object-contain" />
               </div>
               <span className="font-bold text-2xl tracking-tighter">OUROPLAS</span>
            </div>
            <p className="max-w-xs text-white/60 leading-relaxed">Referência em injeção de peças plásticas industriais e desenvolvimento de moldes sob demanda.</p>
          </div>
          <div className="footer-links">
            <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-8">Navegação</h4>
            <nav className="flex flex-col gap-4">
              <a href="#home" className="hover:text-secondary transition-colors">Início</a>
              <a href="#sobre" className="hover:text-secondary transition-colors">A Ouroplas</a>
              <a href="#especialista" className="hover:text-secondary transition-colors">Tecnologia</a>
              <a href="#contato" className="hover:text-secondary transition-colors">Fale Conosco</a>
            </nav>
          </div>
          <div className="footer-contact">
            <h4 className="text-secondary font-bold uppercase tracking-widest text-sm mb-8">Unidade Curitiba</h4>
            <p className="text-white/60 mb-2">Atendimento para todo o Brasil.</p>
            <p className="text-white font-bold mb-1">wcdopradoinjecao@gmail.com</p>
            <p className="text-white text-2xl font-bold mt-4">
              +55 (41) 99820-2737
            </p>
          </div>
        </div>
        <div className="footer-bottom border-t border-white/5 py-10 mt-20 opacity-40">
          <div className="container text-center">
            <p>&copy; {new Date().getFullYear()} Ouroplas Indústria e Comércio de Plásticos Ltda.</p>
          </div>
        </div>
      </footer>

      <WhatsAppFloat number={config.whatsapp_number} />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
