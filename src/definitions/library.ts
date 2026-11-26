import { z } from 'zod'

import { ABILITY_KEYS, CONDITION_KEYS } from '#/lib/rules'

import { Content } from './content'
import { entityRefOf } from './kind'
import { PrintedStatBlock } from './stat-block'
import { stagedEffectProblems, statusEffectSchemas } from './status-effect'

/** The rules a publication is written for; it decides how its stat blocks read. */
export const RULESETS = ['5e-2014', '5e-2024'] as const

export type Ruleset = (typeof RULESETS)[number]

/** A book or document the library draws from. Printings name it instead of repeating it. */
export const Publication = z.strictObject({
  name: z.string().trim().min(1).describe('As printed on the cover, e.g. `Monster Manual`'),
  publisher: z.string().trim().min(1).optional().describe('Left out when the source does not say'),
  year: z.number().int().min(1974).optional().describe('Left out when the source does not say'),
  ruleset: z.enum(RULESETS),
  license: z
    .enum(['cc-by-4.0', 'ogl-1.0a'])
    .optional()
    .describe('The open license the library uses its text under; left out for summaries'),
  notice: z
    .string()
    .trim()
    .min(1)
    .optional()
    .describe('The attribution or OGL Section 15 notice the license asks us to show'),
  pdf: z
    .string()
    .regex(/\.pdf$/)
    .optional()
    .describe('Path of the source PDF under the DND Books output folder, for checking the print'),
})

export type Publication = z.infer<typeof Publication>

const PublicationRef = entityRefOf('publication')

/**
 * One publication's printing of a monster. The monster itself is every printing that shares its
 * key; identical reprints are listed in `reprintedIn` instead of being copied.
 */
export const MonsterPrinting = z.strictObject({
  name: z.string().trim().min(1).describe('The name this publication prints'),
  page: z.number().int().positive().optional(),
  reprintedIn: z
    .array(PublicationRef)
    .min(1)
    .optional()
    .describe('Publications that print this stat block unchanged'),
  tags: z.array(z.string().trim().min(1)).min(1).optional().describe('e.g. `Dinosaur`'),
  alignment: z.string().trim().min(1).optional().describe('As printed, e.g. `unaligned`'),
  languages: z
    .array(z.string().trim().min(1))
    .optional()
    .describe(
      'Empty when it has none; left out when the source we read did not record them. A rule such as telepathy is written out',
    ),
  habitats: z.array(z.string().trim().min(1)).min(1).optional(),
  appearance: Content.optional().describe('What the party sees, for describing it at the table'),
  lore: Content.optional().describe('Background the publication gives, for the DM'),
  tableNotes: Content.optional().describe(
    'Rulings and running advice the library adds; not printed in the publication',
  ),
  stats: PrintedStatBlock,
})

export type MonsterPrinting = z.infer<typeof MonsterPrinting>

/** Every monster one publication prints, by monster key. */
export const PublicationMonsters = z.strictObject({
  publication: PublicationRef,
  monsters: z.record(z.string().regex(/^[a-z][a-z0-9_]*$/), MonsterPrinting),
})

export const createPublicationMonsters = (input: z.input<typeof PublicationMonsters>) =>
  PublicationMonsters.parse(input)

/** Every publication the library draws from, by publication key. */
export const createPublications = (input: Record<string, z.input<typeof Publication>>) =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, Publication.parse(value)]),
  ) as Record<string, Publication>

export const SPELL_SCHOOLS = [
  'abjuration',
  'conjuration',
  'divination',
  'enchantment',
  'evocation',
  'illusion',
  'necromancy',
  'transmutation',
] as const

/** A spell as its publication prints it. Stat blocks name spells by ref, never by text. */
const spellEffectSchemas = statusEffectSchemas(
  z.union([z.string().min(1), entityRefOf('rule')]),
  z.strictObject({ dc: z.literal('spell') }).describe('Against the caster’s spell save DC'),
)

/**
 * What a spell leaves on its targets, as a sub-entity of the spell (see `./status-effect`). The
 * spell's printed text stays as published; its effects say the same in a form the encounter
 * tracker applies. Save DCs are the caster's spell save DC.
 */
export const SpellEffect = z
  .strictObject({
    ...spellEffectSchemas.shape,
    lands: z
      .discriminatedUnion('on', [
        z
          .strictObject({ on: z.literal('failed-save'), save: z.enum(ABILITY_KEYS) })
          .describe('When a target fails this save against the spell save DC'),
        z.strictObject({ on: z.literal('hit') }).describe('When the spell attack hits'),
        z
          .strictObject({ on: z.literal('use') })
          .describe('No roll: it lands on each target, willing or not'),
      ])
      .describe('How it lands on a target'),
  })
  .superRefine((effect, context) => {
    for (const message of stagedEffectProblems(effect, CONDITION_KEYS))
      context.addIssue({ code: 'custom', message })
    if (effect.ends?.repeatSave && effect.lands.on !== 'failed-save')
      context.addIssue({
        code: 'custom',
        message: `${effect.key}: repeats a save it never called for`,
      })
  })

