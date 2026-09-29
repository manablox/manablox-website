<script setup lang="ts">
import GameBlocks from '~/components/GameBlocks.vue';
import { site } from '~/site.ts';

/** The game that shares the name, for anyone who landed here looking for it. */
const gameFacts: [string, string][] = [
  ['13', 'block types'],
  ['Endless', 'enemy waves'],
  ['One', '3D grid'],
  ['Free', 'to play'],
];
</script>

<template>
  <section id="game" class="game" aria-labelledby="game-title">
    <div class="wrap game-grid" v-reveal>
      <div>
        <p class="label">Same name, different thing</p>
        <h2 id="game-title">Looking for the game?</h2>
        <p class="game-lead">
          Manablox is also a game, and this is not it. That one is about automation and
          defence on a single 3D grid: mine the Mana ore, wire up the power, let the
          factories run themselves, and hold the line against waves that never stop coming.
        </p>
        <dl class="game-facts">
          <div v-for="[value, label] in gameFacts" :key="label">
            <dt>{{ value }}</dt>
            <dd>{{ label }}</dd>
          </div>
        </dl>
        <p class="game-note">
          It launches in 2026, and dev builds are already up on itch.io.
        </p>
        <div class="btn-row">
          <a :href="site.game" class="btn btn--primary">Visit the game</a>
          <a :href="site.gameBuilds" class="btn btn--ghost">Play a dev build</a>
        </div>
      </div>
      <GameBlocks />
    </div>
  </section>
</template>

<style scoped>
/* A footnote to the week, quieter than the call to action above it. */
.game {
  padding-block: clamp(3rem, 2rem + 4vw, 5rem);
  border-top: 1px solid var(--line);
}

.game-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  justify-items: center;
}

.game .label {
  margin-bottom: 0.6rem;
  color: var(--accent-text);
}

.game h2 {
  font-size: var(--step-3);
}

.game-lead {
  max-width: 38rem;
  margin-block: 1rem 1.6rem;
  color: var(--ink-soft);
}

.game-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 2.2rem;
  margin: 0;
}

.game-facts dt {
  font-family: var(--font-display);
  font-weight: 800;
  font-stretch: 75%;
  font-size: var(--step-2);
  line-height: 1;
}

.game-facts dd {
  margin: 0.2rem 0 0;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--ink-soft);
}

.game-note {
  margin-block: 1.4rem 0;
  font-size: var(--step--1);
  color: var(--ink-soft);
}

@media (max-width: 960px) {
  .game-grid {
    grid-template-columns: minmax(0, 1fr);
    justify-items: start;
  }

  .game-grid :deep(.blocks) {
    max-width: 13rem;
  }
}
</style>
