"use client";
import { useState } from "react";
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
            // We continue to WhatsApp even if persistence fails, 
            // so we don't block the user.
        }

        // 2. Redirect to WhatsApp
        const text = `Olá, me chamo ${formData.name} da empresa ${formData.company}. ${formData.message}`;
        const encodedText = encodeURIComponent(text);
        
        const cleanNumber = whatsappNumber.replace(/\D/g, '');
        const whatsappLink = `https://wa.me/${cleanNumber}?text=${encodedText}`;
        
        window.open(whatsappLink, '_blank');
        
        // 3. Clear and close
        setFormData({ name: "", company: "", phone: "", message: "" });
        onClose();

    } catch (err) {
        console.error("Unexpected error:", err);
        alert("Ocorreu um erro. Tente novamente ou nos chame direto no WhatsApp.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
    }}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h3>Falar com Especialista</h3>
          <p>Preencha para iniciarmos seu atendimento personalizado.</p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input
              type="text"
              id="name"
              required
              placeholder="Ex: João Silva"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Empresa</label>
            <input
              type="text"
              id="company"
              required
              placeholder="Ex: Ouroplas Indústria"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Telefone / WhatsApp</label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Como podemos ajudar?</label>
            <textarea
              id="message"
              rows={3}
              placeholder="Gostaria de um orçamento para..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar Conversa no WhatsApp"}
          </button>
        </form>
      </div>
    </div>
  );
}
