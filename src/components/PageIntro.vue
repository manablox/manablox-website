<script setup lang="ts">
/**
 * The opening of an inner page: a label, the title and the lead (the default slot). `after`
 * follows the lead, e.g. an index of the page; `aside` sits in a column beside it all.
 */
const {
  titleWidth = '12ch',
  leadWidth = '38rem',
  end = '2.5rem',
} = defineProps<{
  label: string;
  title: string;
  titleId: string;
  /** The widest the title may set, in `ch`. */
  titleWidth?: string;
  leadWidth?: string;
  /** Space below the intro. */
  end?: string;
}>();
</script>

<template>
  <section
    class="intro"
    :aria-labelledby="titleId"
    :style="{ '--title-width': titleWidth, '--lead-width': leadWidth, '--intro-end': end }"
  >
    <div v-if="$slots.aside" class="wrap intro-grid">
      <div>
        <p class="label">{{ label }}</p>
        <h1 :id="titleId">{{ title }}</h1>
        <p class="lead"><slot /></p>
        <slot name="after" />
      </div>
      <slot name="aside" />
    </div>
    <div v-else class="wrap">
      <p class="label">{{ label }}</p>
      <h1 :id="titleId">{{ title }}</h1>
      <p class="lead"><slot /></p>
      <slot name="after" />
    </div>
  </section>
</template>

<style scoped>
.intro {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem) var(--intro-end);
}

.intro-grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: end;
}

.label {
  margin-bottom: 1rem;
  color: var(--accent-text);
}

h1 {
  font-size: var(--step-5);
  font-stretch: 75%;
  line-height: 0.9;
  max-width: var(--title-width);
}

.lead {
  max-width: var(--lead-width);
  margin-top: 1.5rem;
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--ink-soft);
}

.lead :slotted(a) {
  color: var(--accent-text);
  font-weight: 700;
  text-underline-offset: 4px;
}

@media (max-width: 900px) {
  .intro-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
