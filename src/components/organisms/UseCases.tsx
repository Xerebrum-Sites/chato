import { Badge } from "@/components/atoms/Badge";
import { UseCaseCard } from "@/components/molecules/UseCaseCard";

const useCases = [
  {
    icon: "👗",
    sector: "Moda y Ropa",
    title: "Tienda de ropa local",
    problem: "Me escriben por WhatsApp, Instagram y Facebook preguntando por tallas. Termino perdiendo ventas.",
    solution:
      "Todos los mensajes de tus canales llegan a Telegram. Usa la etiqueta #consulta_talla para agruparlos y responde desde ahí con fotos del producto directamente al canal del cliente.",
    result: "Responde en segundos a clientes de 3 canales sin salir de Telegram",
  },
  {
    icon: "🍕",
    sector: "Delivery y Comida",
    title: "Servicio de delivery",
    problem: "Tomo pedidos por WhatsApp, pero a veces me llegan por Instagram y se me pasan.",
    solution:
      "Configura respuestas automáticas como '/menu' que envía tu lista de precios. Los pedidos llegan etiquetados con #pedido y los puedes marcar como #en_camino cuando salen.",
    result: "Cero pedidos perdidos + confirmaciones automáticas por el canal de origen",
  },
  {
    icon: "🏥",
    sector: "Salud",
    title: "Consultorio médico independiente",
    problem: "Los pacientes piden citas por WhatsApp, Messenger y hasta por comentarios de Instagram.",
    solution:
      "Cada solicitud de cita llega ordenada en Telegram. Confirmas la cita respondiendo y el paciente recibe la confirmación en su canal preferido, con recordatorio automático 24h antes.",
    result: "Agenda llena sin secretaria adicional, cancelaciones reducidas en un 40%",
  },
  {
    icon: "🔧",
    sector: "Servicios técnicos",
    title: "Técnico de reparaciones",
    problem: "Trabajo solo y no puedo revisar 4 apps mientras estoy en el trabajo de campo.",
    solution:
      "Telegram funciona con notificaciones push mientras trabajas. Ves todos los mensajes de clientes nuevos, los etiquetas por prioridad y respondes cuando terminas el trabajo en curso.",
    result: "Atención profesional incluso estando solo, sin perder clientes esperando",
  },
  {
    icon: "💄",
    sector: "Belleza y Estética",
    title: "Salón de belleza",
    problem: "Necesito que mis dos estilistas puedan atender mensajes, pero no puedo darles acceso a mi WhatsApp personal.",
    solution:
      "Añade a tus estilistas como agentes en Cható. Cada una atiende su canal asignado desde Telegram y el historial es compartido, sin mezclar sus cuentas personales.",
    result: "Equipo de 3 personas atendiendo clientes de 4 canales desde sus propios dispositivos",
  },
  {
    icon: "📚",
    sector: "Educación",
    title: "Academia o clases particulares",
    problem: "Padres y alumnos me preguntan por horarios, precios y pagos en diferentes momentos y canales.",
    solution:
      "Crea respuestas rápidas para las preguntas más frecuentes: /horarios, /precios, /inscripcion. El 70% de consultas se resuelven automáticamente antes de que respondas.",
    result: "Menos tiempo respondiendo lo mismo, más tiempo enseñando",
  },
];

export function UseCases() {
  return (
    <section id="casos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="green" className="mb-4">
            Casos de uso reales
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Hecho para negocios{" "}
            <span className="gradient-text">como el tuyo</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            No importa tu sector. Si tienes clientes que te escriben por más de un canal,
            Cható está hecho para ti.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.title} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}
