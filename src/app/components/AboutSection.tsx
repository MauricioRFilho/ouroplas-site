import Image from "next/image";

type AboutProps = {
  title: string;
  text: string;
};

export default function AboutSection({ title, text }: AboutProps) {
  return (
    <section id="sobre" className="section bg-white">
      <div className="container">
        <div className="about-grid grid-60-40">
          <div className="pr-large order-2 sm:order-1">
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-4 block">📍 Curitiba | Atendimento Nacional</span>
            <h2 className="mb-6">{title}</h2>
            <p className="mb-8 text-lg">
              {text}
              <br /><br />
              <strong>Parcerias sólidas e resultados consistentes em cada projeto industrial.</strong>
            </p>
            <div className="flex gap-10">
              <div className="border-l-4 border-secondary pl-6">
                <h4 className="text-secondary text-3xl font-black">24/7</h4>
                <p className="text-xs uppercase font-bold tracking-widest text-primary/50">Operação</p>
              </div>
              <div className="border-l-4 border-secondary pl-6">
                <h4 className="text-secondary text-3xl font-black">300T</h4>
                <p className="text-xs uppercase font-bold tracking-widest text-primary/50">Poder de Fogo</p>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl order-1 sm:order-2 h-full min-h-[400px]">
             {/* Optimized Video replacing GIF */}
             <video 
               autoPlay 
               muted 
               loop 
               playsInline 
               className="img-cover gold-filter object-cover w-full h-full"
               poster="/ouroplas-logo.jpg"
             >
               <source src="/hero-lite.mp4" type="video/mp4" />
             </video>
             
             <div className="absolute-fill flex-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: 'rgba(5, 10, 48, 0.4)' }}>
                <span className="text-white font-bold tracking-widest uppercase text-sm">Produção Real</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
