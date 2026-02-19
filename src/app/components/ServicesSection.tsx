import Image from "next/image";

export default function ServicesSection() {
  const differentials = [
    { 
      title: "Moldagem de Precisão", 
      desc: "Equipe técnica dedicada à otimização de moldes para garantia de produtividade máxima.", 
      img: "/gallery/como_trabalhamos.jpg" 
    },
    { 
      title: "Injeção em Escala", 
      desc: "Capacidade diversificada com injetoras de 80 a 300 toneladas atendendo diversos setores.", 
      img: "/gallery/oquefazemos_ouroplas.jpg" 
    },
    { 
      title: "Eco Industrial", 
      desc: "Compromisso com o reaproveitamento e eficiência energética em toda a linha fabril.", 
      img: "/gallery/nossos_diferenciais.jpg" 
    }
  ];

  const services = [
    { title: "Desenvolvimento de Moldes", description: "Criação técnica e precisa para garantir o melhor produtividade da sua peça." },
    { title: "Injeção Técnica", description: "Capacidade produtiva com injetoras de 80 a 300 toneladas para diversos setores." },
    { title: "Controle de Qualidade", description: "Processos rigorosos e padronizados para garantir excelência em cada lote." },
    { title: "Logística Nacional", description: "Entrega gratuita em Curitiba e envios ágeis para todo o território nacional." }
  ];

  return (
    <>
      <section id="especialista" className="section bg-section">
        <div className="container">
          <div className="section-header text-center mb-16">
            <span className="text-secondary font-bold uppercase tracking-wider text-sm mb-2 block">Alta Performance</span>
            <h2 className="text-4xl">Diferenciais Estratégicos</h2>
          </div>
          
          <div className="grid grid-3">
            {differentials.map((item, idx) => (
              <div key={idx} className="glass-card group hover:scale-hover transition-all">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 shadow-lg">
                  <Image 
                    src={item.img} 
                    alt={item.title} 
                    fill 
                    className="img-cover grayscale group-hover:grayscale-0 transition-all" 
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-secondary w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
                <h3 className="mb-4 text-2xl">{item.title}</h3>
                <p className="text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid de Diferenciais Finais */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-4 gap-12">
            {services.map((service, index) => (
              <div key={index} className="service-finish-card group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-1 bg-secondary group-hover:w-12 transition-all"></div>
                  <h4 className="text-xl font-bold group-hover:text-secondary transition-colors">{service.title}</h4>
                </div>
                <p className="text-muted leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
