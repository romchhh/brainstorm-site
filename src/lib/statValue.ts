export type ParsedStatValue = {
  target: number;
  before: string;
  after: string;
  /** Preserve space as thousands separator (e.g. 12 400) */
  spaceGrouped: boolean;
};

export function parseStatValue(raw: string): ParsedStatValue {
  const value = raw.replace(/\u00a0/g, ' ').trim();
  const match = value.match(/([\d][\d\s.,]*)/);
  if (!match || match.index === undefined) {
    return { target: 0, before: value, after: '', spaceGrouped: false };
  }

  const numPart = match[1];
  const before = value.slice(0, match.index);
  const after = value.slice(match.index + numPart.length);
  const spaceGrouped = /\d\s\d/.test(numPart);
  const normalized = numPart.replace(/\s/g, '').replace(',', '.');
  const target = Number.parseFloat(normalized) || 0;

  return { target, before, after, spaceGrouped };
}

export function formatStatNumber(value: number, parsed: ParsedStatValue): string {
  const rounded = Math.round(value);
  if (parsed.spaceGrouped) {
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return rounded.toLocaleString('uk-UA');
}

export function composeStatDisplay(value: number, parsed: ParsedStatValue): string {
  if (parsed.target <= 0 && !parsed.before && !parsed.after) {
    return '';
  }
  return `${parsed.before}${formatStatNumber(value, parsed)}${parsed.after}`;
}
