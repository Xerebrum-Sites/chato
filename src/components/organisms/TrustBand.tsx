import { ChannelIcon } from "@/components/atoms/ChannelIcon";
import { IconBadge } from "@/components/atoms/IconBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/atoms/Reveal";
import { supportedChannels, trustSignals } from "@/lib/content";

/**
 * Franja de canales + señales de producto. Reemplaza a la vieja "prueba social"
 * basada en cantidad de clientes (el producto es pre-lanzamiento).
 */
export function TrustBand() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-sm text-gray-400 font-medium uppercase tracking-widest mb-6">
            Todos tus canales, un solo lugar
          </p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {supportedChannels.map((c) => (
              <ChannelIcon key={c} channel={c} size="md" showLabel />
            ))}
          </div>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {trustSignals.map((s) => (
            <StaggerItem
              key={s.title}
              className="flex flex-col items-center text-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-6"
            >
              <IconBadge icon={s.icon} size="md" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
