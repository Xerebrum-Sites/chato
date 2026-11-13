import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");

const W = 1200;
const H = 630;
const LOGO_W = 242;
const LOGO_H = Math.round(LOGO_W * (126.21 / 800)); // Axtroos horizontal logo ratio

async function main() {
  const [logoSvg, peoplePhoto] = await Promise.all([
    readFileSync(join(root, "public/actros-logo-negative.svg")),
    sharp(join(root, "public/images/brand/hero-collaboration-v2.png"))
      .resize(W, H, { fit: "cover", position: "centre" })
      .png()
      .toBuffer(),
  ]);

  const logoPng = await sharp(logoSvg)
    .resize(LOGO_W, LOGO_H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const overlay = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="copy-bg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#090a25" stop-opacity="0.97"/>
      <stop offset="38%" stop-color="#211044" stop-opacity="0.86"/>
      <stop offset="61%" stop-color="#271043" stop-opacity="0.36"/>
      <stop offset="100%" stop-color="#160923" stop-opacity="0.03"/>
    </linearGradient>
    <linearGradient id="headline" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffab16"/>
      <stop offset="52%" stop-color="#ff6d34"/>
      <stop offset="100%" stop-color="#f51a90"/>
    </linearGradient>
    <linearGradient id="trail-a" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff981d" stop-opacity="0"/>
      <stop offset="20%" stop-color="#ff9b1d"/>
      <stop offset="54%" stop-color="#ff317e"/>
      <stop offset="78%" stop-color="#cc2bea"/>
      <stop offset="100%" stop-color="#ff831f" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="trail-b" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#d530ee" stop-opacity="0"/>
      <stop offset="20%" stop-color="#ce30ec"/>
      <stop offset="54%" stop-color="#ff3588"/>
      <stop offset="78%" stop-color="#ffa01a"/>
      <stop offset="100%" stop-color="#ff9b1e" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3a164e" stop-opacity="0.88"/>
      <stop offset="100%" stop-color="#cf176d" stop-opacity="0.7"/>
    </linearGradient>
    <linearGradient id="card-result" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5a2a62" stop-opacity="0.86"/>
      <stop offset="100%" stop-color="#e95276" stop-opacity="0.72"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-120%" width="160%" height="340%">
      <feGaussianBlur stdDeviation="9" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="soft" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="38"/></filter>
    <filter id="card-shadow" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0a061d" flood-opacity="0.42"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#copy-bg)"/>
  <ellipse cx="414" cy="176" rx="332" ry="156" fill="#b12eeb" fill-opacity="0.26" filter="url(#soft)"/>
  <ellipse cx="1000" cy="470" rx="330" ry="170" fill="#ef316f" fill-opacity="0.13" filter="url(#soft)"/>
  <rect width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.1"/>
  <g filter="url(#card-shadow)">
    <rect x="510" y="102" width="230" height="96" rx="18" fill="url(#card)" stroke="#ffb5dc" stroke-opacity="0.78"/>
    <circle cx="538" cy="132" r="13" fill="#25d366"/>
    <path d="M532 132h12m-6-6v12" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <text x="560" y="137" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#fff">Nuevos mensajes</text>
    <rect x="674" y="120" width="43" height="22" rx="11" fill="#ed1682"/>
    <text x="685" y="136" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" fill="#fff">+12</text>
    <line x1="528" y1="158" x2="721" y2="158" stroke="#fff" stroke-opacity="0.24"/>
    <circle cx="538" cy="177" r="10" fill="#12bd7d"/>
    <path d="M533 177l3 3 6-7" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="560" y="182" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="600" fill="#fff">Reserva confirmada</text>
  </g>
  <g filter="url(#card-shadow)">
    <rect x="825" y="88" width="256" height="52" rx="18" fill="url(#card)" stroke="#ffb5dc" stroke-opacity="0.72"/>
    <text x="849" y="121" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" fill="#fff">✦  Automatización activa</text>
    <rect x="1014" y="102" width="42" height="24" rx="12" fill="#f21c91"/>
    <circle cx="1043" cy="114" r="9" fill="#fff"/>
  </g>
  <g filter="url(#card-shadow)">
    <rect x="908" y="338" width="224" height="106" rx="18" fill="url(#card-result)" stroke="#ffcfed" stroke-opacity="0.78"/>
    <text x="930" y="370" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="#fff">Resultados del mes</text>
    <rect x="931" y="405" width="20" height="13" rx="2" fill="#ff9d18"/><rect x="963" y="392" width="20" height="26" rx="2" fill="#ff7e30"/><rect x="995" y="376" width="20" height="42" rx="2" fill="#ff4c65"/><rect x="1027" y="360" width="20" height="58" rx="2" fill="#f321a4"/>
    <path d="M928 420 C966 396 982 409 1005 385 S1052 390 1102 357" fill="none" stroke="#fff" stroke-opacity="0.75" stroke-width="2"/>
  </g>
  <path d="M -116 548 C 102 294, 310 690, 558 464 C 804 238, 1002 700, 1253 425 C 1342 327, 1437 291, 1522 246" fill="none" stroke="url(#trail-a)" stroke-width="32" stroke-linecap="round" filter="url(#glow)" opacity="0.92"/>
  <path d="M -102 614 C 125 747, 344 298, 582 521 C 817 730, 1031 294, 1270 502 C 1382 598, 1450 582, 1520 529" fill="none" stroke="url(#trail-b)" stroke-width="16" stroke-linecap="round" filter="url(#glow)" opacity="0.9"/>
  <path d="M -78 571 C 129 389, 311 641, 565 485 C 797 342, 1000 632, 1260 445 C 1352 379, 1442 363, 1515 327" fill="none" stroke="url(#trail-a)" stroke-width="7" stroke-linecap="round" filter="url(#glow)" opacity="0.9"/>
  <text x="76" y="194" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" letter-spacing="2.8" fill="#ffac1d">PLATAFORMA B2B OMNICANAL</text>
  <text x="76" y="270" font-family="Arial, Helvetica, sans-serif" font-size="49" font-weight="800" letter-spacing="-1.6" fill="#ffffff">Conectá conversaciones.</text>
  <text x="76" y="328" font-family="Arial, Helvetica, sans-serif" font-size="49" font-weight="800" letter-spacing="-1.6" fill="#ffffff">Potenciá equipos.</text>
  <text x="76" y="385" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="800" font-style="normal" letter-spacing="-1.6" fill="url(#headline)">Multiplicá oportunidades.</text>
  <text x="76" y="426" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="400" fill="#ffffff" fill-opacity="0.84">Una plataforma omnicanal con IA que conecta, automatiza</text>
  <text x="76" y="452" font-family="Arial, Helvetica, sans-serif" font-size="19" font-weight="400" fill="#ffffff" fill-opacity="0.84">y transforma cada interacción en resultados.</text>
  <text x="76" y="505" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" fill="#ffffff">axtroos.com</text>
</svg>`);

  await sharp(peoplePhoto)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logoPng, top: 62, left: 76 },
    ])
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(join(root, "public/og-axtroos-v2.png"));

  console.log(`✓ public/og-axtroos-v2.png generated (${W}×${H})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
