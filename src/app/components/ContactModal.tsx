"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export default function ContactModal({ isOpen, onClose, whatsappNumber }: ContactModalProps) {
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
        // 1. Save to Supabase
        const { error } = await supabase
            .from('leads')
            .insert([
                { 
                    name: formData.name, 
                    company: formData.company, 
                    phone: formData.phone,
                    message: formData.message,
                    status: 'NOVO'
                }
            ]);

        if (error) {
            console.error('Error saving lead:', error);
        }

        // 2. Redirect to WhatsApp
        const text = `Olá, me chamo ${formData.name} da empresa ${formData.company}. ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const whatsappLink = `https://wa.me/${cleanNumber}?text=${encodedText}`;
        
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
        
        // 3. Clear and close
        setFormData({ name: "", company: "", phone: "", message: "" });
        onClose();

    } catch (err) {
        console.error("Unexpected error:", err);
        alert("Ocorreu um erro ao processar seu contato. Por favor, tente novamente.");
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
          <h3 id="modal-title">Atendimento Técnico</h3>
          <p>Fale diretamente com nossa engenharia para orçamentos de moldes e injeção.</p>
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
              placeholder="Ex: Responsável Técnico / Compras"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Indústria / Empresa <span className="text-secondary">*</span></label>
            <input
              type="text"
              id="company"
              name="organization"
              autoComplete="organization"
              required
              placeholder="Sua Indústria"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">WhatsApp <span className="text-secondary">*</span></label>
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
            <label htmlFor="message">Assunto / Necessidade</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Breve descrição do seu projeto ou peça..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Processando..." : "SOLICITAR ATENDIMENTO"}
          </button>
          
          <p className="text-center mt-4" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
            Seus dados estão protegidos conforme nossa LGPD.
          </p>
        </form>
      </div>
    </div>
  );
}
