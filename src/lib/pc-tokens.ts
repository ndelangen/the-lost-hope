import type { PC } from '#/definitions/pc'
import type { TokenHolding, Tokens } from '#/definitions/tokens'

export type TokenKind = 'dm' | 'curse'
export type TokenCounts = Pick<TokenHolding, TokenKind>

const NO_TOKENS: TokenCounts = { dm: 0, curse: 0 }

/** Adds `delta` tokens of one kind, never going below zero. */
export function adjustTokens(counts: TokenCounts | undefined, kind: TokenKind, delta: number) {
  const current = counts ?? NO_TOKENS
  return { ...current, [kind]: Math.max(0, current[kind] + delta) }
}

/** Sets one PC's counts, dropping PCs who hold nothing and keeping the list in key order. */
export function withCounts(tokens: Tokens, key: string, counts: TokenCounts): Tokens {
  const others = tokens.holdings.filter(({ pc }) => pc.key !== key)
  const holdings =
    counts.dm === 0 && counts.curse === 0
      ? others
      : [...others, { pc: { ref: 'pc' as const, key }, ...counts }]
  return { holdings: holdings.toSorted((a, b) => a.pc.key.localeCompare(b.pc.key)) }
}

/** The token record as source, in the shape the formatter keeps. */
export function tokensSource(tokens: Tokens): string {
  const lines = tokens.holdings.map(
    ({ pc, dm, curse }) => `    { pc: refs.pcs.${pc.key}, dm: ${dm}, curse: ${curse} },\n`,
  )
  return [
    ...(lines.length > 0 ? ["import { refs } from '#/data/generated/refs.ts'\n"] : []),
    "import { create as createTokens } from '#/definitions/tokens.ts'\n",
    '\n',
    "// The DM dashboard's token steppers rewrite this file in local dev.\n",
    'export default createTokens({\n',
    lines.length > 0 ? `  holdings: [\n${lines.join('')}  ],\n` : '  holdings: [],\n',
    '})\n',
  ].join('')
}

export type TokenRow = {
  key: string
  name: string
  avatar: string
  occasional: boolean
  counts: TokenCounts
}

/** The players who hold tokens at the table: active PCs first, then occasional ones. */
export function tokenRows(pcs: Readonly<Record<string, PC>>, tokens: Tokens): TokenRow[] {
  const held = new Map(tokens.holdings.map(({ pc, dm, curse }) => [pc.key, { dm, curse }]))
  return Object.entries(pcs)
    .filter(([, pc]) => pc.status !== 'retired')
    .map(([key, pc]) => ({
      key,
      name: pc.name,
      avatar: pc.avatar,
      occasional: pc.status === 'occasional',
      counts: held.get(key) ?? NO_TOKENS,
    }))
    .toSorted((a, b) => Number(a.occasional) - Number(b.occasional) || a.name.localeCompare(b.name))
}
