"use client";

import { useState } from "react";
import ContactModal from "./components/ContactModal";
import WhatsAppFloat from "./components/WhatsAppFloat";
import InstagramFeed from "./components/InstagramFeed";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppFloat onClick={() => setIsModalOpen(true)} />
      
      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-container">
          <div className="logo">
             {/* Logo updated to image */}
             <div className="relative h-12 w-auto aspect-square overflow-hidden rounded-full">
                {/* Optimized Next.js Image */}
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
          <h1>Injeção de Plásticos com <span className="text-secondary">Precisão</span> e Qualidade</h1>
          <p>Transformamos sua ideia em produto. Especialistas em fabricação de peças técnicas para a indústria.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Solicitar Orçamento</button>
            <button className="btn btn-outline">Conheça Nossa Fábrica</button>
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
            <div className="card">
              <h3>Injeção Técnica</h3>
              <p>Produção de peças complexas com maquinário de alta precisão e materiais de engenharia.</p>
            </div>
            <div className="card">
              <h3>Desenvolvimento de Moldes</h3>
              <p>Parceria no desenvolvimento e manutenção de moldes para garantir a vida útil do seu projeto.</p>
            </div>
            <div className="card">
              <h3>Montagem e Acabamento</h3>
              <p>Serviços complementares para entregar o produto pronto para sua linha de montagem ou venda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <InstagramFeed />

      {/* CTA Section */}
      <section className="section cta-section">
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
            <p>contato@ouroplas.com.br</p>
            <p>(41) 99820-2737</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ouroplas Indústria e Comércio de Plásticos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
