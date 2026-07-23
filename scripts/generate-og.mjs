import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, "..");

const W = 1200;
const H = 630;
const LOGO_W = 340;
const LOGO_H = Math.round(340 * (248 / 602)); // ~140px

async function main() {
  // Render logo (negative = white text) to transparent PNG
  const logoSvg = readFileSync(join(root, "public/logo_negative.svg"));
  const logoPng = await sharp(logoSvg)
    .resize(LOGO_W, LOGO_H, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Full centered design SVG
  const bg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background gradient: dark navy with subtle warmth -->
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#07071f"/>
      <stop offset="100%" stop-color="#0d0825"/>
    </linearGradient>

    <!-- Brand gradient (orange → magenta) -->
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff9600"/>
      <stop offset="50%" stop-color="#e65a64"/>
      <stop offset="100%" stop-color="#be146e"/>
    </linearGradient>

    <!-- Diagonal brand gradient for text/accents -->
    <linearGradient id="brand-diag" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff9600"/>
      <stop offset="100%" stop-color="#be146e"/>
    </linearGradient>

    <!-- Corner glow top-right -->
    <radialGradient id="glow-tr" cx="100%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#be146e" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#be146e" stop-opacity="0"/>
    </radialGradient>

    <!-- Corner glow bottom-left -->
    <radialGradient id="glow-bl" cx="0%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#ff9600" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#ff9600" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ── Background ── -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow-tr)"/>
  <rect width="${W}" height="${H}" fill="url(#glow-bl)"/>

  <!-- Subtle dot grid -->
  <pattern id="dots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
    <circle cx="18" cy="18" r="1.2" fill="#ffffff" fill-opacity="0.04"/>
  </pattern>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- ── Decorative accent lines (horizontal, brand colors) ── -->
  <line x1="0" y1="${H - 1}" x2="${W}" y2="${H - 1}" stroke="url(#brand)" stroke-width="2" stroke-opacity="0.3"/>

  <!-- ── Top brand stripe ── -->
  <rect x="0" y="0" width="${W}" height="6" fill="url(#brand)"/>

  <!-- ── Abstract decorative circles (corners, don't crowd center) ── -->
  <!-- Top right -->
  <circle cx="1130" cy="60" r="80" fill="none" stroke="#be146e" stroke-width="1.5" stroke-opacity="0.18"/>
  <circle cx="1130" cy="60" r="130" fill="none" stroke="#e65a64" stroke-width="1" stroke-opacity="0.10"/>
  <!-- Bottom left -->
  <circle cx="70" cy="570" r="70" fill="none" stroke="#ff9600" stroke-width="1.5" stroke-opacity="0.18"/>
  <circle cx="70" cy="570" r="120" fill="none" stroke="#ff9600" stroke-width="1" stroke-opacity="0.09"/>
  <!-- Bottom right -->
  <circle cx="1140" cy="600" r="60" fill="none" stroke="#be146e" stroke-width="1" stroke-opacity="0.13"/>

  <!-- ── Content — fully centered ── -->

  <!-- LABEL above headline -->
  <text
    x="${W / 2}" y="248"
    font-family="Ubuntu Sans,Ubuntu,DejaVu Sans,sans-serif"
    font-size="16" font-weight="600" letter-spacing="5"
    fill="#ff9600" fill-opacity="0.85" text-anchor="middle"
  >OMNICANALIDAD  ·  MENSAJERÍA</text>

  <!-- Headline line 1 -->
  <text
    x="${W / 2}" y="320"
    font-family="Ubuntu Sans,Ubuntu,DejaVu Sans,sans-serif"
    font-size="68" font-weight="800"
    fill="#ffffff" text-anchor="middle"
  >Todos tus canales,</text>

  <!-- Headline line 2 — brand orange -->
  <text
    x="${W / 2}" y="398"
    font-family="Ubuntu Sans,Ubuntu,DejaVu Sans,sans-serif"
    font-size="68" font-weight="800"
    fill="#ff9600" text-anchor="middle"
  >un solo lugar.</text>

  <!-- Divider -->
  <line x1="${W / 2 - 260}" y1="428" x2="${W / 2 + 260}" y2="428"
        stroke="#ffffff" stroke-width="1" stroke-opacity="0.10"/>

  <!-- Channel row -->
  <text
    x="${W / 2}" y="468"
    font-family="Ubuntu Sans,Ubuntu,DejaVu Sans,sans-serif"
    font-size="22" font-weight="400"
    fill="#ffffff" fill-opacity="0.60" text-anchor="middle"
  >WhatsApp  ·  Instagram  ·  Facebook  ·  Web Chat  →  Telegram</text>

  <!-- Bottom row: price + domain -->
  <!-- Price badge background -->
  <rect x="${W / 2 - 280}" y="502" width="168" height="40" rx="20"
        fill="#ff9600" fill-opacity="0.15" stroke="#ff9600" stroke-opacity="0.45" stroke-width="1.5"/>
  <text
    x="${W / 2 - 196}" y="527"
    font-family="Ubuntu Sans,Ubuntu,DejaVu Sans,sans-serif"
    font-size="17" font-weight="700"
    fill="#ff9600" text-anchor="middle"
  >Desde $9 / mes</text>

  <!-- Domain -->
  <text
    x="${W / 2 - 90}" y="527"
    font-family="Ubuntu Sans,Ubuntu,DejaVu Sans,sans-serif"
    font-size="17" font-weight="400"
    fill="#ffffff" fill-opacity="0.40" text-anchor="start"
  >chato.xerebrumgroup.com</text>
</svg>`;

  // Render background SVG to PNG
  const bgPng = await sharp(Buffer.from(bg)).png().toBuffer();

  // Logo horizontal center, vertical position: between top stripe and label
  const logoLeft = Math.round((W - LOGO_W) / 2);
  const logoTop = 76;

  // Composite logo onto background
  await sharp(bgPng)
    .composite([{ input: logoPng, top: logoTop, left: logoLeft }])
    .png({ quality: 100, compressionLevel: 6 })
    .toFile(join(root, "public/og-image-v2.png"));

  console.log(`✓ public/og-image-v2.png generated (${W}×${H})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
