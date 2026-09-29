/** Where the site sends people. Everything outbound is named here. */
export const site = {
  name: 'Manablox',
  author: 'Peter Braith',
  /** Facebook wants a territory, and the copy is written in British English. */
  locale: 'en_GB',
  version: __CMS_VERSION__,
  tagline: 'The headless CMS you install with one command',
  /** The CMS's source, MIT licensed. */
  github: 'https://github.com/manablox/manablox-cms',
  docs: 'https://dev.manablox.io',
  /** The user guide: using Manablox, from the CLI to a site in production. */
  guide: 'https://docs.manablox.io',
  npm: 'https://www.npmjs.com/package/@manablox/cli',
  // A game shares the name. The home page sends anyone who wanted that one here.
  game: 'https://game.manablox.io',
  gameBuilds: 'https://daspete.itch.io/manablox',
  // Plausible, self hosted, at `ANALYTICS_ORIGIN`. It loads only after a visitor accepts.
  analytics: `${__ANALYTICS_ORIGIN__}/js/pa-uftfGVEgTyuOc091Hyz_1.js`,
  /** The license portal: buying, trials and keys of the premium plugins. */
  portal: __LICENSE_PORTAL__,
  createCommand: 'pnpm dlx @manablox/cli create my-cms',
  frontendCommand: 'pnpm dlx @manablox/cli frontend my-site --framework vue-ssr',
  /**
   * Handles for the networks that credit an account on the card. Both are optional:
   * the tags that need them are left out while they are empty.
   */
  x: '',
  fediverse: '',
  /** The share card the prerender points every social preview at. */
  shareImage: '/share.png',
  shareImageAlt: 'Manablox, the headless CMS you install with one command',
};
