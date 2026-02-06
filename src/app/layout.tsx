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
  title: "Ouroplas | Injeção de Plásticos com Precisão e Qualidade",
  description: "Especialistas em injeção plástica técnica, moldes e peças de alta precisão. Soluções industriais em polímeros com qualidade certificada e entrega rápida.",
  keywords: ["injeção plástica", "peças técnicas", "moldes para plástico", "indústria de plásticos", "Ouroplas", "precisão industrial"],
  authors: [{ name: "Ouroplas Indústria" }],
  publisher: "Ouroplas",
  alternates: {
    canonical: "https://ouroplas-site.vercel.app", // Adjust if main domain changes
  },
  openGraph: {
    title: "Ouroplas | Injeção de Plásticos com Precisão",
    description: "Referência em injeção plástica técnica e moldagem de alta qualidade.",
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
