/** Timing for handwriting that appears letter by letter, each letter flickering before it settles. */
export type InkTiming = {
  /** Milliseconds between one letter starting and the next. */
  stagger: number
  /** Milliseconds a letter flickers through random glyphs before it settles. */
  flicker: number
}

export const INK_TIMING: InkTiming = { stagger: 26, flicker: 300 }

export type InkGlyph = {
  char: string
  state: 'hidden' | 'flickering' | 'settled'
  /** The glyph shown while flickering. */
  shown: string
}

const FLICKER_GLYPHS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function inkDuration(text: string, timing: InkTiming = INK_TIMING): number {
  return text.length === 0 ? 0 : (text.length - 1) * timing.stagger + timing.flicker
}

/** Which glyph each letter of `text` shows `elapsed` milliseconds into the reveal. */
export function inkFrame(
  text: string,
  elapsed: number,
  random: () => number = Math.random,
  timing: InkTiming = INK_TIMING,
): InkGlyph[] {
  return [...text].map((char, index) => {
    const start = index * timing.stagger
    if (elapsed < start) return { char, state: 'hidden', shown: char }
    if (/\s/u.test(char) || elapsed >= start + timing.flicker)
      return { char, state: 'settled', shown: char }
    const glyph = FLICKER_GLYPHS[Math.floor(random() * FLICKER_GLYPHS.length)] ?? char
    return { char, state: 'flickering', shown: /[a-z]/iu.test(char) ? glyph : char }
  })
}

/** Deterministic smudged scrawl standing in for sealed text of roughly `length` characters. */
export function sealedScrawl(length: number, seed = length): string {
  let state = seed * 9301 + 49297
  const next = () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
  let out = ''
  while (out.length < length) {
    const word = Math.max(1, Math.round(next() * 7))
    for (let index = 0; index < word; index += 1)
      out += FLICKER_GLYPHS[Math.floor(next() * 26)] ?? 'm'
    out += ' '
  }
  return out.slice(0, length).trimEnd()
}
