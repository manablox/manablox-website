<script setup lang="ts">
defineProps<{ size?: number }>();
</script>

<template>
  <svg
    class="mark"
    :width="size ?? 32"
    :height="size ?? 32"
    viewBox="0 0 64 64"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M29 6C19.5 6 17 9 17 16v9c0 4.5-2 7-7 7 5 0 7 2.5 7 7v9c0 7 2.5 10 12 10"
      fill="none"
      stroke="var(--brand)"
      stroke-width="7.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <rect x="36" y="21" width="22" height="22" rx="5.5" fill="var(--iris)" />
  </svg>
</template>
