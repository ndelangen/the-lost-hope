/**
 * Makes up one library item from the DM's own words, for a shop to sell. Codex drafts it read-only
 * in the checkout, with the repository's own instructions, schemas and skills around it; the dev
 * server validates the draft and writes it. The agent never writes files itself.
 */
/* oxlint-disable no-await-in-loop -- each try feeds the agent what the last one got wrong */
import { EQUIPMENT_CATEGORIES, ITEM_CATEGORIES, ITEM_RARITIES } from '../src/definitions/library.ts'
import { COINS } from '../src/definitions/price.ts'
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

const list = (values: readonly string[]) => values.map((value) => `"${value}"`).join(', ')

export function itemPrompt(request: string, shop: ShopContext | undefined, problems?: string) {
  return [
    'You are making up one item for the library of The Lost Hope, a D&D 5e (2024) campaign, so a shop can sell it. Answer straight away: everything you need is below, so only open files for the rare item that leaves a lasting effect on a creature.',
    shop
      ? `It goes on sale at ${shop.location}, a ${shop.shopType} shop.`
      : 'It goes on sale in a shop.',
    '',
    'The DM asked for:',
    request.trim(),
    '',
    'Keep every rule the DM gave exactly (dice, bonuses, damage types, charges). Fill in only what they left out, in the plain voice of the 2024 rulebooks. Use the name the DM gave; otherwise make up a short, fitting one.',
    '',
    'Pick the kind:',
    `- "magicItem": anything magical (a bonus, extra damage, charges, a spell, a power). Fields: name; category, one of ${list(ITEM_CATEGORIES)}; detail (optional, e.g. "Longsword"); rarity, one of ${list(ITEM_RARITIES)} (as the 2024 DMG would rate it; a +3 weapon is legendary); attunement (optional: true, or e.g. "by a Wizard"); text.`,
    `- "equipment": plain goods with no magic. Fields: name; category, one of ${list(EQUIPMENT_CATEGORIES)}; detail (optional); price, { "amount": number, "coin": ${list(COINS)} }; weight (optional, pounds); text.`,
    '`text` is a list of paragraphs, each a list of strings: [["First paragraph."], ["Second."]]. Leave out every other field.',
    'Only if using the item leaves a condition or curse that lasts on a creature, add `effects` following `.claude/skills/extract-item-effects/SKILL.md`, with references written as { "ref": "rule", "key": "frightened" }.',
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
      effort: 'low',
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
