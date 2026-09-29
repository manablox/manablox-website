<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

type Locale = 'en' | 'de';
type Kind = 'hero' | 'teaser' | 'gallery' | 'cta';

interface StackBlock {
  id: string;
  kind: Kind;
  span: number;
}

const copy = {
  en: {
    url: 'bellavista.com/autumn-menu',
    headline: 'Autumn is on the menu.',
    sub: 'Four kitchens, one new season.',
    pumpkin: 'Roast pumpkin, sage & brown butter',
    fig: 'Fig tart with crème fraîche',
    photos: '12 new dishes',
    book: 'Book a table',
  },
  de: {
    url: 'bellavista.com/de/herbstkarte',
    headline: 'Der Herbst steht auf der Karte.',
    sub: 'Vier Küchen, eine neue Saison.',
    pumpkin: 'Ofenkürbis, Salbei & braune Butter',
    fig: 'Feigentarte mit Crème fraîche',
    photos: '12 neue Gerichte',
    book: 'Tisch reservieren',
  },
} as const;

const blocks = ref<StackBlock[]>([
  { id: 'hero', kind: 'hero', span: 6 },
  { id: 'pumpkin', kind: 'teaser', span: 3 },
  { id: 'fig', kind: 'teaser', span: 3 },
  { id: 'gallery', kind: 'gallery', span: 4 },
  { id: 'cta', kind: 'cta', span: 2 },
]);

const locale = ref<Locale>('en');
const typed = ref<string>(copy.en.headline);
const typing = ref(false);
const text = computed(() => copy[locale.value]);

let loop: ReturnType<typeof setInterval> | undefined;
let keys: ReturnType<typeof setInterval> | undefined;
let step = 0;

function move(from: number, to: number) {
  const next = [...blocks.value];
  const [item] = next.splice(from, 1);
  if (item) next.splice(to, 0, item);
  blocks.value = next;
}

function typeHeadline(target: string) {
  clearInterval(keys);
  typing.value = true;
  typed.value = '';
  let i = 0;
  keys = setInterval(() => {
    i += 1;
    typed.value = target.slice(0, i);
    if (i >= target.length) {
      clearInterval(keys);
      typing.value = false;
    }
  }, 55);
}

/** Each tick does what an editor would: reorder, translate, rearrange. */
function tick() {
  const i = step % 4;
  step += 1;
  if (i === 0) move(1, 2);
  else if (i === 1) {
    locale.value = 'de';
    typeHeadline(copy.de.headline);
  } else if (i === 2) move(3, 4);
  else {
    locale.value = 'en';
    typeHeadline(copy.en.headline);
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  loop = setInterval(tick, 3400);
});

onBeforeUnmount(() => {
  clearInterval(loop);
  clearInterval(keys);
});
</script>

<template>
  <div class="stage" aria-hidden="true">
    <svg class="brace" viewBox="0 0 60 400">
      <path
        d="M52 10C28 10 22 24 22 46v112c0 24-6 38-16 42 10 4 16 18 16 42v112c0 22 6 36 30 36"
        pathLength="1"
      />
    </svg>

    <div class="browser">
      <div class="chrome">
        <span class="dots"><i></i><i></i><i></i></span>
        <span class="url">{{ text.url }}</span>
        <span class="locales">
          <b :class="{ on: locale === 'en' }">EN</b>
          <b :class="{ on: locale === 'de' }">DE</b>
        </span>
      </div>

      <TransitionGroup tag="div" name="shuffle" class="page">
        <div
          v-for="(block, index) in blocks"
          :key="block.id"
          class="blk"
          :class="[`blk--${block.kind}`, `blk--${block.id}`]"
          :style="{ gridColumn: `span ${block.span}`, animationDelay: `${0.25 + index * 0.12}s` }"
        >
          <span class="tag">{{ block.kind }}</span>

          <template v-if="block.kind === 'hero'">
            <strong class="headline">{{ typed }}<span class="caret" :class="{ blink: !typing }"></span></strong>
            <span class="sub">{{ text.sub }}</span>
          </template>

          <template v-else-if="block.id === 'pumpkin'">
            <span class="dish">{{ text.pumpkin }}</span>
            <span class="price">€ 14</span>
          </template>

          <template v-else-if="block.id === 'fig'">
            <span class="dish">{{ text.fig }}</span>
            <span class="price">€ 9</span>
          </template>

          <template v-else-if="block.kind === 'gallery'">
            <span class="photos"><i></i><i></i><i></i></span>
            <span class="caption">{{ text.photos }}</span>
          </template>

          <template v-else>
            <span class="button">{{ text.book }}</span>
          </template>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  display: grid;
  grid-template-columns: clamp(2.5rem, 5vw, 4.5rem) minmax(0, 1fr);
  align-items: stretch;
  gap: clamp(0.5rem, 1.5vw, 1.25rem);
  width: 100%;
}

