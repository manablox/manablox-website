import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/HomePage.vue'),
    meta: {
      title: 'Manablox: the headless CMS you install with one command',
      description:
        'Model content in code or in the admin, write with a live preview, and serve it over REST and GraphQL. Add a designed website, AI, workflows or webhooks as plugins. You host it yourself, on Postgres or a single SQLite file.',
    },
  },
  {
    path: '/features',
    component: () => import('./pages/FeaturesPage.vue'),
    meta: {
      title: 'Every feature | Manablox',
      description:
        'The whole Manablox core on one page: content modelling, the editor, images, delivery, teams and operations.',
    },
  },
  {
    path: '/plugins',
    component: () => import('./pages/PluginsPage.vue'),
    meta: {
      title: 'Plugins | Manablox',
      description:
        'A designed website, AI, workflows and webhooks: four first-party plugins you pick when you create an instance or add later with one command. The core stays lean.',
    },
  },
  {
    path: '/download',
    component: () => import('./pages/DownloadPage.vue'),
    meta: {
      title: 'Download | Manablox',
      description:
        'Install Manablox with one command, scaffold a frontend with another, and have an admin and an API running on localhost in minutes.',
    },
  },
  {
    path: '/changelog',
    component: () => import('./pages/ChangelogPage.vue'),
    meta: {
      title: 'Changelog | Manablox',
      description:
        'What is new in every Manablox release, in plain words: the highlights, what to know before you upgrade and what was fixed.',
    },
  },
  {
    path: '/imprint',
    component: () => import('./pages/ImprintPage.vue'),
    meta: {
      title: 'Imprint | Manablox',
      description:
        'Who runs this site, how to reach them, and what the site stores in your browser.',
    },
  },
  {
    path: '/:rest(.*)*',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: {
      title: 'Not found | Manablox',
      description: 'This page does not exist.',
    },
  },
];

/** The paths the build renders to files. The catch-all becomes `404.html`. */
export const prerenderPaths = ['/', '/features', '/plugins', '/download', '/changelog', '/imprint'];

/**
 * The prerendered file already carries the right head. This keeps it right after a
 * navigation inside the app, which is what a crawler that runs JavaScript reads.
 */
function syncHead(title: string, description: string, path: string) {
  document.title = title;
  const set = (selector: string, attribute: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attribute, value);
  };
  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('meta[name="twitter:title"]', 'content', title);
  set('meta[name="twitter:description"]', 'content', description);
  const url = new URL(path, window.location.origin).href;
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:url"]', 'content', url);
}

export function createAppRouter() {
  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(to, _from, saved) {
      if (saved) return saved;
      if (to.hash) return { el: to.hash, top: 120 };
      return { top: 0 };
    },
  });

  if (!import.meta.env.SSR) {
    router.afterEach((to) => {
      syncHead(to.meta.title, to.meta.description, to.path);
    });
  }

  return router;
}
