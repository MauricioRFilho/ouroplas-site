-- Create the news table for dynamic updates
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Allow public access (anon) to everything for now,
-- trusting the Admin Panel's application-level authentication.
CREATE POLICY "Allow anon full access to news"
ON news
FOR ALL
TO anon
USING (true)
WITH CHECK (true);
