interface BadgeProps {
  children: React.ReactNode;
  variant?: "violet" | "cyan" | "green" | "gray";
  className?: string;
}

const variantStyles = {
  violet: "bg-violet-100 text-violet-700 border border-violet-200",
  cyan: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  gray: "bg-gray-100 text-gray-600 border border-gray-200",
};

export function Badge({ children, variant = "violet", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
