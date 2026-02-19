"use client";

import { useState } from "react";
import Image from "next/image";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        whatsappNumber="5541998202737" // Default if config not loaded yet, or pass as prop if critical
      />
    </>
  );
}
