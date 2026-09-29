import { createApp as createClientApp, createSSRApp } from 'vue';
import App from './App.vue';
import { vReveal } from './reveal.ts';
import { createAppRouter } from './router.ts';
import './styles/base.css';

/** `hydrate` is false only in the dev server, where the page arrives without markup. */
export function createApp(hydrate = true) {
  const app = hydrate ? createSSRApp(App) : createClientApp(App);
  const router = createAppRouter();
  app.use(router);
  app.directive('reveal', vReveal);
  return { app, router };
}
