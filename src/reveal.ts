import type { Directive } from 'vue';

let observer: IntersectionObserver | undefined;

function shared(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  return observer;
}

/** Adds `is-visible` to a `.reveal` element the first time it scrolls into view. */
export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('reveal');
    shared().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
  getSSRProps() {
    return { class: 'reveal' };
  },
};
