/**
 * Magic-item effects: export candidate items in batches, and apply extraction results.
 *
 *   bun library-workers/effects/items.ts export <out-dir> [batch-size]
 *   bun library-workers/effects/items.ts apply <result.json>... [--dry]
 *
 * An item keeps its printed text; its effects sit beside it (`MagicItem.effects`). A result is
 * `{ file, item, effects }` or `{ file, item, skip }`. It is applied only when every effect parses
 * as an `ItemEffect` and its words come from the item's text.
 */
import { globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { ItemEffect, type MagicItem } from '#/definitions/library'
import { CONDITION_KEYS, rules } from '#/lib/rules'

const root = join(import.meta.dirname, '../..')
const [command, ...rest] = process.argv.slice(2)

const conditionNames = CONDITION_KEYS.map((key) => rules[key].name.toLowerCase())

function plain(item: MagicItem) {
  return item.text
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

/** Does the item's text leave something on a creature that lasts? */
function candidate(item: MagicItem) {
  if (item.effects) return false
  const text = plain(item).toLowerCase()
  if (item.category === 'Potion') return true
  return (
    conditionNames.some((name) => new RegExp(`\\b${name}\\b`).test(text)) ||
    /saving throw|for (1|one|10|ten|\d+) (minute|hour|round)|until the (end|start) of/.test(text)
  )
}

async function itemFiles() {
  const files = globSync('src/data/library/magic-items/*.ts', { cwd: root }).filter(
    (path) => !path.endsWith('_index.ts'),
  )
  return Promise.all(
    files.toSorted().map(async (file) => ({
      file,
      items: (await import(join(root, file))).default as Record<string, MagicItem>,
    })),
  )
}

if (command === 'export') {
  const [outDir = '/tmp/item-effects', size = '25'] = rest
  const out = []
  for (const { file, items } of await itemFiles())
    for (const [key, item] of Object.entries(items))
      if (candidate(item))
        out.push({
          file,
          item: key,
          name: item.name,
          category: item.detail ? `${item.category} (${item.detail})` : item.category,
          text: item.text,
        })
  mkdirSync(outDir, { recursive: true })
  const per = Number(size)
  for (let index = 0; index * per < out.length; index++)
    writeFileSync(
      join(outDir, `items-${String(index + 1).padStart(3, '0')}.json`),
      JSON.stringify(out.slice(index * per, (index + 1) * per), null, 1),
    )
  console.log(`${out.length} candidate items in ${Math.ceil(out.length / per)} batches → ${outDir}`)
} else if (command === 'apply') {
  const dry = rest.includes('--dry')
  type Result = { file: string; item: string; effects?: unknown[]; skip?: string }
  const results: Result[] = rest
    .filter((arg) => !arg.startsWith('--'))
    .flatMap((path) => JSON.parse(readFileSync(path, 'utf8')))
  const files = new Map((await itemFiles()).map(({ file, items }) => [file, items]))
  const normalize = (text: string) =>
    text.replace(/\s+/g, ' ').trim().toLowerCase().replace(/[.,;:]+$/, '')
  const failures: string[] = []
  let applied = 0
  let skipped = 0
  const sources = new Map<string, string>()
  for (const result of results) {
    if (result.skip) {
      skipped++
      continue
    }
    const item = files.get(result.file)?.[result.item]
    if (!item) {
      failures.push(`${result.file} ${result.item}: item not found`)
      continue
    }
    const problems: string[] = []
    const effects = (result.effects ?? []).map((raw, index) => {
      const parsed = ItemEffect.safeParse(raw)
      if (!parsed.success)
        problems.push(
          `effect ${index}: ${parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`,
        )
      return parsed.success ? parsed.data : undefined
    })
    if (!effects.length) problems.push('no effects: skip it instead')
    const keys = effects.map((effect) => effect?.key)
    if (new Set(keys).size !== keys.length) problems.push('effect keys repeat')
    const source = normalize(plain(item))
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
          problems.push(`effect wording not in the item: "${value.trim()}"`)
    }
    if (problems.length) {
      failures.push(`${result.file} ${result.item}: ${problems.join(' | ')}`)
      continue
    }
    // Write `effects` just before the item's `publication`.
    const path = join(root, result.file)
    let text = sources.get(path) ?? readFileSync(path, 'utf8')
    const start = text.search(new RegExp(`\\n  ${result.item}: \\{`))
    const publication = text.indexOf('\n    publication:', start)
    if (start < 0 || publication < 0) {
      failures.push(`${result.file} ${result.item}: not found in the source`)
      continue
    }
    const serialized = JSON.stringify(result.effects).replace(
      /\{"ref":"rule","key":"([a-z_]+)"\}/g,
      'rules.$1',
    )
    text = `${text.slice(0, publication)}\n    effects: ${serialized},${text.slice(publication)}`
    // Conditions are written as rules terms: the module needs the campaign's rules.
    if (!text.includes('const { rules } = campaignRefs'))
      text = text
        .replace(
          "import { refs } from '#/data/generated/library-refs.ts'\n",
          "import { refs } from '#/data/generated/library-refs.ts'\nimport { refs as campaignRefs } from '#/data/generated/refs.ts'\n",
        )
        .replace(
          "import { createMagicItems } from '#/definitions/library.ts'\n",
          "import { createMagicItems } from '#/definitions/library.ts'\n\nconst { rules } = campaignRefs\n",
        )
    sources.set(path, text)
    applied++
  }
  if (!dry) for (const [path, text] of sources) writeFileSync(path, text)
  console.log(`${applied} applied, ${skipped} skipped, ${failures.length} failed`)
  for (const failure of failures) console.log(`- ${failure}`)
} else {
  console.log('Usage: items.ts export <out-dir> [size] | apply <result.json>... [--dry]')
}
