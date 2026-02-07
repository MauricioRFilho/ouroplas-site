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
    contact_email: "wcdopradoinjecao@gmail.com",
    about_title: "Excelência em Injeção de Peças Plásticas",
    about_text: "A Ouroplas atende às necessidades de indústrias que buscam qualidade, confiabilidade e eficiência produtiva. Com injetoras de 80 a 300 toneladas, oferecemos soluções técnicas adequadas, cumprimento de prazos e excelente custo-benefício.",
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
          { title: "Desenvolvimento de Moldes", description: "Moldes desenvolvidos sob medida conforme a necessidade e complexidade do seu projeto." },
          { title: "Produção Padronizada", description: "Injeção contínua com rigoroso controle de qualidade para garantir peças idênticas em larga escala." },
          { title: "Logística Inteligente", description: "Entrega gratuita em Curitiba e envios ágeis para indústrias em todo o território nacional." },
          { title: "Sustentabilidade", description: "Foco no reaproveitamento de materiais e redução drástica de desperdícios no processo produtivo." }
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
            <p className="text-muted mb-8 leading-relaxed text-lg">
            {config.about_text}
            <br /><br />
            <strong>Nosso objetivo é construir parcerias sólidas e duradouras, entregando resultados consistentes em cada projeto.</strong>
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Solicitar Orçamento Técnico</button>
          </div>
        </div>
      </section>

      {/* Quem Somos & Missão */}
      <section className="section bg-white">
        <div className="container about-grid">
          <div className="order-2 sm:order-1">
            <span className="text-secondary font-bold uppercase tracking-wider text-sm">Quem Somos</span>
            <h2 className="mb-6 mt-2">Especialistas em Moldes e Injeção</h2>
            <p className="text-muted mb-6 leading-relaxed">
              Com produção de qualidade, agilidade e atendimento flexível, que fazem parte da nossa essência, construímos parcerias que seguem crescendo junto com a Ouroplas. Somos focados em transformar sua necessidade em realidade industrial.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-light rounded-xl border border-secondary/10">
                <h4 className="text-primary font-bold mb-1">Qualidade</h4>
                <p className="text-xs text-muted">Rigoroso controle em cada peça.</p>
              </div>
              <div className="p-4 bg-light rounded-xl border border-secondary/10">
                <h4 className="text-primary font-bold mb-1">Agilidade</h4>
                <p className="text-xs text-muted">Prazos cumpridos com seriedade.</p>
              </div>
            </div>
          </div>
          <div className="order-1 sm:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image 
              src="/gallery/quemsomos_ourplas.jpg" 
              alt="Especialistas Ouroplas desenvolvendo moldes e injetando peças plásticas com precisão." 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Como Trabalhamos */}
      <section className="section bg-section overflow-hidden">
        <div className="container">
          <div className="section-header mb-12" style={{ textAlign: 'center' }}>
            <span className="text-secondary font-bold uppercase tracking-wider text-sm">Workflow</span>
            <h2 className="mb-4">Como Trabalhamos</h2>
            <p className="max-w-2xl mx-auto">Acompanhamos cada etapa do seu projeto, do desenvolvimento do molde à entrega final.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Desenvolvimento", desc: "Criação técnica do molde ideal para o seu projeto.", img: "/gallery/como_trabalhamos.jpg" },
              { title: "Injeção Técnica", desc: "Processo de alta precisão com máquinas modernas.", img: "/gallery/oquefazemos_ouroplas.jpg" },
              { title: "Produção", desc: "Escalabilidade conforme sua demanda industrial.", img: "/gallery/ouroplas injecao.jpg" },
              { title: "Entrega Pronta", desc: "Logística ágil e peças prontas para uso imediato.", img: "/gallery/garantia ouroplas.jpg" }
            ].map((step, idx) => (
              <div key={idx} className="group relative h-80 rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
                <Image src={step.img} alt={step.title} fill className="object-cover transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 p-6 flex flex-col justify-end">
                  <h4 className="text-white font-bold text-xl mb-2">{step.title}</h4>
                  <p className="text-white/80 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacidade e Diferenciais (Com GIF e Novos Dados) */}
      <section className="section bg-white overflow-hidden">
        <div className="container about-grid">
           <div 
             className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl gold-filter"
             style={{ 
               backgroundImage: 'url("/hero.gif")', 
               backgroundSize: 'cover', 
               backgroundPosition: 'center',
               opacity: 0.9
             }}
           >
             <div className="absolute inset-0 bg-primary/10"></div>
           </div>
           <div>
             <span className="text-secondary font-bold uppercase tracking-wider text-sm">Capacidade e Tecnologia</span>
             <h2 className="mb-6 mt-2">Maquinário de Ponta</h2>
             <p className="text-muted mb-8 leading-relaxed">
               Contamos com máquinas de diferentes portes, de 80 a 300 toneladas, permitindo oferecer soluções técnicas precisas para peças de diversos setores industriais.
             </p>
             <ul className="flex flex-col gap-4">
                {[
                  "Processo completo (molde + injeção)",
                  "Disponibilidade estendida para grandes lotes",
                  "Entrega gratuita em Curitiba e envios nacionais",
                  "Reaproveitamento e foco em sustentabilidade"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary font-bold bg-light p-3 rounded-lg border-l-4 border-secondary">
                    <span className="text-secondary">✔</span> {item}
                  </li>
                ))}
             </ul>
           </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="section bg-section">
        <div className="container">
          <div className="section-header mb-12" style={{ textAlign: 'center' }}>
            <span className="text-secondary font-bold uppercase tracking-wider text-sm">Serviços Especializados</span>
            <h2 className="mb-4">Diferenciais Ouroplas</h2>
            <p className="max-w-2xl mx-auto">Unimos eficiência produtiva com compromisso logístico e rigor técnico industrial.</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="card group hover:bg-primary transition-colors duration-300" key={service.id || index}>
                <h3 className="mb-3 group-hover:text-white">{service.title}</h3>
                <p className="group-hover:text-white/80">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisso e Garantia (Image Banner) */}
      <section className="section py-0">
        <div className="relative h-[400px] sm:h-[500px] w-full">
          <Image 
            src="/gallery/garantia ouroplas.jpg" 
            alt="Garantia Ouroplas: Quando a produção termina, o compromisso continua." 
            fill 
            className="object-cover brightness-50" 
          />
          <div className="absolute inset-0 flex items-center justify-center text-center p-6">
            <div className="max-w-3xl">
              <h2 className="text-white text-3xl sm:text-5xl font-bold mb-6">Quando a produção termina, o compromisso continua.</h2>
              <p className="text-white/90 text-xl sm:text-2xl mb-8 font-light italic">"Molde bem fabricado, injeção em escala e entrega pronta para o seu negócio."</p>
              <button className="btn btn-secondary btn-lg" onClick={() => setIsModalOpen(true)}>Inicie seu Atendimento Técnico</button>
            </div>
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
              <a href="#servicos">Diferenciais</a>
            </nav>
          </div>
          <div className="footer-contact">
            <h4>📍 Unidade Curitiba</h4>
            <p>Rua Exemplo, 123 - Cidade Industrial</p>
            <p className="break-all">{config.contact_email}</p>
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
