"use client";

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet-700 to-violet-600 text-white hover:from-violet-800 hover:to-violet-700 shadow-md hover:shadow-glow active:scale-[0.98]",
  secondary:
    "bg-cyan-500 text-white hover:bg-cyan-600 shadow-md active:scale-[0.98]",
  ghost:
    "bg-transparent text-violet-700 hover:bg-violet-50 active:scale-[0.98]",
  outline:
    "bg-white border-2 border-violet-200 text-violet-700 hover:border-violet-500 hover:bg-violet-50 active:scale-[0.98]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, href, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";
    const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
