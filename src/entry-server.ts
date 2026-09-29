import { renderToString, type SSRContext } from 'vue/server-renderer';
import { createApp } from './app.ts';
import { prerenderPaths } from './router.ts';
import { site } from './site.ts';

export { prerenderPaths, site };

export interface RenderResult {
  html: string;
  title: string;
  description: string;
  /** Source modules the page rendered, for preloading their chunks. */
  modules: string[];
}

export async function render(url: string): Promise<RenderResult> {
  const { app, router } = createApp();
  await router.push(url);
  await router.isReady();
  const ctx: SSRContext = {};
  const html = await renderToString(app, ctx);
  const { title, description } = router.currentRoute.value.meta;
  return { html, title, description, modules: [...((ctx.modules as Set<string>) ?? [])] };
}
