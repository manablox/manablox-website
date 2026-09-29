<script setup lang="ts">
import PluginCards from '~/components/PluginCards.vue';
</script>

<template>
  <section id="plugins" class="plugins" aria-labelledby="plugins-title">
    <div class="wrap">
      <div class="head">
        <div v-reveal>
          <p class="label">Plugins</p>
          <h2 id="plugins-title">Four more, when you want them.</h2>
        </div>
        <p v-reveal class="lead">
          The core holds your content, your files, your people and the way it all goes live. A
          designed website, AI, workflows and webhooks are plugins: pick them when you create
          an instance, or add one later with <code>manablox plugin install</code>.
        </p>
      </div>
      <PluginCards />
      <RouterLink to="/plugins" class="all">Everything the plugins do</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.plugins {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
  scroll-margin-top: 4.5rem;
}

.head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 5vw, 5rem);
  align-items: end;
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.label {
  margin-bottom: 0.8rem;
  color: var(--accent-text);
}

h2 {
  font-size: var(--step-4);
  max-width: 14ch;
}

.lead {
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--ink-soft);
}

.lead code {
  padding: 0.05em 0.35em;
  border-radius: 5px;
  background: var(--paper-2);
  font-size: 0.8em;
  color: var(--ink);
}

.all {
  display: inline-block;
  margin-top: 1.8rem;
  font-weight: 800;
  color: var(--accent-text);
  text-underline-offset: 5px;
}

@media (max-width: 960px) {
  .head {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
