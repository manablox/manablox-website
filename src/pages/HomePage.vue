<script setup lang="ts">
import { type Component, defineAsyncComponent, hydrateOnVisible } from 'vue';
import HomeCast from '~/components/home/HomeCast.vue';
import HomeGame from '~/components/home/HomeGame.vue';
import HomeHero from '~/components/home/HomeHero.vue';
import HomeNews from '~/components/home/HomeNews.vue';
import HomePlugins from '~/components/home/HomePlugins.vue';
import HomeSaturday from '~/components/home/HomeSaturday.vue';
import StoryChapter from '~/components/StoryChapter.vue';
import WeekRail from '~/components/WeekRail.vue';
import { chapters } from '~/content/week.ts';

/** Prerendered like the rest; the chunk loads and hydrates when it scrolls into view. */
const lazy = (loader: () => Promise<{ default: Component }>) =>
  defineAsyncComponent({ loader, hydrate: hydrateOnVisible() });

const mocks = {
  monday: lazy(() => import('~/components/mocks/MondayMock.vue')),
  tuesday: lazy(() => import('~/components/mocks/TuesdayMock.vue')),
  wednesday: lazy(() => import('~/components/mocks/WednesdayMock.vue')),
  thursday: lazy(() => import('~/components/mocks/ThursdayMock.vue')),
  friday: lazy(() => import('~/components/mocks/FridayMock.vue')),
} as const;
</script>

<template>
  <HomeHero />
  <HomeNews />
  <HomePlugins />
  <HomeCast />
  <WeekRail />

  <StoryChapter v-for="chapter in chapters" :key="chapter.id" :chapter="chapter">
    <component :is="mocks[chapter.id as keyof typeof mocks]" />
  </StoryChapter>

  <HomeSaturday />
  <HomeGame />
</template>
