"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ContactModal from "./components/ContactModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import InstagramFeed from "./components/InstagramFeed";
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
      <header className="nav">
        <nav className="container nav-container">
          <div className="logo">
             <Image 
               src="/ouroplas-logo.jpg" 
               alt="Ouroplas Logo" 
               width={40}
               height={40}
               className="img-cover rounded-md"
               priority
             />
             <span className="logo-text">OUROPLAS</span>
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
            <a href="#especialista" onClick={() => setIsMenuActive(false)}>Tecnologia</a>
            <a href="#contato" onClick={() => setIsMenuActive(false)}>Contato</a>
          </div>

          <button 
            className="btn btn-primary nav-cta"
            onClick={() => setIsModalOpen(true)}
          >
            Atendimento Técnico
          </button>
        </nav>
      </header>

      {/* Hero Section - Promoted High-Impact Content */}
      <section id="home" className="hero">
        <video autoPlay muted loop playsInline className="hero-video gold-filter" aria-hidden="true">
          <source src="/hero-new.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div className="container">
          <div className="hero-content text-left">
            <h1 className="text-4xl sm:text-7xl font-bold mb-8 leading-tight text-white" 
                dangerouslySetInnerHTML={{ __html: config.hero_title.replace('Precisão', '<span class="text-secondary">Precisão</span>') }}>
            </h1>
            <p className="max-w-2xl mb-12 text-white/90 text-lg sm:text-2xl italic font-light">
              Suporte técnico especializado e garantia de entrega pronta para escalar seu projeto.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg px-10" onClick={() => setIsModalOpen(true)}>Solicitar Orçamento</button>
              <a href="#sobre" className="btn btn-outline btn-lg px-10">Ver Nossa Fábrica</a>
            </div>
          </div>
        </div>
      </section>

      {/* Qualidade Técnica Section - Text on Left, GIF on Right */}
      <section id="sobre" className="section bg-white">
        <div className="container">
          <div className="about-grid grid-60-40">
            <div className="pr-large order-2 sm:order-1">
              <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-4 block">📍 Curitiba | Atendimento Nacional</span>
              <h2 className="mb-6">{config.about_title}</h2>
              <p className="mb-8 text-lg">
                {config.about_text}
                <br /><br />
                <strong>Parcerias sólidas e resultados consistentes em cada projeto industrial.</strong>
              </p>
              <div className="flex gap-10">
                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="text-secondary text-3xl font-black">24/7</h4>
                  <p className="text-xs uppercase font-bold tracking-widest text-primary/50">Operação</p>
                </div>
                <div className="border-l-4 border-secondary pl-6">
                  <h4 className="text-secondary text-3xl font-black">300T</h4>
                  <p className="text-xs uppercase font-bold tracking-widest text-primary/50">Poder de Fogo</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl order-1 sm:order-2">
               <Image 
                 src="/producao-real.gif" 
                 alt="Processo Ouroplas" 
                 width={500}
                 height={500}
                 className="img-cover gold-filter" 
                 unoptimized
               />
               <div className="absolute-fill flex-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: 'rgba(5, 10, 48, 0.4)' }}>
                  <span className="text-white font-bold tracking-widest uppercase text-sm">Produção Real</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="especialista" className="section bg-section">
        <div className="container">
          <div className="section-header text-center mb-16">
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Alta Performance</span>
            <h2 className="text-4xl">Diferenciais Estratégicos</h2>
          </div>
          
          <div className="grid grid-3">
            {[
              { 
                title: "Moldagem de Precisão", 
                desc: "Equipe técnica dedicada à otimização de moldes para garantia de produtividade máxima.", 
                img: "/gallery/como_trabalhamos.jpg" 
              },
              { 
                title: "Injeção em Escala", 
                desc: "Capacidade diversificada com injetoras de 80 a 300 toneladas atendendo diversos setores.", 
                img: "/gallery/oquefazemos_ouroplas.jpg" 
              },
              { 
                title: "Eco Industrial", 
                desc: "Compromisso com o reaproveitamento e eficiência energética em toda a linha fabril.", 
                img: "/gallery/nossos_diferenciais.jpg" 
              }
            ].map((item, idx) => (
              <div key={idx} className="glass-card group hover:scale-hover transition-all">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <Image src={item.img} alt={item.title} fill className="img-cover grayscale group-hover:grayscale-0 transition-all" />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
                <h3 className="mb-4 text-2xl">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Técnica - Foco na Máquina */}
      <section className="relative section py-0 overflow-hidden bg-primary">
        <div className="relative aspect-video tech-banner">
          <video autoPlay muted loop playsInline className="img-cover gold-filter opacity-40" aria-hidden="true">
            <source src="/hero-optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute-fill flex-center text-center">
            <div className="container max-w-4xl px-6">
              <h2 className="text-white text-4xl sm:text-6xl font-bold mb-6">Alta Escala Industrial</h2>
              <p className="text-white mb-10 text-xl sm:text-2xl">Precisão milimétrica em cada ciclo de injeção.</p>
              <button 
                className="btn btn-secondary btn-lg px-12 shadow-2xl"
                onClick={() => setIsModalOpen(true)}
              >
                Solicitar Visita Técnica
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed username={config.instagram_username} url={config.instagram_url} />

      {/* Grid de Diferenciais Finais */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-4 gap-12">
            {services.map((service, index) => (
              <div key={index} className="service-finish-card group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-1 bg-secondary group-hover:w-12 transition-all"></div>
                  <h4 className="text-xl font-bold group-hover:text-secondary transition-colors">{service.title}</h4>
                </div>
                <p className="text-muted leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Industrial */}
      <footer className="footer bg-dark-accent text-white">
        <div className="container">
          <div className="footer-main">
            <div className="footer-col">
              <div className="flex items-center gap-4 mb-4">
                <Image 
                  src="/ouroplas-logo.jpg" 
                  alt="Logo" 
                  width={60} 
                  height={60} 
                  className="rounded-lg" 
                />
                <span className="text-3xl font-black tracking-tighter">OUROPLAS</span>
              </div>
              <p className="text-white/40 leading-relaxed text-sm max-w-xs">
                Especialistas em injeção de termoplásticos técnicos. 
                Precisão Curitibana com alcance nacional.
              </p>
            </div>

            <div className="footer-col">
              <h4 className="text-secondary uppercase tracking-[0.2em] text-xs font-bold mb-2">Engenharia | Fábrica</h4>
              <p className="text-white/60 text-sm mb-4">Unidade Industrial Estratégica</p>
              <p className="font-bold text-lg text-white">{config.contact_email}</p>
              <p className="text-white/30 text-xs italic">Atendimento Técnico Comercial</p>
            </div>

            <div className="footer-col sm:items-end sm:text-right">
              <h4 className="text-secondary uppercase tracking-[0.2em] text-xs font-bold mb-2">Atendimento Direto</h4>
              <p className="text-3xl sm:text-4xl font-black text-white mb-4">
                {config.whatsapp_number ? `+55 ${config.whatsapp_number.slice(0,2)} ${config.whatsapp_number.slice(2)}` : '+55 (41) 99820-2737'}
              </p>
              <div className="bg-white/5 py-2 px-4 rounded-full inline-block">
                <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Segunda a Sexta • 08h às 18h</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ouroplas Indústria e Comércio de Plásticos Ltda.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-secondary">Privacidade</a>
              <a href="#" className="hover:text-secondary">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante Professional */}
      <button 
        className="whatsapp-float shadow-2xl"
        onClick={() => setIsModalOpen(true)}
        aria-label="Solicitar Orçamento"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.207l-.694 2.547 2.628-.69c.906.571 1.638.924 2.809.925h.003c3.181 0 5.767-2.586 5.768-5.767 0-3.18-2.587-5.767-5.768-5.767l-.003-.001zm3.205 8.151c-.133.374-.752.713-1.034.758-.274.044-.549.074-1.579-.345-1.04-.423-1.709-1.474-1.758-1.543-.05-.069-.41-1.08-.41-1.08l.001-.001c0-.528.27-.8.361-.89l.274-.31c.091-.091.21-.141.31-.141h.231l.21.033.42 1.004c.05.12.079.249.01.389l-.21.42s-.167.185-.01.353c.158.168.618.665.918.963.3.298.549.336.758.204l.58-.5c.13-.11.26-.08.41-.03l1.104.532c.15.07.25.13.29.21.04.09.04.51-.09.886z"/>
        </svg>
        <span>Solicitar Orçamento</span>
      </button>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        whatsappNumber={config.whatsapp_number}
      />
    </main>
  );
}
