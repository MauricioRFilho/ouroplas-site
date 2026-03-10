import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: "#050A30",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Ouroplas | Injeção Plástica Industrial e Moldes Técnicos",
  description: "Líder em injeção de termoplásticos e moldagem técnica em Curitiba. Injetoras de 80 a 300 toneladas, desenvolvimento de moldes e soluções industriais de alta precisão para todo o Brasil.",
  keywords: [
    "injeção plástica Curitiba", 
    "termoplásticos", 
    "moldes de precisão", 
    "injeção 300 toneladas", 
    "peças técnicas plásticas", 
    "Ouroplas", 
    "indústria polímeros Paraná", 
    "ferramentaria Curitiba",
    "injeção técnica",
    "terceirização de injeção plástica"
  ],
  authors: [{ name: "Ouroplas Indústria" }],
  publisher: "Ouroplas",
  alternates: {
    canonical: "https://www.ouroplas.com.br",
  },
  metadataBase: new URL("https://www.ouroplas.com.br"),
  verification: {
    google: "google-site-verification-code", // O usuário deve inserir o código real do Console futuramente
  },
  openGraph: {
    title: "Ouroplas | Injeção Plástica e Moldagem Industrial de Precisão",
    description: "Soluções completas em injeção de termoplásticos com máquinas de até 300 toneladas. Qualidade e precisão industrial em Curitiba.",
    url: "https://www.ouroplas.com.br",
    siteName: "Ouroplas",
    images: [
      {
        url: "/ouroplas-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Ouroplas Indústria de Plásticos",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ouroplas | Injeção Técnica de Plásticos",
    description: "Referência em moldes e injeção técnica industrial em Curitiba.",
    images: ["/ouroplas-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.jpg" sizes="any" />
      </head>
      <body className={inter.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ManufacturingPlant",
              "name": "Ouroplas Indústria e Comércio de Plásticos",
              "url": "https://www.ouroplas.com.br",
              "logo": "https://www.ouroplas.com.br/ouroplas-logo.jpg",
              "image": "https://www.ouroplas.com.br/gallery/oquefazemos_ouroplas.jpg",
              "description": "Especialistas em injeção de termoplásticos técnicos e desenvolvimento de moldes. Capacidadade industrial com injetoras de 80 a 300 toneladas.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Curitiba, Paraná",
                "addressLocality": "Curitiba",
                "addressRegion": "PR",
                "postalCode": "80000-000",
                "addressCountry": "BR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -25.4284,
                "longitude": -49.2733
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-41-99820-2737",
                "contactType": "sales",
                "areaServed": "BR",
                "availableLanguage": "Portuguese"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.instagram.com/ouroplas/"
              ]
            })
          }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
