<script setup lang="ts">
import { site } from '~/site.ts';

const points = [
  {
    title: 'A live canvas',
    text: 'Drag blocks onto the page and see every change as it will look, on desktop and on phones.',
  },
  {
    title: 'Themes and designs',
    text: 'Start from twelve ready-made designs, then make colors, fonts, header, footer and menus your own.',
  },
  {
    title: 'Publish with a safety net',
    text: 'Share a preview link first, publish when you are happy, go back to any earlier version.',
  },
  {
    title: 'Served by Manablox',
    text: 'The finished site runs fast and cached, with your own domains, SEO settings and forms.',
  },
];
</script>

<template>
  <section id="visual-editor" class="editor" aria-labelledby="editor-title">
    <div class="wrap editor-grid">
      <div v-reveal class="editor-copy">
        <p class="kicker">
          <span class="label">Website plugin</span>
          <span class="badge">Alpha</span>
        </p>
        <h2 id="editor-title">The visual editor is here.</h2>
        <p class="lead">
          Build a whole website right in the admin, no frontend code needed. Switch a space to
          a designed site, pick a look and shape it on a live canvas. This is the first alpha:
          try it on a fresh space and expect a few rough edges.
        </p>
        <ul class="points">
          <li v-for="point in points" :key="point.title">
            <strong>{{ point.title }}</strong>
            <span>{{ point.text }}</span>
          </li>
        </ul>
        <div class="links">
          <a :href="`${site.docs}/site/`" class="link">Read the guide</a>
        </div>
      </div>

      <div v-reveal class="designer" aria-hidden="true">
        <div class="bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="crumb">Design › Home page</span>
          <span class="publish">Publish</span>
        </div>
        <div class="body">
          <div class="palette">
            <span class="group">Blocks</span>
            <span class="tile">Hero</span>
            <span class="tile tile--drag">Gallery</span>
            <span class="tile">Quote</span>
            <span class="tile">Pricing</span>
            <span class="tile">Contact</span>
          </div>
          <div class="canvas">
            <div class="page">
              <div class="site-head"><i class="logo"></i><i></i><i></i><i></i></div>
              <div class="site-hero">
                <i class="line line--big"></i>
                <i class="line"></i>
                <i class="cta"></i>
              </div>
              <div class="site-block is-selected">
                <span class="tag">Features</span>
                <i></i><i></i><i></i>
              </div>
              <div class="drop">Drop to add Gallery</div>
            </div>
          </div>
          <div class="panel">
            <span class="group">Theme</span>
            <span class="swatches"><i></i><i></i><i></i><i></i></span>
            <span class="field"><b>Heading</b> Bricolage</span>
            <span class="field"><b>Radius</b> 14px</span>
            <span class="toggle"><i></i> Dark mode</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editor {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
  background: var(--paper-2);
  border-block: 1.5px solid var(--line);
  scroll-margin-top: 7.5rem;
}

.editor-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;
}

.kicker {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.9rem;
}

.kicker .label {
  color: var(--accent-text);
}

.badge {
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  background: var(--iris-deep);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.editor h2 {
  font-size: var(--step-4);
  font-stretch: 75%;
}

.lead {
  max-width: 34rem;
  margin-block: 1.2rem 1.6rem;
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--ink-soft);
}

.points {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.points li {
  display: grid;
  gap: 0.2rem;
  padding-left: 0.9rem;
  border-left: 3px solid var(--brand);
  font-size: var(--step--1);
  line-height: 1.5;
  color: var(--ink-soft);
}

.points strong {
  font-size: var(--step-0);
  color: var(--ink);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.6rem;
  margin-top: 1.8rem;
}

.link {
  font-weight: 800;
  color: var(--accent-text);
  text-decoration: none;
}

.link::after {
  content: ' →';
}

.link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* The designer, drawn small. */
.designer {
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    8px 8px 0 var(--iris);
  overflow: hidden;
  font-size: 0.72rem;
}

.bar {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 0.8rem;
  border-bottom: 1.5px solid var(--line);
}

.dots {
  display: flex;
  gap: 0.3rem;
}

.dots i {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--line-strong);
}

