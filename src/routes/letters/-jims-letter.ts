import { refs } from '#/data/generated/refs.ts'
import type { EntityRef } from '#/definitions/kind'
import type { SealedText } from '#/lib/sealed-text'

export type LetterSection = {
  id: string
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
  header: 'Decryption instructions on page 4 of the Book of Groomsh.',
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
