interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, highlight, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-300 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4 group-hover:bg-violet-100 transition-colors duration-200">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      {highlight && (
        <div className="mt-4 inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          {highlight}
        </div>
      )}
    </div>
  );
}
