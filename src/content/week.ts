import type { FeaturePlugin } from './plugins.ts';

/** The launch week the home page tells, one chapter per day. */
export type DayTone = 'brand' | 'iris' | 'lilac' | 'ochre' | 'night';

/** The three people the week follows. */
export const cast = [
  { name: 'Max', role: 'writes the code', tone: 'brand' },
  { name: 'Anna', role: 'writes the words', tone: 'iris' },
  { name: 'Julia', role: 'decides what goes live', tone: 'ochre' },
] as const;

export interface Chapter {
  id: string;
  day: string;
  short: string;
  time: string;
  tone: DayTone;
  title: string;
  story: string[];
  usedLabel: string;
  used: string[];
  /** The plugins the day used, by id; the core needs none. */
  plugins?: FeaturePlugin['id'][];
}

export const chapters: Chapter[] = [
  {
    id: 'monday',
    day: 'Monday',
    short: 'Mon',
    time: '09:12',
    tone: 'brand',
    title: 'One command, then one config file.',
    story: [
      'Max types one line into a terminal and answers a few questions. Two minutes later the project exists, the database is running and the admin opens in a browser.',
      'Then the only real question: what is a page made of? Max writes the dish down in the config file, Anna builds a teaser by clicking. Both end up as the same thing.',
    ],
    usedLabel: 'What Monday used',
    used: [
      'One command to install: `manablox create`',
      'Postgres, or a single file with nothing to run',
      'Content types in code or in the admin',
      '13 kinds of field, from text to relations',
      'Blocks inside blocks, on a grid',
      'Pages that build their own addresses',
    ],
  },
  {
    id: 'tuesday',
    day: 'Tuesday',
    short: 'Tue',
    time: '10:30',
    tone: 'iris',
    title: 'The editors move in.',
    story: [
      'Anna gets an account that may write but not publish, opens the home page and presses Visual. The real website appears beside the form, and every keystroke shows up in it before anything is saved.',
      'Blocks are moved and resized by dragging. The German page sits next to the English one, and every save is kept, so yesterday’s idea is one click away.',
    ],
    usedLabel: 'What Tuesday used',
    used: [
      'The real website beside the form',
      'Click a headline to edit it, type in place',
      'Blocks arranged by dragging them',
      'Languages side by side',
      'Every save kept as a version',
      'Publish now, or at a time you pick',
      'Approval before anything goes live',
      'Crop pictures and set what stays in frame',
    ],
  },
  {
    id: 'wednesday',
    day: 'Wednesday',
    short: 'Wed',
    time: '14:05',
    tone: 'ochre',
    title: 'Twelve dishes, one wand.',
    story: [
      'Twelve dishes need a description and nobody has taken the photo yet. Julia adds an AI key, and a small wand appears beside every text field.',
      'It writes one field, or a whole page with its pictures, and nothing is kept until someone says yes.',
    ],
    usedLabel: 'What Wednesday used',
    used: [
      'Your own keys, your own bill',
      'A wand beside every text and picture field',
      'Whole pages written, pictures drawn',
      'Models that run on your own machine',
      'Describe a section, see it before it is built',
      'Nothing at all until you switch it on',
    ],
    plugins: ['ai'],
  },
  {
    id: 'thursday',
    day: 'Thursday',
    short: 'Thu',
    time: '11:40',
    tone: 'lilac',
    title: 'Wire it to everything.',
    story: [
      'One more command and the website itself exists, already reading the content: Astro, Vue, React or plain, whichever Max prefers.',
      'The afternoon belongs to the canvas. When a dish is published, tell the newsletter, wait a day, remind the team. Drawn once, it runs on its own from then on.',
    ],
    usedLabel: 'What Thursday used',
    used: [
      'A starter website in one command',
      'Astro, Vue, React or plain JavaScript',
      'Content over REST or GraphQL, typed',
      'Automations drawn as a flow chart',
      'Started by a change, a time, or another system',
      'Email, API calls, AI steps and pauses',
    ],
    plugins: ['workflows', 'webhooks', 'ai'],
  },
  {
    id: 'friday',
    day: 'Friday',
    short: 'Fri',
    time: '16:00',
    tone: 'night',
    title: 'Going live, calmly.',
    story: [
      'The site is served by a separate half of Manablox that can only read. It holds one site’s published pages and nothing else: no drafts, no way in.',
      'Publishing clears exactly the pages that changed. Julia scrolls the log: every change, who made it, and nothing anyone can quietly rewrite.',
    ],
    usedLabel: 'What Friday used',
    used: [
      'A separate public side that only reads',
      'Caching that clears the right pages',
      'Pictures resized on request and cached',
      'Roles, and keys that expire',
      'A log nobody can edit',
      'Export, import and backups',
    ],
  },
];
