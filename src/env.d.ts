/// <reference types="vite/client" />

import 'vue-router';

declare global {
  /** The CMS changelog's Markdown, injected by `vite.config.ts` (`build/changelog.ts`). */
  const __CHANGELOG__: string;
  /** The newest release in that changelog, the version people install. */
  const __CMS_VERSION__: string;
  /** The analytics server's origin, injected by `vite.config.ts` (`ANALYTICS_ORIGIN`). */
  const __ANALYTICS_ORIGIN__: string;
  /** The license portal's origin, injected by `vite.config.ts` (`LICENSE_PORTAL_URL`). */
  const __LICENSE_PORTAL__: string;
  /**
   * Per premium plugin, what the license server's catalogue said at build time
   * (`build/prices.ts`, `LICENSE_API`): the lowest
   * monthly price, formatted, and the trial length. Null when it was not asked or not reached.
   */
  const __PREMIUM_OFFERS__: Record<
    string,
    { fromMonthly: string | null; trialDays: number | null }
  >;

  interface Window {
    /**
     * Plausible. Only `o` matters here: the script starts itself when it finds its
     * options there, and then replaces this with its own function.
     */
    plausible?: { o?: Record<string, unknown> };
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    description: string;
  }
}
