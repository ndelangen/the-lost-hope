/**
 * Makes up one library item from the DM's own words, for a shop to sell. Codex drafts it read-only
 * in the checkout, with the repository's own instructions, schemas and skills around it; the dev
 * server validates the draft and writes it. The agent never writes files itself.
 */
/* oxlint-disable no-await-in-loop -- each try feeds the agent what the last one got wrong */
import { runCodex } from './dm-authoring.ts'

export type LibraryItemKind = 'equipment' | 'magicItem'

export type ItemDraft = { kind: LibraryItemKind; entry: Record<string, unknown> }

/** Codex's answer. The entry travels as JSON text so its own schema can stay open here. */
const ITEM_DRAFT_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['kind', 'entry'],
  properties: {
    kind: { type: 'string', enum: ['equipment', 'magicItem'] },
    entry: { type: 'string', description: 'The entry object, as JSON text' },
  },
}

const DRAFT_TIMEOUT_MS = 4 * 60_000

export type ShopContext = { location: string; shopType: string }

export function itemPrompt(request: string, shop: ShopContext | undefined, problems?: string) {
  return [
    'You are making up one item for the library of The Lost Hope, a D&D 5e (2024) campaign, so a shop can sell it.',
    shop
      ? `It goes on sale at ${shop.location}, a ${shop.shopType} shop.`
      : 'It goes on sale in a shop.',
    '',
    'The DM asked for:',
    request.trim(),
    '',
    'Keep every rule the DM gave exactly (dice, bonuses, damage types, charges). Fill in only what they left out, in the plain voice the library books use.',
    '',
    'Decide what kind of entry it is:',
    '- `magicItem`: anything magical, with a bonus, extra damage, charges, a spell or a power. Pick the rarity the 2024 DMG would give it; a +3 weapon is legendary.',
    '- `equipment`: plain goods with no magic. It needs a `price` as `{ "amount": number, "coin": "cp" | "sp" | "ep" | "gp" | "pp" }`.',
    '',
    'Read before writing:',
    '- `Equipment` and `MagicItem` in `src/definitions/library.ts` (the entry must match exactly; leave out `publication`, the server sets it).',
    '- Examples: `src/data/library/equipment/the-lost-hope.ts` and `src/data/library/magic-items/srd-5-2-1.ts`.',
    '- `text` is a list of paragraphs, each a list of strings: `[["First paragraph."], ["Second."]]`.',
    '- If using it leaves something lasting on a creature (a condition, a curse), follow `.claude/skills/extract-item-effects/SKILL.md` for `effects`. Otherwise leave `effects` out. Write references as `{ "ref": "rule", "key": "frightened" }`.',
    '- The name must be new: check it is not in `src/data/generated/equipment-names.ts` or `src/data/generated/magic-item-names.ts`.',
    '',
    'Answer with `kind` and `entry`, where `entry` is the entry object as JSON text.',
    ...(problems ? ['', 'Your last draft was refused for these reasons. Fix them:', problems] : []),
  ].join('\n')
}

/**
 * Drafts the item, and lets the agent fix it once when `check` finds problems with the draft.
 * `check` returns a description of what is wrong, or nothing when the draft is fine.
 */
export async function draftLibraryItem(
  request: string,
  shop: ShopContext | undefined,
  check: (draft: ItemDraft) => Promise<string | undefined>,
): Promise<ItemDraft> {
  let problems: string | undefined
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const message = await runCodex({
      sandbox: 'read-only',
      timeoutMs: DRAFT_TIMEOUT_MS,
      schema: ITEM_DRAFT_JSON_SCHEMA,
      prompt: itemPrompt(request, shop, problems),
    })
    let draft: ItemDraft
    try {
      const answer = JSON.parse(message) as { kind: LibraryItemKind; entry: string }
      const entry = JSON.parse(answer.entry) as unknown
      if (!entry || typeof entry !== 'object' || Array.isArray(entry))
        throw new Error('The entry is not an object')
      draft = { kind: answer.kind, entry: entry as Record<string, unknown> }
    } catch (error) {
      problems = `The answer was not valid JSON: ${(error as Error).message}`
      continue
    }
    problems = await check(draft)
    if (!problems) return draft
  }
  throw new Error(`The agent could not make a valid item: ${problems}`)
}
