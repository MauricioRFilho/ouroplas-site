"use client";
import { useState, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactEmail: string;
}

export default function ContactModal({ isOpen, onClose, contactEmail }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        const subject = `Contato Site - ${formData.company || formData.name}`;
        const body = `Nome: ${formData.name}\nEmpresa: ${formData.company}\nTelefone/WhatsApp: ${formData.phone}\n\n${formData.message}`;
        
        const mailtoLink = `mailto:${contactEmail || 'contato@ouroplas.com.br'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        
        // Clear and close
        setFormData({ name: "", company: "", phone: "", message: "" });
        onClose();

    } catch (err) {
        console.error("Unexpected error:", err);
        alert("Ocorreu um erro ao preparar o seu e-mail. Por favor, tente novamente.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button 
          className="modal-close" 
          onClick={onClose} 
          aria-label="Fechar formulário"
        >
          &times;
        </button>
        
        <div className="modal-header">
          <h3 id="modal-title">Fale Conosco</h3>
          <p>Dúvidas, suporte ou novos projetos? Envie-nos um e-mail detalhado e retornaremos brevemente.</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nome Completo <span className="text-secondary">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Seu Nome Apelido"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Empresa <span className="text-secondary">*</span></label>
            <input
              type="text"
              id="company"
              name="organization"
              autoComplete="organization"
              required
              placeholder="Onde você trabalha"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Seu Contato <span className="text-secondary">*</span></label>
            <input
              type="tel"
              id="phone"
              name="tel"
              autoComplete="tel"
              required
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Sua Mensagem</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Como podemos te ajudar?"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Processando..." : "ENVIAR E-MAIL"}
          </button>
          
          <p className="text-center mt-4" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
            Abrirá automaticamente o seu gerenciador de e-mail (Outlook/Gmail).
          </p>
        </form>
      </div>
    </div>
  );
}
