import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

/**
 * Layout compartido por todas las páginas comerciales (home, producto, modos,
 * casos de uso, precios, herramientas, contacto). Aporta el mega menú y el
 * footer para las páginas comerciales.
 *
 * Las páginas legales viven fuera de este grupo y conservan su header propio.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
