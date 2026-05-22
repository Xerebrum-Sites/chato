import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const SITE_URL = "https://chato.xerebrumgroup.com";
const OG_IMAGE = `${SITE_URL}/og-image-v2.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cható – Omnicanalidad para pequeños comercios desde Telegram",
    template: "%s – Cható",
  },
  description:
    "Centraliza WhatsApp, Instagram, Facebook y Web Chat en Telegram. Responde a todos tus clientes desde un solo lugar. Simple, económico y sin complicaciones.",
  keywords: [
    "omnicanalidad",
    "telegram bot",
    "whatsapp business",
    "instagram mensajes",
    "atención al cliente",
    "pequeños comercios",
    "chat multicanal",
    "centralizar mensajes",
    "bandeja de entrada unificada",
    "CRM latinoamérica",
  ],
  authors: [{ name: "Xerebrum", url: SITE_URL }],
  creator: "Xerebrum",
  publisher: "Xerebrum",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cható",
    locale: "es_AR",
    title: "Cható – Todos tus canales, un solo lugar",
    description:
      "Centraliza WhatsApp, Instagram, Facebook y Web Chat en Telegram. Responde sin salir de tu app favorita. Desde $9/mes.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Cható – Omnicanalidad desde Telegram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ChatoApp",
    creator: "@Xerebrum",
    title: "Cható – Todos tus canales, un solo lugar",
    description:
      "Centraliza WhatsApp, Instagram, Facebook y Web Chat en Telegram. Desde $9/mes.",
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Cható",
  url: SITE_URL,
  description:
    "Plataforma de mensajería omnicanal que centraliza WhatsApp, Instagram, Facebook y Web Chat en Telegram para pequeños comercios y emprendedores.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Telegram",
  inLanguage: "es",
  offers: {
    "@type": "Offer",
    price: "9",
    priceCurrency: "USD",
    priceValidUntil: "2027-01-01",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/#precios`,
  },
  screenshot: OG_IMAGE,
  featureList: [
    "Integración con WhatsApp Business API",
    "Integración con Instagram Messenger",
    "Integración con Facebook Messenger",
    "Web Chat personalizable",
    "Bandeja de entrada en Telegram",
    "Sin app adicional necesaria",
  ],
  publisher: {
    "@type": "Organization",
    name: "Xerebrum",
    url: "https://xerebrumgroup.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-53MHF8RP');`}
        </Script>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-53MHF8RP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
