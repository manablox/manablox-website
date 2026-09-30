<script setup lang="ts">
import CopyCommand from '~/components/CopyCommand.vue';
import InlineCode from '~/components/InlineCode.vue';
import PageIntro from '~/components/PageIntro.vue';
import { premiumLinks } from '~/content/plugins.ts';
import { site } from '~/site.ts';

const steps = [
  {
    title: 'Create the project',
    command: site.createCommand,
    text: 'The CLI asks which database to use, how the instance will run, which features it gets, where uploads live, how mail is sent, and for your account and first space. Pass `--yes` to take the defaults. It writes a project folder with fresh secrets in a gitignored `.env`, and prints the next steps.',
  },
  {
    title: 'Start it',
    command: 'cd my-cms && pnpm services:up && pnpm migrate && pnpm dev',
    text: 'Before `pnpm dev`, run the `manablox user create` and `manablox space create` lines the CLI printed: they make you the administrator and set up your first space. Then open `http://localhost:3000`, where one process serves the API and the admin. Pass `--start` in step one and the CLI does all of this for you.',
  },
  {
    title: 'Build the website',
    command: 'pnpm dlx @manablox/cli frontend my-site --framework astro',
    text: 'A starter site that reads your published content, no API key needed, with routing by URL, the block grid, the main menu and the preview route the visual editor talks to.',
  },
];

const presets = [
  [
    'Local development',
    'Docker runs the database and cache, the CMS runs on your machine. The quickest way to try it.',
  ],
  [
    'Docker behind Caddy',
    'The whole stack in containers with automatic HTTPS. Ready for a server.',
  ],
  ['Docker behind nginx', 'The same stack, with certificates you bring.'],
  ['Docker, ports published', 'For a server that already runs its own web server.'],
];

const databases = [
  [
    'Postgres 18',
    'A database server. Many writers, full text search, and a database role for the public API that can only read.',
  ],
  [
    'SQLite',
    'One file and nothing to run. One management instance, comfortable into the tens of thousands of documents.',
  ],
];

const frameworks = [
  ['astro', 'Rendered on the server, and pages ship no JavaScript except the preview.'],
  ['vue-ssr', 'Vue 3, rendered on the server and hydrated.'],
  ['react-ssr', 'React 19, the same shape as the Vue starter.'],
  ['plain', 'Vite and TypeScript in the browser, builds to static files.'],
];
</script>

<template>
  <PageIntro
    label="Download"
    title="Your Monday starts here."
    title-id="download-title"
    title-width="11ch"
    lead-width="34rem"
    end="clamp(2.5rem, 2rem + 3vw, 4rem)"
  >
    Manablox installs from npm. One command writes a project you own, with the API, the
    admin and the database set up the way you choose.
    <template #aside>
      <div class="needs" aria-labelledby="needs-title">
        <h2 id="needs-title" class="label">You need</h2>
        <ul>
          <li><strong>Node 24</strong> or newer</li>
          <li><strong>pnpm 11</strong>, through Corepack</li>
          <li><strong>Docker</strong> with Compose, for Postgres and the cache. With SQLite you can do without</li>
        </ul>
      </div>
    </template>
  </PageIntro>

  <section class="steps" aria-label="Install in three steps">
    <div class="wrap">
      <ol>
        <li v-for="(step, index) in steps" :key="step.title" v-reveal class="step">
          <span class="num" aria-hidden="true">{{ index + 1 }}</span>
          <div class="step-body">
            <h2>{{ step.title }}</h2>
            <CopyCommand :command="step.command" />
            <p><InlineCode :text="step.text" /></p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section class="choices" aria-labelledby="choices-title">
    <div class="wrap">
      <h2 id="choices-title">The choices you will be asked about</h2>
      <div class="choice-grid">
        <div v-reveal class="choice">
          <h3 class="label">How it runs</h3>
          <dl>
            <template v-for="[name, text] in presets" :key="name">
              <dt>{{ name }}</dt>
              <dd>{{ text }}</dd>
            </template>
          </dl>
        </div>
        <div v-reveal class="choice">
          <h3 class="label">Database</h3>
          <dl>
            <template v-for="[name, text] in databases" :key="name">
              <dt>{{ name }}</dt>
              <dd>{{ text }}</dd>
            </template>
          </dl>
          <p class="note">
            You can move between them later: export the space from one and import it into the
            other.
          </p>
        </div>
        <div v-reveal class="choice">
          <h3 class="label">Frontend starter</h3>
          <dl>
            <template v-for="[name, text] in frameworks" :key="name">
              <dt><code>--framework {{ name }}</code></dt>
              <dd>{{ text }}</dd>
            </template>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <section class="other" aria-labelledby="other-title">
    <div class="wrap">
      <h2 id="other-title">Another way in</h2>
      <div class="other-grid">
        <div v-reveal class="other-card">
          <h3>Add it to a project you already have</h3>
          <p>Install the packages, write one <code>manablox.config.ts</code>, then migrate and start.</p>
          <CopyCommand
            command="pnpm add @manablox/cli @manablox/server @manablox/admin @manablox/core @manablox/fields"
            tone="dark"
          />
          <CopyCommand command="npx manablox migrate && npx manablox start" tone="dark" />
        </div>
        <div v-reveal class="other-card">
          <h3>Premium plugins</h3>
          <p>
            Website and AI are commercial plugins. They run without a key on your own
            computer; production needs a license key. This opens the checkout in your browser, starts a free trial or a subscription, and writes the key
            into <code>.env</code>. A key bought earlier goes in with
            <code>manablox license add</code>.
          </p>
          <CopyCommand command="pnpm exec manablox license buy" tone="dark" />
          <p class="other-links">
            <a :href="premiumLinks.pricing">Prices</a>
            <RouterLink to="/plugins#premium">How licenses work</RouterLink>
          </p>
        </div>
      </div>
      <p class="help">
        Stuck, or want the details first? The <a :href="site.guide">user guide</a> walks from
        the first command to a site in production, the
        <a :href="site.docs">developer documentation</a> covers the config, the APIs and
        plugins, and the source is <a :href="site.github">on GitHub</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.needs {
  padding: 1.4rem 1.5rem;
  border-radius: var(--radius);
  background: var(--ochre);
  color: var(--on-accent);
  box-shadow: 6px 6px 0 var(--on-accent);
}

