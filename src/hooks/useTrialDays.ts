"use client";

import { useEffect, useState } from "react";
import { URLS } from "@/lib/config";

interface TrialDaysResponse {
  trial_days: number;
}

/**
 * Lee la duración vigente de prueba desde la configuración comercial. El
 * frontend nunca asume una duración: Backoffice es la fuente de verdad.
 */
export function useTrialDays(): number | null {
  const [trialDays, setTrialDays] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${URLS.api}/api/public/trial-days`, {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: TrialDaysResponse | null) => {
        const days = payload?.trial_days;
        setTrialDays(typeof days === "number" && days > 0 ? days : null);
      })
      .catch(() => {
        if (!controller.signal.aborted) setTrialDays(null);
      });

    return () => controller.abort();
  }, []);

  return trialDays;
}
