<script setup lang="ts">
import CopyCommand from '~/components/CopyCommand.vue';
import { site } from '~/site.ts';
</script>

<template>
  <section id="saturday" class="saturday" aria-labelledby="saturday-title">
    <div class="wrap sat-grid">
      <div class="stamp" aria-hidden="true">
        <span class="stamp-day">Sat</span>
        <span class="stamp-time">day off</span>
      </div>
      <svg class="closing" viewBox="0 0 60 400" aria-hidden="true">
        <path d="M8 10c24 0 30 14 30 36v112c0 24 6 38 16 42-10 4-16 18-16 42v112c0 22-6 36-30 36" />
      </svg>
      <div class="sat-copy">
        <p class="label">Saturday</p>
        <h2 id="saturday-title">Nothing to do.</h2>
        <p class="sat-lead">
          The site is up and the automations run on their own. Anna has already scheduled
          Monday’s specials, and Julia has been asked to approve them. Your week starts with
          the same line Max typed.
        </p>
        <CopyCommand :command="site.createCommand" tone="dark" />
        <div class="btn-row">
          <RouterLink to="/download" class="btn btn--light">Download and install</RouterLink>
          <RouterLink to="/features" class="btn btn--outline">See every feature</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.saturday {
  padding-block: clamp(5rem, 3rem + 7vw, 9rem);
  background:
    radial-gradient(circle at 85% 20%, oklch(76% 0.14 92 / 0.35), transparent 45%),
    radial-gradient(circle at 10% 90%, oklch(68% 0.175 50 / 0.4), transparent 45%),
    var(--iris-deep);
  color: var(--white);
  scroll-margin-top: 7.5rem;
}

.sat-grid {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
}

/* Closes the brace the hero opened. */
.closing {
  position: absolute;
  right: var(--gutter);
  top: 50%;
  width: clamp(3rem, 6vw, 6rem);
  height: auto;
  transform: translateY(-50%);
  overflow: visible;
}

.closing path {
  fill: none;
  stroke: var(--brand-bright);
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.stamp {
  display: grid;
  place-content: center;
  width: clamp(5.5rem, 4rem + 6vw, 9rem);
  aspect-ratio: 1;
  border-radius: clamp(16px, 2vw, 26px);
  background: var(--white);
  color: var(--iris-deep);
  text-align: center;
  transform: rotate(4deg);
}

.stamp-day {
  font-family: var(--font-display);
  font-weight: 800;
  font-stretch: 75%;
  font-size: clamp(2rem, 1.4rem + 2.6vw, 3.6rem);
  line-height: 0.9;
  text-transform: uppercase;
}

.stamp-time {
  font-family: var(--font-mono);
  font-weight: 700;
}

.sat-copy .label {
  margin-bottom: 0.6rem;
  color: var(--accent-night);
}

.sat-copy h2 {
  font-size: var(--step-5);
  font-stretch: 75%;
}

.sat-lead {
  max-width: 38rem;
  margin-block: 1.4rem 2rem;
  font-size: var(--step-1);
  line-height: 1.5;
  color: rgb(255 255 255 / 0.88);
}

.sat-copy :deep(.cmd) {
  max-width: 32rem;
}

.btn--light {
  background: var(--white);
  color: var(--on-accent);
  box-shadow: 4px 4px 0 var(--on-accent);
}

.btn--outline {
  color: var(--white);
  box-shadow: inset 0 0 0 1.5px rgb(255 255 255 / 0.6);
}

.btn--outline:hover {
  background: rgb(255 255 255 / 0.1);
}

@media (max-width: 1100px) {
  .closing {
    display: none;
  }
}

@media (max-width: 520px) {
  .sat-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
