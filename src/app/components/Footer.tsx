import Image from "next/image";

type FooterProps = {
  config: any;
};

export default function Footer({ config }: FooterProps) {
  return (
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
  );
}
