<script setup lang="ts">
import CopyCommand from '~/components/CopyCommand.vue';
import InlineCode from '~/components/InlineCode.vue';
import PageIntro from '~/components/PageIntro.vue';
import {
  coreParts,
  licenseOf,
  pluginDocs,
  plugins,
  premiumLinks,
  premiumOffer,
} from '~/content/plugins.ts';
import { site } from '~/site.ts';

const steps = [
  {
    title: 'Pick them when you create',
    command: site.createCommand,
    text: '`create` asks once, in one list with nothing ticked. `--features website,ai` picks exactly that list for a script, and `--yes` on its own gives the core.',
  },
  {
    title: 'Add one later',
    command: 'pnpm exec manablox plugin install ai workflows',
    text: 'Adds the package, writes its part of your config, `.env` and compose files, installs and migrates. Restart, and it is there.',
  },
  {
    title: 'Take one out',
    command: 'pnpm exec manablox plugin uninstall webhooks',
    text: 'Takes those parts out again. Its data stays in the database, and installing it again brings it back.',
  },
];
</script>

<template>
  <PageIntro label="Plugins" title="Take only what you need." title-id="plugins-title">
    Manablox starts as a lean core. Four first-party plugins add the rest: a designed
    website, AI, workflows and webhooks. Each works on its own, and some do more together.
    Workflows and webhooks are MIT licensed like the core; website and AI are commercial
    premium plugins, free in development and with a free trial for production.
    <template #after>
      <nav class="index" aria-label="Plugins">
        <a v-for="plugin in plugins" :key="plugin.id" :href="`#${plugin.id}`" :class="`t-${plugin.tone}`">
          {{ plugin.name }}
        </a>
        <a href="#premium" class="t-night">Premium plugins</a>
        <a href="#get-them" class="t-night">Install and remove</a>
      </nav>
    </template>
  </PageIntro>

  <section class="core" aria-labelledby="core-title">
    <div class="wrap core-grid">
      <div>
        <h2 id="core-title">The core stays lean.</h2>
        <p>
          Every instance has these, with or without a plugin. Plugins are opt-in: a new
          instance is the core alone until you pick one, and an instance without a plugin
          shows nothing of it, not a feature that is there and broken.
        </p>
        <RouterLink to="/features" class="story-link">Every core feature</RouterLink>
      </div>
      <ul class="parts" aria-label="In the core">
        <li v-for="part in coreParts" :key="part">{{ part }}</li>
      </ul>
    </div>
  </section>

  <section
    v-for="plugin in plugins"
    :id="plugin.id"
    :key="plugin.id"
    class="group"
    :class="`t-${plugin.tone}`"
    :aria-labelledby="`${plugin.id}-title`"
  >
    <div class="wrap group-grid">
      <header class="group-head">
        <span class="stamp" aria-hidden="true">{{ plugin.id }}</span>
        <p class="package">{{ plugin.packageName }} · {{ licenseOf(plugin) }}</p>
        <h2 :id="`${plugin.id}-title`">
          {{ plugin.name }}
          <span v-if="plugin.premium" class="premium-badge">Premium</span>
        </h2>
        <p>{{ plugin.intro }}</p>
        <div v-if="plugin.premium" class="offer">
          <p class="price">{{ premiumOffer(plugin.id).price }}</p>
          <p class="offer-links">
            <a :href="premiumOffer(plugin.id).buy" class="offer-trial">Start free trial</a>
            <a :href="premiumOffer(plugin.id).buy" class="offer-buy">Buy</a>
          </p>
          <p class="offer-note">
            {{ premiumOffer(plugin.id).trial }}. Free in development: it runs without a key on
            private hosts. <a href="#premium">How licenses work</a>
          </p>
        </div>
        <ul class="with" aria-label="Together with other plugins">
          <li v-for="line in plugin.worksWith" :key="line">{{ line }}</li>
        </ul>
        <code class="install">manablox plugin install {{ plugin.id }}</code>
        <p class="links">
          <a :href="plugin.docs" class="story-link">Read the docs</a>
          <RouterLink v-if="plugin.story" :to="`/#${plugin.story.hash}`" class="story-link">
            Read it in the story: {{ plugin.story.label }}
          </RouterLink>
        </p>
      </header>
      <ul class="cards">
        <li v-for="item in plugin.items" :key="item.name" v-reveal class="card">
          <h3><InlineCode :text="item.name" /></h3>
          <p><InlineCode :text="item.text" /></p>
        </li>
      </ul>
    </div>
  </section>

  <section id="premium" class="premium" aria-labelledby="premium-title">
    <div class="wrap premium-grid">
      <div>
        <p class="label">Premium plugins</p>
        <h2 id="premium-title">Website and AI need a license key in production.</h2>
        <p>
          Manablox is open source under the MIT license: the core, the admin, the CLI, the
          SDKs, the workflows and webhooks plugins, and the license plugin that checks the
          keys. The website and AI plugins are commercial, under their own license. They are
          paid by subscription, monthly or yearly, each on its own or both as a bundle, with a
          free trial of each plugin. On your laptop and on staging with private hosts they run
          without a key. In production, without a key they stay installed but locked; your data
          stays either way, and designed sites keep rendering.
        </p>
        <p class="docs-links">
          <a :href="site.github">The MIT source on GitHub</a>
          <a :href="premiumLinks.pricing">Prices</a>
          <a :href="premiumLinks.bundle">Buy both as a bundle</a>
          <a :href="premiumLinks.guide">Licenses in the user guide</a>
        </p>
      </div>
      <ul class="rules" aria-label="How licenses work">
        <li v-reveal>
          <h3>One key per subscription</h3>
          <p>A subscription holds one plugin or the bundle. An instance can hold several keys, and gets what all of them cover.</p>
        </li>
        <li v-reveal>
          <h3>A seat per production instance</h3>
          <p>Each seat of a subscription covers one public production instance. Move a key by deactivating the old instance.</p>
        </li>
        <li v-reveal>
          <h3>Free in development</h3>
          <p>Your laptop and staging on private hosts run the premium plugins without a key. A key works there too, and takes no seat.</p>
        </li>
        <li v-reveal>
          <h3>Checked offline</h3>
          <p>A signed lease is checked on the instance and refreshed once a day. When the license server cannot be reached, nothing locks for up to two weeks.</p>
        </li>
      </ul>
    </div>
  </section>

  <section id="get-them" class="get" aria-labelledby="get-title">
    <div class="wrap">
      <p class="label">Install and remove</p>
      <h2 id="get-title">One list, or one command.</h2>
      <ol class="steps">
        <li v-for="(step, index) in steps" :key="step.title" v-reveal class="step">
          <span class="num" aria-hidden="true">{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <CopyCommand :command="step.command" tone="dark" />
          <p><InlineCode :text="step.text" /></p>
        </li>
      </ol>
      <p class="note">
        <InlineCode
          text="`manablox plugin disable ai --space blog` switches a plugin off for one space and `enable` back on. The ids are `website`, `ai`, `workflows` and `webhooks`. `manablox license buy` opens the checkout for the premium plugins and writes the key into `.env`."
        />
      </p>
      <p class="docs">
        <a :href="pluginDocs.pick">Picking features in the docs</a>
        <a :href="pluginDocs.install">Adding and removing them later</a>
        <a :href="pluginDocs.concepts">Writing a plugin of your own</a>
      </p>
    </div>
  </section>

  <section class="cta" aria-labelledby="plugins-cta">
    <div class="wrap cta-inner">
      <h2 id="plugins-cta">Start lean. It installs in one line.</h2>
      <CopyCommand :command="site.createCommand" tone="dark" />
      <RouterLink to="/download" class="cta-link">Installation guide</RouterLink>
    </div>
  </section>
</template>

<style scoped src="./inventory.css"></style>

<style scoped>
/* What reaches into InlineCode and CopyCommand, beside the shared inventory rules. */
.card :deep(code) {
  padding: 0.05em 0.3em;
  border-radius: 4px;
  background: var(--paper-2);
  font-size: 0.85em;
}

.card h3 :deep(code) {
  padding: 0;
  background: none;
  font-size: 0.8em;
}

.cta :deep(.cmd) {
  width: min(100%, 32rem);
}

.core {
  padding-block: clamp(2.5rem, 2rem + 3vw, 4rem);
  border-top: 1.5px solid var(--line);
  background: var(--paper-2);
}

.core-grid {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: center;
}

.core h2 {
  font-size: var(--step-3);
}

.core p {
  margin-top: 0.9rem;
  color: var(--ink-soft);
}

.parts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.parts li {
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--edge);
  font-weight: 700;
  font-size: 0.95rem;
}

