"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-data";

export default function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);

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

          <a 
            href={`https://wa.me/${siteConfig.whatsapp_number}?text=Ol%C3%A1%2C%20gostaria%20de%20atendimento%20t%C3%A9cnico.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary nav-cta"
          >
            Atendimento Técnico
          </a>
        </nav>
      </header>
    </>
  );
}
