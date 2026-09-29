<script setup lang="ts">
import type { Inline } from '~/content/changelog.ts';

/** Renders parsed inline markdown without `v-html`. */
defineProps<{ parts: Inline[] }>();
</script>

<template>
  <template v-for="(part, index) in parts" :key="index"
    ><code v-if="part.kind === 'code'">{{ part.text }}</code
    ><strong v-else-if="part.kind === 'strong'">{{ part.text }}</strong
    ><a v-else-if="part.kind === 'link'" :href="part.href">{{ part.text }}</a
    ><template v-else>{{ part.text }}</template></template
  >
</template>
