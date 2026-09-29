<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const lines = ['Pumpkin season starts Friday.', 'Autumn is on the menu.'];
const headline = ref(lines[1] ?? '');
const root = ref<HTMLElement>();

let timer: ReturnType<typeof setTimeout> | undefined;
let observer: IntersectionObserver | undefined;
let running = false;
let index = 0;

/** Deletes the headline, then types the next one, as an editor would. */
function cycle() {
  const target = lines[index % lines.length] ?? '';
  index += 1;
  const erase = () => {
    if (headline.value.length > 0) {
      headline.value = headline.value.slice(0, -1);
      timer = setTimeout(erase, 28);
    } else {
      type(0);
    }
  };
  const type = (i: number) => {
    headline.value = target.slice(0, i);
    if (i < target.length) timer = setTimeout(() => type(i + 1), 70);
    else timer = setTimeout(cycle, 2600);
  };
  erase();
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.value) return;
  observer = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting && !running) {
      running = true;
      timer = setTimeout(cycle, 900);
    } else if (!entry?.isIntersecting && running) {
      running = false;
      clearTimeout(timer);
    }
  });
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  clearTimeout(timer);
});
</script>

<template>
  <div ref="root" class="mock" aria-hidden="true">
    <div class="top">
      <span class="doc">Autumn menu</span>
      <span class="badge">changed</span>
      <span class="spacer"></span>
      <span class="mock-btn">Save</span>
      <span class="mock-btn mock-btn--main">Ask for approval</span>
    </div>

    <div class="split">
      <div class="form">
        <span class="lbl">Title</span>
        <div class="input input--focus">{{ headline }}<i class="caret"></i></div>
        <span class="lbl">Slug</span>
        <div class="input input--muted">autumn-menu</div>
        <span class="lbl">Blocks</span>
        <div class="list">
          <span><b class="dot dot--hero"></b>hero</span>
          <span><b class="dot dot--ochre"></b>teaser</span>
          <span><b class="dot dot--brand"></b>teaser</span>
          <span><b class="dot dot--iris"></b>gallery</span>
        </div>
      </div>

      <div class="frame">
        <div class="frame-bar">
          <span class="pill pill--on">Desktop</span>
          <span class="pill">Tablet</span>
          <span class="pill">Mobile</span>
        </div>
        <div class="site">
          <div class="site-hero">
            <span class="edit-tag">hero · title</span>
            <strong>{{ headline }}</strong>
          </div>
          <div class="site-row">
            <span class="t t--ochre"></span>
            <span class="t t--brand"></span>
          </div>
          <div class="site-gallery"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mock {
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    8px 8px 0 var(--iris);
  overflow: hidden;
  font-size: 0.8rem;
}

.top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  border-bottom: 1.5px solid var(--edge);
}

.doc {
  font-weight: 800;
}

.badge {
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: var(--ochre-soft);
  font-family: var(--font-mono);
  font-size: 0.66rem;
  font-weight: 700;
}

.spacer {
  flex: 1;
}

.mock-btn {
  padding: 0.3rem 0.65rem;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  font-weight: 700;
  font-size: 0.72rem;
  white-space: nowrap;
}

.mock-btn--main {
  background: var(--solid);
  color: var(--solid-ink);
  box-shadow: none;
}

.split {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.9rem;
  border-right: 1.5px solid var(--line);
  min-width: 0;
}

.lbl {
  margin-top: 0.35rem;
  font-weight: 700;
  font-size: 0.7rem;
  color: var(--ink-soft);
}

.input {
  min-height: 2rem;
  padding: 0.4rem 0.55rem;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
}

.input--focus {
  box-shadow:
    inset 0 0 0 1.5px var(--brand),
    0 0 0 3px var(--brand-soft);
}

.input--muted {
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 0.72rem;
}

.caret {
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 1px;
  vertical-align: -0.15em;
  background: var(--brand);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.list span {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.5rem;
  border-radius: 7px;
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.7rem;
}

.dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 3px;
}

.dot--hero {
  background: var(--iris-deep);
}

.dot--ochre {
  background: var(--ochre);
}

.dot--brand {
  background: var(--brand);
}

.dot--iris {
  background: var(--iris);
}

.frame {
  min-width: 0;
  padding: 0.7rem;
  background: var(--paper-2);
}

.frame-bar {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
}

.pill {
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-size: 0.66rem;
  font-weight: 700;
  color: var(--ink-soft);
}

.pill--on {
  background: var(--surface);
  color: var(--ink);
}

.site {
  display: grid;
  gap: 0.45rem;
  padding: 0.55rem;
  border-radius: 10px;
  background: var(--surface);
}

.site-hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 6.5rem;
  padding: 0.7rem;
  border-radius: 8px;
  background: var(--iris-deep);
  color: var(--white);
  outline: 2px dashed var(--brand);
  outline-offset: 3px;
}

.site-hero strong {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 0.9rem + 0.8vw, 1.5rem);
  font-stretch: 78%;
  font-weight: 800;
  line-height: 1;
  min-height: 1em;
}

.edit-tag {
  position: absolute;
  top: -0.7rem;
  left: 0.5rem;
  padding: 0.05rem 0.4rem;
  border-radius: 4px;
  background: var(--brand);
  color: var(--on-accent);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 700;
}

.site-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem;
}

.t {
  height: 2.6rem;
  border-radius: 8px;
}

.t--ochre {
  background: var(--ochre);
}

.t--brand {
  background: var(--brand);
}

.site-gallery {
  height: 2.2rem;
  border-radius: 8px;
  background: var(--iris);
}

@media (max-width: 560px) {
  .split {
    grid-template-columns: minmax(0, 1fr);
  }

  .form {
    border-right: 0;
    border-bottom: 1.5px solid var(--line);
  }

  .mock-btn:not(.mock-btn--main) {
    display: none;
  }
}
</style>