/* The same badge as the plugin's card on the home page, so the two read as one thing. */
.stamp {
  display: grid;
  place-content: center;
  width: fit-content;
  min-width: 3.4rem;
  height: 3.4rem;
  margin: 0.2rem 0 1.1rem;
  padding-inline: 0.9rem;
  border-radius: 12px;
  background: var(--c);
  color: var(--on-accent);
  box-shadow: 3px 3px 0 var(--edge-shadow);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  transform: rotate(-4deg);
}

.package {
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  overflow-wrap: anywhere;
}

.group-head .package {
  margin-top: 0;
}

.with {
  display: grid;
  gap: 0.45rem;
  margin: 1.1rem 0 0;
  padding: 0;
  list-style: none;
}

.with li {
  position: relative;
  padding-left: 1.3rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.with li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.4em;
  width: 0.7em;
  height: 0.7em;
  border-radius: 3px;
  background: var(--c);
}

.install {
  display: block;
  width: fit-content;
  max-width: 100%;
  margin-top: 1.2rem;
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-sm);
  background: var(--console);
  color: var(--white);
  font-size: var(--step--1);
  overflow-wrap: anywhere;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.2rem;
  margin-top: 1.1rem;
}

.links .story-link {
  margin-top: 0;
}

.get {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
  background: var(--night);
  color: rgb(255 255 255 / 0.84);
  scroll-margin-top: 4.5rem;
}

