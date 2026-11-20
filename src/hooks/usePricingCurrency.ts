"use client";

import { useEffect, useState } from "react";

export type PricingCurrency = "ARS" | "USD";

async function detectCountry(): Promise<string> {
  const paths = new Set([
    new URL("/cdn-cgi/trace", window.location.origin).href,
    "https://axtroos.com/cdn-cgi/trace",
  ]);
  for (const url of paths) {
    try {
      const response = await fetch(url, {
        credentials: "omit", cache: "no-store", signal: AbortSignal.timeout(3500),
      });
      if (!response.ok) continue;
      const country = (await response.text()).match(/^loc=([A-Z]{2})$/m)?.[1];
      if (country) return country;
    } catch {
      // En previews locales consultamos el dominio público si no hay traza propia.
    }
  }
  return "XX";
}

/**
 * Moneda de presentación de la landing.
 *
 * Argentina ve ARS; el resto del mundo ve USD. No se usa para decidir qué
 * proveedor cobra: esa decisión vive en el backend y se confirma con la
 * tarjeta emisora durante el checkout.
 */
export function usePricingCurrency(): PricingCurrency | null {
  const [currency, setCurrency] = useState<PricingCurrency | null>(null);

  useEffect(() => {
    let mounted = true;

    detectCountry().then((country) => {
      if (mounted) setCurrency(country === "AR" ? "ARS" : "USD");
    });

    return () => {
      mounted = false;
    };
  }, []);

  return currency;
}
