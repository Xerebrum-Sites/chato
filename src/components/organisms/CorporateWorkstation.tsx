import { ArrowUpRight, Building2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { EMAILS } from "@/lib/config";

const inquiry = new URLSearchParams({
  subject: "Consulta comercial · Axtroos Workstation corporativa",
  body: "Hola, quisiera una propuesta corporativa para mi empresa.\n\nEmpresa:\nVolumen mensual aproximado de conversaciones:\nNecesidades de IA, almacenamiento o integración:\n",
}).toString().replaceAll("+", "%20");

export function CorporateWorkstation() {
  return (
    <section id="corporativo" aria-labelledby="corporativo-title"
      className="relative isolate scroll-mt-24 overflow-hidden rounded-[2rem] bg-actros-navy px-6 py-9 text-white sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,#852051,transparent_57%)]" />
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-orange-200">
            <Building2 aria-hidden="true" className="size-5" /> Soluciones corporativas
          </p>
          <h2 id="corporativo-title" className="text-balance text-3xl font-black tracking-tight sm:text-4xl">
            Una Workstation a medida de tu operación
          </h2>
          <p className="mt-4 max-w-prose text-pretty leading-relaxed text-white/85">
            Si tu empresa atiende un gran volumen de conversaciones o necesita más créditos de IA o almacenamiento que los disponibles en el cotizador, contanos cómo trabaja tu equipo. Ventas te ayuda a dimensionar los recursos y preparar una propuesta personalizada.
          </p>
        </div>
        <Button variant="secondary" href={`mailto:${EMAILS.contact}?${inquiry}`} className="self-start lg:self-center">
          Contactar a ventas <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
        </Button>
      </div>
    </section>
  );
}
