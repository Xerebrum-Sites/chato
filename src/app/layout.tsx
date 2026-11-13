import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { URLS } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const SITE_URL = URLS.landing;
const OG_IMAGE = `${SITE_URL}/og-image-v2.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Axtroos – Plataforma B2B omnicanal para equipos",
    template: "%s – Axtroos",
  },
  description:
    "La plataforma B2B omnicanal para conectar conversaciones, automatizar operaciones y potenciar equipos.",
  keywords: [
    "omnicanalidad",
    "telegram para empresas",
    "whatsapp business",
    "instagram mensajes",
    "atención al cliente",
    "plataforma B2B",
    "chat multicanal",
    "centralizar mensajes",
    "bandeja de entrada unificada",
    "CRM para pymes",
  ],
  authors: [{ name: "Axtroos", url: SITE_URL }],
  creator: "Axtroos",
  publisher: "Axtroos",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Axtroos",
    locale: "es_419",
    title: "Axtroos – Conversaciones que impulsan equipos",
    description:
      "Conectá conversaciones, automatizá operaciones y potenciá a tu equipo desde una plataforma B2B.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Axtroos – Plataforma B2B omnicanal para equipos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axtroos – Conversaciones que impulsan equipos",
    description:
      "Conectá conversaciones, automatizá operaciones y potenciá a tu equipo desde una plataforma B2B.",
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Axtroos",
  url: SITE_URL,
  description:
    "Plataforma B2B omnicanal para conectar conversaciones, automatizar operaciones y potenciar equipos.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "es",
  offers: {
    "@type": "Offer",
    category: "Prueba gratuita de 14 días",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/precios/`,
  },
  screenshot: OG_IMAGE,
  featureList: [
    "Integración con WhatsApp Business API",
    "Integración con Instagram Messenger",
    "Integración con Facebook Messenger",
    "Web Chat personalizable",
    "Bandeja de entrada omnicanal",
    "Gestión de equipos y agentes IA",
  ],
  publisher: {
    "@type": "Organization",
    name: "Axtroos",
    url: SITE_URL,
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
