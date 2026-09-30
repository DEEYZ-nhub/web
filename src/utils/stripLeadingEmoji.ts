const LEADING_EMOJI = /^\p{Extended_Pictographic}️?\s*/u;

/** Strips a single leading emoji (used as an ad-hoc bullet in source copy) so it can be replaced with a proper icon. */
export function stripLeadingEmoji(text: string): string {
  return text.replace(LEADING_EMOJI, '').trim();
}
