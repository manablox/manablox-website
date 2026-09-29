// The premium plugins' prices the plugins page shows. They come from the license server's
// catalogue (`LICENSE_API`, the API's base URL, `GET /v1/catalog`). Without it, or when it
// cannot be reached, every offer is empty and the pages say "Paid plugin" and name no price:
// prices live in Paddle only, never in this code.
//
// A build fetches once: `--fetch` writes the offers to `CACHE`, and the client and the
// server builds that follow both read them from there, so they cannot disagree.
//
//   node build/prices.ts --fetch    the offers for the build steps that follow
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Where `--fetch` leaves the offers for the build. */
const CACHE = fileURLToPath(
  new URL('../node_modules/.cache/manablox-website/prices.json', import.meta.url),
);

const PREMIUM = ['ai', 'website'] as const;

interface CatalogPlan {
  grants: string[];
  interval: 'month' | 'year';
  trialDays: number;
  price: { amount: string; currency: string } | null;
}

/** What the plugins page shows of a premium product; null parts are left out. */
interface PremiumOffer {
  /** The lowest monthly price, yearly plans divided by twelve, formatted; null without prices. */
  fromMonthly: string | null;
  trialDays: number | null;
}

type PremiumOffers = Record<string, PremiumOffer>;

/** A price in minor units as the currency writes it, `€19` or `€15.83`. */
function formatPrice(minor: number, currency: string): string {
  const format = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    trailingZeroDisplay: 'stripIfInteger',
  });
  const digits = format.resolvedOptions().maximumFractionDigits ?? 2;
  return format.format(minor / 10 ** digits);
}

function offerOf(product: string, plans: CatalogPlan[]): PremiumOffer {
  const own = plans.filter((plan) => plan.grants.length === 1 && plan.grants[0] === product);
  const monthly = own
    .filter((plan) => plan.price !== null && Number.isFinite(Number(plan.price.amount)))
    .map((plan) => ({
      perMonth: Number(plan.price?.amount) / (plan.interval === 'year' ? 12 : 1),
      currency: plan.price?.currency ?? '',
    }));
  // One currency only: the catalogue answers in its base currency.
  const cheapest = monthly
    .filter((entry) => entry.currency === monthly[0]?.currency)
    .sort((a, b) => a.perMonth - b.perMonth)[0];
  const trial = Math.max(0, ...own.map((plan) => plan.trialDays ?? 0));
  return {
    fromMonthly: cheapest ? formatPrice(Math.ceil(cheapest.perMonth), cheapest.currency) : null,
    trialDays: trial > 0 ? trial : null,
  };
}

/** The offers from the catalogue, or empty ones ("Paid plugin") without it; never throws. */
export async function loadOffers(): Promise<PremiumOffers> {
  const none = Object.fromEntries(
    PREMIUM.map((id) => [id, { fromMonthly: null, trialDays: null }]),
  );
  const api = process.env.LICENSE_API?.trim().replace(/\/$/, '');
  if (!api) return none;
  try {
    const response = await fetch(`${api}/v1/catalog`, { signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { plans } = (await response.json()) as { plans: CatalogPlan[] };
    if (!Array.isArray(plans)) throw new Error('no plans in the answer');
    return Object.fromEntries(PREMIUM.map((id) => [id, offerOf(id, plans)]));
  } catch (error) {
    console.warn(`website: no prices from ${api}/v1/catalog (${(error as Error).message})`);
    return none;
  }
}

/** The offers `--fetch` left for this build. */
export async function buildOffers(): Promise<PremiumOffers> {
  try {
    return JSON.parse(await readFile(CACHE, 'utf8')) as PremiumOffers;
  } catch {
    throw new Error(
      'website: no prices for the build; run `node build/prices.ts --fetch` first (pnpm build does)',
    );
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv.includes('--fetch')) {
  const offers = await loadOffers();
  await mkdir(dirname(CACHE), { recursive: true });
  await writeFile(CACHE, `${JSON.stringify(offers, null, 2)}\n`);
  const priced = Object.entries(offers).filter(([, offer]) => offer.fromMonthly);
  console.info(
    priced.length
      ? `prices: ${priced.map(([id, offer]) => `${id} from ${offer.fromMonthly}`).join(', ')}`
      : 'prices: none, the pages say "Paid plugin"',
  );
}
