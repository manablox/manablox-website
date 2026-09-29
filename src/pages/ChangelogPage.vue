<script setup lang="ts">
import PageIntro from '~/components/PageIntro.vue';
import RichText from '~/components/RichText.vue';
import SectionIcon from '~/components/SectionIcon.vue';
import { releases } from '~/content/changelog.ts';
import { site } from '~/site.ts';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** `2026-09-24` as `24 September 2026`, the same on the server and in the browser. */
function longDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

const anchor = (version: string) => `v${version.replace(/\./g, '-')}`;
</script>

<template>
  <PageIntro
    label="Changelog"
    title="What is new in Manablox."
    title-id="changelog-title"
    title-width="14ch"
    lead-width="40rem"
    end="clamp(2rem, 1.5rem + 2vw, 3rem)"
  >
    Every release in plain words: what got better and what was fixed. The technical details
    for each version are in the <a :href="site.docs">documentation</a>.
  </PageIntro>

  <div class="wrap releases">
    <article
      v-for="(release, index) in releases"
      :id="anchor(release.version)"
      :key="release.version"
      class="release"
      :aria-labelledby="`${anchor(release.version)}-title`"
    >
      <header class="release-head">
        <div class="release-meta">
          <h2 :id="`${anchor(release.version)}-title`" class="version">
            <span class="sr-only">Version </span>{{ release.version }}
          </h2>
          <span v-if="index === 0" class="latest">Latest</span>
        </div>
        <time :datetime="/^\d/.test(release.date) ? release.date : undefined" class="date">{{ longDate(release.date) }}</time>
      </header>

      <div class="release-body">
        <p v-for="(paragraph, p) in release.intro" :key="p" class="release-intro">
          <RichText :parts="paragraph" />
        </p>

        <section
          v-for="section in release.sections"
          :key="section.title"
          v-reveal
          class="change"
          :class="`change--${section.icon}`"
        >
          <h3 class="change-title">
            <span class="icon"><SectionIcon :name="section.icon" /></span>
            {{ section.title }}
          </h3>
          <p v-for="(paragraph, p) in section.paragraphs" :key="`p${p}`" class="change-text">
            <RichText :parts="paragraph" />
          </p>
          <ul
            v-if="section.items.length"
            :class="section.icon === 'highlights' ? 'cards' : 'items'"
          >
            <li v-for="(item, i) in section.items" :key="i">
              <strong v-if="item.title" class="item-title">{{ item.title }}</strong>
              <RichText :parts="item.parts" />
            </li>
          </ul>
          <p v-for="(paragraph, p) in section.outro" :key="`o${p}`" class="change-text">
            <RichText :parts="paragraph" />
          </p>
        </section>
      </div>
    </article>
  </div>
</template>

<style scoped>
.change :deep(a) {
  color: var(--accent-text);
  font-weight: 700;
  text-underline-offset: 4px;
}

.releases {
  display: grid;
  gap: clamp(3rem, 2rem + 4vw, 5rem);
  padding-bottom: clamp(3.5rem, 2rem + 5vw, 6rem);
}

.release {
  display: grid;
  grid-template-columns: minmax(0, 13rem) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  padding-top: clamp(2rem, 1.5rem + 2vw, 3rem);
  border-top: 1.5px solid var(--edge);
  scroll-margin-top: 5rem;
}

.release-head {
  position: sticky;
  top: 6rem;
  align-self: start;
  display: grid;
  gap: 0.6rem;
}

.release-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.version {
  font-family: var(--font-display);
  font-size: var(--step-4);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
}

.latest {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: var(--brand);
  color: var(--on-accent);
  font-family: var(--font-mono);
  font-size: var(--step--1);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.date {
  font-family: var(--font-mono);
  font-size: var(--step--1);
  color: var(--ink-soft);
}

.release-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.25rem;
  min-width: 0;
}

.release-intro {
  max-width: 44rem;
  font-size: var(--step-1);
  line-height: 1.5;
}

.change {
  --tone: var(--ink);
  --tone-soft: var(--paper-2);
  --tone-on: var(--ink);
  padding: clamp(1.25rem, 1rem + 1.5vw, 2rem);
  border-radius: 20px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--edge);
}

.change--highlights {
  --tone: var(--brand);
  --tone-soft: var(--brand-soft);
  --tone-on: var(--on-accent);
}

.change--upgrade {
  --tone: var(--iris-deep);
  --tone-soft: var(--iris-soft);
  --tone-on: var(--white);
}

.change--fixed {
  --tone: var(--ochre);
  --tone-soft: var(--ochre-soft);
  --tone-on: var(--on-accent);
}

.change--breaking {
  --tone: var(--brand-deep);
  --tone-soft: var(--brand-soft);
  --tone-on: var(--white);
}

.change-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.1rem;
  font-size: var(--step-2);
}

.icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.75rem;
  aspect-ratio: 1;
  border-radius: 12px;
  background: var(--tone);
  color: var(--tone-on);
}

.change-text {
  max-width: 44rem;
  margin-bottom: 1rem;
  color: var(--ink-soft);
}

.change-text:last-child {
  margin-bottom: 0;
}

.change :deep(code) {
  padding: 0.05em 0.3em;
  border-radius: 4px;
  background: var(--paper-2);
  color: var(--ink);
  font-size: 0.88em;
}

.cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cards li {
  padding: 1rem 1.1rem;
  border-radius: var(--radius);
  background: var(--tone-soft);
  line-height: 1.5;
  color: var(--ink-soft);
}

.cards .item-title {
  display: block;
  margin-bottom: 0.3rem;
  color: var(--ink);
  font-family: var(--font-display);
  font-size: var(--step-1);
  font-weight: 800;
  line-height: 1.2;
}

.items .item-title {
  margin-right: 0.35em;
  color: var(--ink);
}

.items {
  display: grid;
  gap: 0.6rem;
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
}

.items:last-child {
  margin-bottom: 0;
}

.items li {
  position: relative;
  max-width: 44rem;
  padding-left: 1.6rem;
  line-height: 1.5;
}

.items li::before {
  content: "";
  position: absolute;
  top: 0.5em;
  left: 0.2rem;
  width: 0.55rem;
  aspect-ratio: 1;
  border-radius: 3px;
  background: var(--tone);
}

@media (max-width: 900px) {
  .release {
    grid-template-columns: minmax(0, 1fr);
  }

  .release-head {
    position: static;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .cards {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
