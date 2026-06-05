const stats = [
  { value: "+500", label: "comercios activos" },
  { value: "5", label: "canales integrados" },
  { value: "< 2min", label: "para configurar" },
];

export function LogoStrip() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-400 font-medium uppercase tracking-widest mb-8">
          Confiado por emprendedores en toda Latinoamérica
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black gradient-text">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
