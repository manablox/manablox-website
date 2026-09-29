import type { DayTone } from './week.ts';

interface Feature {
  name: string;
  text: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  intro: string;
  tone: DayTone;
  /** The chapter of the week where this group shows up. */
  chapter: string;
  items: Feature[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'install',
    title: 'Install and run',
    intro: 'One command writes the project. One process serves the API and the admin.',
    tone: 'brand',
    chapter: 'monday',
    items: [
      {
        name: '`manablox create`',
        text: 'An interactive CLI that writes a ready project, with fresh secrets in a gitignored `.env`. Pass `--yes` to take every default.',
      },
      {
        name: 'Local or Docker preset',
        text: 'Run the CMS on your machine with `pnpm dev`, or get a production stack with a Dockerfile, a compose file and backup and restore scripts.',
      },
      {
        name: 'HTTPS on day one',
        text: 'The Docker preset puts Caddy in front with automatic Let’s Encrypt certificates, or nginx with your own, or nothing at all.',
      },
      {
        name: 'API and admin in one process',
        text: 'The admin is served from the same origin as the API, so the session cookie just works. No proxy, no CORS settings.',
      },
      {
        name: 'Postgres or SQLite',
        text: 'Postgres 18 with ltree, JSONB and full text search, or SQLite in one file with nothing to run. libSQL and Turso work too.',
      },
      {
        name: 'No migrations for content',
        text: 'Adding or changing a content type never needs a database migration. `manablox migrate` only runs when you update Manablox.',
      },
      {
        name: 'A setup assistant',
        text: 'The first account becomes the administrator, creates the first space, and registration closes behind it.',
      },
    ],
  },
  {
    id: 'model',
    title: 'Content modelling',
    intro:
      'Describe what your content is made of, in code or by clicking. Both end up as the same thing.',
    tone: 'brand',
    chapter: 'monday',
    items: [
      {
        name: 'Code or admin, same shape',
        text: 'Define types with `defineContentType` in `manablox.config.ts` or build them in the admin. Types you build in the admin can be exported as code.',
      },
      {
        name: 'Content and block types',
        text: 'Content types are pages, articles and products. Block types are reusable pieces like teasers and galleries, and blocks can hold blocks.',
      },
      {
        name: '13 field types',
        text: 'Text, rich text, number, boolean, date, select, link, asset, content and user references, a single block, a block list and a template.',
      },
      {
        name: 'A block grid of 12 columns',
        text: 'Each page lays its blocks out on up to 12 columns, with separate arrangements for tablets and phones.',
      },
      {
        name: 'Templates',
        text: 'Build a block layout once and point pages at it. Edit the template and every page using it changes.',
      },
      {
        name: 'A tree that writes the URLs',
        text: 'Pages nest, and their addresses follow: `about/team`. Move a page and everything under it moves too. Folders group pages without adding to the URL.',
      },
      {
        name: 'Standing queries',
        text: 'A reference field can be a rule instead of a list, like the five newest articles, so it is never out of date.',
      },
      {
        name: 'Required and unique',
        text: 'Checked by the server on every save, drafts included, with the problem shown next to the field.',
      },
      {
        name: 'Starter content',
        text: 'A new space can start with page and article types, a teaser block, a few published pages and a main menu.',
      },
    ],
  },
  {
    id: 'edit',
    title: 'Editing',
    intro:
      'A calm editor for people who write for a living, with the actual website right beside it.',
    tone: 'iris',
    chapter: 'tuesday',
    items: [
      {
        name: 'Visual editor',
        text: 'Your real frontend in a frame, updated on every keystroke before saving. Click anything to edit it, click text twice to type in place.',
      },
      {
        name: 'Block board',
        text: 'Draw on empty cells to add a block, drag to move, pull an edge to resize. Switch between desktop, tablet and mobile.',
      },
      {
        name: 'Translations side by side',
        text: 'Each language is a linked copy with its own slug, its own status and its own history. Fields you mark as shared stay in sync.',
      },
      {
        name: 'Versions',
        text: 'Every save is a snapshot. The history shows who changed what and when, and a restore can itself be undone.',
      },
      {
        name: 'No silent overwrites',
        text: 'If someone saved since you opened a page, your save stops and tells you. If they delete it, you see who did.',
      },
      {
        name: 'Scheduling',
        text: 'Set a time to publish and a time to unpublish. The change goes out on its own, with the same checks as a click.',
      },
      {
        name: 'Approval before publishing',
        text: 'Authors ask, reviewers see it on the dashboard and in the bell, then approve and publish or send it back with a note.',
      },
      {
        name: 'Menus',
        text: 'Build main, footer or legal navigation by drag and drop, nested as deep as you like, from pages and plain links.',
      },
      {
        name: 'Keyboard first',
        text: 'Save, publish, undo and jump between sections without the mouse. Press ? anywhere for the full list.',
      },
      {
        name: 'Live across tabs',
        text: 'Trees, lists and members refresh in every open admin tab as others work, without a reload.',
      },
    ],
  },
  {
    id: 'media',
    title: 'Images and files',
    intro: 'Upload once, crop with intent, and let every page ask for the size it needs.',
    tone: 'iris',
    chapter: 'tuesday',
    items: [
      {
        name: 'Asset library',
        text: 'Grid or table, drop files in to upload them, alt text and titles. Files are checked by their content, not by what they claim to be.',
      },
      {
        name: 'Crop and focal point',
        text: 'Lock a ratio, set the point that matters, adjust brightness or colour. The original file is never changed.',
      },
      {
        name: 'Named sizes',
        text: 'Define thumb, card and hero sizes in AVIF, WebP, JPEG or PNG. A field can ask for its own size, too.',
      },
      {
        name: 'Signed image URLs',
        text: 'Images are resized on request by sharp. URLs are signed so nobody can abuse the resizer, and cached forever because an edit changes the URL.',
      },
      {
        name: 'Availability windows',
        text: 'Give a file a start and an end date. Outside it the public website cannot load it.',
      },
      {
        name: 'Shared between spaces',
        text: 'One file can belong to several sites, with the same alt text and crop everywhere.',
      },
      {
        name: 'Local disk or S3',
        text: 'Store files on disk or in any bucket that speaks S3: AWS, R2, MinIO, DigitalOcean Spaces.',
      },
    ],
  },
  {
    id: 'deliver',
    title: 'Frontends and delivery',
    intro: 'Build the website in whatever you like. Manablox hands it the content, fast and typed.',
    tone: 'lilac',
    chapter: 'thursday',
    items: [
      {
        name: '`manablox frontend`',
        text: 'Writes a starter site in Astro, Vue with server rendering, React with server rendering, or plain Vite, with the preview already wired.',
      },
      {
        name: 'REST and GraphQL',
        text: 'Ask for a page by its URL, list content with filters, fetch a menu. Pull related content and blocks in the same request.',
      },
      {
        name: 'Real GraphQL types',
        text: 'Each content type becomes its own GraphQL type, so your queries are checked against your content model.',
      },
      {
        name: 'The SDK',
        text: 'One client for browsers, the edge and Node, with zero dependencies. Identical requests are merged, answers cached, failures retried.',
      },
      {
        name: 'Generated types',
        text: 'One command writes a TypeScript interface for every content type in your space.',
      },
      {
        name: 'Nuxt module',
        text: 'Composables for pages and content, a blocks component that respects the grid, and preview support.',
      },
      {
        name: 'Ready for agents',
        text: 'Each instance publishes `/llms.txt` and `/openapi.json`, written from what is installed, so an AI agent can work with a scoped API key.',
      },
    ],
  },
  {
    id: 'live',
    title: 'Going live',
    intro:
      'The part that faces the internet is small, it only ever reads, and it is hard to talk into anything else.',
    tone: 'night',
    chapter: 'friday',
    items: [
      {
        name: 'A separate public API',
        text: 'A process that only reads, and serves the published content of one space. Draft reading is not built into it at all.',
      },
      {
        name: 'Hardened',
        text: 'Introspection off, errors masked, query depth and cost limited, and it will not start if a plugin adds a way to write.',
      },
      {
        name: 'Precise caching',
        text: 'Responses are cached by what they contain. Publishing a page clears exactly the responses that used it.',
      },
      {
        name: 'CDN friendly',
        text: 'ETags, s-maxage and stale-while-revalidate headers out of the box, and a hook to purge your CDN on publish.',
      },
      {
        name: 'Persisted queries',
        text: 'Optionally allow only the GraphQL queries your site actually sends.',
      },
    ],
  },
  {
    id: 'team',
    title: 'Teams and security',
    intro: 'Give people exactly the access they need, and keep a record nobody can edit.',
    tone: 'night',
    chapter: 'friday',
    items: [
      {
        name: 'Spaces',
        text: 'One instance runs many sites, each with its own pages, languages, files, menus and members.',
      },
      {
        name: 'Roles',
        text: 'Owner, admin, editor, author and viewer out of the box, plus roles of your own per space.',
      },
      {
        name: 'Permissions down to the field',
        text: 'Grant read, write, delete and publish for all content types or one at a time. Hide single fields from roles.',
      },
      {
        name: 'Scoped API keys',
        text: 'A key acts as the person who made it, narrowed to some spaces and some permissions, with an expiry date if you want one.',
      },
      {
        name: 'An activity log you can prove',
        text: 'Every change with before and after values, who made it and from where. Entries are chained by hash and can be verified with one click.',
      },
      {
        name: 'Notifications',
        text: 'A bell and an inbox in the admin, plus email and browser push, with preferences per kind and channel.',
      },
      {
        name: 'Credential vault',
        text: 'API keys, tokens, passwords and mail accounts, encrypted, never shown again and removed from logs.',
      },
      {
        name: 'Safe outgoing calls',
        text: 'Private network addresses are refused, every redirect is checked again, and credentials never follow a redirect elsewhere.',
      },
      {
        name: 'Careful with passwords',
        text: 'Argon2id hashing, login throttling that backs off to 15 minutes, and sessions on as many devices as you use.',
      },
    ],
  },
  {
    id: 'operate',
    title: 'Operations',
    intro: 'Boring in the best way: backups, exports, logs and mail that simply work.',
    tone: 'night',
    chapter: 'friday',
    items: [
      {
        name: 'Backups',
        text: '`manablox backup` copies a running SQLite database safely. The Docker preset ships backup and restore scripts for database and uploads.',
      },
      {
        name: 'Space export and import',
        text: 'Move a whole site, or just some of it, as JSON or as a zip with its files. Also the way to move between Postgres and SQLite.',
      },
      {
        name: 'Background jobs',
        text: 'Webhooks, image sizes, workflows and AI media run in a queue on Valkey, or in the process when there is no Valkey.',
      },
      {
        name: 'Structured logs',
        text: 'JSON logs to the console, a file or an HTTP endpoint, with secrets redacted by default.',
      },
      {
        name: 'Mail your way',
        text: 'SMTP, Gmail, Microsoft 365, Resend, SendGrid, Postmark or Mailgun.',
      },
      {
        name: 'Health checks',
        text: 'A Docker image that runs as an ordinary user, with `/healthz` and `/readyz`, sized to run comfortably on a 4 GB server.',
      },
    ],
  },
  {
    id: 'extend',
    title: 'Extending',
    intro:
      'When the pieces that ship with Manablox are not enough, add your own without forking anything.',
    tone: 'brand',
    chapter: 'thursday',
    items: [
      {
        name: 'Plugins',
        text: 'One package can add field types, content types, fields on other types, hooks, tables, admin screens and commands. The website, AI, workflows and webhooks are built this way.',
      },
      {
        name: 'Hooks',
        text: 'About thirty moments, like before a page is saved or after it is published, to observe, change or refuse.',
      },
      {
        name: 'Custom field types',
        text: 'A single object describes how a value is checked, stored, searched, served over GraphQL and edited.',
      },
      {
        name: 'Plugins that extend plugins',
        text: 'A plugin can offer places for others to fill. A new workflow step appears in the canvas palette with its settings form generated for you, no admin rebuild needed.',
      },
      {
        name: 'Resources in code',
        text: 'Declare credentials and templates in code, and workflows and webhooks with their plugins, then sync them into any instance. The environment fills in the secrets.',
      },
    ],
  },
];

/** Stated plainly, so nobody finds out the hard way. */
export const notBuilt = [
  'Live collaborative editing',
  'Personalisation',
  'A plugin marketplace',
  'GraphQL subscriptions',
];

export const stack: [string, string][] = [
  ['Server', 'Hono 4 on Node 24'],
  ['Database', 'Postgres 18 or SQLite, through Drizzle'],
  ['Management API', 'oRPC, typed end to end, with OpenAPI'],
  ['Delivery API', 'GraphQL with Pothos and Yoga, plus REST'],
  ['Accounts', 'better-auth with Argon2id'],
  ['Admin', 'Vue 3.5, Vite 8, Reka UI, Tailwind 4'],
  ['Images', 'sharp, resizing on request'],
  ['Queue and cache', 'Valkey and BullMQ, optional'],
];
