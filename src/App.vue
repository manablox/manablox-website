<script setup lang="ts">
import CookieBar from './components/CookieBar.vue';
import SiteFooter from './components/SiteFooter.vue';
import SiteHeader from './components/SiteHeader.vue';
</script>

<template>
  <a class="skip" href="#main">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
  <CookieBar />
</template>

<style scoped>
.skip {
  position: absolute;
  left: 1rem;
  top: -4rem;
  z-index: 100;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--solid);
  color: var(--solid-ink);
  font-weight: 700;
  text-decoration: none;
}

.skip:focus {
  top: 1rem;
}
</style>
