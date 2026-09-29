<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const KEY = 'manablox-theme';
/** Neutral until the browser tells us which theme is actually showing. */
const label = ref('Switch theme');
const system =
  typeof window === 'undefined' ? undefined : window.matchMedia('(prefers-color-scheme: dark)');

function current(): 'light' | 'dark' {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === 'light' || chosen === 'dark') return chosen;
  return system?.matches ? 'dark' : 'light';
}

function describe() {
  label.value = current() === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme';
}

function toggle() {
  const next = current() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // A browser that refuses storage still gets the theme for this visit.
  }
  describe();
}

onMounted(() => {
  describe();
  system?.addEventListener('change', describe);
});

onBeforeUnmount(() => system?.removeEventListener('change', describe));
</script>

<template>
  <button type="button" class="theme" :aria-label="label" :title="label" @click="toggle">
    <svg class="icon moon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
    </svg>
    <svg class="icon sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
      <path
        d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
}

.theme:hover {
  background: var(--paper-2);
}

/* Both icons sit in the same cell; the theme decides which one has a colour. */
.icon {
  grid-area: 1 / 1;
  width: 1.25rem;
  height: 1.25rem;
}

.moon {
  color: light-dark(currentColor, transparent);
}

.sun {
  color: light-dark(transparent, currentColor);
}
</style>