.crumb {
  flex: 1;
  font-family: var(--font-mono);
  color: var(--ink-soft);
}

.publish {
  padding: 0.3rem 0.7rem;
  border-radius: 7px;
  background: var(--brand);
  color: var(--on-accent);
  font-weight: 800;
}

.body {
  display: grid;
  grid-template-columns: 6.5rem minmax(0, 1fr) 7.5rem;
  min-height: 19rem;
}

.palette,
.panel {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.8rem 0.7rem;
  background: var(--paper);
}

.palette {
  border-right: 1.5px solid var(--line);
}

.panel {
  border-left: 1.5px solid var(--line);
}

.group {
  margin-bottom: 0.2rem;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.tile {
  padding: 0.35rem 0.5rem;
  border-radius: 6px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  font-weight: 700;
}

.tile--drag {
  background: var(--iris-soft);
  box-shadow:
    inset 0 0 0 1.5px var(--iris),
    3px 3px 0 var(--iris);
  transform: translateX(0.6rem) rotate(-3deg);
}

.canvas {
  padding: 0.9rem;
  background: repeating-linear-gradient(45deg, transparent 0 8px, var(--line) 8px 9px);
}

.page {
  display: grid;
  gap: 0.5rem;
  padding: 0.6rem;
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.site-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.site-head i {
  width: 1.6rem;
  height: 0.3rem;
  border-radius: 3px;
  background: var(--line-strong);
}

.site-head .logo {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: auto;
  border-radius: 3px;
  background: var(--brand);
}

.site-hero {
  display: grid;
  gap: 0.35rem;
  padding: 0.8rem 0.7rem;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--brand-soft), var(--iris-soft));
}

.line {
  width: 70%;
  height: 0.35rem;
  border-radius: 3px;
  background: var(--ink-soft);
  opacity: 0.5;
}

.line--big {
  width: 55%;
  height: 0.7rem;
  background: var(--ink);
  opacity: 0.85;
}

.cta {
  width: 3.2rem;
  height: 0.9rem;
  margin-top: 0.2rem;
  border-radius: 999px;
  background: var(--brand-deep);
}

.site-block {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.4rem;
  padding: 0.5rem;
  border-radius: 6px;
}

.site-block i {
  height: 2.2rem;
  border-radius: 5px;
  background: var(--paper-2);
}

.is-selected {
  outline: 2px solid var(--iris);
  outline-offset: 1px;
}

.tag {
  position: absolute;
  top: -0.65rem;
  left: 0.4rem;
  padding: 0 0.4rem;
  border-radius: 4px;
  background: var(--iris);
  color: var(--white);
  font-size: 0.6rem;
  font-weight: 800;
  line-height: 1.3rem;
}

.drop {
  padding: 0.55rem;
  border: 1.5px dashed var(--iris);
  border-radius: 6px;
  background: var(--iris-soft);
  font-weight: 700;
  text-align: center;
}

.swatches {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.3rem;
}

.swatches i {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 5px;
  box-shadow: inset 0 0 0 1px var(--line-strong);
}

.swatches i:nth-child(1) {
  background: var(--brand);
}

.swatches i:nth-child(2) {
  background: var(--iris);
}

.swatches i:nth-child(3) {
  background: var(--ochre);
}

.swatches i:nth-child(4) {
  background: var(--surface);
}

.field {
  display: grid;
  padding: 0.3rem 0.45rem;
  border-radius: 6px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line);
}

.field b {
  font-size: 0.6rem;
  color: var(--ink-soft);
}

.toggle {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.2rem;
  font-weight: 700;
}

.toggle i {
  width: 1.5rem;
  height: 0.85rem;
  border-radius: 999px;
  background: var(--solid);
  box-shadow: inset -0.7rem 0 0 -0.12rem var(--solid-ink);
}

@media (max-width: 960px) {
  .editor-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .points {
    grid-template-columns: minmax(0, 1fr);
  }

  .body {
    grid-template-columns: minmax(0, 1fr);
  }

  .palette,
  .panel {
    display: none;
  }
}
</style>
