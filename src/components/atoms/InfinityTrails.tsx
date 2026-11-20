import { useId } from "react";

type InfinityTrailsProps = {
  tone?: "hero" | "dark" | "light";
  className?: string;
};

/**
 * Estelas de marca Axtroos. El recorrido abierto sugiere el isotipo infinito
 * sin convertirlo en una figura literal ni competir con el contenido.
 */
export function InfinityTrails({ tone = "dark", className = "" }: InfinityTrailsProps) {
  const instanceId = useId().replace(/:/g, "");
  const id = `infinity-${tone}-${instanceId}`;
  const opacity = tone === "light" ? 0.42 : tone === "hero" ? 0.9 : 0.7;

  return (
    <svg
      viewBox="0 0 1440 620"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`infinity-trails pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-primary`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ee7d16" stopOpacity="0" />
          <stop offset="0.16" stopColor="#ee7d16" />
          <stop offset="0.49" stopColor="#e94967" />
          <stop offset="0.73" stopColor="#c61261" />
          <stop offset="1" stopColor="#c61261" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-reverse`} x1="1" x2="0" y1="0" y2="0">
          <stop offset="0" stopColor="#ee7d16" stopOpacity="0" />
          <stop offset="0.18" stopColor="#ee7d16" />
          <stop offset="0.5" stopColor="#e94967" />
          <stop offset="0.82" stopColor="#c61261" />
          <stop offset="1" stopColor="#c61261" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-mist`} x="-20%" y="-70%" width="140%" height="240%">
          <feGaussianBlur stdDeviation="29" />
        </filter>
        <filter id={`${id}-soft`} x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <g className="infinity-trails__drift" opacity={opacity}>
        <path
          d="M -130 476 C 94 155, 326 684, 611 388 C 857 132, 1106 655, 1394 284 C 1482 171, 1540 164, 1600 141"
          fill="none"
          stroke={`url(#${id}-primary)`}
          strokeLinecap="round"
          strokeWidth="106"
          opacity="0.24"
          filter={`url(#${id}-mist)`}
        />
        <path
          d="M -130 476 C 94 155, 326 684, 611 388 C 857 132, 1106 655, 1394 284 C 1482 171, 1540 164, 1600 141"
          fill="none"
          stroke={`url(#${id}-primary)`}
          strokeLinecap="round"
          strokeWidth="43"
          opacity="0.56"
          filter={`url(#${id}-soft)`}
        />
        <path
          d="M -130 476 C 94 155, 326 684, 611 388 C 857 132, 1106 655, 1394 284 C 1482 171, 1540 164, 1600 141"
          fill="none"
          stroke={`url(#${id}-primary)`}
          strokeLinecap="round"
          strokeWidth="10"
          opacity="0.62"
        />
        <path
          d="M -132 274 C 124 594, 364 84, 622 353 C 855 596, 1078 104, 1322 352 C 1430 461, 1510 431, 1590 383"
          fill="none"
          stroke={`url(#${id}-reverse)`}
          strokeLinecap="round"
          strokeWidth="83"
          opacity="0.18"
          filter={`url(#${id}-mist)`}
        />
        <path
          d="M -132 274 C 124 594, 364 84, 622 353 C 855 596, 1078 104, 1322 352 C 1430 461, 1510 431, 1590 383"
          fill="none"
          stroke={`url(#${id}-reverse)`}
          strokeLinecap="round"
          strokeWidth="28"
          opacity="0.5"
          filter={`url(#${id}-soft)`}
        />
      </g>
    </svg>
  );
}
