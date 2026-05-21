import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");

const W = 1200;
const H = 630;
const LOGO_W = 300;
const LOGO_H = Math.round(300 * (248 / 602)); // ~123px

async function main() {
  // Render logo (negative = white text) to transparent PNG
  const logoSvg = readFileSync(join(root, "public/logo_negative.svg"));
  const logoPng = await sharp(logoSvg)
    .resize(LOGO_W, LOGO_H, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Background + decorative SVG
  const bg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06062a"/>
      <stop offset="100%" stop-color="#050515"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff9600"/>
      <stop offset="50%" stop-color="#e65a64"/>
      <stop offset="100%" stop-color="#be146e"/>
    </linearGradient>
    <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff9600" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#ff9600" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#be146e" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#be146e" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#e65a64" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#e65a64" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Decorative orbs (right side) -->
  <ellipse cx="980" cy="200" rx="300" ry="300" fill="url(#orb1)"/>
  <ellipse cx="1100" cy="450" rx="240" ry="240" fill="url(#orb2)"/>
  <ellipse cx="820" cy="530" rx="180" ry="180" fill="url(#orb3)"/>

  <!-- Decorative ring outlines -->
  <circle cx="980" cy="195" r="190" fill="none" stroke="#ff9600" stroke-width="1" stroke-opacity="0.12"/>
  <circle cx="980" cy="195" r="260" fill="none" stroke="#be146e" stroke-width="1" stroke-opacity="0.08"/>
  <circle cx="1090" cy="460" r="130" fill="none" stroke="#e65a64" stroke-width="1" stroke-opacity="0.14"/>

  <!-- Subtle grid dots -->
  <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
    <circle cx="20" cy="20" r="1" fill="#ffffff" fill-opacity="0.03"/>
  </pattern>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- Top gradient bar -->
  <rect x="0" y="0" width="${W}" height="6" fill="url(#brand)"/>

  <!-- Tagline above headline -->
  <text x="80" y="230" font-family="Arial,sans-serif" font-size="18" font-weight="600"
        letter-spacing="4" fill="#ff9600" fill-opacity="0.9" text-anchor="start">OMNICANALIDAD · MENSAJERÍA</text>

  <!-- Main headline line 1 -->
  <text x="80" y="300" font-family="'Arial Black',Arial,sans-serif" font-size="62" font-weight="900"
        fill="#ffffff" text-anchor="start">Todos tus canales,</text>

  <!-- Main headline line 2 (brand gradient) -->
  <defs>
    <linearGradient id="txtgrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff9600"/>
      <stop offset="60%" stop-color="#e65a64"/>
      <stop offset="100%" stop-color="#be146e"/>
    </linearGradient>
  </defs>
  <text x="80" y="375" font-family="'Arial Black',Arial,sans-serif" font-size="62" font-weight="900"
        fill="url(#txtgrad)" text-anchor="start">un solo lugar.</text>

  <!-- Channel list -->
  <text x="80" y="440" font-family="Arial,sans-serif" font-size="22" font-weight="400"
        fill="#c8b8d8" text-anchor="start">WhatsApp · Instagram · Facebook · Web Chat  →  Telegram</text>

  <!-- Divider line -->
  <line x1="80" y1="480" x2="680" y2="480" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1"/>

  <!-- Price badge -->
  <rect x="80" y="500" width="155" height="42" rx="21"
        fill="#ff9600" fill-opacity="0.15" stroke="#ff9600" stroke-opacity="0.4" stroke-width="1"/>
  <text x="157" y="526" font-family="Arial,sans-serif" font-size="17" font-weight="700"
        fill="#ff9600" text-anchor="middle">Desde $9 / mes</text>

  <!-- Domain -->
  <text x="250" y="526" font-family="Arial,sans-serif" font-size="17" font-weight="400"
        fill="#ffffff" fill-opacity="0.35" text-anchor="start">chato.xerebrumgroup.com</text>
</svg>`;

  // Render background SVG
  const bgPng = await sharp(Buffer.from(bg))
    .png()
    .toBuffer();

  // Composite logo onto background
  await sharp(bgPng)
    .composite([
      {
        input: logoPng,
        top: 68,
        left: 80,
      },
    ])
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(join(root, "public/og-image.png"));

  console.log("✓ public/og-image.png generated (1200×630)");
}

main().catch((e) => { console.error(e); process.exit(1); });
