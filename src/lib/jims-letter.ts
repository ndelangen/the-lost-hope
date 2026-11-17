import { refs } from '#/data/generated/refs.ts'
import type { EntityRef } from '#/definitions/kind'
import { normalizePassword, unsealText, type SealedText } from '#/lib/sealed-text'

const LETTER_SECTION_IDS = ['devan', 'cassian', 'swift', 'crowy'] as const
export type LetterSectionId = (typeof LETTER_SECTION_IDS)[number]

/** The words typed so far, by the section they open. */
export type LetterWords = Partial<Record<LetterSectionId, string>>

/** What the typed words have unsealed: each opened section's text, and the shared part. */
export type UnsealedLetter = {
  sections: Partial<Record<LetterSectionId, string>>
  shared: string | undefined
}

export type LetterSection = {
  id: LetterSectionId
  recipient: EntityRef
  clue: string
  sealed: SealedText
}

/**
 * Jim's farewell letter, left on Roberto's map pages. Everything but the header is sealed: the
 * shared part under all four words joined in section order, and each personal section under the
 * word its recipient holds. The plain text is kept out of the repository (sealed with
 * `scripts/seal-letter.ts`).
 */
export const JIMS_LETTER = {
  header: 'Decryption instructions on page 4 of the Book of Gruumsh.',
  sharedLabel: 'For all four of you. Your four words as one, in the order of this letter.',
  shared: {
    salt: 'byojBngu5Wbat6AUaQk5yg==',
    iv: 'SXOouqjYF7fC/uDX',
    data: 'UokyAB4IE+zeFNNGlpZVWZr2UXthSHydMOqq5BZveLEHfBKpldQRhwFmFP9u8iVKxvKlsEMOjBvYalLCOR2CNnnankm55N+2QpWQqjqZnocSxqfGPl1JPzVSyDMMZd/AtWly07KX6ds1XTTKxVll15SD+kZne9px8kws3a7sheb3sfu92OmHlb6i3ipNvCQEwarGpeKsBva6rhd19xyPL66QpHsGyhqNPncVNbeH8yANZPyCTqwcPIeSgrrF0UVl/oj44OUQyDWVEf/AkSmJC0LFznjmQh0cCfaQjtvAzN9bKgUsLoTW9TiZxzPsMb0lLdED2fICVS/uF37vd+EHiEGhgtlecPI5mp5N+Nj3xXbf5uhxQ/3zQUFzvr/HTEcv42gpEDLfs7Wa0XpEOkzRkiN5gKABzk45o+mKOgc677GeOGWRciH8bbwUmYTlAItNlQfxtFGimTHjSu6+BeKEfCuGqv+jvH0PUkO81+OlLIL1ocRDjsNb7wRqoSaCfjKq2o5UrBudvF+ILjguA0Lh4R67YEGCt0DA20I6FGOFYY5GBY7+IV7TpJEzcmUlCg3H8P+L0VljvLEzkP8vl3uFxaQEfNY2H3Dk0Ce4Pwb0nv3y5nfjhWAKzPzwRuhFgoDMsvczGN+ipSGl9HbygK71hwlzdt/hriC9A6JbTwgNiv1KuwZg6NnnYPyVA3SNFFtHXL9lXhYYICzrD868l8wsZucACGSLk/Vpip+z1linxlH231elV4Wal+AXiejE1/oZ4JNH',
  },
  sections: [
    {
      id: 'devan',
      recipient: refs.pcs.devan,
      clue: 'For the one whose stone heard Roberto’s last answer. What did you name it?',
      sealed: {
        salt: 'hW2ckJqN4pW1ydMXjIxHIw==',
        iv: 'sBgFIT28TVnOlOo6',
        data: 'Jni9ICqCLxsU2pqsooGKqMRZx28/MtOioOTkIavxmJLTRL4s96eUPpkgpjAFnLg07G39UBFapXzWzhGX6s0Jdxg1FCXZf8wUwQQ3iA6VK1WkY4IshgKw+IISzFnb2U9f5BHYd00MiP52tLnhdLCaTA==',
      },
    },
    {
      id: 'cassian',
      recipient: refs.pcs.cassian_veyl,
      clue: 'For the one who believed he was cured. What does your stomach still refuse?',
      sealed: {
        salt: 'mngBZv94Tr4vWz6dAPqLzA==',
        iv: 'aC34uKntdlkYU+y8',
        data: 'ufJp4YVGv1jIAKIyXSi4GR/twJkz0Y0jkqspYeAXeenIXDXSY7SNil2jwaIkGfzegovQawR1wUojeP/YTjVfI4SD8uvF7oVDeKhN+8CYWPBzeO4idXjuFmDvyuxDEjX6/227g/nc8h2j1ib8T3Ogsw==',
      },
    },
    {
      id: 'swift',
      recipient: refs.pcs.swift_starblade,
      clue: 'For the captain whose bird flew me a rope. What kind of bird?',
      sealed: {
        salt: '4/OgHYoPB9e1IlhESXhbTA==',
        iv: '5Ksgm6+1R86u5tWw',
        data: 'h1inmBDoDfn9foZ1JQsF03c63sT3bCaZZhCsg4Au2B0s97tO/tl8KmfgBodhyecrSCE5EW45LsRhzK6iEfiC8WkOpaqdCgtyIEoAVlcgHyMt6dm1+GgIlePaNOuDKjHCnYTULvhZy6fNwHlr8kABAP0gt5P02w==',
      },
    },
    {
      id: 'crowy',
      recipient: refs.npcs.crowy,
      clue: 'For the bird in the cage, the first night at the Sullen Monk. What did I give you?',
      sealed: {
        salt: 'EVuhFlpEO9UK1dIg69q6Gw==',
        iv: 'koU/WIUdcPKPrzOP',
        data: 'gRcnlWP2WDwtB5S2TNRX70DBADuV4KKoZ3SQy9Dsn6abAVtnOxLIhmTsptviq0IxDezMJ6oa2w6iM1WDcxDLeLOXaZEf3xRPczjFRzovinz6i7dMsQBvRKEgBEtAgIEH+kmeAvU12UxSuy+jo9ctVGRR+j480QRjwuakQF9S',
      },
    },
  ] satisfies LetterSection[],
}

const unsealCache = new Map<string, Promise<string | null>>()

function unsealOnce(sealed: SealedText, word: string): Promise<string | null> {
  const key = `${sealed.data.slice(0, 24)}:${normalizePassword(word)}`
  let result = unsealCache.get(key)
  if (!result) {
    result = unsealText(sealed, word)
    unsealCache.set(key, result)
  }
  return result
}

/** Unseals every part of the letter the words open; the shared part needs all four. */
export async function unsealLetter(words: LetterWords): Promise<UnsealedLetter> {
  const opened = await Promise.all(
    JIMS_LETTER.sections.map(async (section) => {
      const word = words[section.id]
      if (!word || normalizePassword(word).length === 0) return [section.id, undefined] as const
      return [section.id, (await unsealOnce(section.sealed, word)) ?? undefined] as const
    }),
  )
  const sections = Object.fromEntries(opened.filter(([, text]) => text !== undefined))
  const allOpen = JIMS_LETTER.sections.every((section) => sections[section.id] !== undefined)
  const shared = allOpen
    ? ((await unsealOnce(
        JIMS_LETTER.shared,
        JIMS_LETTER.sections.map((section) => words[section.id] ?? '').join(''),
      )) ?? undefined)
    : undefined
  return { sections, shared }
}
