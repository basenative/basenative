import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'url';
import sharp from 'sharp'; // Assuming sharp is available or we can use playwright screenshot scaling + sharp for ico conversion?
// actually managing .ico in node without sharp/png-to-ico is annoying.
// User said "similar to pwa-asset-generator but using playwright".
// I can just specific dimensions in playwright viewport and take screenshot.
// For .ico, I might need a helper. baseNative/libs/tokens/scripts/build-tokens.ts implies ts-node is available.
// Let's stick to playwright screenshots for PNGs. For ICO, we can resize the 32x32 png or just save as png and rename if modern browsers support it (they do mostly, but actual .ico is better).
// Actually, simple way: generate PNGs with Playwright, then use sharp (if available) to convert to ICO.
// I saw sharp in package.json earlier! "sharp": "0.34.5"

const SOURCE_LOGO = 'apps/showcase/src/assets/logo.svg';
const OUT_DIR = 'apps/showcase/public/icons';
const FAVICON_OUT = 'apps/showcase/public/favicon.ico';

const CONFIG = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'og-image.png', size: 1200, height: 630 }, // Special case
  { name: 'favicon-32.png', size: 32 }, // Intermediate for ICO
];

async function generate() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Ensure output directory exists
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const logoPath = path.resolve(process.cwd(), SOURCE_LOGO);
  const logoUrl = pathToFileURL(logoPath).href;

  const logoContent = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/svg+xml;base64,${logoContent.toString('base64')}`;

  console.log(`Generating icons from ${logoPath}...`);

  for (const item of CONFIG) {
    const width = item.size;
    const height = item.height || item.size;

    await page.setViewportSize({ width, height });

    // Load SVG and center it using Flexbox in a simple HTML wrapper
    await page.setContent(`
      <html>
        <body style="margin: 0; padding: 0; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: transparent;">
          <img src="${logoBase64}" style="width: 100%; height: 100%; object-fit: contain;" />
        </body>
      </html>
    `);

    const destPath =
      item.name === 'favicon-32.png'
        ? path.join(process.cwd(), 'apps/showcase/public', item.name)
        : path.join(OUT_DIR, item.name);

    await page.screenshot({ path: destPath, omitBackground: true });
    console.log(`Generated ${item.name}`);
  }

  await browser.close();

  // Handle ICO generation using sharp
  try {
    const faviconPng = path.join(
      process.cwd(),
      'apps/showcase/public/favicon-32.png',
    );
    const faviconIco = path.resolve(process.cwd(), FAVICON_OUT);

    await sharp(faviconPng).resize(32, 32).toFile(faviconIco);

    console.log(`Generated favicon.ico`);

    // Cleanup intermediate png
    fs.unlinkSync(faviconPng);
  } catch (e) {
    console.warn('Sharp failed to generate .ico, checking dependencies...', e);
  }

  // Generate manifest.webmanifest
  const manifest = {
    name: 'BaseNative Showcase',
    short_name: 'Showcase',
    theme_color: '#1f1f1f',
    background_color: '#1f1f1f',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: 'icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  const manifestPath = path.join(
    process.cwd(),
    'apps/showcase/public/manifest.webmanifest',
  );
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Generated manifest.webmanifest`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
