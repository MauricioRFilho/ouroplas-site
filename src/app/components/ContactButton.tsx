import React from "react";


type ContactButtonProps = {
  label: string;
  className?: string;
  whatsappNumber?: string;
};

export default function ContactButton({ label, className, whatsappNumber }: ContactButtonProps) {
  const number = whatsappNumber || "5541998202737";
  const message = encodeURIComponent("Olá, gostaria de solicitar um orçamento.");
  const whatsappUrl = `https://wa.me/${number}?text=${message}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
      style={{ display: 'inline-block', textDecoration: 'none' }}
    >
      {label}
    </a>
  );
}

