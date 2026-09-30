<script setup lang="ts">
import { premiumOnSale } from '~/content/plugins.ts';
import { site } from '~/site.ts';
import BrandMark from './BrandMark.vue';
</script>

<template>
  <footer class="footer">
    <div class="wrap grid">
      <div class="about">
        <RouterLink to="/" class="brand" aria-label="Manablox home">
          <BrandMark :size="34" />
          <span>Manablox</span>
        </RouterLink>
        <p>
          A headless CMS you install with one command and run wherever you like. Open source
          under the MIT license; the website and AI plugins are commercial.
        </p>
      </div>

      <nav aria-label="Product">
        <h2 class="label">Product</h2>
        <RouterLink to="/#monday" active-class="" exact-active-class="">The week</RouterLink>
        <RouterLink to="/features">Every feature</RouterLink>
        <RouterLink to="/plugins">Plugins</RouterLink>
        <RouterLink to="/download">Download</RouterLink>
        <RouterLink to="/changelog">Changelog</RouterLink>
      </nav>

      <nav aria-label="Resources">
        <h2 class="label">Resources</h2>
        <a :href="site.guide">User guide</a>
        <a :href="site.docs">Developer docs</a>
        <a :href="site.github">Source on GitHub</a>
        <a :href="site.npm">@manablox/cli on npm</a>
        <a v-if="premiumOnSale" :href="site.portal">License portal</a>
      </nav>
    </div>

    <div class="wrap legal">
      <span class="legal-meta">
        <RouterLink to="/changelog">Version {{ site.version }}</RouterLink>
        <RouterLink to="/imprint">Imprint</RouterLink>
      </span>
      <span>Bella Vista, Max, Anna and Julia are made up. The features are not.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 4rem 2rem;
  background: var(--night);
  color: rgb(255 255 255 / 0.72);
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2.5rem;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--white);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.6rem;
  text-decoration: none;
}

.about p {
  max-width: 26rem;
  margin-top: 1rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

nav h2 {
  margin-bottom: 0.4rem;
  color: var(--accent-night);
  font-family: var(--font-mono);
  font-stretch: normal;
  line-height: 1.4;
}

nav a {
  text-decoration: none;
  width: fit-content;
}

nav a:hover {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.legal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
}

.legal a {
  color: inherit;
  text-decoration: none;
}

.legal a:hover {
  color: var(--white);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(255 255 255 / 0.12);
  font-size: var(--step--1);
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }

  .about {
    grid-column: 1 / -1;
  }
}
</style>
