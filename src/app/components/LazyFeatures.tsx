"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import ContactModal from './ContactModal';
import LazyVideo from './LazyVideo';

const InstagramFeed = dynamic(() => import('./InstagramFeed'), { 
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
  ssr: false 
});



interface SiteConfig {
  hero_title: string;
  about_title: string;
  about_text: string;
  whatsapp_number: string;
  contact_email: string;
  instagram_username: string;
  instagram_url: string;
}

type LazyFeaturesProps = {
  config: SiteConfig;
};

export default function LazyFeatures({ config }: LazyFeaturesProps) {

  return (
    <>
      <section className="relative section py-0 overflow-hidden bg-primary">
        <div className="relative aspect-video tech-banner">
          <LazyVideo 
            src="/hero-lite.mp4" 
            className="img-cover gold-filter opacity-40" 
          />
          <div className="absolute-fill flex-center text-center">
            <div className="container max-w-4xl px-6">
              <h2 className="text-white text-4xl sm:text-6xl font-bold mb-6">Alta Escala Industrial</h2>
              <p className="text-white mb-10 text-xl sm:text-2xl">Precisão milimétrica em cada ciclo de injeção.</p>
              {/* Note: This button being inside LazyFeatures might delay it slightly, but it's far down the page */}
            </div>
          </div>
        </div>
      </section>

      <InstagramFeed username={config.instagram_username} url={config.instagram_url} />

    </>
  );
}