.brace {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.brace path {
  fill: none;
  stroke: var(--brand);
  stroke-width: 12;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 1.1s var(--ease) 0.1s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.browser {
  min-width: 0;
  border-radius: 18px;
  background: var(--surface);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    8px 8px 0 var(--edge-shadow);
  overflow: hidden;
}

.chrome {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.9rem;
  border-bottom: 1.5px solid var(--edge);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.dots {
  display: flex;
  gap: 5px;
}

.dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--paper-2);
  box-shadow: inset 0 0 0 1.5px var(--edge);
}

.url {
  flex: 1;
  min-width: 0;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: var(--paper);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.locales {
  display: flex;
  gap: 2px;
  padding: 2px;
  border-radius: 6px;
  background: var(--paper);
}

.locales b {
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-weight: 700;
  color: var(--ink-soft);
  transition:
    background 0.3s,
    color 0.3s;
}

.locales b.on {
  background: var(--solid);
  color: var(--solid-ink);
}

.page {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.6rem;
  padding: 0.75rem;
}

.blk {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.3rem;
  min-height: 5.6rem;
  min-width: 0;
  color: var(--on-accent);
  padding: 1.7rem 0.85rem 0.8rem;
  border-radius: 12px;
  animation: drop 0.6s var(--ease) backwards;
}

@keyframes drop {
  from {
    opacity: 0;
    transform: translateY(-18px) scale(0.97);
  }
}

.tag {
  position: absolute;
  top: 0.55rem;
  left: 0.6rem;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background: rgb(23 18 43 / 0.08);
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.blk--hero {
  min-height: 9rem;
  background: var(--iris-deep);
  color: var(--white);
}

.headline {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1rem + 1.6vw, 2.1rem);
  font-stretch: 78%;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  min-height: 2em;
}

.caret {
  display: inline-block;
  width: 3px;
  height: 0.9em;
  margin-left: 3px;
  vertical-align: -0.08em;
  background: var(--on-accent);
}

.caret.blink {
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.sub {
  font-size: 0.8rem;
  font-weight: 600;
}

.blk--pumpkin {
  background: var(--ochre);
}

.blk--fig {
  background: var(--brand);
}

.dish {
  font-weight: 700;
  font-size: 0.82rem;
  line-height: 1.25;
}

.price {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
}

.blk--gallery {
  background: var(--iris);
}

.photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
}

.photos i {
  aspect-ratio: 1;
  border-radius: 6px;
  background:
    radial-gradient(circle at 30% 35%, var(--ochre) 0 18%, transparent 19%),
    linear-gradient(160deg, #f3dcff, #ffe3c2);
}

.photos i:nth-child(2) {
  background:
    radial-gradient(circle at 60% 60%, var(--brand) 0 22%, transparent 23%),
    linear-gradient(200deg, #ffeac6, #f0dcff);
}

.photos i:nth-child(3) {
  background:
    radial-gradient(circle at 45% 40%, var(--iris) 0 20%, transparent 21%),
    linear-gradient(120deg, #ffe0c6, #f6e4ff);
}

.caption {
  font-size: 0.72rem;
  font-weight: 600;
}

.blk--cta {
  justify-content: center;
  align-items: center;
  background: var(--night);
  color: var(--white);
}

.blk--cta .tag {
  background: rgb(255 255 255 / 0.16);
}

.button {
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: var(--brand);
  color: var(--on-accent);
  font-size: 0.72rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.2;
}

.shuffle-move {
  transition: transform 0.7s var(--ease);
}

@media (max-width: 520px) {
  .page {
    gap: 0.45rem;
    padding: 0.55rem;
  }

  .blk {
    padding: 1.6rem 0.6rem 0.65rem;
  }

  .dish {
    font-size: 0.74rem;
  }
}
</style>
