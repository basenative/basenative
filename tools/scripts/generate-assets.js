const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE = 'apps/showcase/src/assets/logo.svg';
const DEST_DIR = 'apps/showcase/src/assets';
const FAVICON_DEST = 'apps/showcase/src';

const SIZES = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png', dest: FAVICON_DEST },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 32, name: 'favicon.png', dest: FAVICON_DEST }, // Main favicon fallback
];

async function generate() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`Source file not found: ${SOURCE}`);
    process.exit(1);
  }

  console.log(`Generating assets from ${SOURCE}...`);

  for (const item of SIZES) {
    const destDir = item.dest || DEST_DIR;
    const destPath = path.join(destDir, item.name);

    await sharp(SOURCE).resize(item.size, item.size).toFile(destPath);

    console.log(`Generated ${destPath} (${item.size}x${item.size})`);
  }

  console.log('Asset generation complete.');
}

generate().catch((err) => {
  console.error('Generation failed:', err);
  process.exit(1);
});
