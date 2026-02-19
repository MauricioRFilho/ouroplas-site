import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
  title: "Ouroplas | Injeção Plástica Técnica e Desenvolvimento de Moldes",
  description: "Especialistas em injeção plástica de precisão em Curitiba. Desenvolvimento de moldes industriais, injeção de 80 a 300 toneladas e soluções completas em polímeros para indústrias de todo o Brasil.",
  keywords: ["injeção plástica Curitiba", "desenvolvimento de moldes", "injeção técnica de plásticos", "peças plásticas industriais", "Ouroplas", "injetoras 300 toneladas", "indústria polímeros Brasil", "moldes sob medida"],
  authors: [{ name: "Ouroplas Indústria" }],
  publisher: "Ouroplas",
  alternates: {
    canonical: "/",
  },
  metadataBase: new URL("https://ouroplas.com.br"),
  verification: {
    google: "google-site-verification-code", // Placeholder
  },
  openGraph: {
    title: "Ouroplas | Soluções Completas em Injeção Plástica",
    description: "Referência técnica em moldes e injeção plástica de alta performance para grandes demandas industriais.",
    url: "https://ouroplas-site.vercel.app",
    siteName: "Ouroplas",
    images: [
      {
        url: "/ouroplas-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Ouroplas Indústria e Comércio",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ouroplas | Injeção de Plásticos Industrial",
    description: "Peças técnicas e moldes com máxima precisão.",
    images: ["/ouroplas-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
              "url": "https://ouroplas.com.br",
              "logo": "https://ouroplas.com.br/ouroplas-logo.jpg",
              "description": "Especialistas em injeção de peças plásticas técnicas e desenvolvimento de moldes em Curitiba.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua da Indústria, 100", // Needs actual address update if known
                "addressLocality": "Curitiba",
                "addressRegion": "PR",
                "postalCode": "80000-000",
                "addressCountry": "BR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-41-99820-2737",
                "contactType": "sales",
                "areaServed": "BR",
                "availableLanguage": "Portuguese"
              },
              "sameAs": [
                "https://www.instagram.com/ouroplas/"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
