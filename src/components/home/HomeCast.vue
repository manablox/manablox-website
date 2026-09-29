<script setup lang="ts">
import { cast } from '~/content/week.ts';
</script>

<template>
  <section id="cast" class="cast" aria-labelledby="cast-title">
    <div class="wrap cast-grid">
      <div v-reveal>
        <p class="label">The story</p>
        <h2 id="cast-title">One website, one week, three people.</h2>
      </div>
      <div v-reveal class="cast-copy">
        <p>
          Bella Vista runs four kitchens in two languages and needs a new website before the
          autumn menu starts. What follows is their launch week, day by day, and everything
          Manablox did along the way.
        </p>
        <ul class="people">
          <li v-for="person in cast" :key="person.name" :class="`p-${person.tone}`">
            <span class="initial" aria-hidden="true">{{ person.name[0] }}</span>
            <span><strong>{{ person.name }}</strong> {{ person.role }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cast {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
  background: var(--iris-deep);
  color: var(--white);
}

.cast-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: end;
}

.cast .label {
  margin-bottom: 0.8rem;
  color: var(--accent-night);
}

.cast h2 {
  font-size: var(--step-4);
}

.cast-copy p {
  font-size: var(--step-1);
  line-height: 1.5;
  color: rgb(255 255 255 / 0.9);
}

.people {
  display: grid;
  gap: 0.6rem;
  margin: 1.8rem 0 0;
  padding: 0;
  list-style: none;
}

.people li {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-size: var(--step-0);
}

.initial {
  display: grid;
  place-items: center;
  flex: none;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 9px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
}

.p-brand .initial {
  background: var(--brand);
  color: var(--on-accent);
}

.p-iris .initial {
  background: var(--iris);
  color: var(--on-accent);
}

.p-ochre .initial {
  background: var(--ochre);
  color: var(--on-accent);
}

@media (max-width: 960px) {
  .cast-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
