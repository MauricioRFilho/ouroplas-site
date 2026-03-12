import Image from "next/image";

interface SiteConfig {
  hero_title: string;
  about_title: string;
  about_text: string;
  whatsapp_number: string;
  contact_email: string;
  instagram_username: string;
  instagram_url: string;
}

type FooterProps = {
  config: SiteConfig;
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
            <a href={`mailto:${config.contact_email}`} className="font-bold text-lg text-white hover:text-secondary transition-colors block mb-1">
              {config.contact_email}
            </a>
            <p className="text-white/30 text-xs italic">Atendimento Técnico Comercial</p>
          </div>

          <div className="footer-col sm:items-end sm:text-right">
            <h4 className="text-secondary uppercase tracking-[0.2em] text-xs font-bold mb-2">Atendimento Direto</h4>
            <div className="text-3xl sm:text-4xl font-black text-white mb-4">
              {config.whatsapp_number ? (
                <a href={`https://wa.me/${config.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  +55 ({config.whatsapp_number.slice(2,4)}) {config.whatsapp_number.slice(4,9)}-{config.whatsapp_number.slice(9)}
                </a>
              ) : (
                <a href="https://wa.me/5541998202737" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  +55 (41) 99820-2737
                </a>
              )}
            </div>
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
