import { z } from 'zod'

import { entityRefOf } from './kind'

export const RULE_CATEGORIES = {
  condition: 'Condition',
  action: 'Action',
  combat: 'Combat',
  damageType: 'Damage type',
  area: 'Area of effect',
  statBlock: 'Stat block',
  rest: 'Rest',
  character: 'Character',
  ability: 'Ability',
  skill: 'Skill',
  sense: 'Sense',
  size: 'Size',
  creatureType: 'Creature type',
} as const

export type RuleCategory = keyof typeof RULE_CATEGORIES

/** Chapters of the free official D&D Basic Rules (2024) on D&D Beyond that rules link to. */
const FREE_RULES_PAGES = {
  'rules-glossary': 'Rules Glossary',
  'playing-the-game': 'Playing the Game',
  'how-to-use-a-monster': 'How to Use a Monster',
} as const

type FreeRulesPage = keyof typeof FREE_RULES_PAGES

/** A short explanation: plain text and references to other rules terms it builds on. */
export const RuleText = z
  .array(z.union([z.string().min(1), entityRefOf('rule')]))
  .min(1)
  .describe('One or two sentences, paraphrased from the SRD 5.2.1')

export type RuleText = z.infer<typeof RuleText>

/**
 * A D&D rules term the app explains wherever it appears: a condition, an action, a combat
 * statistic, a damage type. Data and UI refer to it with `refs.rules.*`; the term owns its name,
 * its short explanation, and where the full official rule lives.
 */
export const Rule = z.strictObject({
  name: z.string().trim().min(1).describe('How the term reads in the rules, e.g. `Armor Class`'),
  short: z.string().trim().min(1).optional().describe('Abbreviation used in the UI, e.g. `AC`'),
  category: z.enum(Object.keys(RULE_CATEGORIES) as [RuleCategory, ...RuleCategory[]]),
  summary: RuleText,
  ability: entityRefOf('rule')
    .optional()
    .describe('For a skill: the ability it uses, e.g. `refs.rules.dex`'),
  icon: z
    .string()
    .optional()
    .describe('Icon-catalog id shown inline with the term; every damage type has one'),
  source: z
    .strictObject({
      page: z.enum(Object.keys(FREE_RULES_PAGES) as [FreeRulesPage, ...FreeRulesPage[]]),
      anchor: z
        .string()
        .regex(/^[A-Za-z0-9]+$/)
        .describe('Heading id on that page, e.g. `BlindedCondition`'),
    })
    .optional()
    .describe('The full rule in the free official rules on D&D Beyond, when they have one'),
})

export type Rule = z.infer<typeof Rule>

/** Validate a rules term, keeping its category literal so categories can be derived as types. */
export function create<C extends RuleCategory>(
  input: z.input<typeof Rule> & { category: C },
): Rule & { category: C } {
  return Rule.parse(input) as Rule & { category: C }
}