.get .label {
  margin-bottom: 0.8rem;
  color: var(--accent-night);
}

.get h2 {
  font-size: var(--step-3);
  color: var(--white);
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 19rem), 1fr));
  gap: clamp(1.5rem, 3vw, 2.5rem);
  margin: 2.2rem 0 0;
  padding: 0;
  list-style: none;
}

.step {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 0.9rem;
  min-width: 0;
}

.num {
  display: grid;
  place-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 9px;
  background: var(--ochre);
  color: var(--on-accent);
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.2rem;
}

.step h3 {
  font-size: var(--step-1);
  color: var(--white);
}

.step p,
.note {
  font-size: 0.95rem;
  line-height: 1.55;
}

.step p :deep(code),
.note :deep(code) {
  font-size: 0.88em;
  color: var(--white);
}

.note {
  max-width: 44rem;
  margin-top: 2.2rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgb(255 255 255 / 0.12);
}

.docs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.5rem;
  margin-top: 1.2rem;
}

.docs a {
  font-weight: 800;
  color: var(--accent-night);
  text-underline-offset: 4px;
}

/* The premium badge, the price and the portal links under a paid plugin's name. */
.premium-badge {
  display: inline-block;
  margin-left: 0.4rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--solid);
  color: var(--solid-ink);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  vertical-align: middle;
}

.offer {
  margin-top: 1.1rem;
  padding: 1rem 1.1rem;
  border-radius: var(--radius-sm);
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--edge);
}

.offer .price {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--step-1);
  color: var(--ink);
}

.offer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.8rem;
}

.offer-links a {
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  font-weight: 800;
  font-size: 0.92rem;
  text-decoration: none;
}

.offer-trial {
  background: var(--c);
  color: var(--on-accent);
}

.offer-buy {
  box-shadow: inset 0 0 0 1.5px var(--edge);
  color: var(--ink);
}

.group-head .offer-note {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.premium {
  padding-block: clamp(3rem, 2rem + 4vw, 5rem);
  border-top: 1.5px solid var(--line);
  background: var(--paper-2);
  scroll-margin-top: 4.5rem;
}

.premium-grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: start;
}

.premium .label {
  margin-bottom: 0.8rem;
}

.premium h2 {
  font-size: var(--step-3);
}

.premium p {
  margin-top: 0.9rem;
  color: var(--ink-soft);
}

.docs-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.5rem;
}

.docs-links a {
  font-weight: 800;
  color: var(--accent-text);
  text-underline-offset: 4px;
}

.rules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.rules li {
  padding: 1.2rem 1.25rem;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--edge);
}

.rules h3 {
  font-size: var(--step-1);
}

.rules p {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  line-height: 1.55;
}

@media (max-width: 860px) {
  .core-grid,
  .premium-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
