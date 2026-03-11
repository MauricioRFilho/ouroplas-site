import Link from "next/link";
import LazyVideo from "./LazyVideo";
import ContactButton from "./ContactButton"; // We'll create a small client component for the button

type HeroProps = {
  title: string;
};

export default function Hero({ title }: HeroProps) {
  return (
    <section id="home" className="hero">
      <LazyVideo 
        src="/hero-lite.mp4" 
        poster="/ouroplas-logo.jpg" 
        className="hero-video gold-filter" 
      />
      <div className="video-overlay"></div>
      <div className="container">
        <div className="hero-content text-left">
          <h1 className="text-4xl sm:text-7xl font-bold mb-8 leading-tight text-white" 
              dangerouslySetInnerHTML={{ __html: title.replace('Precisão', '<span class="text-secondary">Precisão</span>') }}>
          </h1>
          <p className="max-w-2xl mb-12 text-white/90 text-lg sm:text-2xl italic font-light">
            Suporte técnico especializado e garantia de entrega pronta para escalar seu projeto.
          </p>
          <div className="hero-buttons">
            <ContactButton label="Solicitar Orçamento" className="btn btn-primary btn-lg px-10" />
            <Link href="#sobre" className="btn btn-outline btn-lg px-10">Ver Nossa Fábrica</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
