<script setup lang="ts">
import { plugins } from '~/content/plugins.ts';
</script>

<template>
  <ul class="plugin-cards">
    <li v-for="plugin in plugins" :key="plugin.id" v-reveal :class="`t-${plugin.tone}`">
      <RouterLink :to="`/plugins#${plugin.id}`" class="plugin-card">
        <span class="stamp" aria-hidden="true">{{ plugin.id }}</span>
        <span class="package">{{ plugin.packageName }}</span>
        <h3>
          {{ plugin.name }}
          <span v-if="plugin.premium" class="premium-badge">Premium</span>
        </h3>
        <p>{{ plugin.pitch }}</p>
        <span class="more">What it does <span aria-hidden="true">→</span></span>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.plugin-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15.5rem), 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.t-brand {
  --c: var(--brand);
}

.t-iris {
  --c: var(--iris);
}

.t-ochre {
  --c: var(--ochre);
}

.t-lilac {
  --c: var(--lilac);
}

.plugin-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.35rem 1.35rem 1.25rem;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--edge);
  color: var(--ink);
  text-decoration: none;
  transition:
    box-shadow 0.25s,
    transform 0.25s var(--ease);
}

.plugin-card:hover {
  transform: translateY(-3px);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    6px 6px 0 var(--c);
}

.stamp {
  display: grid;
  place-content: center;
  width: fit-content;
  min-width: 3.4rem;
  height: 3.4rem;
  margin: 0.2rem 0 1.2rem;
  padding-inline: 0.9rem;
  border-radius: 12px;
  background: var(--c);
  color: var(--on-accent);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  transform: rotate(-4deg);
}

.package {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--ink-soft);
  overflow-wrap: anywhere;
}

h3 {
  margin-top: 0.35rem;
  font-size: var(--step-2);
}

.premium-badge {
  display: inline-block;
  margin-left: 0.3rem;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--solid);
  color: var(--solid-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  vertical-align: middle;
}

p {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--ink-soft);
}

.more {
  margin-top: auto;
  padding-top: 1.1rem;
  font-weight: 800;
  font-size: 0.92rem;
  color: var(--accent-text);
}

.plugin-card:hover .more {
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
