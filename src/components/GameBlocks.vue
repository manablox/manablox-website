<script setup lang="ts">
/** A small isometric base for the game section: a miner, a factory and two defences. */
const cubes = [
  { x: 0, y: 44, tone: 'brand' },
  { x: 74, y: 82, tone: 'ochre' },
  { x: -74, y: 82, tone: 'iris' },
  { x: 0, y: 120, tone: 'night' },
];
</script>

<template>
  <svg class="blocks" viewBox="-140 0 280 230" aria-hidden="true" focusable="false">
    <ellipse class="glow" cx="0" cy="150" rx="130" ry="62" />
    <g v-for="cube in cubes" :key="`${cube.x}-${cube.y}`" :class="`c-${cube.tone}`">
      <polygon class="top" :points="`${cube.x},${cube.y} ${cube.x + 66},${cube.y + 33}
        ${cube.x},${cube.y + 66} ${cube.x - 66},${cube.y + 33}`" />
      <polygon class="left" :points="`${cube.x - 66},${cube.y + 33} ${cube.x},${cube.y + 66}
        ${cube.x},${cube.y + 112} ${cube.x - 66},${cube.y + 79}`" />
      <polygon class="right" :points="`${cube.x + 66},${cube.y + 33} ${cube.x},${cube.y + 66}
        ${cube.x},${cube.y + 112} ${cube.x + 66},${cube.y + 79}`" />
    </g>
  </svg>
</template>

<style scoped>
.blocks {
  width: 100%;
  max-width: 20rem;
  height: auto;
}

.glow {
  fill: var(--brand);
  opacity: 0.2;
  filter: blur(6px);
}

polygon {
  stroke: rgb(0 0 0 / 0.35);
  stroke-width: 1.5;
  stroke-linejoin: round;
}

.top {
  fill: var(--fill);
}

/* The two side faces are the same colour in shadow, so the stack reads as solid. */
.left {
  fill: color-mix(in oklab, var(--fill), black 34%);
}

.right {
  fill: color-mix(in oklab, var(--fill), black 18%);
}

.c-brand {
  --fill: var(--brand);
}

.c-iris {
  --fill: var(--iris);
}

.c-ochre {
  --fill: var(--ochre);
}

.c-night {
  --fill: oklch(45% 0.02 265);
}
</style>
