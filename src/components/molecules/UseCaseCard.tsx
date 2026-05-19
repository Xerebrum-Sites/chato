interface UseCaseCardProps {
  icon: string;
  sector: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
}

export function UseCaseCard({ icon, sector, title, problem, solution, result }: UseCaseCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 transition-all duration-300 group">
      <div className="bg-gradient-to-br from-violet-50 to-cyan-50 p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">{sector}</span>
            <h3 className="font-bold text-gray-900 text-base">{title}</h3>
          </div>
        </div>
        <p className="text-sm text-gray-500 italic">"{problem}"</p>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <span className="text-xs font-bold text-violet-700 uppercase tracking-wide">Cómo ayuda Cható</span>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{solution}</p>
        </div>
        <div className="flex items-start gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
          <p className="text-sm text-emerald-700 font-medium">{result}</p>
        </div>
      </div>
    </div>
  );
}
