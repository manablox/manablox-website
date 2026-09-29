// Renders every route to static HTML in `dist/`, plus `404.html`, the sitemap and robots.txt.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const origin = (process.env.WEBSITE_URL ?? 'http://localhost:3005').replace(/\/$/, '');

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(readFileSync(join(dist, '.vite/ssr-manifest.json'), 'utf8'));
const { render, prerenderPaths, site } = await import(
  pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href
);

const escapeHtml = (text) =>
  text.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const shareImage = `${origin}${site.shareImage}`;

function preloads(modules) {
  const files = new Set(modules.flatMap((id) => manifest[id] ?? []));
  return [...files]
    .map((file) =>
      file.endsWith('.css')
        ? `<link rel="stylesheet" href="${file}">`
        : file.endsWith('.js')
          ? `<link rel="modulepreload" crossorigin href="${file}">`
          : '',
    )
    .filter(Boolean);
}

/** Search engines and assistants read this; the home page also describes the product itself. */
function structuredData(url, title, description) {
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: `${origin}/`,
      name: site.name,
      description,
      inLanguage: 'en',
      publisher: { '@id': `${origin}/#org` },
    },
    {
      '@type': 'Organization',
      '@id': `${origin}/#org`,
      name: site.name,
      url: `${origin}/`,
      logo: `${origin}/apple-touch-icon.png`,
      // The profiles a search engine can tie this site to.
      sameAs: [site.github, site.npm, site.x && `https://x.com/${site.x.replace('@', '')}`].filter(
        Boolean,
      ),
    },
    {
      '@type': 'Person',
      '@id': `${origin}/#author`,
      name: site.author,
    },
    {
      '@type': 'WebPage',
      '@id': `${origin}${url}#page`,
      url: `${origin}${url}`,
      name: title,
      description,
      inLanguage: 'en',
      isPartOf: { '@id': `${origin}/#website` },
      about: { '@id': `${origin}/#org` },
      author: { '@id': `${origin}/#author` },
      primaryImageOfPage: shareImage,
      ...(url === '/' ? {} : { breadcrumb: { '@id': `${origin}${url}#crumbs` } }),
    },
  ];
  if (url !== '/') {
    // The title up to the divider is the page's own name, which is the crumb.
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${origin}${url}#crumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: title.split('|')[0].trim(),
          item: `${origin}${url}`,
        },
      ],
    });
  }
  if (url === '/') {
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${origin}/#app`,
      name: site.name,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Content management system',
      operatingSystem: 'Linux, macOS, Windows',
      softwareVersion: site.version,
      url: `${origin}/`,
      downloadUrl: `${origin}/download`,
      installUrl: site.npm,
      softwareHelp: site.docs,
      license: 'https://opensource.org/license/mit',
      image: shareImage,
      description,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    });
  }
  return `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  }).replace(/</g, '\\u003c')}</script>`;
}

/**
 * What every crawler reads. Open Graph covers Facebook, LinkedIn, Pinterest, WhatsApp,
 * Telegram, Signal, Slack, Discord and Mastodon, which all parse it and nothing else;
 * X reads its own `twitter:` names and falls back to Open Graph for whatever is missing.
 */
function metaTags(url, title, description, { canonical }) {
  const alt = escapeHtml(site.shareImageAlt);
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<meta name="author" content="${escapeHtml(site.author)}">`,
    canonical
      ? `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">`
      : `<meta name="robots" content="noindex, follow">`,
    ...(canonical ? [`<link rel="canonical" href="${origin}${url}">`] : []),

    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escapeHtml(site.name)}">`,
    `<meta property="og:locale" content="${site.locale}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    ...(canonical ? [`<meta property="og:url" content="${origin}${url}">`] : []),
    `<meta property="og:image" content="${shareImage}">`,
    `<meta property="og:image:secure_url" content="${shareImage}">`,
    `<meta property="og:image:type" content="image/png">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${alt}">`,

    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${shareImage}">`,
    `<meta name="twitter:image:alt" content="${alt}">`,
    ...(site.x
      ? [
          `<meta name="twitter:site" content="${escapeHtml(site.x)}">`,
          `<meta name="twitter:creator" content="${escapeHtml(site.x)}">`,
        ]
      : []),
    // Mastodon shows this as the author link above the card.
    ...(site.fediverse
      ? [`<meta name="fediverse:creator" content="${escapeHtml(site.fediverse)}">`]
      : []),
  ];
}

async function page(url, { canonical }) {
  const { html, title, description, modules } = await render(url);
  const head = [
    ...metaTags(url, title, description, { canonical }),
    ...(canonical ? [structuredData(url, title, description)] : []),
    ...preloads(modules),
  ].join('\n    ');
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
}

for (const url of prerenderPaths) {
  // `/features` becomes `features.html`: nginx and most static hosts resolve it without a
  // trailing-slash redirect.
  const file = url === '/' ? join(dist, 'index.html') : join(dist, `${url.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, await page(url, { canonical: true }));
  console.info(`prerender: ${url}`);
}

writeFileSync(join(dist, '404.html'), await page('/404', { canonical: false }));

const today = new Date().toISOString().slice(0, 10);
// The legal page belongs in the sitemap, but not ahead of the pages people came for.
const priority = (url) => (url === '/' ? '1.0' : url === '/imprint' ? '0.3' : '0.8');
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${prerenderPaths
    .map(
      (url) =>
        `  <url><loc>${origin}${url}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${priority(url)}</priority></url>`,
    )
    .join('\n')}\n</urlset>\n`,
);
// Replaces the copy from `public/`, which exists so the dev server has one too, with the
// same rules pointed at the origin this build is for.
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
rmSync(join(dist, '.vite'), { recursive: true, force: true });
