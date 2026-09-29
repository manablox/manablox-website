<template>
  <div class="mock" aria-hidden="true">
    <div class="term">
      <div class="bar"><span>~/projects</span></div>
      <pre><span class="p">$</span> pnpm dlx @manablox/cli create bella-vista
<span class="dim">┌</span>  <span class="intro"> manablox create </span>
<span class="dim">│</span>
<span class="ok">◇</span>  Which database?
<span class="dim">│</span>  <span class="pick">SQLite</span>
<span class="dim">│</span>
<span class="ok">◇</span>  How will this instance run?
<span class="dim">│</span>  <span class="pick">Local development</span>
<span class="dim">│</span>
<span class="ok">◇</span>  Where do uploads live?
<span class="dim">│</span>  <span class="pick">On disk</span>
<span class="dim">│</span>
<span class="ok">◇</span>  How does this instance send mail?
<span class="dim">│</span>  <span class="pick">Mailpit</span>
<span class="dim">│</span>
<span class="dim">└</span>  Done.</pre>
    </div>

    <div class="code">
      <div class="file">manablox.config.ts</div>
      <pre><span class="k">export const</span> dish = <span class="f">defineContentType</span>({
  name: <span class="s">'dish'</span>,
  fields: [
    { name: <span class="s">'name'</span>, type: <span class="s">'string'</span>, required: <span class="k">true</span> },
    { name: <span class="s">'price'</span>, type: <span class="s">'number'</span>,
      settings: { format: <span class="s">'currency'</span>, currency: <span class="s">'EUR'</span> } },
    { name: <span class="s">'photo'</span>, type: <span class="s">'asset'</span> },
  ],
});</pre>
    </div>
  </div>
</template>

<style scoped>
.mock {
  position: relative;
  display: grid;
  gap: 1rem;
}

pre {
  margin: 0;
  overflow-x: auto;
  font-size: clamp(0.7rem, 0.66rem + 0.2vw, 0.82rem);
  line-height: 1.6;
}

.term {
  border-radius: var(--radius);
  background: var(--console);
  color: #e9e5ff;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.bar {
  padding: 0.55rem 1rem;
  background: var(--console-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: rgb(255 255 255 / 0.55);
}

.term pre {
  padding: 1rem 1.2rem 1.2rem;
}

.p {
  color: var(--accent-night);
}

.dim {
  color: rgb(255 255 255 / 0.35);
}

.intro {
  background: var(--iris);
  color: var(--on-accent);
}

.ok {
  color: #4ade80;
}

.pick {
  color: rgb(255 255 255 / 0.6);
}

.code {
  width: min(100%, 36rem);
  margin: -3rem 0 0 auto;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    6px 6px 0 var(--brand);
  overflow: hidden;
}

.file {
  padding: 0.5rem 1rem;
  border-bottom: 1.5px solid var(--edge);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
}

.code pre {
  padding: 0.9rem 1rem 1rem;
}

.k {
  color: var(--code-keyword);
  font-weight: 700;
}

.f {
  color: var(--code-call);
}

.s {
  color: var(--code-string);
}

@media (max-width: 640px) {
  .code {
    margin-top: 0;
  }
}
</style>