.needs h2 {
  margin-bottom: 0.8rem;
  color: var(--on-accent);
  font-family: var(--font-mono);
  font-stretch: normal;
  line-height: 1.4;
}

.needs ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.needs li {
  line-height: 1.45;
}

.steps ol {
  display: grid;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(1rem, 3vw, 2.5rem);
  padding: clamp(1.4rem, 1rem + 2vw, 2.4rem);
  border-radius: 20px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--edge);
}

.step:nth-child(1) .num {
  background: var(--brand);
  color: var(--on-accent);
}

.step:nth-child(2) .num {
  background: var(--iris-deep);
  color: var(--white);
}

.step:nth-child(3) .num {
  background: var(--ochre);
  color: var(--on-accent);
}

.num {
  display: grid;
  place-items: center;
  width: clamp(3.2rem, 2.5rem + 3vw, 5rem);
  aspect-ratio: 1;
  border-radius: 14px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--step-3);
  line-height: 1;
}

.step-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  min-width: 0;
}

.step h2 {
  font-size: var(--step-2);
}

.step p :deep(code) {
  padding: 0.05em 0.3em;
  border-radius: 4px;
  background: var(--paper-2);
  color: var(--ink);
  font-size: 0.88em;
}

.step p {
  max-width: 44rem;
  color: var(--ink-soft);
}

.choices {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
}

.choices > .wrap > h2,
.other > .wrap > h2 {
  margin-bottom: 2rem;
  font-size: var(--step-3);
}

.choice-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.choice {
  padding: 1.4rem;
  border-radius: var(--radius);
  background: var(--paper-2);
}

.choice h3 {
  margin-bottom: 1rem;
  font-family: var(--font-mono);
  font-stretch: normal;
  line-height: 1.4;
  color: var(--accent-text);
}

dl {
  display: grid;
  gap: 0.2rem;
  margin: 0;
}

dt {
  font-weight: 800;
}

dt code {
  font-size: 0.85em;
}

dd {
  margin: 0 0 0.8rem;
  font-size: 0.93rem;
  color: var(--ink-soft);
}

.note {
  padding-top: 0.8rem;
  border-top: 1px solid var(--line-strong);
  font-size: 0.9rem;
}

.other {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
  background: var(--night);
  color: rgb(255 255 255 / 0.84);
}

.other h2,
.other h3 {
  color: var(--white);
}

.other-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  max-width: 44rem;
  gap: 1.25rem;
}

.other-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 0.9rem;
  min-width: 0;
  padding: 1.6rem;
  border-radius: var(--radius);
  background: rgb(255 255 255 / 0.05);
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.12);
}

.other-card h3 {
  font-size: var(--step-2);
}

.other-card code {
  color: var(--accent-night);
}

.other-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.4rem;
}

.help a,
.other-links a {
  color: var(--accent-night);
  font-weight: 700;
  text-underline-offset: 4px;
}

.help {
  margin-top: 2.5rem;
  font-size: var(--step-1);
}

@media (max-width: 900px) {
  .choice-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 520px) {
  .step {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
