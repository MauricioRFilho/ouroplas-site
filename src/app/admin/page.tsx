"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import "./admin.css";

type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
};

type SiteConfig = {
  key: string;
  value: string;
  description: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  order_index: number;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "services" | "config">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [configs, setConfigs] = useState<SiteConfig[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ouroplas2024";
    
    if (password === adminPass) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      alert("Senha incorreta");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
      fetchConfigs();
      fetchServices();
    }
  }, [isAuthenticated]);

  async function fetchLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setLeads(data);
    if (error) console.error(error);
  }

  async function fetchConfigs() {
    const { data, error } = await supabase
      .from("site_config")
      .select("*")
      .order("key");
    
    if (data) setConfigs(data);
    if (error) console.error(error);
  }

  async function fetchServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("order_index");
    
    if (data) setServices(data);
    if (error) console.error(error);
  }

  async function updateLeadStatus(id: string, status: string) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
    
    if (!error) {
      fetchLeads();
    }
  }

  async function updateConfig(key: string, value: string) {
    setLoading(true);
    const { error } = await supabase
      .from("site_config")
      .update({ value })
      .eq("key", key);
    
    setLoading(false);
    if (!error) {
      setMessage("Configuração atualizada!");
      setTimeout(() => setMessage(""), 3000);
      fetchConfigs();
    }
  }

  async function updateService(id: string, updates: Partial<Service>) {
    setLoading(true);
    const { error } = await supabase
      .from("services")
      .update(updates)
      .eq("id", id);
    
    setLoading(false);
    if (!error) {
      setMessage("Serviço atualizado!");
      setTimeout(() => setMessage(""), 3000);
      fetchServices();
    }
  }

  async function addService() {
    const title = prompt("Título do serviço:");
    const description = prompt("Descrição do serviço:");
    if (!title || !description) return;

    setLoading(true);
    const { error } = await supabase
      .from("services")
      .insert([{ title, description, order_index: services.length + 1 }]);
    
    setLoading(false);
    if (!error) {
      setMessage("Serviço adicionado!");
      setTimeout(() => setMessage(""), 3000);
      fetchServices();
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;
    
    setLoading(true);
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);
    
    setLoading(false);
    if (!error) {
      setMessage("Serviço removido!");
      setTimeout(() => setMessage(""), 3000);
      fetchServices();
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="login-card animate-fade">
          <h1>Painel Administrativo</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button className="btn btn-primary btn-block" type="submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header animate-fade">
          <div className="logo">
            <span className="logo-text">OUROPLAS</span>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-secondary)', fontWeight: 'bold' }}>ADMIN</span>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
            onClick={() => {
              localStorage.removeItem("admin_auth");
              setIsAuthenticated(false);
            }}
          >
            Sair
          </button>
        </header>

        <div className="admin-tabs animate-fade">
          <button 
            className={`tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            Leads
          </button>
          <button 
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Serviços
          </button>
          <button 
            className={`tab-btn ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            Configurações
          </button>
        </div>

        {message && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
            {message}
          </div>
        )}

        <div className="admin-card animate-fade">
          {activeTab === 'leads' && (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Nome / Empresa</th>
                    <th>WhatsApp</th>
                    <th>Mensagem</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td>
                        <strong>{lead.name}</strong><br />
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{lead.company}</span>
                      </td>
                      <td>
                        <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" style={{ color: '#16a34a', fontWeight: 'bold' }}>
                          {lead.phone}
                        </a>
                      </td>
                      <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>{lead.message}</td>
                      <td>
                        <select 
                          className={`status-badge status-${lead.status.toLowerCase()}`}
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        >
                          <option value="NOVO">Novo</option>
                          <option value="EM_CONTATO">Em Contato</option>
                          <option value="CONVERTIDO">Convertido</option>
                          <option value="ARQUIVADO">Arquivado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-admin">
              <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                <button className="btn btn-primary" onClick={addService}>+ Novo Serviço</button>
              </div>
              {services.map((service) => (
                <div key={service.id} className="config-item" style={{ gridTemplateColumns: '1fr 2fr 150px' }}>
                  <div>
                    <input 
                      className="config-input" 
                      value={service.title} 
                      onChange={(e) => updateService(service.id, { title: e.target.value })}
                    />
                    <small>Ordem: {service.order_index}</small>
                  </div>
                  <textarea 
                    className="config-input" 
                    value={service.description} 
                    onChange={(e) => updateService(service.id, { description: e.target.value })}
                  />
                  <button className="btn btn-outline" style={{ color: 'red', borderColor: 'red' }} onClick={() => deleteService(service.id)}>Excluir</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'config' && (
            <div className="config-list">
              <div className="data-table-header" style={{ padding: '20px 24px', background: '#f1f5f9', fontWeight: 'bold', display: 'grid', gridTemplateColumns: '200px 1fr 100px', gap: '20px' }}>
                <span>Chave</span>
                <span>Valor</span>
                <span>Ação</span>
              </div>
              {configs.map((config) => (
                <ConfigItem key={config.key} config={config} onSave={updateConfig} loading={loading} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConfigItem({ config, onSave, loading }: { config: SiteConfig, onSave: (k: string, v: string) => void, loading: boolean }) {
  const [value, setValue] = useState(config.value);

  return (
    <div className="config-item">
      <div>
        <div className="config-key">{config.key}</div>
        <small style={{ color: '#94a3b8' }}>{config.description}</small>
      </div>
      <textarea 
        className="config-input" 
        value={value} 
        onChange={(e) => setValue(e.target.value)}
        rows={value.length > 50 ? 3 : 1}
      />
      <button 
        className="btn btn-primary" 
        onClick={() => onSave(config.key, value)}
        disabled={loading || value === config.value}
      >
        Salvar
      </button>
    </div>
  );
}
