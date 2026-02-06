import Image from "next/image";

/* 
  NOTE: Static curated gallery for performance and reliability.
  Images should be placed in public/instagram/ as post1.jpg, post2.jpg, etc.
*/

interface InstagramFeedProps {
  username?: string;
  url?: string;
}

export default function InstagramFeed({ username = "@ouroplas", url = "https://instagram.com/ouroplas" }: InstagramFeedProps) {
  const posts = [
    { id: 1, image: '/instagram/post1.jpg', link: url, likes: 124 },
    { id: 2, image: '/instagram/post2.jpg', link: url, likes: 89 },
    { id: 3, image: '/instagram/post3.jpg', link: url, likes: 256 },
    { id: 4, image: '/instagram/post4.jpg', link: url, likes: 142 },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="section-header">
          <div className="flex items-center justify-center gap-2 mb-4">
             {/* Instagram Icon */}
            <svg viewBox="0 0 24 24" width="32" height="32" fill="url(#ig-gradient)">
               <defs>
                <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f09433" />
                  <stop offset="25%" stopColor="#e6683c" />
                  <stop offset="50%" stopColor="#dc2743" />
                  <stop offset="75%" stopColor="#cc2366" />
                  <stop offset="100%" stopColor="#bc1888" />
                </linearGradient>
              </defs>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <h2 className="text-3xl font-bold text-gray-800">Siga a Ouroplas</h2>
          </div>
          <p>Acompanhe nosso dia a dia e novidades da fábrica no Instagram {username}</p>
        </div>

        <div className="instagram-grid">
            {posts.map((post) => (
                <a href={post.link} target="_blank" key={post.id} className="insta-card group">
                   <div className="relative w-full h-full bg-gray-200">
                      <Image 
                        src={post.image} 
                        alt={`Instagram post ${post.id}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="insta-overlay">
                          <span>❤️ {post.likes}</span>
                      </div>
                   </div>
                </a>
            ))}
        </div>
        
        <div className="text-center mt-8">
            <a href={url} target="_blank" className="btn btn-outline" style={{borderColor: '#E1306C', color: '#E1306C'}}>
                Ver Perfil Completo
            </a>
        </div>

      </div>
    </section>
  );
}

