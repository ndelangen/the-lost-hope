/**
 * Write extracted effects into the data files.
 *
 *   bun library-workers/effects/apply-results.ts <result.json>... [--dry]
 *
 * Each result names a file, creature (`null` for one-entity campaign files) and ability, and gives
 * the ability's `effects` and its new `text`, or `skip` with a reason. A result is applied only
 * when it passes the checks below; the rest are reported, so a batch can go back to its agent.
 *
 * Checks:
 * - every effect parses as an `AbilityEffect`, with conditions that are conditions;
 * - effect keys are unique in the stat block, and the new text points at each effect;
 * - the new text keeps every reference of the old text that no effect took over (a rule term
 *   becomes a condition, a DC becomes the effect's save or escape DC);
 * - no sentence is invented: each longer piece of new text is found in the old text.
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { AbilityEffect } from '#/definitions/stat-block'
import { CONDITION_KEYS } from '#/lib/rules'

const root = join(import.meta.dirname, '../..')
const args = process.argv.slice(2)
const dry = args.includes('--dry')
const inputs = args.filter((arg) => !arg.startsWith('--'))

type Token = string | Record<string, unknown>
type Result = {
  file: string
  creature: string | null
  ability: string
  effects?: unknown[]
  /** The ability's new text, when it changes. */
  text?: Token[]
  /**
   * For an ability with a structured save: its failure's new `also`. The failure's `conditions`
   * move into the effects, so they are removed.
   */
  also?: Token[]
  skip?: string
}

const failures: { result: Result; problems: string[] }[] = []
let applied = 0
let skipped = 0

// --- Checks ---------------------------------------------------------------------------------------

/** Words whose meaning an effect's structure carries, so they may leave the text. */
const STRUCTURAL = new Set(
  (
    'until each end ends ending turn turns next start minute minutes round rounds hour hours ' +
    'lasts last remains remain stays stay while long become becomes then also escape escapes ' +
    'grapple grapples grappled held hold this that with have from takes repeat repeats save saves ' +
    'saving throw throws success succeeds successful failure fails failed itself condition ' +
    'conditions effect effects there they their them when target creature knocked fall falls ' +
    'early otherwise'
  ).split(' '),
)

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim().toLowerCase()

