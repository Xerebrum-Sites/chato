"use client";

import { useTrialDays } from "@/hooks/useTrialDays";

type TrialCopyVariant = "cta" | "compact" | "sentence";

interface TrialCopyProps {
  variant?: TrialCopyVariant;
}

/** Texto comercial de prueba, alimentado por la configuración del Backoffice. */
export function TrialCopy({ variant = "cta" }: TrialCopyProps) {
  const trialDays = useTrialDays();

  if (variant === "compact") {
    return <>{trialDays ? `${trialDays} días gratis` : "Prueba gratis"}</>;
  }

  if (variant === "sentence") {
    return <>{trialDays ? `${trialDays} días gratis para probar, sin tarjeta.` : "Probá Axtroos gratis, sin tarjeta."}</>;
  }

  return <>{trialDays ? `Empezar gratis ${trialDays} días` : "Empezar gratis"}</>;
}
