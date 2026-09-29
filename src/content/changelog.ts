import { site } from '~/site.ts';

/** A run of inline text: plain, `code`, **strong** or a [link](href). */
export type Inline =
  | { kind: 'text'; text: string }
  | { kind: 'code'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'link'; text: string; href: string };

export type SectionIcon = 'highlights' | 'upgrade' | 'fixed' | 'breaking' | 'other';

/** A list entry; a leading **bold** run becomes its title. */
interface ChangelogItem {
  title?: string;
  parts: Inline[];
}

interface ChangelogSection {
  title: string;
  icon: SectionIcon;
  paragraphs: Inline[][];
  items: ChangelogItem[];
  /** Paragraphs after the list. */
  outro: Inline[][];
}

export interface Release {
  version: string;
  date: string;
  intro: Inline[][];
  sections: ChangelogSection[];
}

/** Paths in the CMS repository open on GitHub; anchors of its own file are dropped. */
function resolveHref(href: string): string | null {
  if (/^https?:\/\//.test(href)) return href;
  if (href.startsWith('#')) return null;
  return `${site.github}/blob/main/${href.replace(/^\.?\//, '')}`;
}

function parseInline(text: string): Inline[] {
  const parts: Inline[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) parts.push({ kind: 'text', text: text.slice(last, match.index) });
    if (match[1] !== undefined) parts.push({ kind: 'code', text: match[1] });
    else if (match[2] !== undefined) parts.push({ kind: 'strong', text: match[2] });
    else {
      const href = resolveHref(match[4] as string);
      parts.push(
        href
          ? { kind: 'link', text: match[3] as string, href }
          : { kind: 'text', text: match[3] as string },
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ kind: 'text', text: text.slice(last) });
  return parts;
}

function parseItem(text: string): ChangelogItem {
  const [first, ...rest] = parseInline(text);
  if (first?.kind !== 'strong') return { parts: parseInline(text) };
  const head = rest[0];
  if (head?.kind === 'text') rest[0] = { kind: 'text', text: head.text.trimStart() };
  return { title: first.text.replace(/[.:]$/, ''), parts: rest };
}

function iconFor(title: string): SectionIcon {
  const t = title.toLowerCase();
  if (t.includes('highlight') || t.includes('new')) return 'highlights';
  if (t.includes('breaking')) return 'breaking';
  if (t.includes('upgrade') || t.includes('good to know')) return 'upgrade';
  if (t.includes('fix')) return 'fixed';
  return 'other';
}

/** Splits text into paragraphs; lines of one paragraph are joined. */
function paragraphs(lines: string[]): string[] {
  return lines
    .join('\n')
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean);
}

function parseChangelog(markdown: string): Release[] {
  const releases: Release[] = [];
  for (const chunk of markdown.split(/^## /m).slice(1)) {
    const [heading = '', ...rest] = chunk.split('\n');
    const [version = '', date = ''] = heading.split(/\s+-\s+/);
    const [introBlock = '', ...sectionChunks] = rest.join('\n').split(/^### /m);
    const sections = sectionChunks.map((sectionChunk): ChangelogSection => {
      const [title = '', ...body] = sectionChunk.split('\n');
      const before: string[] = [];
      const items: string[] = [];
      const after: string[] = [];
      for (const line of body) {
        if (line.startsWith('- ')) items.push(line.slice(2));
        else if (items.length) after.push(line);
        else before.push(line);
      }
      return {
        title: title.trim(),
        icon: iconFor(title),
        paragraphs: paragraphs(before).map(parseInline),
        items: items.map(parseItem),
        outro: paragraphs(after).map(parseInline),
      };
    });
    releases.push({
      version: version.trim(),
      date: date.trim(),
      intro: paragraphs(introBlock.split('\n')).map(parseInline),
      sections,
    });
  }
  return releases;
}

/** The CMS changelog, fetched or bundled at build time (`build/changelog.ts`). */
export const releases = parseChangelog(__CHANGELOG__);
