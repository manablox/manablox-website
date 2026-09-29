import { createApp } from './app.ts';

const { app, router } = createApp(Boolean(document.getElementById('app')?.firstElementChild));

router.afterEach((to) => {
  document.title = to.meta.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', to.meta.description);
});

await router.isReady();
app.mount('#app');
