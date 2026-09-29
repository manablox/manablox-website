<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { consent, setConsent, startConsent } from '~/consent.ts';

/**
 * The bar is client only. Mounting it after hydration keeps it out of the prerendered
 * HTML, so a visitor who already answered never sees it flash.
 */
const ready = ref(false);

onMounted(() => {
  startConsent();
  ready.value = true;
});
</script>

<template>
  <Transition name="rise">
    <aside
      v-if="ready && consent === null"
      class="bar"
      role="region"
      aria-labelledby="consent-title"
    >
      <div class="bar-inner">
        <div class="text">
          <h2 id="consent-title">Count this visit?</h2>
          <p>
            Manablox sets no cookies. We would like to count visits with Plausible, which we
            run on our own server: no cookies, no personal data, nothing that follows you to
            another site. Your answer is kept in this browser, and the
            <RouterLink to="/imprint">imprint</RouterLink> explains the rest.
          </p>
        </div>
        <div class="choices">
          <button type="button" class="btn btn--yes" @click="setConsent('granted')">
            Count it
          </button>
          <button type="button" class="btn btn--no" @click="setConsent('denied')">
            No thanks
          </button>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.bar {
  position: fixed;
  inset: auto 0 0;
  z-index: 90;
  padding: var(--gutter);
  padding-block-start: 0;
  pointer-events: none;
}

.bar-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: min(100%, var(--wrap));
  margin-inline: auto;
  padding: 1.1rem 1.4rem;
  border: 1.5px solid var(--edge);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
  pointer-events: auto;
}

.text {
  flex: 1 1 22rem;
}

h2 {
  margin-bottom: 0.25rem;
  font-size: var(--step-0);
}

p {
  margin: 0;
  max-width: 46rem;
  font-size: var(--step--1);
  line-height: 1.55;
  color: var(--ink-soft);
}

p a {
  color: var(--accent-text);
}

.choices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.btn {
  min-height: 2.6rem;
  padding: 0 1.2rem;
  border: 0;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.2s var(--ease),
    background 0.2s;
}

.btn--yes {
  background: var(--brand-deep);
  color: var(--white);
  box-shadow: 3px 3px 0 var(--edge-shadow);
}

.btn--no {
  background: transparent;
  color: var(--ink);
  box-shadow: inset 0 0 0 1.5px var(--edge);
}

.btn--no:hover {
  background: var(--paper-2);
}

.rise-enter-active {
  transition:
    transform 0.35s var(--ease),
    opacity 0.35s;
}

.rise-leave-active {
  transition:
    transform 0.25s var(--ease),
    opacity 0.25s;
}

.rise-enter-from,
.rise-leave-to {
  transform: translateY(1.5rem);
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .rise-enter-active,
  .rise-leave-active {
    transition: none;
  }
}

@media (max-width: 560px) {
  .choices {
    width: 100%;
  }

  .choices .btn {
    flex: 1;
  }
}
</style>
