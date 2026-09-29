// Renders the social share card and the home screen icon into `public/`:
//   pnpm share-image    (once: pnpm exec playwright install chromium)
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = await import('playwright');

const shots = [
  { html: 'scripts/share-card/share.html', out: 'public/share.png', width: 1200, height: 630 },
  {
    html: 'scripts/share-card/apple-touch-icon.html',
    out: 'public/apple-touch-icon.png',
    width: 180,
    height: 180,
  },
];

const browser = await chromium.launch();
for (const { html, out, width, height } of shots) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(join(root, html)).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, out) });
  await page.close();
  console.info(`render: ${out}`);
}
await browser.close();