function check(
  result: Result,
  old: { text: Token[]; kept: Token[]; effectKeys: Set<string>; save: boolean; attack: boolean },
) {
  const problems: string[] = []
  const effects = (result.effects ?? []).map((raw, index) => {
    const parsed = AbilityEffect.safeParse(raw)
    if (!parsed.success)
      problems.push(`effect ${index}: ${parsed.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`)
    return parsed.success ? parsed.data : undefined
  })
  if (!effects.length) problems.push('no effects: skip it instead')
  if (result.also && !old.save) problems.push('`also` given, but the ability has no save')
  if (!result.text && !result.also) problems.push('give the new `text` or `also`')
  const text = [...(result.text ?? []), ...(result.also ?? [])]
  const keys = new Set<string>()
  const conditionKeys = new Set<string>(CONDITION_KEYS)
  for (const effect of effects) {
    if (!effect) continue
    if (!effect.conditions && !effect.text)
      problems.push(`effect ${effect.key} needs conditions or text`)
    for (const condition of effect.conditions ?? [])
      if (!conditionKeys.has(condition.key))
        problems.push(`effect ${effect.key}: ${condition.key} is not a condition; say it in text`)
    if (effect.lands.on === 'hit' && !old.attack)
      problems.push(`effect ${effect.key} lands on a hit, but the ability has no attack`)
    if (effect.lands.on === 'failed-save' && !old.save)
      problems.push(`effect ${effect.key} lands on a failed save, but the ability has no save`)
    if (keys.has(effect.key) || old.effectKeys.has(effect.key))
      problems.push(`effect key ${effect.key} is used twice in this stat block`)
    keys.add(effect.key)
    if (!text.some((token) => typeof token === 'object' && token.effect === effect.key))
      problems.push(`the text never points at effect ${effect.key}`)
  }
  for (const token of text)
    if (typeof token === 'object' && 'effect' in token && !keys.has(String(token.effect)))
      problems.push(`the text points at a missing effect ${String(token.effect)}`)

  // References the old text had must survive, in the text or as part of an effect.
  const taken = JSON.stringify(result.effects ?? [])
  for (const token of old.text) {
    if (typeof token === 'string') continue
    const kept = text.some((candidate) => same(candidate, token))
    const inEffect =
      ('ref' in token && taken.includes(`"key":"${String(token.key)}"`)) ||
      ('dc' in token && taken.includes(`"dc":"${String(token.dc)}"`))
    if (!kept && !inEffect) problems.push(`lost ${JSON.stringify(token)} from the text`)
  }
  const oldPlain = normalize(old.text.filter((token) => typeof token === 'string').join(' '))
  // The effects' words (rider, "until", cure) come from the book too; only names are new.
  const effectStrings = effects.flatMap((effect) =>
    [
      ...(effect?.text ?? []),
      ...(effect?.lasts.kind === 'until' ? effect.lasts.text : []),
      ...(effect?.ends?.cure ?? []),
    ].filter((token): token is string => typeof token === 'string'),
  )
  const bare = (value: string) => normalize(value).replace(/[.,;:]+$/, '')
  for (const value of effectStrings)
    if (bare(value).length > 14 && !oldPlain.includes(bare(value)))
      problems.push(`effect wording not in the source: "${value.trim()}"`)
  for (const token of text)
    if (typeof token === 'string' && normalize(token).length > 14 && !oldPlain.includes(normalize(token)))
      problems.push(`new wording not in the source: "${token.trim()}"`)
  // Nothing the book says may vanish: each word of the old text is in the new text or an effect,
  // apart from the wording an effect's structure now says (durations, grapples, repeat saves).
  const kept = normalize(
    [...text, ...old.kept, ...effects.flatMap((effect) => (effect ? [effect.name, effect] : []))]
      .map((token) => (typeof token === 'string' ? token : JSON.stringify(token)))
      .join(' '),
  )
  const lost = [
    ...new Set(
      normalize(old.text.filter((token) => typeof token === 'string').join(' '))
        .match(/[a-z’']{4,}/g)
        // A possessive names whose turn it lasts to, which `lasts.whose` now says.
        ?.filter((word) => !STRUCTURAL.has(word) && !/[’']s$/.test(word) && !kept.includes(word)) ??
        [],
    ),
  ]
  if (lost.length) problems.push(`words from the book are lost: ${lost.join(', ')}`)
  // Pieces of text must join the way the book's do: a space between sentences and words.
  const lists = [
    text,
    ...effects.flatMap((effect) =>
      effect
        ? [effect.text ?? [], effect.lasts.kind === 'until' ? effect.lasts.text : [], effect.ends?.cure ?? []]
        : [],
    ),
  ]
  for (const list of lists as Token[][])
    for (let index = 1; index < list.length; index++) {
      const left = list[index - 1]
      const right = list[index]
      if (
        typeof left === 'string' &&
        typeof right === 'string' &&
        /[\w.,;:!?)]$/.test(left) &&
        /^[\w(]/.test(right)
      )
        problems.push(`no space between "${left.slice(-12)}" and "${right.slice(0, 12)}"`)
    }
  return problems
}

// --- Writing TypeScript ---------------------------------------------------------------------------

/** Serialize a token or effect the way the data files write them. */
function serialize(value: unknown, style: { rules: string; library: boolean }): string {
  if (typeof value === 'string') return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) return `[${value.map((item) => serialize(item, style)).join(', ')}]`
  const object = value as Record<string, unknown>
  if (object.ref === 'rule') return `${style.rules}.${String(object.key)}`
  if (object.ref === 'spell' && style.library) return `refs.spells.${String(object.key)}`
  return `{ ${Object.entries(object)
    .filter(([, item]) => item !== undefined)
    .map(([key, item]) => `${/^[a-zA-Z_]\w*$/.test(key) ? key : `'${key}'`}: ${serialize(item, style)}`)
    .join(', ')} }`
}

/** Index just past the bracket that closes the one at `open`, skipping strings and comments. */
function closing(source: string, open: number) {
  const pairs: Record<string, string> = { '{': '}', '[': ']', '(': ')' }
  const stack: string[] = []
  for (let index = open; index < source.length; index++) {
    const char = source[index]!
    if (char === "'" || char === '"' || char === '`') {
      for (index++; index < source.length && source[index] !== char; index++)
        if (source[index] === '\\') index++
      continue
    }
    if (char === '/' && source[index + 1] === '/') {
      index = source.indexOf('\n', index)
      continue
    }
    if (char in pairs) stack.push(pairs[char]!)
    else if (char === stack.at(-1)) {
      stack.pop()
      if (stack.length === 0) return index + 1
    }
  }
  throw new Error('Unbalanced brackets')
}

/** The source span of an ability object, found by creature and ability key. */
function abilitySpan(source: string, creature: string | null, ability: string) {
  let from = 0
  let to = source.length
  if (creature) {
    const match = new RegExp(`\\n(\\s+)${creature}: \\{`).exec(source)
    if (!match) throw new Error(`creature ${creature} not found`)
    from = match.index + match[0].length - 1
    to = closing(source, from)
  }
  const key = source.indexOf(`key: '${ability}',`, from)
  if (key < 0 || key > to) throw new Error(`ability ${ability} not found`)
  const open = source.lastIndexOf('{', key)
  return { open, close: closing(source, open) }
}

/** Replace the ability's `text`, and add `effects` after it. */
function patch(source: string, result: Result) {
  const style = {
    rules: source.includes('const { rules } = campaignRefs') ? 'rules' : 'refs.rules',
    library: result.file.includes('/library/'),
  }
  const { open, close } = abilitySpan(source, result.creature, result.ability)
  let body = source.slice(open, close)
  if (result.also) body = patchFailure(body, `also: ${serialize(result.also, style)},`)
  const effects = `effects: ${serialize(result.effects, style)},`
  const text = result.text ? `text: ${serialize(result.text, style)},\n` : ''
  const textAt = body.search(/\n {2,}text: \[/)
  if (textAt >= 0) {
    const start = body.indexOf('text: [', textAt)
    const end = closing(body, start + 'text: '.length)
    const after = body[end] === ',' ? end + 1 : end
    const kept = result.text ? '' : `${body.slice(start, after)}\n`
    body = `${body.slice(0, start)}${kept}${text}${effects}${body.slice(after)}`
  } else {
    body = `${body.slice(0, -1)}${text}${effects}\n}`
  }
  return source.slice(0, open) + body + source.slice(close)
}

/** In an ability's `save.onFail`, drop `conditions` and set `also`. */
function patchFailure(body: string, also: string) {
  const at = body.indexOf('onFail: {')
  if (at < 0) throw new Error('no onFail in the source')
  const open = at + 'onFail: '.length
  const close = closing(body, open)
  let failure = body.slice(open, close)
  for (const field of ['conditions', 'also']) {
    const start = failure.indexOf(`${field}: [`)
    if (start < 0) continue
    const end = closing(failure, start + field.length + 2)
    failure = failure.slice(0, start) + failure.slice(failure[end] === ',' ? end + 1 : end)
  }
  failure = `${failure.slice(0, -1)}${also}\n}`
  return body.slice(0, open) + failure + body.slice(close)
}

// --- Run ------------------------------------------------------------------------------------------

const results: Result[] = inputs.flatMap((path) => JSON.parse(readFileSync(path, 'utf8')))
const byFile = new Map<string, Result[]>()
for (const result of results) byFile.set(result.file, [...(byFile.get(result.file) ?? []), result])

// Files nobody has committed yet are another piece of work in progress: leave them alone.
const tracked = new Set(execFileSync('git', ['ls-files', 'src/data'], { cwd: root, encoding: 'utf8' }).split('\n'))

for (const [file, fileResults] of byFile) {
  const path = join(root, file)
  if (!tracked.has(file)) {
    for (const result of fileResults) failures.push({ result, problems: ['file not committed yet: left for later'] })
    continue
  }
  const module = await import(path)
  const records: [string | null, any][] = module.default.monsters
    ? Object.entries(module.default.monsters)
    : [[null, module.default]]
  let source = readFileSync(path, 'utf8')
  // Keys this run gives each creature, which the imported module doesn't know yet.
  const addedKeys = new Map<string | null, Set<string>>()
  for (const result of fileResults) {
    if (result.skip) {
      skipped++
      continue
    }
    const record = records.find(([key]) => key === result.creature)?.[1]
    const all = record
      ? [
          ...(record.stats.abilities ?? []),
          ...(record.stats.legendary?.actions ?? []),
          ...(record.stats.lairActions ?? []),
        ]
      : []
    const ability = all.find((candidate: any) => candidate.key === result.ability)
    if (!ability) {
      failures.push({ result, problems: ['ability not found'] })
      continue
    }
    const added = addedKeys.get(result.creature) ?? new Set<string>()
    addedKeys.set(result.creature, added)
    const effectKeys = new Set<string>([
      ...all.flatMap((other: any) => (other.effects ?? []).map((effect: any) => effect.key)),
      ...added,
    ])
    const problems = check(result, {
      attack: Boolean(ability.attack),
      // Text that is not being replaced stays, so its words are not lost.
      kept: [
        ...(result.text ? [] : (ability.text ?? [])),
      ],
      text: [
        ...(result.text ? (ability.text ?? []) : []),
        ...(result.also || ability.save?.onFail.conditions ? (ability.save?.onFail.also ?? []) : []),
        ...(result.also ? (ability.save?.onFail.conditions ?? []) : []),
      ],
      effectKeys,
      save: Boolean(ability.save),
    })
    if (problems.length) {
      failures.push({ result, problems })
      continue
    }
    try {
      source = patch(source, result)
      for (const effect of result.effects as { key: string }[]) added.add(effect.key)
      applied++
    } catch (error) {
      failures.push({ result, problems: [String(error)] })
    }
  }
  if (!dry) writeFileSync(path, source)
}

console.log(`${applied} applied, ${skipped} skipped, ${failures.length} failed`)
for (const { result, problems } of failures)
  console.log(`- ${result.file} ${result.creature ?? ''} ${result.ability}: ${problems.join(' | ')}`)
