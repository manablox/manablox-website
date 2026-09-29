import { ref } from 'vue';
import { site } from './site.ts';

/**
 * Analytics runs only after a visitor says yes. The answer is kept in `localStorage`,
 * which is why `null` means the bar has not been answered yet rather than a refusal.
 */
export type Consent = 'granted' | 'denied' | null;

const KEY = 'manablox-analytics';

/** What the bar and the footer both read, so a choice made in one updates the other. */
export const consent = ref<Consent>(null);

function readConsent(): Consent {
  try {
    const stored = localStorage.getItem(KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    // A browser that refuses storage is treated as a visitor who has not answered.
    return null;
  }
}

/**
 * Loads the Plausible script once. It only starts itself when `plausible.o` holds its
 * options, so that goes in first; the defaults are what we want. From then on it counts
 * the current page and every route change on its own.
 */
function loadAnalytics() {
  if (document.querySelector(`script[src="${site.analytics}"]`)) return;
  window.plausible ??= {};
  window.plausible.o ??= {};
  const script = document.createElement('script');
  script.src = site.analytics;
  script.defer = true;
  document.head.append(script);
}

export function setConsent(choice: Exclude<Consent, null>) {
  consent.value = choice;
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    // The choice still holds for this visit, it just will not be remembered.
  }
  if (choice === 'granted') loadAnalytics();
}

/** Puts the question back, so a visitor can change their mind from the footer. */
export function resetConsent() {
  consent.value = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing was stored, so there is nothing to clear.
  }
}

/** Called once on the client: a yes from an earlier visit starts analytics again. */
export function startConsent() {
  consent.value = readConsent();
  if (consent.value === 'granted') loadAnalytics();
}
