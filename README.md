# Manablox website

The marketing website at [manablox.io](https://manablox.io). It tells the features of
Manablox as one launch week (Monday to Saturday) and ends every page at the download
instructions.

It is a Vue 3 app rendered to static HTML at build time: `vite build` makes the client
bundle, `vite build --ssr` the server entry, and `scripts/prerender.mjs` renders each
route to its own file (`index.html`, `features.html`, `plugins.html`, `download.html`,
`changelog.html`, `imprint.html`, `404.html`) plus `sitemap.xml` and `robots.txt`. The
browser hydrates the HTML, so the page works before any script runs.

This repository is private and proprietary (see [LICENSE](./LICENSE)). The CMS it
describes lives in [manablox/manablox-cms](https://github.com/manablox/manablox-cms).

## Development

Node 24 and pnpm (pinned by `packageManager`), plus Docker for the development stack.

The only `@manablox/*` package here is `@manablox/config-typescript`, a dev dependency.
In development it comes from the local registry of the CMS's dev stack, so bring that up
first (`pnpm dev:services` in manablox-cms). `pnpm dev:up` writes the gitignored `.npmrc`
that points a host `pnpm install` at it:

```ini
@manablox:registry=http://localhost:4873/
```

Inside the dev container the registry is `http://verdaccio:4873/` on the docker network
`manablox-registry`; the install passes it on the command line, which wins over the file.
CI and the image build install from npmjs.

```sh
pnpm dev:up        # install in the container and start Vite's dev server on http://localhost:3005
pnpm dev:logs      # follow the logs
pnpm dev:down      # stop
pnpm dev:reset     # stop, remove the containers and volumes, delete dist/ and dist-ssr/
```

On the host, after `pnpm install`:

| Command | What it does |
| --- | --- |
| `pnpm dev` | Vite's dev server on port 3005 |
| `pnpm build` | The static site in `dist/` |
| `pnpm preview` | Serve `dist/` |
| `pnpm links` | Every internal link in `dist/` resolves to a file |
| `pnpm links:cross` | Every link into the developer docs and the user guide resolves, page and `#fragment` (below) |
| `pnpm lint` / `pnpm format` | Biome |
| `pnpm knip` | Unused files, exports and dependencies |
| `pnpm typecheck` | vue-tsc |
| `pnpm check` | All of the above: lint, knip, typecheck, build, links |
| `pnpm changelog:update` | Refresh the bundled copy of the CMS changelog from `CHANGELOG_URL` |
| `pnpm share-image` | Render the share card and the home screen icon into `public/` (`scripts/share-card/`) |
| `pnpm docker:build` | The production image, see below |
| `pnpm lock:refresh` | Re-resolve only `@manablox/*` in the lockfile (`--npmjs`: against npmjs), below |

### The lockfile

CI installs `@manablox/*` from npmjs with `--frozen-lockfile`, so the committed
`pnpm-lock.yaml` has to hold npmjs's checksums. A version published to the local registry
carries other checksums than the same version released to npmjs, and a lockfile resolved
against it does not pass CI.

`pnpm lock:refresh` (`scripts/lock-refresh.sh`) deletes pnpm's cache entries of the scope
and re-resolves only `@manablox/*` in the lockfile, against the registry pnpm is configured
with. No other package moves, `package.json` keeps its ranges and `node_modules` stays as it
is (`pnpm install` afterwards installs what it resolved). `pnpm lock:refresh --npmjs`
resolves against npmjs whatever an `.npmrc` says.

After the CMS release to npmjs, run `pnpm lock:refresh` without the local `.npmrc` (or with
`--npmjs`) and commit the lockfile before CI can pass.

### Links into the docs

The site links into the developer docs (`https://dev.manablox.io`) and the user guide
(`https://docs.manablox.io`), which other repositories build, so `pnpm check` leaves those
links out. After changing one (`src/site.ts`, `src/content/plugins.ts`), build
manablox-dev-docs and manablox-user-docs next to this repository and run

```sh
pnpm build && DEV_DOCS_DIST=../manablox-dev-docs/dist USER_DOCS_DIST=../manablox-user-docs/dist pnpm links:cross
```

It fails on a page or `#fragment` the docs do not have. `DEV_DOCS_URL` and `USER_DOCS_URL`
(`https://dev.manablox.io`, `https://docs.manablox.io`) check the deployed pages instead.

## Configuration

The build reads these from the environment. The dev stack takes them from `.env`, which
`pnpm dev:up` copies from `.env.example`.

| Variable | Default | |
| --- | --- | --- |
| `WEBSITE_URL` | `http://localhost:3005` (image: `https://manablox.io`) | The deployed origin. It only reaches canonical links, the structured data and the sitemap |
| `LICENSE_PORTAL_URL` | `https://licenses.manablox.io` | The portal the "Start free trial", "Buy" and pricing links open (`/buy?products=ai`, `/pricing`) |
| `LICENSE_API` | none | The license server's API (`https://licenses.manablox.io/api`). The build reads `GET /v1/catalog` from it and shows "from €X/month", the lowest monthly price with yearly plans divided by twelve, and the trial length. Unset, unreachable or without a price, the page says "Paid plugin" and names no number |
| `CHANGELOG_URL` | the CMS's `CHANGELOG.md` on main | Where the changelog page reads from, see below. `off` uses the bundled copy without asking |
| `CHANGELOG_STRICT` | unset | `1` fails the build when the changelog cannot be fetched or holds no release, instead of using the bundled copy. `release.yml` sets it; CI and development do not |
| `ANALYTICS_ORIGIN` | `https://analytics.dev.alpenstudios.com` | The analytics server (Plausible) the site loads its script from, after a visitor accepts. The image reads it again when the container starts, see below |
| `PORT` | `3005` | The dev server's and the preview's port |

Prices live in Paddle only: never write one into the copy.

### The changelog

The changelog page shows the CMS's releases, and the version in the footer and the
structured data is the newest of them. The CMS keeps its `CHANGELOG.md` in its own
repository, so `build/changelog.ts` fetches it when the build (or the dev server) starts,
from `CHANGELOG_URL`, by default
`https://raw.githubusercontent.com/manablox/manablox-cms/main/CHANGELOG.md`. When that
cannot be reached, answers with an error or holds no release heading, the build warns and
uses the copy in `src/content/cms-changelog.md`, so a build never goes empty on it. With
`CHANGELOG_STRICT=1`, which release builds set, it fails instead, so a released image never
ships an old copy. `pnpm changelog:update` replaces that copy with the current file; commit
it with each CMS release.

`pnpm build` fetches once, before the client and the server bundles are built
(`node build/changelog.ts --fetch`, into `node_modules/.cache/manablox-website/`); both
read that file, so they always show the same changelog and version. The prices take the
same way (`node build/prices.ts --fetch`, `prices.json` next to it), so the prerendered
page and the one the client hydrates name the same price. The dev server fetches both when
it starts. A bare `vite build` without those steps fails and says so.

Relative links in the changelog open the file in the CMS repository on GitHub.

## Docker image

`pnpm docker:build` builds `ghcr.io/manablox/website:<version>` from
`docker/Dockerfile.website`: the site built and prerendered, the links checked, then
served by nginx (`docker/nginx.conf`) with a Content-Security-Policy, `nosniff`,
`X-Frame-Options`, a referrer policy and a permissions policy on every answer, immutable
caching for `/assets/` and `no-cache` for the pages. The variables above are build
arguments, passed on from the environment.

```sh
pnpm docker:build                          # ghcr.io/manablox/website:0.50.0
pnpm docker:build --tag test
LICENSE_API=https://licenses.manablox.io/api pnpm docker:build --prefix my.registry/me --push
docker run --rm -p 8080:80 ghcr.io/manablox/website:0.50.0
```

`@manablox/*` installs from the registry `.npmrc` names (the local one in development,
reached over the host network), or from `--registry <url>`, else from npmjs.

At runtime the image reads one variable, `ANALYTICS_ORIGIN` (default
`https://analytics.dev.alpenstudios.com`): the analytics server the Content-Security-Policy
allows in `script-src` and `connect-src`. nginx fills it into `docker/nginx.conf`, a
template, when the container starts. The site loads the script from the `ANALYTICS_ORIGIN`
of the build, so moving the analytics server means both: build with the new origin and run
the container with it.

```sh
ANALYTICS_ORIGIN=https://stats.example.com pnpm docker:build
docker run --rm -p 8080:80 -e ANALYTICS_ORIGIN=https://stats.example.com ghcr.io/manablox/website:0.50.0
```

HSTS is not set here: it belongs to the proxy that terminates TLS in front of the
container.

## CI and release

`.github/workflows/ci.yml` runs lint, knip and the typecheck, the build with the prerender
and the link check, `pnpm audit`, and builds the image without pushing it, then smoke-tests
it (the pages, a 404, the security headers). `.github/workflows/release.yml`, started by
hand, builds the image with the repository variables `WEBSITE_URL`, `LICENSE_PORTAL_URL`
and `LICENSE_API` and `CHANGELOG_STRICT=1`, and pushes it to ghcr.io with the version tags
(and `latest`).

## Colour

The palette is the admin's, token for token: the orange of the logo's brace
(`--brand`, `oklch(68% 0.175 50)`, the `brand-500` the admin uses), the purple of its
block (`--iris`, `a23ffb`), ochre, a lighter lilac, and cool grey neutrals at hue 265.
Green is only ever "this succeeded". Change a colour here and it should change in the
admin's theme too, or the two drift apart.

The five chapters of the week are the four accents plus night: Monday orange, Tuesday
purple, Wednesday ochre, Thursday lilac, Friday the dark section.

## Light and dark

Both themes come from the same tokens in `src/styles/base.css`, written with
`light-dark()`. A page follows the browser until someone presses the theme button in the
header; that choice is stored under `manablox-theme` and applied by `public/theme.js`,
which `index.html` loads before the first paint.

Three rules keep components working in both:

- Backgrounds are `--paper` (the page), `--surface` (cards), `--night` (the dark sections) or `--console` (terminals and code panes). `--white` is only ever a colour that sits on something else.
- Outlines are `--edge`, the hard offset shadows are `--edge-shadow`, and solid buttons are `--solid` on `--solid-ink`.
- Anything on a brand colour (orange, purple, ochre, lilac) uses `--on-accent` for its text. Those never change, so their text must not either.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/content/week.ts` | The story on the home page, one chapter per day. Keep it short: the detail belongs in `features.ts` |
| `src/content/features.ts` | The inventory of the core on `/features`, and what is not built |
| `src/content/plugins.ts` | The first-party plugins (website, AI, workflows, webhooks): the cards on the home page and `/features`, and the detail on `/plugins`, with their license, the premium badge, price and portal links of the paid ones. A plugin's features belong here, not in `features.ts` |
| `src/content/changelog.ts` | The changelog's Markdown parsed into releases for `/changelog` |
| `src/content/cms-changelog.md` | The bundled copy of the CMS changelog |
| `build/changelog.ts` | Fetches the CMS changelog at build time, with the bundled copy as fallback |
| `build/prices.ts` | Fetches the premium plugins' prices from `LICENSE_API` at build time, "Paid plugin" without them |
| `src/site.ts` | Every outbound link: GitHub, the docs, the user guide, npm, the license portal, the install commands |
| `src/components/mocks/` | The product illustrations, one per day, in plain HTML and CSS |
| `src/router.ts` | Routes, their titles and descriptions, and the paths to prerender |
| `scripts/prerender.mjs` | Renders every route, the meta tags, the structured data, the sitemap and robots.txt |
| `scripts/check-links.mjs` | The internal link check |
| `scripts/check-external-docs-links.mjs` | The check of the links into the two docs sites (`pnpm links:cross`) |

Copy may wrap `code` in backticks; `InlineCode.vue` renders those spans.

## Writing for these pages

- Every claim has to be true of the current release. Check it against the developer documentation (<https://dev.manablox.io>) and the CLI (`manablox --help`) before it goes in; if a feature is not built, it belongs in `notBuilt`, not in the copy.
- Licensing: the CMS is open source under the MIT license, the workflows, webhooks and license plugins included. The website and AI plugins are commercial. Say which is which wherever a plugin is named with its package.
- Name things by what people see and do in the admin, not by how they are implemented.
- The cast (Max, Anna, Julia) never gets pronouns; the sentences use their names.

## Adding a page

Add a component under `src/pages/`, a route with `title` and `description` meta in
`src/router.ts`, and its path to `prerenderPaths`. Link to it with `RouterLink`.
