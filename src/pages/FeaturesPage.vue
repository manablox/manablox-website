<script setup lang="ts">
import CopyCommand from '~/components/CopyCommand.vue';
import InlineCode from '~/components/InlineCode.vue';
import PageIntro from '~/components/PageIntro.vue';
import PluginCards from '~/components/PluginCards.vue';
import { featureGroups, notBuilt, stack } from '~/content/features.ts';
import { chapters } from '~/content/week.ts';
import { site } from '~/site.ts';

const dayOf = (id: string) => chapters.find((c) => c.id === id)?.day ?? '';
const total = featureGroups.reduce((sum, group) => sum + group.items.length, 0);
</script>

<template>
  <PageIntro label="Every feature" title="Everything in the box." title-id="features-title">
    The launch week tells the story. This page is the inventory: {{ total }} things the
    Manablox core does today, grouped by what you are trying to get done. The designed
    website, AI, workflows and webhooks are <RouterLink to="/plugins">plugins</RouterLink>
    you add when you want them.
    <template #after>
      <nav class="index" aria-label="Feature groups">
        <a v-for="group in featureGroups" :key="group.id" :href="`#${group.id}`" :class="`t-${group.tone}`">
          {{ group.title }}
        </a>
        <RouterLink to="/plugins" class="t-night">Plugins</RouterLink>
      </nav>
    </template>
  </PageIntro>

  <section
    v-for="group in featureGroups"
    :id="group.id"
    :key="group.id"
    class="group"
    :class="`t-${group.tone}`"
    :aria-labelledby="`${group.id}-title`"
  >
    <div class="wrap group-grid">
      <header class="group-head">
        <span class="swatch" aria-hidden="true"></span>
        <h2 :id="`${group.id}-title`">{{ group.title }}</h2>
        <p>{{ group.intro }}</p>
        <RouterLink :to="`/#${group.chapter}`" class="story-link">
          Read it in the story: {{ dayOf(group.chapter) }}
        </RouterLink>
      </header>
      <ul class="cards">
        <li v-for="item in group.items" :key="item.name" v-reveal class="card">
          <h3><InlineCode :text="item.name" /></h3>
          <p><InlineCode :text="item.text" /></p>
        </li>
      </ul>
    </div>
  </section>

  <section class="shelf" aria-labelledby="shelf-title">
    <div class="wrap">
      <header class="shelf-head">
        <p class="label">Beside the box</p>
        <h2 id="shelf-title">Four plugins, when you want them.</h2>
        <p>
          Pick them when you create an instance, or add one later with
          <code>manablox plugin install</code>. Each works on its own. Website and AI are
          premium plugins with a free trial; see <RouterLink to="/plugins#premium">how licenses work</RouterLink>.
        </p>
      </header>
      <PluginCards />
    </div>
  </section>

  <section class="honest" aria-labelledby="honest-title">
    <div class="wrap honest-grid">
      <div>
        <p class="label">Not in the box</p>
        <h2 id="honest-title">What Manablox does not do.</h2>
        <p class="honest-copy">
          Better to hear it here than to find out in week three. These are not built and not
          planned for now.
        </p>
        <ul class="not">
          <li v-for="item in notBuilt" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div>
        <p class="label">Under the hood</p>
        <h2>Built on parts you know.</h2>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr v-for="[layer, choice] in stack" :key="layer">
                <th scope="row">{{ layer }}</th>
                <td>{{ choice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <section class="cta" aria-labelledby="features-cta">
    <div class="wrap cta-inner">
      <h2 id="features-cta">Seen enough? It installs in one line.</h2>
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

.shelf {
  padding-block: clamp(3rem, 2rem + 4vw, 5rem);
  border-top: 1.5px solid var(--line);
  background: var(--paper-2);
}

.shelf-head {
  max-width: 40rem;
  margin-bottom: 2rem;
}

.shelf .label {
  margin-bottom: 0.8rem;
  color: var(--accent-text);
}

.shelf h2 {
  font-size: var(--step-3);
}

.shelf-head p:last-child {
  margin-top: 0.9rem;
  color: var(--ink-soft);
}

.shelf code {
  padding: 0.05em 0.3em;
  border-radius: 4px;
  background: var(--surface);
  font-size: 0.85em;
  color: var(--ink);
  white-space: nowrap;
}

.honest {
  padding-block: clamp(3.5rem, 2rem + 5vw, 6rem);
  background: var(--night);
  color: rgb(255 255 255 / 0.84);
}

.honest-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2.5rem, 6vw, 6rem);
}

.honest .label {
  margin-bottom: 0.8rem;
  color: var(--accent-night);
}

.honest h2 {
  font-size: var(--step-3);
  color: var(--white);
}

.honest-copy {
  margin-top: 1rem;
  max-width: 30rem;
}

.not {
  display: grid;
  gap: 0.5rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.not li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
  color: var(--white);
}

.not li::before {
  content: '';
  flex: none;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px var(--brand);
}

.table-wrap {
  margin-top: 1.5rem;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.65rem 0;
  border-bottom: 1px solid rgb(255 255 255 / 0.12);
  text-align: left;
  vertical-align: top;
}

th {
  width: 40%;
  padding-right: 1rem;
  font-family: var(--font-mono);
  font-size: var(--step--1);
  font-weight: 600;
  color: var(--accent-night);
}

td {
  color: var(--white);
}

@media (max-width: 860px) {
  .honest-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
