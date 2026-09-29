<script setup lang="ts">
import CopyCommand from '~/components/CopyCommand.vue';
import HeroStack from '~/components/HeroStack.vue';
import { site } from '~/site.ts';
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="wrap hero-grid">
      <div class="copy">
        <h1 id="hero-title">
          <span>Model it Monday.</span>
          <span class="accent">Live by Friday.</span>
        </h1>
        <p class="lead">
          Manablox is the content system developers install with one command and editors are
          happy to spend their day in. Shape content in code or by clicking, write with the real
          website beside the form, and serve it all over REST and GraphQL. AI, workflows and
          more come as plugins, when you want them.
        </p>
        <CopyCommand :command="site.createCommand" />
        <div class="btn-row">
          <RouterLink to="/download" class="btn btn--primary">Get Manablox</RouterLink>
          <a href="#cast" class="btn btn--ghost">Read the week</a>
        </div>
        <ul class="facts" aria-label="At a glance">
          <li>Node 24</li>
          <li>Postgres or SQLite</li>
          <li>REST and GraphQL</li>
          <li>Plugins you pick</li>
          <li>MIT-licensed core</li>
        </ul>
      </div>
      <HeroStack />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-block: clamp(3rem, 2rem + 5vw, 6.5rem) clamp(3.5rem, 2rem + 5vw, 6rem);
  overflow: hidden;
}

/* The twelve columns every page in Manablox is laid out on. */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  width: min(100%, var(--wrap));
  margin-inline: auto;
  background: repeating-linear-gradient(
    90deg,
    transparent 0 calc(100% / 12 - 1px),
    var(--grid-line) calc(100% / 12 - 1px) calc(100% / 12)
  );
  pointer-events: none;
  mask-image: linear-gradient(to bottom, black 40%, transparent);
}

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
}

h1 {
  display: grid;
  font-size: var(--step-5);
  font-stretch: 75%;
  line-height: 0.9;
  letter-spacing: -0.025em;
  word-spacing: 0.06em;
}

.accent {
  color: var(--brand);
}

.lead {
  max-width: 34rem;
  margin-block: 1.6rem 2rem;
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--ink-soft);
}

.copy :deep(.cmd) {
  max-width: 30rem;
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--ink-soft);
}

.facts li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.facts li::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 2px;
  background: var(--brand);
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
