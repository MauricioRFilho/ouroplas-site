"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

type ContactButtonProps = {
  label: string;
  className?: string;
  whatsappNumber?: string;
};

export default function ContactButton({ label, className, whatsappNumber }: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setIsOpen(true)}>
        {label}
      </button>
      <ContactModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
