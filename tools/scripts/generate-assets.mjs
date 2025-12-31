import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error(
    'Usage: node generate-assets.mjs <input-svg> <output-dir> [--color <hex>]',
  );
  process.exit(1);
}

const inputSvg = args[0];
const outputDir = args[1];
const colorArgIndex = args.indexOf('--color');
const themeColor = colorArgIndex > -1 ? args[colorArgIndex + 1] : '#6750A4';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateAssets() {
  console.log(`Generating assets from ${inputSvg} to ${outputDir}...`);

  // 1. Favicon (32x32) - basic ICO (using png buffer hack or just sharp validation)
  // Sharp can output to .ico if built with it, but standard sharp usage often prefers png for favicon.ico compatibility layer
  // For this script, we will simply force a 32x32 resize and save as .ico (Sharp handles the container conversion if supported, or we rely on the extension)
  // Note: True multi-res .ico requires different tooling (like png-to-ico), but this satisfies basic needs.
  await sharp(inputSvg)
    .resize(32, 32)
    .toFile(path.join(outputDir, 'favicon.ico'));

  // 2. Apple Touch Icon (180x180) - with padding and background
  await sharp(inputSvg)
    .resize(140, 140, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: themeColor,
    })
    .flatten({ background: themeColor })
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  // 3. Icon-192 (192x192) - with padding and background
  // Content 140 -> Pad to 192 (26px padding)
  await sharp(inputSvg)
    .resize(140, 140, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: 26,
      bottom: 26,
      left: 26,
      right: 26,
      background: themeColor,
    })
    .flatten({ background: themeColor })
    .toFile(path.join(outputDir, 'icon-192.png'));

  // 4. Icon-512 (512x512)
  // Content 380 -> Pad to 512 (66px padding)
  await sharp(inputSvg)
    .resize(380, 380, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: 66,
      bottom: 66,
      left: 66,
      right: 66,
      background: themeColor,
    })
    .flatten({ background: themeColor })
    .toFile(path.join(outputDir, 'icon-512.png'));

  // 5. OG Image (1200x630)
  // Simple centered logo on theme background
  // Logo size: 400x400
  await sharp(inputSvg)
    .resize(400, 400, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: 115,
      bottom: 115,
      left: 400,
      right: 400,
      background: themeColor,
    })
    .flatten({ background: themeColor })
    .toFile(path.join(outputDir, 'og-image.png'));

  console.log(' assets generated successfully!');
}

generateAssets().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
