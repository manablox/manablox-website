// The CMS changelog the changelog page shows. The CMS lives in its own repository, so the
// build fetches its CHANGELOG.md (`CHANGELOG_URL`) and falls back to the copy bundled in
// `src/content/cms-changelog.md` when that cannot be reached, or with `CHANGELOG_URL=off`.
// `CHANGELOG_STRICT=1` (release builds) turns a failed or invalid fetch into an error.
//
// A build fetches once: `--fetch` writes the changelog to `CACHE`, and the client and the
// server builds that follow both read it from there, so they cannot disagree.
//
//   node build/changelog.ts --fetch    the changelog for the build steps that follow
//   node build/changelog.ts --write    refreshes the bundled copy from CHANGELOG_URL
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_URL = 'https://raw.githubusercontent.com/manablox/manablox-cms/main/CHANGELOG.md';
const BUNDLED = fileURLToPath(new URL('../src/content/cms-changelog.md', import.meta.url));
/** Where `--fetch` leaves the changelog for the build. */
const CACHE = fileURLToPath(
  new URL('../node_modules/.cache/manablox-website/changelog.md', import.meta.url),
);
/** `## 0.50.0 - 2026-10-01`: a release, its version first. */
const RELEASE_HEADING = /^## (\d+\.\d+\.\d+\S*)/m;

/** `CHANGELOG_URL`, the CMS repository's file on main when unset or empty; null for `off`. */
function changelogUrl(): string | null {
  const url = process.env.CHANGELOG_URL?.trim();
  if (url === 'off') return null;
  return url || DEFAULT_URL;
}

/** `CHANGELOG_STRICT=1`: the fetched changelog or nothing. */
function strict(): boolean {
  const value = process.env.CHANGELOG_STRICT?.trim();
  return value === '1' || value === 'true';
}

async function fetchChangelog(url: string): Promise<string> {
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const markdown = await response.text();
  // A proxy's error page or an empty answer would otherwise become an empty changelog.
  if (!RELEASE_HEADING.test(markdown)) throw new Error('no release heading in the answer');
  return markdown;
}

/**
 * The changelog's Markdown: fetched, or the bundled copy. A failed fetch only warns, unless
 * `CHANGELOG_STRICT` is set.
 */
export async function loadChangelog(): Promise<string> {
  const url = changelogUrl();
  if (!url) {
    if (strict())
      throw new Error(
        'website: CHANGELOG_STRICT needs a changelog to fetch, not CHANGELOG_URL=off',
      );
    return readFile(BUNDLED, 'utf8');
  }
  try {
    return await fetchChangelog(url);
  } catch (error) {
    const reason = `no changelog from ${url} (${(error as Error).message})`;
    if (strict()) throw new Error(`website: ${reason}; CHANGELOG_STRICT is set`);
    console.warn(`website: ${reason}; using src/content/cms-changelog.md`);
  }
  return readFile(BUNDLED, 'utf8');
}

/** The changelog `--fetch` left for this build. */
export async function buildChangelog(): Promise<string> {
  try {
    return await readFile(CACHE, 'utf8');
  } catch {
    throw new Error(
      'website: no changelog for the build; run `node build/changelog.ts --fetch` first (pnpm build does)',
    );
  }
}

/** The newest release's version: the first release heading. */
export function latestVersion(markdown: string): string {
  const version = RELEASE_HEADING.exec(markdown)?.[1];
  if (!version) throw new Error('the changelog has no release heading');
  return version;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--fetch')) {
    const markdown = await loadChangelog().catch((error: Error) => {
      console.error(error.message);
      process.exit(1);
    });
    await mkdir(dirname(CACHE), { recursive: true });
    await writeFile(CACHE, markdown);
    console.info(`changelog: ${latestVersion(markdown)} is the newest release for this build`);
  } else if (process.argv.includes('--write')) {
    const url = changelogUrl() ?? DEFAULT_URL;
    await writeFile(BUNDLED, await fetchChangelog(url));
    console.info(`changelog: src/content/cms-changelog.md updated from ${url}`);
  }
}
