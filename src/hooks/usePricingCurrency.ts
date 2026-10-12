"use client";

import { useEffect, useState } from "react";

export type PricingCurrency = "ARS" | "USD";

async function detectCountry(): Promise<string> {
  try {
    // Cloudflare expone el país de la conexión sin pedir datos personales.
    // Es una pista de presentación: el checkout valida la tarjeta emisora.
    const response = await fetch("/cdn-cgi/trace", { cache: "no-store" });
    if (!response.ok) throw new Error("country trace unavailable");

    const trace = await response.text();
    return trace.match(/loc=([A-Z]{2})/)?.[1] ?? "XX";
  } catch {
    // El fallback permite que previews y navegadores sin Cloudflare sigan
    // mostrando ARS a visitantes argentinos. Ante duda, mostramos USD.
    return navigator.language?.toUpperCase().startsWith("ES-AR") ? "AR" : "XX";
  }
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
