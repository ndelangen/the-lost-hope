/**
 * Spell effects: export candidate spells in batches, and apply extraction results.
 *
 *   bun library-workers/effects/spells.ts export <out-dir> [batch-size]
 *   bun library-workers/effects/spells.ts apply <result.json>... [--dry]
 *
 * A spell keeps its printed text; its effects sit beside it (`Spell.effects`). A result is
 * `{ file, spell, effects }` or `{ file, spell, skip }`. It is applied only when every effect
 * parses as a `SpellEffect` and its words come from the spell's text or duration.
 */
import { globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { SpellEffect, type Spell } from '#/definitions/library'
import { CONDITION_KEYS, rules } from '#/lib/rules'

const root = join(import.meta.dirname, '../..')
const [command, ...rest] = process.argv.slice(2)

const conditionNames = CONDITION_KEYS.map((key) => rules[key].name.toLowerCase())

function plain(spell: Spell) {
  return spell.text
    .map((paragraph) =>
      paragraph
        .map((atom) =>
          typeof atom === 'string'
            ? atom
            : 'ref' in atom && atom.ref === 'rule'
              ? (rules as Record<string, { name: string }>)[atom.key]!.name
              : 'label' in atom
                ? atom.label
                : '',
        )
        .join(''),
    )
    .join('\n')
}

/** Does the spell's text leave something on a target that lasts? */
function candidate(spell: Spell) {
  if (spell.effects) return false
  const text = plain(spell).toLowerCase()
  if (/^instantaneous/i.test(spell.duration) && !conditionNames.some((name) => text.includes(name)))
    return false
  return (
    conditionNames.some((name) => new RegExp(`\\b${name}\\b`).test(text)) ||
    /saving throw|spell attack/.test(text)
  )
}

async function spellFiles() {
  const files = globSync('src/data/library/spells/*.ts', { cwd: root }).filter(
    (path) => !path.endsWith('_index.ts'),
  )
  return Promise.all(
    files.toSorted().map(async (file) => ({
      file,
      spells: (await import(join(root, file))).default as Record<string, Spell>,
    })),
  )
}

if (command === 'export') {
  const [outDir = '/tmp/spell-effects', size = '25'] = rest
  const out = []
  for (const { file, spells } of await spellFiles())
    for (const [key, spell] of Object.entries(spells))
      if (candidate(spell))
        out.push({
          file,
          spell: key,
          name: spell.name,
          duration: spell.duration,
          text: spell.text,
        })
  mkdirSync(outDir, { recursive: true })
  const per = Number(size)
  for (let index = 0; index * per < out.length; index++)
    writeFileSync(
      join(outDir, `spells-${String(index + 1).padStart(3, '0')}.json`),
      JSON.stringify(out.slice(index * per, (index + 1) * per), null, 1),
    )
  console.log(`${out.length} candidate spells in ${Math.ceil(out.length / per)} batches → ${outDir}`)
} else if (command === 'apply') {
  const dry = rest.includes('--dry')
  const recordSkips = rest.includes('--record-skips')
  type Result = { file: string; spell: string; effects?: unknown[]; skip?: string }
  const results: Result[] = rest
    .filter((arg) => !arg.startsWith('--'))
    .flatMap((path) => JSON.parse(readFileSync(path, 'utf8')))
  const files = new Map((await spellFiles()).map(({ file, spells }) => [file, spells]))
  const normalize = (text: string) =>
    text.replace(/\s+/g, ' ').trim().toLowerCase().replace(/[.,;:]+$/, '')
  const failures: string[] = []
  let applied = 0
  let skipped = 0
  let done = 0
  const sources = new Map<string, string>()
  for (const result of results) {
    // A skip is recorded too: `effects: []` says it was checked and leaves nothing lasting.
    if (result.skip && !recordSkips) {
      skipped++
      continue
    }
    const spell = files.get(result.file)?.[result.spell]
    if (!spell) {
      failures.push(`${result.file} ${result.spell}: spell not found`)
      continue
    }
    // Written already, by an earlier run: leave it.
    if (spell.effects) {
      done++
      continue
    }
    const problems: string[] = []
    const effects = (result.effects ?? []).map((raw, index) => {
      const parsed = SpellEffect.safeParse(raw)
      if (!parsed.success)
        problems.push(
          `effect ${index}: ${parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`,
        )
      return parsed.success ? parsed.data : undefined
    })
    if (!effects.length && !result.skip) problems.push('no effects: skip it instead')
    const keys = effects.map((effect) => effect?.key)
    if (new Set(keys).size !== keys.length) problems.push('effect keys repeat')
    const source = normalize(`${plain(spell)} ${spell.duration}`)
    for (const effect of effects) {
      if (!effect) continue
      const words = [
        ...(effect.text ?? []),
        ...(effect.lasts.kind === 'until' ? effect.lasts.text : []),
        ...(effect.ends?.cure ?? []),
      ].filter((token): token is string => typeof token === 'string')
      // Pieces of text must join the way the book's do: a space between sentences and words.
      const tokens = [
        effect.text ?? [],
        effect.lasts.kind === 'until' ? effect.lasts.text : [],
        effect.ends?.cure ?? [],
      ]
      for (const list of tokens)
        for (let index = 1; index < list.length; index++) {
          const before = list[index - 1]!
          const after = list[index]!
          const left = typeof before === 'string' ? before : 'x'
          const right = typeof after === 'string' ? after : 'x'
          if (/[\w.,;:!?)]$/.test(left) && /^[\w(]/.test(right))
            problems.push(`effect ${effect.key}: no space between "${left.slice(-12)}" and "${right.slice(0, 12)}"`)
        }
      for (const value of words)
        if (normalize(value).length > 14 && !source.includes(normalize(value)))
          problems.push(`effect wording not in the spell: "${value.trim()}"`)
    }
    if (problems.length) {
      failures.push(`${result.file} ${result.spell}: ${problems.join(' | ')}`)
      continue
    }
    // Write `effects` just before the spell's `publication`.
    const path = join(root, result.file)
    let text = sources.get(path) ?? readFileSync(path, 'utf8')
    const start = text.search(new RegExp(`\\n  ${result.spell}: \\{`))
    const publication = text.indexOf('\n    publication:', start)
    if (start < 0 || publication < 0) {
      failures.push(`${result.file} ${result.spell}: not found in the source`)
      continue
    }
    if (result.skip) skipped++
    else applied++
    const serialized = JSON.stringify(result.effects ?? []).replace(
      /\{"ref":"rule","key":"([a-z_]+)"\}/g,
      'rules.$1',
    )
    text = `${text.slice(0, publication)}\n    effects: ${serialized},${text.slice(publication)}`
    sources.set(path, text)
  }
  if (!dry) for (const [path, text] of sources) writeFileSync(path, text)
  console.log(
    `${applied} applied, ${skipped} skipped, ${done} already written, ${failures.length} failed`,
  )
  for (const failure of failures) console.log(`- ${failure}`)
} else {
  console.log('Usage: spells.ts export <out-dir> [size] | apply <result.json>... [--dry]')
}
