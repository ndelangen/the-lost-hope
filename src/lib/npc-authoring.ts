import { z } from 'zod'

import { ENTITY_KINDS, type EntityKind } from '#/definitions/kind'
import { slugFromName } from '#/definitions/slug'

/**
 * Local-dev NPC authoring (see issues #149 and #151). Codex returns a draft in this JSON shape; the
 * DM edits it; the dev server validates it and writes it as a campaign record. Nothing here runs in
 * the static deployment: only the dev-only Vite plugin and the dev-only editor import it.
 */

const Token = z.union([
  z
    .string()
    .refine(
      (text) => !text.includes('[[') && !text.includes(']]'),
      'Write references as [[kind:key]] with a known kind and a lowercase key, e.g. [[npc:the_fiddler]]',
    ),
  z.strictObject({ ref: z.enum(ENTITY_KINDS), key: z.string().regex(/^[a-z0-9_]+$/) }),
])

/** Paragraphs of text and campaign references, as campaign `Content` stores them. */
const Paragraphs = z.array(z.array(Token).min(1))

export const NpcDraft = z.strictObject({
  name: z.string().trim().min(1),
  species: z.string().trim().min(1).nullable(),
  /** Home location key in `refs.locations`. */
  location: z
    .string()
    .regex(/^[a-z0-9_]+$/)
    .nullable(),
  languages: z.array(z.string().trim().min(1)),
  /** What players may learn: a one-line identity. */
  notes: Paragraphs,
  /** DM only: what the NPC wants and why. */
  motivations: Paragraphs,
  /** DM only: the hidden truth. */
  background: Paragraphs,
  /** Shared stat block key in `refs.creatures`. */
  creature: z.string().regex(/^[a-z0-9_]+$/),
  /** How the portrait should look, for the background portrait job. */
  portrait: z.string().trim().min(1),
})

export type NpcDraft = z.infer<typeof NpcDraft>

const PARAGRAPHS_SCHEMA = {
  type: 'array',
  items: {
    type: 'array',
    items: {
      anyOf: [
        { type: 'string' },
        {
          type: 'object',
          properties: {
            ref: { type: 'string', enum: [...ENTITY_KINDS] },
            key: { type: 'string' },
          },
          required: ['ref', 'key'],
          additionalProperties: false,
        },
      ],
    },
  },
} as const

/** The structured-output schema `codex exec --output-schema` receives. Every field is required. */
export const NPC_DRAFT_JSON_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    species: { type: ['string', 'null'] },
    location: { type: ['string', 'null'] },
    languages: { type: 'array', items: { type: 'string' } },
    notes: PARAGRAPHS_SCHEMA,
    motivations: PARAGRAPHS_SCHEMA,
    background: PARAGRAPHS_SCHEMA,
    creature: { type: 'string' },
    portrait: { type: 'string' },
  },
  required: [
    'name',
    'species',
    'location',
    'languages',
    'notes',
    'motivations',
    'background',
    'creature',
    'portrait',
  ],
  additionalProperties: false,
} as const

/** The file slug and registry key a new NPC gets from its name. */
export function npcIdentity(name: string): { slug: string; key: string } {
  const slug = slugFromName(name)
  return { slug, key: slug.replaceAll('-', '_') }
}

const RESERVED = new Set(
  'break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with yield let static implements interface package private protected public await'.split(
    ' ',
  ),
)

/** Why a name cannot become a record, or undefined when it can. */
export function identityProblem(identity: { slug: string; key: string }): string | undefined {
  if (!identity.slug) return 'Give the NPC a name with letters or numbers in it'
  if (!/^[a-z_][a-z0-9_]*$/.test(identity.key)) return 'Start the NPC’s name with a letter'
  if (RESERVED.has(identity.key)) return 'Give the NPC a longer name'
  return undefined
}

/** Every campaign reference a draft uses, so the server can check each one resolves. */
export function draftReferences(draft: NpcDraft): { ref: EntityKind | 'creature'; key: string }[] {
  const tokens = [...draft.notes, ...draft.motivations, ...draft.background].flat()
  return [
    ...(draft.location ? [{ ref: 'location' as const, key: draft.location }] : []),
    { ref: 'creature' as const, key: draft.creature },
    ...tokens.flatMap((token) => (typeof token === 'string' ? [] : [token])),
  ]
}

function refExpression(ref: string, key: string) {
  return /^[a-z_][a-z0-9_]*$/.test(key)
    ? `refs.${ref}s.${key}`
    : `refs.${ref}s[${JSON.stringify(key)}]`
}

function paragraphsSource(paragraphs: NpcDraft['notes'], indent: string): string {
  const lines = paragraphs.map(
    (paragraph) =>
      `${indent}  [${paragraph
        .map((token) =>
          typeof token === 'string' ? JSON.stringify(token) : refExpression(token.ref, token.key),
        )
        .join(', ')}],`,
  )
  return `[\n${lines.join('\n')}\n${indent}]`
}

