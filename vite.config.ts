import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { buildChangelog, latestVersion, loadChangelog } from './build/changelog.ts';
import { buildOffers, loadOffers } from './build/prices.ts';

/**
 * The analytics server (Plausible, self hosted). The image's Content-Security-Policy names the
 * same origin, from `ANALYTICS_ORIGIN` when the container starts (docker/nginx.conf).
 */
const analyticsOrigin = (
  process.env.ANALYTICS_ORIGIN || 'https://analytics.dev.alpenstudios.com'
).replace(/\/$/, '');

/** The customer portal the buy and trial links open. */
const portal = (process.env.LICENSE_PORTAL_URL || 'https://licenses.manablox.io').replace(
  /\/$/,
  '',
);

export default defineConfig(async ({ command }) => {
  // A build reads what `build/changelog.ts --fetch` and `build/prices.ts --fetch` fetched for
  // it, the same for the client and the server bundle; the dev server fetches when it starts.
  const build = command === 'build';
  const changelog = build ? await buildChangelog() : await loadChangelog();
  const offers = build ? await buildOffers() : await loadOffers();
  return {
    plugins: [vue()],
    define: {
      __CHANGELOG__: JSON.stringify(changelog),
      // The version the site shows is the newest release of the CMS, the one people install.
      __CMS_VERSION__: JSON.stringify(latestVersion(changelog)),
      __LICENSE_PORTAL__: JSON.stringify(portal),
      __ANALYTICS_ORIGIN__: JSON.stringify(analyticsOrigin),
      __PREMIUM_OFFERS__: JSON.stringify(offers),
    },
    resolve: {
      alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: { port: Number(process.env.PORT ?? 3005), strictPort: true },
    preview: { port: Number(process.env.PORT ?? 3005), strictPort: true },
    build: { sourcemap: false, target: 'es2022' },
  };
});
