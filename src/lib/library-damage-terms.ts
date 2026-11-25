import { DAMAGE_TYPE_COLORS } from './damage-type-colors'
import type { DamageType } from './rules'

const typeWord = `\\b(?:${Object.keys(DAMAGE_TYPE_COLORS).join('|')})\\b`
const typeList = new RegExp(
  `${typeWord}(?:(?:\\s*[,/]\\s*(?:(?:and|or)\\s+)?|\\s+(?:and|or)\\s+)${typeWord})*`,
  'gi',
)

/** Library printings include both full sentences and compact rolls such as "12 (2d6 + 5) bludgeoning". */
export function libraryDamageTerms(text: string, damageList = false) {
  const terms: { start: number; end: number; type: DamageType }[] = []
  const qualifier = damageList ? /^(?:while|when|if)\b[^:]*:/i.exec(text) : null
  for (const { 0: list, index } of text.matchAll(typeList)) {
    if (qualifier && index < qualifier[0].length) continue
    const before = text.slice(0, index)
    const after = text.slice(index + list.length)
    if (
      !damageList &&
      !/^\s+(?:damage|resistance|immunity|vulnerability)\b/i.test(after) &&
      !/(?:\d\)?|damage except|(?:resistan(?:ce|t)|immun(?:ity|e)|vulnerab(?:ility|le)) to)\s+$/i.test(
        before,
      )
    )
      continue
    for (const word of list.matchAll(/\w+/g)) {
      const key = word[0].toLowerCase()
      if (!Object.hasOwn(DAMAGE_TYPE_COLORS, key)) continue
      const start = index + word.index
      terms.push({ start, end: start + word[0].length, type: key as DamageType })
    }
  }
  return terms
}