/** The TypeScript source of a new NPC record, in the shape the campaign data uses. */
export function npcSourceFile(draft: NpcDraft): string {
  const fields = [
    `  name: ${JSON.stringify(draft.name)},`,
    draft.location ? `  location: ${refExpression('location', draft.location)},` : undefined,
    draft.species ? `  species: ${JSON.stringify(draft.species)},` : undefined,
    draft.languages.length > 0 ? `  languages: ${JSON.stringify(draft.languages)},` : undefined,
    draft.notes.length > 0 ? `  notes: ${paragraphsSource(draft.notes, '  ')},` : undefined,
    draft.motivations.length > 0
      ? `  motivations: ${paragraphsSource(draft.motivations, '  ')},`
      : undefined,
    draft.background.length > 0
      ? `  background: ${paragraphsSource(draft.background, '  ')},`
      : undefined,
    `  stats: ${refExpression('creature', draft.creature)},`,
  ].filter(Boolean)
  return [
    "import { refs } from '#/data/generated/refs.ts'",
    "import { create as createNPC } from '#/definitions/npc.ts'",
    '',
    'export default createNPC({',
    ...fields,
    '})',
    '',
  ].join('\n')
}

/** Registers a new NPC in `src/data/npcs/_index.ts`: one import and one registry entry. */
export function addNpcToIndex(indexSource: string, identity: { slug: string; key: string }) {
  const importLine = `import ${identity.key} from './${identity.slug}.ts'`
  if (indexSource.includes(importLine)) throw new Error(`${identity.key} is already registered`)
  const lines = indexSource.split('\n')
  const lastImport = lines.findLastIndex((line) => line.startsWith('import '))
  lines.splice(lastImport + 1, 0, importLine)
  const withImport = lines.join('\n')
  const close = withImport.lastIndexOf('\n}')
  if (close === -1) throw new Error('Could not find the end of the NPC registry')
  return `${withImport.slice(0, close)}\n  ${identity.key},${withImport.slice(close)}`
}

/** The instruction `codex exec` receives to draft an NPC. */
export function draftPrompt({
  request,
  location,
  creatures,
}: {
  request: string
  /** Where the party is, so the NPC fits the scene. */
  location?: { key: string; name: string }
  creatures: readonly { key: string; name: string; cr: string }[]
}): string {
  return [
    'Draft one new NPC for The Lost Hope campaign in this repository. Do not modify any files.',
    '',
    `The DM asks for: ${request}`,
    location
      ? `The party is at ${location.name} (location key \`${location.key}\`). Use it as the home location unless the request says otherwise.`
      : 'Pick a fitting home location key from src/data/locations/_index.ts, or null.',
    '',
    'Read AGENTS.md, src/data/AGENTS.md and the relevant location, NPC and organization records so the NPC fits existing canon. Do not contradict canon and do not reuse an existing NPC name.',
    '',
    'Return JSON matching the output schema:',
    '- `notes`: one short line of what players can learn at first meeting.',
    '- `motivations`: what the NPC wants and why, for the DM.',
    '- `background`: the hidden truth, for the DM. Keep it brief and playable tonight.',
    '- Mention campaign records as `{ "ref": kind, "key": registry key }` tokens inside paragraphs, never as bare names. Use only keys that exist in src/data/<kind>s/_index.ts.',
    '- `creature`: the closest shared stat block key, one of:',
    ...creatures.map((creature) => `  - ${creature.key}: ${creature.name}, CR ${creature.cr}`),
    '- `portrait`: one or two sentences describing the face and look for a square portrait.',
  ].join('\n')
}

const REF_PATTERN = /\[\[([a-z]+):([a-z0-9_]+)\]\]/g

/**
 * Paragraphs as editable text: a blank line between paragraphs and `[[kind:key]]` for a campaign
 * reference, e.g. `Owes [[npc:the_fiddler]] a favour.`
 */
export function paragraphsToText(paragraphs: NpcDraft['notes']): string {
  return paragraphs
    .map((paragraph) =>
      paragraph
        .map((token) => (typeof token === 'string' ? token : `[[${token.ref}:${token.key}]]`))
        .join(''),
    )
    .join('\n\n')
}

/** The inverse of `paragraphsToText`. Unknown kinds stay as text so validation can flag them. */
export function textToParagraphs(text: string): NpcDraft['notes'] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const tokens: NpcDraft['notes'][number] = []
      let last = 0
      for (const match of paragraph.matchAll(REF_PATTERN)) {
        const [whole, ref, key] = match
        if (!(ENTITY_KINDS as readonly string[]).includes(ref!)) continue
        if (match.index > last) tokens.push(paragraph.slice(last, match.index))
        tokens.push({ ref: ref as EntityKind, key: key! })
        last = match.index + whole.length
      }
      if (last < paragraph.length) tokens.push(paragraph.slice(last))
      return tokens
    })
}
