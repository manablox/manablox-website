<script setup lang="ts">
import { consent, resetConsent, setConsent } from '~/consent.ts';
import { site } from '~/site.ts';

/** The analytics server, as the site loads it (`ANALYTICS_ORIGIN`). */
const analyticsHost = new URL(site.analytics).host;

const answer = {
  granted: 'You said yes, so Plausible is counting your visits.',
  denied: 'You said no, so nothing is counted.',
};
</script>

<template>
  <article class="imprint">
    <div class="wrap">
      <p class="label">Legal</p>
      <h1>Imprint</h1>

      <section aria-labelledby="operator">
        <h2 id="operator">Information pursuant to § 5 TMG</h2>
        <address>
          Peter Braith<br />
          Berresgasse 11/2/3<br />
          1220 Vienna<br />
          Austria
        </address>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">Contact</h2>
        <p>
          Email:
          <a href="mailto:daspetemail@gmail.com">daspetemail@gmail.com</a>
        </p>
      </section>

      <section aria-labelledby="content-liability">
        <h2 id="content-liability">Liability for content</h2>
        <p>
          The contents of this private website have been created with the utmost care.
          However, I cannot guarantee the accuracy, completeness, or timeliness of the
          content. As a private individual, I am responsible for my own content on these
          pages in accordance with § 7 para. 1 TMG. According to §§ 8 to 10 TMG, I am not
          obligated to monitor transmitted or stored information from others.
        </p>
      </section>

      <section aria-labelledby="link-liability">
        <h2 id="link-liability">Liability for links</h2>
        <p>
          This website may contain links to external websites over which I have no control. I
          cannot accept any liability for the content of these external sites. The respective
          provider or operator of the linked pages is always responsible for their content.
        </p>
      </section>

      <section aria-labelledby="analytics">
        <h2 id="analytics">Analytics</h2>
        <p>
          If you allow it, visits are counted with
          <a href="https://plausible.io" rel="noreferrer">Plausible</a>, which runs on our own
          server at <code>{{ analyticsHost }}</code>. It sets no cookies, stores
          nothing on your device, and records no personal data. What it keeps is a count of
          page views, plus the kind of device, the country and the site you arrived from, all
          of it aggregated and none of it tied to you. Nothing is shared with anyone else.
        </p>
        <p class="state">{{ consent ? answer[consent] : 'You have not answered yet.' }}</p>
        <div class="actions">
          <button v-if="consent !== 'granted'" type="button" @click="setConsent('granted')">
            Allow counting
          </button>
          <button v-if="consent !== 'denied'" type="button" @click="setConsent('denied')">
            Do not count me
          </button>
          <button v-if="consent" type="button" @click="resetConsent()">Ask me again</button>
        </div>
      </section>

      <section aria-labelledby="storage">
        <h2 id="storage">What this site stores</h2>
        <p>
          Two things, both in your own browser and neither of them sent anywhere: the light or
          dark theme you picked, and the answer you gave above. The site sets no cookies at
          all.
        </p>
      </section>

      <section aria-labelledby="game">
        <h2 id="game">The game of the same name</h2>
        <p>
          Manablox is also a game by the same author. It lives at
          <a :href="site.game">game.manablox.io</a> and has its own imprint.
        </p>
      </section>
    </div>
  </article>
</template>

<style scoped>
.imprint {
  padding-block: clamp(2.5rem, 1.5rem + 4vw, 5rem) clamp(3rem, 2rem + 4vw, 6rem);
}

.wrap {
  max-width: 48rem;
}

h1 {
  margin-bottom: 2.5rem;
  font-size: var(--step-4);
  font-stretch: 75%;
}

.label {
  margin-bottom: 0.6rem;
  color: var(--accent-text);
}

section {
  margin-top: 2.25rem;
}

h2 {
  margin-bottom: 0.6rem;
  font-size: var(--step-1);
}

p,
address {
  margin: 0 0 0.8rem;
  color: var(--ink-soft);
  font-style: normal;
  line-height: 1.65;
}

a {
  color: var(--accent-text);
}

code {
  padding: 0.1em 0.35em;
  border-radius: var(--radius-sm);
  background: var(--paper-2);
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.state {
  font-weight: 700;
  color: var(--ink);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
}

button {
  min-height: 2.6rem;
  padding: 0 1.2rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  box-shadow: inset 0 0 0 1.5px var(--edge);
  color: var(--ink);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: var(--paper-2);
}
</style>
