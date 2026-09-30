<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { site } from '~/site.ts';
import BrandMark from './BrandMark.vue';
import ThemeToggle from './ThemeToggle.vue';

const open = ref(false);
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);
</script>

<template>
  <header class="header">
    <div class="wrap bar">
      <RouterLink to="/" class="brand" aria-label="Manablox home">
        <BrandMark :size="30" />
        <span>Manablox</span>
      </RouterLink>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': open }" aria-label="Main">
        <RouterLink to="/#monday" active-class="" exact-active-class="">The week</RouterLink>
        <RouterLink to="/features">Features</RouterLink>
        <RouterLink to="/plugins">Plugins</RouterLink>
        <RouterLink to="/changelog">Changelog</RouterLink>
        <a :href="site.guide">Docs</a>
        <RouterLink to="/download" class="cta">Download</RouterLink>
      </nav>

      <div class="controls">
        <ThemeToggle />
        <button
          type="button"
          class="menu"
          :aria-expanded="open"
          aria-controls="site-nav"
          @click="open = !open"
        >
          <span class="sr-only">Menu</span>
          <span class="bars" :class="{ 'bars--open': open }" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: saturate(1.4) blur(14px);
  border-bottom: 1px solid var(--line);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: 4.25rem;
}

.brand {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: -0.02em;
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-left: auto;
}

.nav a {
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  white-space: nowrap;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;
}

.nav a:hover {
  background: var(--paper-2);
}

.nav a.router-link-exact-active:not(.cta) {
  color: var(--accent-text);
}

.nav .cta {
  margin-left: 0.4rem;
  padding-inline: 1.15rem;
  background: var(--solid);
  color: var(--solid-ink);
}

.nav .cta:hover {
  background: var(--brand-deep);
  color: var(--white);
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.menu {
  display: none;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

.bars,
.bars::before,
.bars::after {
  display: block;
  width: 20px;
  height: 2px;
  margin: auto;
  background: var(--ink);
  border-radius: 2px;
  transition: transform 0.25s var(--ease);
}

.bars {
  position: relative;
}

.bars::before,
.bars::after {
  content: '';
  position: absolute;
  left: 0;
}

.bars::before {
  top: -6px;
}

.bars::after {
  top: 6px;
}

.bars--open {
  background: transparent;
}

.bars--open::before {
  transform: translateY(6px) rotate(45deg);
}

.bars--open::after {
  transform: translateY(-6px) rotate(-45deg);
}

@media (max-width: 860px) {
  .menu {
    display: block;
  }

  .nav {
    position: absolute;
    top: 4.25rem;
    left: 0;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    padding: 0.75rem var(--gutter) 1.25rem;
    background: var(--paper);
    border-bottom: 1px solid var(--line);
  }

  .nav--open {
    display: flex;
  }

  .nav a {
    padding: 0.8rem 1rem;
    font-size: 1.05rem;
  }

  .nav .cta {
    margin: 0.5rem 0 0;
    text-align: center;
  }
}
</style>
