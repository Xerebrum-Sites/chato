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
    sharp(join(root, "public/images/brand/og-social-people-v1.png"))
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
      <stop offset="0%" stop-color="#07081c" stop-opacity="0.98"/>
      <stop offset="44%" stop-color="#111033" stop-opacity="0.92"/>
      <stop offset="66%" stop-color="#1d1034" stop-opacity="0.46"/>
      <stop offset="100%" stop-color="#120a20" stop-opacity="0.04"/>
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
    <filter id="glow" x="-20%" y="-80%" width="140%" height="260%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="32"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#copy-bg)"/>
  <ellipse cx="430" cy="110" rx="275" ry="125" fill="#b82aab" fill-opacity="0.2" filter="url(#soft)"/>
  <rect width="${W}" height="${H}" fill="none" stroke="#ffffff" stroke-opacity="0.12"/>
  <path d="M -90 540 C 110 356, 282 680, 487 505 C 695 328, 898 678, 1108 492 C 1208 404, 1280 376, 1310 350" fill="none" stroke="url(#trail-a)" stroke-width="10" stroke-linecap="round" filter="url(#glow)"/>
  <path d="M -70 588 C 118 704, 315 349, 497 530 C 690 708, 896 354, 1081 542 C 1175 638, 1241 614, 1300 552" fill="none" stroke="url(#trail-b)" stroke-width="5" stroke-linecap="round" filter="url(#glow)" opacity="0.9"/>
  <text x="76" y="210" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="700" letter-spacing="3.2" fill="#ff9c1c">PLATAFORMA B2B OMNICANAL</text>
  <text x="76" y="291" font-family="Arial, Helvetica, sans-serif" font-size="55" font-weight="800" letter-spacing="-1.8" fill="#ffffff">Conectá conversaciones.</text>
  <text x="76" y="357" font-family="Arial, Helvetica, sans-serif" font-size="55" font-weight="800" letter-spacing="-1.8" fill="url(#headline)">Potenciá equipos.</text>
  <text x="76" y="403" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="400" fill="#ffffff" fill-opacity="0.78">Una plataforma para transformar cada interacción</text>
  <text x="76" y="433" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="400" fill="#ffffff" fill-opacity="0.78">en oportunidades para tu negocio.</text>
  <line x1="76" y1="466" x2="417" y2="466" stroke="#ffffff" stroke-opacity="0.25"/>
  <text x="76" y="502" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#ffffff">axtroos.com</text>
</svg>`);

  await sharp(peoplePhoto)
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logoPng, top: 62, left: 76 },
    ])
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(join(root, "public/og-axtroos-v1.png"));

  console.log(`✓ public/og-axtroos-v1.png generated (${W}×${H})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
