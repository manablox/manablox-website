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
    <template v-else-if="name === 'start'">
      <path d="M4 17l6-5-6-5" />
      <path d="M12 19h8" />
    </template>
    <template v-else-if="name === 'model'">
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </template>
    <template v-else-if="name === 'write'">
      <path d="M4 20h4L19 9l-4-4L4 16z" />
      <path d="M13.5 6.5l4 4" />
    </template>
    <template v-else-if="name === 'media'">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5-5-9 9" />
    </template>
    <template v-else-if="name === 'deliver'">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
    </template>
    <template v-else-if="name === 'team'">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 14a6.5 6.5 0 0 1 3.5 6" />
    </template>
    <template v-else-if="name === 'spaces'">
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
    </template>
    <template v-else-if="name === 'automation'">
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </template>
    <template v-else-if="name === 'admin'">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </template>
    <template v-else-if="name === 'hosting'">
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01" />
      <path d="M7 16.5h.01" />
    </template>
    <template v-else-if="name === 'running'">
      <ellipse cx="12" cy="5.5" rx="8" ry="2.5" />
      <path d="M4 5.5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-13" />
      <path d="M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" />
    </template>
    <template v-else-if="name === 'extend'">
      <path d="M9 2v6" />
      <path d="M15 2v6" />
      <path d="M6 8h12v4a6 6 0 0 1-12 0z" />
      <path d="M12 18v4" />
    </template>
    <template v-else-if="name === 'premium'">
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20" />
      <path d="M12 21L8 9l4-6 4 6z" />
    </template>
    <template v-else>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </template>
  </svg>
</template>
