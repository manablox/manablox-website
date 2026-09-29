<template>
  <div class="mock" aria-hidden="true">
    <div class="canvas">
      <svg class="edges" viewBox="0 0 600 340" preserveAspectRatio="none">
        <path d="M150 70 C 200 70, 200 170, 250 170" />
        <path d="M376 170 C 430 170, 420 90, 470 90" />
        <path d="M376 170 C 430 170, 420 260, 470 260" />
      </svg>

      <div class="node node--trigger" style="left: 3%; top: 10%">
        <span class="kind">When</span>
        <strong>Dish published</strong>
        <span class="sub">type: dish · en, de</span>
      </div>

      <div class="node node--ai" style="left: 41.6%; top: 38%">
        <span class="kind">AI</span>
        <strong>Write a summary</strong>
        <span class="sub">&#123;&#123; content.title &#125;&#125;, two lines</span>
      </div>

      <div class="node node--api" style="left: 78%; top: 14%">
        <span class="kind">Call an API</span>
        <strong>Newsletter</strong>
        <span class="sub ok">succeeded · 212 ms</span>
      </div>

      <div class="node node--wait" style="left: 78%; top: 64%">
        <span class="kind">Wait</span>
        <strong>1 day, then email</strong>
        <span class="sub">waiting</span>
      </div>
    </div>

    <div class="cmd">
      <span class="p">$</span> pnpm dlx @manablox/cli frontend site --framework vue-ssr
    </div>
  </div>
</template>

<style scoped>
.mock {
  display: grid;
  gap: 1rem;
}

.canvas {
  position: relative;
  aspect-ratio: 600 / 340;
  border-radius: var(--radius);
  background-color: var(--surface);
  background-image: radial-gradient(circle, var(--line-strong) 1px, transparent 1.5px);
  background-size: 18px 18px;
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    8px 8px 0 var(--lilac);
  overflow: hidden;
}

.edges {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.edges path {
  fill: none;
  stroke: var(--edge);
  stroke-width: 2;
  stroke-dasharray: 6 6;
  animation: flow 1.2s linear infinite;
}

@keyframes flow {
  to {
    stroke-dashoffset: -12;
  }
}

.node {
  position: absolute;
  display: grid;
  gap: 0.1rem;
  width: 21%;
  padding: 0.55rem 0.65rem;
  border-radius: 10px;
  background: var(--surface);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    3px 3px 0 var(--edge-shadow);
  font-size: clamp(0.62rem, 0.55rem + 0.3vw, 0.78rem);
  line-height: 1.3;
}

.node strong {
  font-size: 1.05em;
}

.kind {
  width: fit-content;
  padding: 0 0.35rem;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.82em;
  font-weight: 700;
}

.node--trigger .kind {
  background: var(--iris-deep);
  color: var(--white);
}

.node--ai .kind {
  background: var(--brand);
  color: var(--on-accent);
}

.node--api .kind {
  background: var(--lilac);
  color: var(--on-accent);
}

.node--wait .kind {
  background: var(--ochre);
  color: var(--on-accent);
}

.sub {
  font-family: var(--font-mono);
  font-size: 0.82em;
  color: var(--ink-soft);
}

.ok {
  color: var(--ok);
}

.cmd {
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--console);
  color: #e9e5ff;
  font-family: var(--font-mono);
  font-size: clamp(0.68rem, 0.64rem + 0.2vw, 0.8rem);
  overflow-x: auto;
  white-space: nowrap;
}

.p {
  color: var(--accent-night);
}

@media (max-width: 560px) {
  .canvas {
    aspect-ratio: 600 / 480;
  }

  .sub {
    display: none;
  }
}
</style>
