<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ command: string; tone?: 'light' | 'dark' }>();
const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

async function copy() {
  try {
    await navigator.clipboard.writeText(props.command);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch {
    copied.value = false;
  }
}
</script>

<template>
  <div class="cmd" :class="tone === 'dark' ? 'cmd--dark' : 'cmd--light'">
    <code><span class="prompt" aria-hidden="true">$</span>{{ command }}</code>
    <button type="button" class="copy" @click="copy">
      <span aria-live="polite">{{ copied ? 'Copied' : 'Copy' }}</span>
    </button>
  </div>
</template>

<style scoped>
.cmd {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 100%;
  padding: 0.45rem 0.45rem 0.45rem 1rem;
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: clamp(0.78rem, 0.74rem + 0.2vw, 0.92rem);
}

.cmd--light {
  background: var(--surface);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    4px 4px 0 var(--edge-shadow);
}

.cmd--dark {
  background: var(--console-2);
  color: var(--white);
  box-shadow: inset 0 0 0 1.5px rgb(255 255 255 / 0.18);
}

code {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  font-size: inherit;
}

.prompt {
  margin-right: 0.6em;
  color: var(--brand);
  font-weight: 700;
}

.cmd--dark .prompt {
  color: var(--accent-night);
}

.copy {
  flex: none;
  padding: 0.45rem 0.9rem;
  border: 0;
  border-radius: 999px;
  background: var(--solid);
  color: var(--solid-ink);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
}

.cmd--dark .copy {
  background: var(--accent-night);
  color: var(--on-accent);
}

.copy:hover {
  background: var(--brand-deep);
  color: var(--white);
}
</style>
