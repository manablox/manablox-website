<template>
  <section class="lost" aria-labelledby="lost-title">
    <div class="wrap">
      <p class="label">404</p>
      <h1 id="lost-title">This page is not in the tree.</h1>
      <p>The address may be old, or it was never published. Start again from the week.</p>
      <RouterLink to="/" class="home">Back to the home page</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.lost {
  padding-block: clamp(5rem, 3rem + 8vw, 10rem);
}

.label {
  margin-bottom: 1rem;
  color: var(--accent-text);
}

h1 {
  font-size: var(--step-5);
  font-stretch: 75%;
  line-height: 0.9;
  max-width: 13ch;
}

p:not(.label) {
  margin-top: 1.5rem;
  font-size: var(--step-1);
  color: var(--ink-soft);
}

.home {
  display: inline-flex;
  margin-top: 2rem;
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  background: var(--solid);
  color: var(--solid-ink);
  font-weight: 800;
  text-decoration: none;
}

.home:hover {
  background: var(--brand-deep);
  color: var(--white);
}
</style>
