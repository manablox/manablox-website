<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { chapters } from '~/content/week.ts';

const days = [
  ...chapters.map((c) => ({ id: c.id, short: c.short, tone: c.tone })),
  { id: 'saturday', short: 'Sat', tone: 'brand' as const },
];
const active = ref(-1);
let observer: IntersectionObserver | undefined;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        active.value = days.findIndex((d) => d.id === entry.target.id);
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  for (const day of days) {
    const el = document.getElementById(day.id);
    if (el) observer.observe(el);
  }
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <nav class="rail" aria-label="The week">
    <div class="wrap track">
      <a
        v-for="(day, index) in days"
        :key="day.id"
        :href="`#${day.id}`"
        class="day"
        :class="[`t-${day.tone}`, { past: index < active, now: index === active }]"
        :aria-current="index === active ? 'step' : undefined"
      >
        <span class="fill" aria-hidden="true"></span>
        <span class="name">{{ day.short }}</span>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.rail {
  position: sticky;
  top: 4.25rem;
  z-index: 40;
  padding-block: 0.6rem;
  background: color-mix(in srgb, var(--paper) 90%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.track {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.4rem;
}

.day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.1rem;
  border-radius: 8px;
  background: var(--paper-2);
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink-soft);
}

.fill {
  position: absolute;
  inset: 0;
  background: var(--c);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease);
}

.name {
  position: relative;
}

.t-brand {
  --c: var(--brand);
  --on: var(--on-accent);
}

.t-iris {
  --c: var(--iris);
  --on: var(--on-accent);
}

.t-ochre {
  --c: var(--ochre);
  --on: var(--on-accent);
}

.t-lilac {
  --c: var(--lilac);
  --on: var(--on-accent);
}

.t-night {
  --c: var(--tone-night-bg);
  --on: var(--tone-night-on);
}

.past .fill,
.now .fill {
  transform: scaleX(1);
}

.past,
.now {
  color: var(--on);
}

.past {
  opacity: 0.55;
}

.day:hover {
  color: var(--ink);
  box-shadow: inset 0 0 0 1.5px var(--edge);
}

.past:hover,
.now:hover {
  color: var(--on);
}
</style>
