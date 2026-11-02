/// <reference types="vite/client" />

import 'vue-router';

declare global {
  /** The CMS changelog's Markdown, injected by `vite.config.ts` (`build/changelog.ts`). */
  const __CHANGELOG__: string;
  /** The newest release in that changelog, the version people install. */
  const __CMS_VERSION__: string;
  /** The analytics server's origin, injected by `vite.config.ts` (`ANALYTICS_ORIGIN`). */
  const __ANALYTICS_ORIGIN__: string;

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
