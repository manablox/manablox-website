<script setup lang="ts">
import { computed } from 'vue';

/** Renders `backticked` spans of a plain string as code. */
const props = defineProps<{ text: string }>();
const parts = computed(() => props.text.split('`'));
</script>

<template>
  <template v-for="(part, index) in parts" :key="index"
    ><code v-if="index % 2 === 1">{{ part }}</code
    ><template v-else>{{ part }}</template></template
  >
</template>
