<script setup lang="ts">
import { computed } from 'vue';
import { plugins } from '~/content/plugins.ts';
import type { Chapter } from '~/content/week.ts';
import InlineCode from './InlineCode.vue';

const props = defineProps<{ chapter: Chapter }>();
const used = computed(() => plugins.filter((p) => props.chapter.plugins?.includes(p.id)));
</script>

<template>
  <section :id="chapter.id" class="chapter" :class="`tone-${chapter.tone}`" :aria-labelledby="`${chapter.id}-title`">
    <div class="wrap">
      <header class="head">
        <div class="stamp" aria-hidden="true">
          <span class="stamp-day">{{ chapter.short }}</span>
          <span class="stamp-time">{{ chapter.time }}</span>
        </div>
        <div>
          <p class="label eyebrow">{{ chapter.day }}, {{ chapter.time }}</p>
          <h2 :id="`${chapter.id}-title`">{{ chapter.title }}</h2>
        </div>
      </header>

      <div class="body">
        <div class="story">
          <p v-for="(paragraph, index) in chapter.story" :key="index" v-reveal>
            <InlineCode :text="paragraph" />
          </p>
        </div>
        <div v-reveal class="visual">
          <slot />
        </div>
      </div>

      <div v-reveal class="used">
        <h3 class="label">{{ chapter.usedLabel }}</h3>
        <ul>
          <li v-for="item in chapter.used" :key="item"><InlineCode :text="item" /></li>
        </ul>
        <p v-if="used.length" class="plugins">
          <span class="plugins-label">From the plugins</span>
          <RouterLink v-for="plugin in used" :key="plugin.id" :to="`/plugins#${plugin.id}`">
            {{ plugin.name }}
          </RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chapter {
  --tone: var(--brand);
  --tone-ink: var(--on-accent);
  --tone-soft: var(--brand-soft);
  position: relative;
  padding-block: clamp(4.5rem, 3rem + 6vw, 8rem);
  scroll-margin-top: 7.5rem;
}

.tone-iris {
  --tone: var(--iris);
  --tone-ink: var(--on-accent);
  --tone-soft: var(--iris-soft);
  background: var(--surface);
}

.tone-ochre {
  --tone: var(--ochre);
  --tone-ink: var(--on-accent);
  --tone-soft: var(--ochre-soft);
}

.tone-lilac {
  --tone: var(--lilac);
  --tone-ink: var(--on-accent);
  --tone-soft: var(--lilac-soft);
  background: var(--surface);
}

.tone-night {
  --tone: var(--ochre);
  --tone-ink: var(--on-accent);
  --tone-soft: oklch(76% 0.14 92 / 0.18);
  background: var(--night);
  color: rgb(255 255 255 / 0.84);
}

.tone-night h2 {
  color: var(--white);
}

.head {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
  gap: clamp(1rem, 3vw, 2.5rem);
  margin-bottom: clamp(2rem, 4vw, 3.5rem);
}

.stamp {
  display: grid;
  place-content: center;
  width: clamp(5.5rem, 4rem + 6vw, 9rem);
  aspect-ratio: 1;
  border-radius: clamp(16px, 2vw, 26px);
  background: var(--tone);
  color: var(--tone-ink);
  text-align: center;
  transform: rotate(-4deg);
}

.stamp-day {
  font-family: var(--font-display);
  font-weight: 800;
  font-stretch: 75%;
  font-size: clamp(2rem, 1.4rem + 2.6vw, 3.6rem);
  line-height: 0.9;
  text-transform: uppercase;
}

.stamp-time {
  font-family: var(--font-mono);
  font-size: clamp(0.7rem, 0.6rem + 0.3vw, 0.9rem);
  font-weight: 700;
}

.eyebrow {
  margin-bottom: 0.6rem;
  color: var(--ink-soft);
}

.tone-night .eyebrow {
  color: var(--accent-night);
}

h2 {
  font-size: var(--step-4);
  max-width: 16ch;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(2rem, 5vw, 4.5rem);
  align-items: start;
}

.story {
  display: grid;
  gap: 1.1rem;
  max-width: 36rem;
}

.story p:first-child {
  font-size: var(--step-1);
  line-height: 1.5;
  font-weight: 500;
}

.story :deep(code) {
  padding: 0.05em 0.35em;
  border-radius: 5px;
  background: var(--tone-soft);
  font-size: 0.86em;
  white-space: nowrap;
}

.tone-night .story :deep(code) {
  color: var(--white);
}

.used {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding-top: 1.5rem;
  border-top: 1.5px solid var(--line-strong);
}

.tone-night .used {
  border-color: rgb(255 255 255 / 0.18);
}

.used h3 {
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  font-stretch: normal;
  line-height: 1.4;
}

ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: 0.6rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  position: relative;
  padding-left: 1.4rem;
  font-weight: 600;
  line-height: 1.45;
}

li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.32em;
  width: 0.75em;
  height: 0.75em;
  border-radius: 3px;
  background: var(--tone);
}

li :deep(code) {
  font-size: 0.88em;
}

.plugins {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.6rem;
  margin-top: 1.4rem;
}

.plugins-label {
  margin-right: 0.3rem;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--ink-soft);
}

.tone-night .plugins-label {
  color: var(--accent-night);
}

.plugins a {
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1.5px var(--tone);
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition:
    background 0.2s,
    color 0.2s;
}

.plugins a:hover {
  background: var(--tone);
  color: var(--tone-ink);
}

@media (max-width: 900px) {
  .body {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 520px) {
  .head {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
  }
}
</style>
