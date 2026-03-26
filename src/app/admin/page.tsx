"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  Settings, 
  Newspaper, 
  Save, 
  LogOut, 
  Plus, 
  Trash2, 
  ChevronRight,
  MessageSquare,
  Mail,
  Instagram,
  Phone,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import contentData from "../../data/content.json";
import "./admin.css";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState(contentData);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null, msg: string }>({ type: null, msg: "" });
  const [activeTab, setActiveTab] = useState<'config' | 'news'>('config');

  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        const data = await res.json();
        setLoginError(data.error || "Senha incorreta");
      }
    } catch (err) {
      setLoginError("Erro na conexão");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSave = async () => {
    setStatus({ type: 'loading', msg: "Sincronizando com GitHub..." });
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: "Alterações salvas! O site será atualizado em ~1 min." });
        setTimeout(() => setStatus({ type: null, msg: "" }), 5000);
      } else {
        setStatus({ type: 'error', msg: `Erro: ${data.details || data.error || "Falha ao salvar"}` });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: "Erro de conexão com o servidor" });
    }
  };

  const addNews = () => {
    const newItem = {
      id: Date.now().toString(),
      title: "Nova Notícia",
      content: "Escreva aqui o conteúdo da novidade...",
      created_at: new Date().toISOString()
    };
    setContent({ ...content, newsData: [newItem, ...content.newsData] });
    setActiveTab('news');
  };

  const removeNews = (id: string) => {
    setContent({ ...content, newsData: content.newsData.filter(n => n.id !== id) });
  };

  // Login View
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-bg-glow" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="login-card"
        >
          <div className="login-header-box" style={{ marginBottom: '40px' }}>
            <div className="login-icon-box">
              <Lock style={{ color: '#050A30', width: '32px', height: '32px' }} />
            </div>
            <h1 className="login-title">Login Admin</h1>
            <p className="login-subtitle">Ouroplas Industry</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Senha de Acesso</label>
              <div className="input-wrapper">
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="admin-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock className="input-icon" size={20} />
              </div>
            </div>
            
            {loginError && (
              <div style={{ color: '#ff4d4d', fontSize: '12px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>
                {loginError}
              </div>
            )}
            
            <button type="submit" className="btn-login" disabled={isLoggingIn}>
              {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : "Entrar no Painel"}
              {!isLoggingIn && <ChevronRight size={20} />}
            </button>
          </form>

          <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '32px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>
            <ArrowLeft size={16} /> Voltar para o Site
          </Link>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="dashboard-layout admin-body">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="logo-box">
            <LayoutDashboard style={{ color: '#050A30', width: '28px', height: '28px' }} />
          </div>
          <div className="logo-brand">OUROPLAS</div>
        </div>

        <nav className="nav-menu">
          <button 
            onClick={() => setActiveTab('config')}
            className={`nav-item ${activeTab === 'config' ? 'active' : 'inactive'}`}
          >
            <Settings size={20} />
            <span>Configuração Geral</span>
          </button>
          <button 
            onClick={() => setActiveTab('news')}
            className={`nav-item ${activeTab === 'news' ? 'active' : 'inactive'}`}
          >
            <Newspaper size={20} />
            <span>Blog / Novidades</span>
          </button>
        </nav>

        <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '32px' }}>
          <button 
            onClick={addNews}
            style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', cursor: 'pointer', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}
          >
            <Plus size={16} /> Novo Post
          </button>
          <button 
            onClick={() => setIsLoggedIn(false)}
            style={{ width: '100%', padding: '12px', background: 'transparent', color: '#f43f5e', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: '0.6' }}
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h2 className="header-title">
              {activeTab === 'config' ? 'Customização' : 'Novidades'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-secondary)' }} />
              <span className="header-subtitle">{activeTab === 'config' ? 'Edite os textos vitais do seu site' : 'Gerencie as notícias e atualizações'}</span>
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={status.type === 'loading'}
            className="btn-save"
          >
            {status.type === 'loading' ? <Loader2 className="animate-spin" size={24} color="#FFB300" /> : <Save size={24} color="#FFB300" />}
            Salvar Tudo
          </button>
        </header>

        {/* Status Toast */}
        <AnimatePresence>
          {status.type && status.type !== 'loading' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`status-toast ${status.type === 'success' ? 'toast-success' : 'toast-error'}`}
            >
              {status.type === 'success' ? <CheckCircle2 size={24} color="#10b981" /> : <AlertCircle size={24} color="#ef4444" />}
              <span>{status.msg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="admin-content-area">
          <AnimatePresence mode="wait">
            {activeTab === 'config' ? (
              <motion.div 
                key="config"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                {/* Hero section */}
                <div className="admin-card">
                  <div className="card-title-box">
                    <div className="card-icon"><LayoutDashboard size={24} /></div>
                    <h3 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>Home & Headline</h3>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Título de Impacto (Hero)</label>
                    <input 
                      type="text" 
                      className="text-input"
                      value={content.siteConfig.hero_title}
                      onChange={(e) => setContent({...content, siteConfig: {...content.siteConfig, hero_title: e.target.value}})}
                    />
                    <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>Dica: Use span com class &apos;text-secondary&apos; para destacar textos em dourado.</p>
                  </div>
                </div>

                {/* About section */}
                <div className="admin-card">
                  <div className="card-title-box">
                    <div className="card-icon"><Newspaper size={24} /></div>
                    <h3 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>Sobre a Ouroplas</h3>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Título da Sessão</label>
                    <input 
                      type="text" 
                      className="text-input"
                      value={content.siteConfig.about_title}
                      onChange={(e) => setContent({...content, siteConfig: {...content.siteConfig, about_title: e.target.value}})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Texto Institucional</label>
                    <textarea 
                      rows={6}
                      className="textarea-input"
                      value={content.siteConfig.about_text}
                      onChange={(e) => setContent({...content, siteConfig: {...content.siteConfig, about_text: e.target.value}})}
                      style={{ resize: 'none' }}
                    />
                  </div>
                </div>

                {/* Contact section */}
                <div className="admin-card">
                  <div className="card-title-box">
                    <div className="card-icon"><Phone size={24} /></div>
                    <h3 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>Canais & Redes</h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={16} color="#10b981" /> WhatsApp</label>
                      <input 
                        type="text" 
                        className="text-input"
                        value={content.siteConfig.whatsapp_number}
                        onChange={(e) => setContent({...content, siteConfig: {...content.siteConfig, whatsapp_number: e.target.value}})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} color="#3b82f6" /> Email</label>
                      <input 
                        type="text" 
                        className="text-input"
                        value={content.siteConfig.contact_email}
                        onChange={(e) => setContent({...content, siteConfig: {...content.siteConfig, contact_email: e.target.value}})}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Instagram size={16} color="#ec4899" /> Instagram</label>
                      <input 
                        type="text" 
                        className="text-input"
                        value={content.siteConfig.instagram_username}
                        onChange={(e) => setContent({...content, siteConfig: {...content.siteConfig, instagram_username: e.target.value}})}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="news"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {content.newsData.map((news, index) => (
                  <motion.div layout key={news.id} className="news-item">
                    <div style={{ position: 'absolute', top: '-10px', right: '40px', fontSize: '80px', fontWeight: '900', color: '#f8fafc', zIndex: 0 }}>{index + 1}</div>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ padding: '6px 16px', background: '#050A30', color: '#FFB300', borderRadius: '100px', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          Postado em {new Date(news.created_at).toLocaleDateString('pt-BR')}
                        </div>
                        <button onClick={() => removeNews(news.id)} className="btn-delete">
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="form-group">
                        <input 
                          type="text" 
                          placeholder="Título da Notícia"
                          style={{ background: 'transparent', border: 'none', borderBottom: '2px solid #f1f5f9', borderRadius: 0, padding: '12px 0', fontSize: '20px', fontWeight: '900', width: '100%', color: 'var(--color-primary)', outline: 'none' }}
                          value={news.title}
                          onChange={(e) => {
                            const newNews = [...content.newsData];
                            newNews[index].title = e.target.value;
                            setContent({...content, newsData: newNews});
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <textarea 
                          placeholder="Texto completo da novidade..."
                          rows={4}
                          style={{ background: 'transparent', border: 'none', padding: '12px 0', fontSize: '16px', fontWeight: '600', width: '100%', color: '#64748b', outline: 'none', resize: 'none' }}
                          value={news.content}
                          onChange={(e) => {
                            const newNews = [...content.newsData];
                            newNews[index].content = e.target.value;
                            setContent({...content, newsData: newNews});
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <button onClick={addNews} className="btn-add">
                  <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '20px' }}>
                    <Plus size={32} />
                  </div>
                  <span>Nova Notícia</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Sticky Save */}
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 1000 }} className="mobile-only">
        <button 
          onClick={handleSave}
          style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#FFB300', color: '#050A30', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <Save size={32} />
        </button>
      </div>
      
      <style jsx>{`
        @media (min-width: 993px) {
          .mobile-only { display: none; }
        }
      `}</style>
    </div>
  );
}
