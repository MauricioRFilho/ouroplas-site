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
    canonical: "https://ouroplas.com.br", // Link oficial
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
