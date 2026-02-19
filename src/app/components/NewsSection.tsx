import { supabase } from "@/lib/supabaseClient";

type NewsItem = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export default async function NewsSection() {
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
    return null;
  }

  if (!news || news.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-[var(--color-primary)]"></div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Novidades Ouroplas</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[var(--color-secondary)] hover:shadow-md transition-shadow">
              <span className="text-xs text-gray-500 mb-2 block">
                {new Date(item.created_at).toLocaleDateString("pt-BR")}
              </span>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
