<template>
  <div class="mock" aria-hidden="true">
    <div class="dialog">
      <div class="head">
        <span class="wand">✦</span>
        <strong>Write the description</strong>
        <span class="provider">Claude</span>
      </div>

      <div class="row">
        <span class="lbl">Tone</span>
        <span class="chip chip--on">Warm</span>
        <span class="chip">Playful</span>
        <span class="chip">Formal</span>
      </div>
      <div class="row">
        <span class="lbl">Length</span>
        <span class="chip">Short</span>
        <span class="chip chip--on">Medium · 90 words</span>
        <span class="chip">Long</span>
      </div>

      <div class="prompt">Make it sound like the pumpkin came out of the oven this morning.</div>

      <p class="answer">
        Roasted until the edges turn to caramel, then tossed with crisp sage and a spoonful of
        brown butter that smells faintly of hazelnuts. It arrives still warm, on a bed of
        whipped ricotta, with a squeeze of lemon to wake it all up.
      </p>

      <div class="actions">
        <span class="mock-btn">Try again</span>
        <span class="mock-btn mock-btn--main">Use it</span>
      </div>
    </div>

    <div class="picture">
      <div class="art"></div>
      <div class="meta">
        <span>Nano Banana Pro · 16:9 · 2K</span>
        <span class="progress"><i></i></span>
        <span>Drawing 2 of 3</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mock {
  position: relative;
}

.dialog {
  position: relative;
  z-index: 1;
  width: min(100%, 27rem);
  padding: 1.1rem;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow:
    inset 0 0 0 1.5px var(--edge),
    8px 8px 0 var(--ochre);
  font-size: 0.8rem;
}

.head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
}

.head strong {
  flex: 1;
  font-size: 0.92rem;
}

.wand {
  display: grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 8px;
  background: var(--iris-deep);
  color: var(--white);
}

.provider {
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: var(--paper);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.lbl {
  width: 3.6rem;
  font-weight: 700;
  font-size: 0.7rem;
  color: var(--ink-soft);
}

.chip {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  font-weight: 600;
  font-size: 0.72rem;
}

.chip--on {
  background: var(--solid);
  color: var(--solid-ink);
  box-shadow: none;
}

.prompt {
  margin-top: 0.8rem;
  padding: 0.6rem 0.7rem;
  border-radius: 8px;
  background: var(--paper);
  font-style: italic;
}

.answer {
  margin-top: 0.8rem;
  padding: 0.7rem 0.8rem;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1.5px var(--ochre);
  background: linear-gradient(90deg, var(--ochre-soft), var(--surface) 70%);
  line-height: 1.55;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
  margin-top: 0.8rem;
}

.mock-btn {
  padding: 0.35rem 0.75rem;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  font-weight: 700;
  font-size: 0.74rem;
}

.mock-btn--main {
  background: var(--solid);
  color: var(--solid-ink);
  box-shadow: none;
}

.picture {
  position: relative;
  width: min(58%, 18rem);
  margin: -2rem 0 0 auto;
  border-radius: var(--radius);
  background: var(--console);
  color: rgb(255 255 255 / 0.8);
  box-shadow: var(--shadow);
  overflow: hidden;
  transform: rotate(2deg);
}

.art {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(circle at 32% 58%, var(--ochre) 0 16%, transparent 17%),
    radial-gradient(circle at 58% 48%, #ff8a3d 0 14%, transparent 15%),
    radial-gradient(circle at 72% 64%, #7bd88f 0 6%, transparent 7%),
    radial-gradient(ellipse at 50% 70%, #fff3e3 0 38%, transparent 39%),
    linear-gradient(160deg, var(--iris-deep), var(--brand));
}

.meta {
  display: grid;
  gap: 0.35rem;
  padding: 0.6rem 0.75rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
}

.progress {
  height: 4px;
  border-radius: 4px;
  background: rgb(255 255 255 / 0.15);
  overflow: hidden;
}

.progress i {
  display: block;
  width: 58%;
  height: 100%;
  background: var(--accent-night);
  animation: fill 3.2s var(--ease) infinite alternate;
}

@keyframes fill {
  from {
    width: 22%;
  }

  to {
    width: 78%;
  }
}

@media (max-width: 560px) {
  .picture {
    width: 80%;
  }
}
</style>
