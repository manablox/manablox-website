import { site } from '~/site.ts';
import type { DayTone } from './week.ts';

interface PluginFeature {
  name: string;
  text: string;
}

export interface FeaturePlugin {
  /** The plugin id `manablox create --features` and `manablox plugin install` take. */
  id: 'website' | 'ai' | 'workflows' | 'webhooks';
  name: string;
  packageName: string;
  tone: DayTone;
  /** One or two sentences for the card on the home page. */
  pitch: string;
  intro: string;
  /** Where it shows up on the home page: a chapter of the week, or the news. */
  story?: { hash: string; label: string };
  docs: string;
  /**
   * A paid plugin under the commercial license: it needs a license key, bought per
   * subscription on the license portal. The others are MIT licensed like the core.
   */
  premium?: boolean;
  /** What changes when another plugin is there too. */
  worksWith: string[];
  items: PluginFeature[];
}

/** The four first-party plugins, on the home page and on `/plugins`. */
export const plugins: FeaturePlugin[] = [
  {
    id: 'website',
    name: 'Website',
    packageName: '@manablox/plugin-website',
    tone: 'iris',
    pitch:
      'Design a whole website in the admin, no frontend code needed, and let Manablox serve it.',
    intro:
      'A space either keeps a code frontend of its own or becomes a designed site: shaped on a live canvas in the admin and served by a site process of its own.',
    story: { hash: 'whats-new', label: 'What’s new' },
    docs: `${site.docs}/site/`,
    premium: true,
    worksWith: ['With AI: a theme and block designs drawn up from a description.'],
    items: [
      {
        name: 'A live canvas',
        text: 'Drag blocks onto the page and see every change as it will look, on desktop and on phones.',
      },
      {
        name: 'Themes and designs',
        text: 'Start from twelve ready-made designs, then make colours, fonts, header, footer and menus your own.',
      },
      {
        name: 'Publish with a safety net',
        text: 'Share a preview link first, publish when you are happy, go back to any earlier version.',
      },
      {
        name: 'Served by Manablox',
        text: 'The finished site runs fast and cached, with your own domains, SEO settings and forms.',
      },
      {
        name: 'One process, many sites',
        text: 'The site process picks the space by the domain it is called on, so one process serves every designed space.',
      },
      {
        name: 'A site password',
        text: 'Keep a whole site behind one password while it is not ready, with nothing of it in the cache or in search engines.',
      },
      {
        name: 'Per space',
        text: 'The choice is made space by space. Spaces that keep a code frontend are not touched by any of this.',
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    packageName: '@manablox/plugin-ai',
    tone: 'ochre',
    pitch:
      'A wand beside every text and picture field, whole pages generated, content models designed from a sentence. With your own keys.',
    intro: 'Models you choose, keys you own, and nothing that happens without a person saying yes.',
    story: { hash: 'wednesday', label: 'Wednesday' },
    docs: `${site.docs}/admin/ai/#the-ai-plugin`,
    premium: true,
    worksWith: [
      'With workflows: an AI step on the canvas, and workflows designed from a description.',
      'With the website: theme and block design.',
    ],
    items: [
      {
        name: 'Your providers',
        text: 'Claude and ChatGPT for text. Google’s Nano Banana and Imagen for images, Veo for video. All with your own keys.',
      },
      {
        name: 'Models you host yourself',
        text: 'Connect Ollama, LM Studio, vLLM, LocalAI, llama.cpp or any server that speaks the OpenAI API. Several per space if you like.',
      },
      {
        name: 'The magic wand',
        text: 'Beside every text, rich text and image field. Choose a style, a tone and a length, then edit the answer before you use it.',
      },
      {
        name: 'It reads the room',
        text: 'The model is told the content type, the field, the language, the title and what the other fields already say.',
      },
      {
        name: 'Whole documents',
        text: 'Generate fills every field and every block list, and lays the blocks out on the grid. You review it on the real board first.',
      },
      {
        name: 'Design by describing',
        text: 'Describe a content model, a template or a whole new space in a sentence or two. Preview it, then create it in one go.',
      },
      {
        name: 'Keys kept safe',
        text: 'Keys are per space, encrypted, and never sent back to the browser. Every generation is logged, keys never are.',
      },
    ],
  },
  {
    id: 'workflows',
    name: 'Workflows',
    packageName: '@manablox/plugin-workflows',
    tone: 'lilac',
    pitch:
      'The things you would otherwise do by hand after publishing, drawn once on a canvas and run on their own.',
    intro: 'The things you would otherwise do by hand after publishing, drawn once on a canvas.',
    story: { hash: 'thursday', label: 'Thursday' },
    docs: `${site.docs}/admin/workflows/#the-workflows-plugin`,
    worksWith: [
      'With AI: steps that write or draw, and a whole workflow designed from a description.',
      'With webhooks: a workflow started or stopped by another system calling in.',
    ],
    items: [
      {
        name: 'A canvas of nodes',
        text: 'Connect steps with lines, snap them to a grid, tidy the layout with one click. Each step can use what the ones before it produced.',
      },
      {
        name: 'Triggers',
        text: 'Start on a change to content, or on a schedule down to cron with a timezone.',
      },
      {
        name: 'Steps',
        text: 'Send email, call an API, reshape data, read a website, create a document, send a push notification.',
      },
      {
        name: 'Conditions, loops, waits',
        text: 'Continue only if a rule holds, run once per item, or wait minutes to days. Waits survive a restart.',
      },
      {
        name: 'Drafts and versions',
        text: 'What you edit is a draft. Save it without touching what runs, and publish it when it is ready.',
      },
      {
        name: 'Every run recorded',
        text: 'See each run’s status, what every step received, and paint the result back onto the canvas.',
      },
    ],
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    packageName: '@manablox/plugin-webhooks',
    tone: 'brand',
    pitch:
      'Tell other systems when content changes, and give them a URL to call. Every call in both directions is logged.',
    intro:
      'One system telling another that something happened. A space does both, and keeps a log of every call.',
    story: { hash: 'thursday', label: 'Thursday' },
    docs: `${site.docs}/admin/webhooks/#the-webhooks-plugin`,
    worksWith: ['With workflows: a call starts every workflow pointed at it, or stops their runs.'],
    items: [
      {
        name: 'Outgoing on content events',
        text: 'Call a URL of yours when content is created, updated, saved, deleted, published or unpublished, as JSON.',
      },
      {
        name: 'Incoming endpoints',
        text: 'Give another system a URL to call. Its address never changes, even when you rename the endpoint.',
      },
      {
        name: 'Proving who is calling',
        text: 'Signatures the way GitHub and Stripe sign theirs, tokens, passwords, or OAuth 2 on the way out. Secrets stay in the credential vault.',
      },
      {
        name: 'Retries and resends',
        text: 'Outgoing calls retry with backoff and can be resent from the log.',
      },
      {
        name: 'A log of every call',
        text: 'Both directions, let through or not. A call turned away for a wrong signature shows up with the reason.',
      },
    ],
  },
];

/** The license a plugin ships under: the premium plugins are commercial, the rest MIT. */
export function licenseOf(plugin: FeaturePlugin): string {
  return plugin.premium ? 'Commercial license' : 'MIT license';
}

/** What a premium plugin costs and where it is bought; prices from the build's catalogue. */
export function premiumOffer(id: FeaturePlugin['id']) {
  const offer = __PREMIUM_OFFERS__[id] ?? { fromMonthly: null, trialDays: null };
  return {
    price: offer.fromMonthly ? `from ${offer.fromMonthly}/month` : 'Paid plugin',
    trial: offer.trialDays ? `${offer.trialDays}-day free trial` : 'Free trial',
    buy: `${site.portal}/buy?products=${id}`,
  };
}

/** Where the premium plugins are priced, bought and explained. */
export const premiumLinks = {
  pricing: `${site.portal}/pricing`,
  bundle: `${site.portal}/buy?products=ai,website`,
  /** The user guide's page on trials, buying, keys and what happens when a license ends. */
  guide: `${site.guide}/your-project/premium-plugins/`,
};

/** What every instance has, with or without plugins. */
export const coreParts = [
  'Spaces',
  'Content types',
  'Content',
  'Assets',
  'Users and roles',
  'Environments',
  'Publishing',
  'Approvals',
  'Notifications',
  'Delivery APIs',
];

/** Where the docs explain picking and adding features. */
export const pluginDocs = {
  pick: `${site.docs}/getting-started/as-a-dependency/#features`,
  install: `${site.docs}/getting-started/as-a-dependency/#adding-and-removing-features-later`,
  concepts: `${site.docs}/extending/plugins/`,
};
