<script setup lang="ts">
import type { SectionIcon } from '~/content/changelog.ts';

defineProps<{ name: SectionIcon }>();
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'highlights'">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
      <path d="M5 2.5l.6 1.4L7 4.5l-1.4.6L5 6.5l-.6-1.4L3 4.5l1.4-.6z" />
    </template>
    <template v-else-if="name === 'upgrade'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16V8" />
      <path d="M8.5 11.5L12 8l3.5 3.5" />
    </template>
    <template v-else-if="name === 'fixed'">
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.6 17.1a1.9 1.9 0 0 0 2.7 2.7l5.7-5.7a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.3-.4-.4-2.3z"
      />
    </template>
    <template v-else-if="name === 'breaking'">
      <path d="M10.3 3.9L2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </template>
    <template v-else>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </template>
  </svg>
</template>
