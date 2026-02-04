-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'NOVO' CHECK (status IN ('NOVO', 'EM_CONTATO', 'CONVERTIDO', 'ARQUIVADO')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) is BEST PRACTICE
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (anon) to INSERT leads (public form)
CREATE POLICY "Allow public insert to leads" 
ON leads FOR INSERT 
TO anon 
WITH CHECK (true);

-- Policy: Allow only authenticated users (staff) to VIEW leads
-- (You will need to create users in Auth later for the admin panel)
CREATE POLICY "Allow authenticated read access" 
ON leads FOR SELECT 
TO authenticated 
USING (true);

-- Create site_config table for editable text
CREATE TABLE IF NOT EXISTS site_config (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Seed initial data for site config
INSERT INTO site_config (key, value, description) VALUES
('whatsapp_number', '5541998202737', 'WhatsApp do Eleandro (Vendas)'),
('contact_email', 'contato@ouroplas.com.br', 'Email principal de contato'),
('hero_title', 'Injeção de Plásticos com Precisão e Qualidade', 'Título principal da Home')
ON CONFLICT (key) DO NOTHING;

-- Allow public read of config (since it's displayed on the site)
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to config" 
ON site_config FOR SELECT 
TO anon 
USING (true);
