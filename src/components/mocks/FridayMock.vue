<template>
  <div class="mock" aria-hidden="true">
    <div class="pair">
      <div class="pane">
        <div class="pane-bar"><span>POST /graphql</span><span class="chip">public</span></div>
        <pre><span class="k">query</span> {
  <span class="f">contentByPermalink</span>(permalink: <span class="s">"autumn-menu"</span>) {
    title
    ... <span class="k">on</span> <span class="t">Page</span> {
      components {
        ... <span class="k">on</span> <span class="t">Teaser</span> {
          headline
          image { <span class="f">variant</span>(preset: <span class="s">"card"</span>) }
        }
      }
    }
  }
}</pre>
      </div>

      <div class="pane pane--out">
        <div class="pane-bar"><span>200 · 38 ms</span><span class="chip chip--warm">cached</span></div>
        <pre>{
  <span class="s">"title"</span>: <span class="s">"Autumn is on the menu."</span>,
  <span class="s">"components"</span>: [
    {
      <span class="s">"headline"</span>: <span class="s">"Roast pumpkin"</span>,
      <span class="s">"image"</span>: {
        <span class="s">"variant"</span>: <span class="s">"/media/9f2c/card.webp?s=…"</span>
      }
    }
  ]
}</pre>
      </div>
    </div>

    <div class="log">
      <div class="log-head">
        <span>Activity</span>
        <span class="verify">✓ Chain verified</span>
      </div>
      <ul>
        <li>
          <span class="who">Julia</span><span class="what">published <b>Autumn menu</b></span
          ><span class="hash">a41f…c09e</span>
        </li>
        <li>
          <span class="who">Anna</span><span class="what">changed price <s>€ 13</s> € 14</span
          ><span class="hash">7be2…41d3</span>
        </li>
        <li>
          <span class="who">build key</span><span class="what">read 14 pages</span
          ><span class="hash">0c9a…e7f1</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mock {
  display: grid;
  gap: 1rem;
}

.pair {
  display: grid;
}

.pane {
  min-width: 0;
  border-radius: var(--radius);
  background: var(--console-2);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.14);
  overflow: hidden;
}

.pane--out {
  position: relative;
  width: min(100%, 26rem);
  margin: -3rem 0 0 auto;
  box-shadow:
    inset 0 0 0 1px var(--ochre),
    6px 6px 0 var(--ochre);
}

.pane-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.9rem;
  border-bottom: 1px solid rgb(255 255 255 / 0.1);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: rgb(255 255 255 / 0.6);
}

.chip {
  padding: 0.05rem 0.45rem;
  border-radius: 999px;
  background: var(--iris);
  color: var(--white);
  font-weight: 700;
}

.chip--warm {
  background: var(--ochre);
  color: var(--on-accent);
}

pre {
  margin: 0;
  padding: 0.9rem 1rem 1rem;
  overflow-x: auto;
  color: #e9e5ff;
  font-size: clamp(0.66rem, 0.62rem + 0.2vw, 0.78rem);
  line-height: 1.6;
}

.k {
  color: var(--lilac);
}

.f {
  color: var(--accent-night);
}

.s {
  color: oklch(86% 0.09 92);
}

.t {
  color: var(--ochre);
}

.log {
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--ink);
  overflow: hidden;
}

.log-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  border-bottom: 1.5px solid var(--line);
  font-weight: 800;
  font-size: 0.85rem;
}

.verify {
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--ok-soft);
  color: var(--ok);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 5.5rem 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.78rem;
}

li + li {
  border-top: 1px solid var(--line);
}

.who {
  font-weight: 800;
}

.what s {
  color: var(--ink-soft);
}

.hash {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--ink-soft);
}

@media (max-width: 640px) {
  .pane--out {
    margin-top: 1rem;
  }

  li {
    grid-template-columns: 4.5rem 1fr;
  }

  .hash {
    display: none;
  }
}
</style>
