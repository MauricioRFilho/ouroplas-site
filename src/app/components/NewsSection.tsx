import { newsData } from "@/data/site-data";

export default function NewsSection() {
  if (!newsData || newsData.length === 0) {
    return null;
  }

  return (
    <section className="section bg-gray-soft" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ height: '2rem', width: '4px', backgroundColor: 'var(--color-secondary)', borderRadius: '2px' }}></div>
          <h2 style={{ margin: 0 }}>Novidades Ouroplas</h2>
        </div>
        
        <div className="grid grid-3">
          {newsData.map((item) => (
            <div key={item.id} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <span className="text-sm" style={{ color: 'var(--color-secondary)', fontWeight: 600, marginBottom: '0.5rem', display: 'block' }}>
                {new Date(item.created_at).toLocaleDateString("pt-BR")}
              </span>
              <h3 className="mb-4" style={{ fontSize: '1.25rem' }}>{item.title}</h3>
              <p className="leading-relaxed" style={{ fontSize: '0.95rem' }}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
