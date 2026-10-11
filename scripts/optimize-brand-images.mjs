import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = process.argv[2];

if (!directory) {
  throw new Error("Usage: node scripts/optimize-brand-images.mjs <directory>");
}

const files = (await fs.readdir(directory)).filter((file) => file.endsWith(".png"));

await Promise.all(
  files.map(async (file) => {
    const source = path.join(directory, file);
    const destination = path.join(directory, file.replace(/\.png$/, ".webp"));
    await sharp(source)
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 84, smartSubsample: true })
      .toFile(destination);
  }),
);

console.log(`Optimized ${files.length} brand images.`);
