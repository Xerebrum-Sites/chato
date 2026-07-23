import { ImageIcon } from "lucide-react";

/**
 * Placeholder diseñado para las fotos de personas (argentinas / latinas) que
 * humanizarán el sitio. Deja un hueco visual integrado con la marca e indica
 * qué imagen debería ir.
 *
 * Reemplazo futuro: pasar `src` (y `alt`) y el componente renderiza la foto real
 * — no hace falta tocar el layout. Con `images.unoptimized` activo se usa <img>.
 */

interface ImagePlaceholderProps {
  /** Descripción de la foto que irá aquí (p.ej. "Comerciante respondiendo desde el celular"). */
  label: string;
  className?: string;
  /** Clase de redondeo Tailwind. */
  rounded?: string;
  /** Cuando se define, se renderiza la imagen real en lugar del placeholder. */
  src?: string;
  alt?: string;
}

export function ImagePlaceholder({
  label,
  className = "",
  rounded = "rounded-3xl",
  src,
  alt,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? label}
        className={`h-full w-full object-cover ${rounded} ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden border border-violet-100 bg-gradient-to-br from-violet-100 via-violet-50 to-cyan-50 ${rounded} ${className}`}
      role="img"
      aria-label={`Espacio para imagen: ${label}`}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, #be146e 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 p-5 text-center">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-violet-500 shadow-sm">
          <ImageIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="max-w-[16rem] text-xs font-medium leading-snug text-violet-700/80">
          {label}
        </span>
      </div>
    </div>
  );
}