export type SpellEffect = z.infer<typeof SpellEffect>

export const Spell = z.strictObject({
  name: z.string().trim().min(1),
  level: z.number().int().min(0).max(9).describe('0 for a cantrip'),
  school: z.enum(SPELL_SCHOOLS),
  classes: z.array(z.string().trim().min(1)).min(1),
  castingTime: z.string().trim().min(1).describe('As printed, e.g. `Action or Ritual`'),
  range: z.string().trim().min(1),
  components: z.string().trim().min(1).describe('As printed, e.g. `V, S, M (a feather)`'),
  duration: z.string().trim().min(1),
  text: Content,
  effects: z
    .array(SpellEffect)
    .refine((effects) => {
      const keys = effects.flatMap((effect) => [
        effect.key,
        ...(effect.becomes ? [effect.becomes.key] : []),
      ])
      return new Set(keys).size === keys.length
    }, 'Effect keys, later stages included, are unique within the spell')
    .optional()
    .describe(
      'What it leaves on its targets, for the tracker to apply. `[]`: checked, nothing lasting; left out: not checked yet',
    ),
  publication: PublicationRef,
})

export type Spell = z.infer<typeof Spell>

/** Every spell the library holds, by spell key. */
export const createSpells = (input: Record<string, z.input<typeof Spell>>) =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, Spell.parse(value)]),
  ) as Record<string, Spell>

export const ITEM_CATEGORIES = [
  'Ammunition',
  'Armor',
  'Potion',
  'Ring',
  'Rod',
  'Scroll',
  'Shield',
  'Staff',
  'Wand',
  'Weapon',
  'Wondrous Item',
] as const

export const ITEM_RARITIES = [
  'common',
  'uncommon',
  'rare',
  'very rare',
  'legendary',
  'artifact',
  'varies',
] as const

const itemEffectSchemas = statusEffectSchemas(
  z.union([z.string().min(1), entityRefOf('rule')]),
  z.strictObject({ dc: z.number().int().positive() }).describe('The escape DC the item prints'),
)

/**
 * What a magic item leaves on a creature: a potion on whoever drinks it, a weapon on whoever it
 * hits, an item's power on its target. A sub-entity of the item (see `./status-effect`).
 */
export const ItemEffect = z
  .strictObject({
    ...itemEffectSchemas.shape,
    lands: z
      .discriminatedUnion('on', [
        z
          .strictObject({ on: z.literal('use') })
          .describe('When it is drunk, applied, read or activated on the creature'),
        z.strictObject({ on: z.literal('hit') }).describe('When an attack with it hits'),
        z
          .strictObject({
            on: z.literal('failed-save'),
            save: z.enum(ABILITY_KEYS),
            dc: z.number().int().positive().describe('The DC the item prints'),
          })
          .describe('When the creature fails this save'),
      ])
      .describe('How it lands on a creature'),
  })
  .superRefine((effect, context) => {
    for (const message of stagedEffectProblems(effect, CONDITION_KEYS))
      context.addIssue({ code: 'custom', message })
    if (effect.ends?.repeatSave && effect.lands.on !== 'failed-save')
      context.addIssue({
        code: 'custom',
        message: `${effect.key}: repeats a save it never called for`,
      })
  })

export type ItemEffect = z.infer<typeof ItemEffect>

/** A magic item as its publication prints it. */
export const MagicItem = z.strictObject({
  name: z.string().trim().min(1),
  category: z.enum(ITEM_CATEGORIES),
  detail: z
    .string()
    .trim()
    .min(1)
    .optional()
    .describe('What the category line adds in parentheses, e.g. `Longsword` or `Any Heavy Armor`'),
  rarity: z.enum(ITEM_RARITIES),
  attunement: z
    .union([z.literal(true), z.string().trim().min(1)])
    .optional()
    .describe('`true`, or who can attune, e.g. `by a Wizard`'),
  text: Content,
  effects: z
    .array(ItemEffect)
    .refine((effects) => {
      const keys = effects.flatMap((effect) => [
        effect.key,
        ...(effect.becomes ? [effect.becomes.key] : []),
      ])
      return new Set(keys).size === keys.length
    }, 'Effect keys are unique within the item')
    .optional()
    .describe(
      'What it leaves on a creature, for the tracker to apply. `[]`: checked, nothing lasting; left out: not checked yet',
    ),
  publication: PublicationRef,
})

export type MagicItem = z.infer<typeof MagicItem>

/** Every magic item one publication prints, by item key. */
export const createMagicItems = (input: Record<string, z.input<typeof MagicItem>>) =>
  Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, MagicItem.parse(value)]),
  ) as Record<string, MagicItem>
