import Script from "next/script";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { URLS } from "@/lib/config";

const WIDGET_SRC = `${URLS.api}/api/chat/chato/widget.js`;

/**
 * Layout compartido por todas las páginas comerciales (home, producto, modos,
 * casos de uso, precios, herramientas, contacto). Aporta el mega menú, el footer
 * y el widget de chat, que así aparecen en todo el sitio con una sola fuente.
 *
 * Las páginas legales viven fuera de este grupo y conservan su header propio.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* El botón flotante + panel de chat vienen del widget público para que
          chato.xerebrumgroup.com renderice la misma UI que recibe cada tenant. */}
      <Script src={WIDGET_SRC} strategy="afterInteractive" />
    </>
  );
}
