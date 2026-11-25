import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'

import { DamageType } from '#/components/damage-type'
import { RuleTerm } from '#/components/rule-term'
import { HoverPreview } from '#/components/ui/hover-preview'
import { libraryDamageTerms } from '#/lib/library-damage-terms'
import { browseLibrary, getLibraryEntry, librarySearch } from '#/lib/published-library'
import {
  ABILITY_KEYS,
  CREATURE_TYPE_KEYS,
  SENSE_KEYS,
  SIZE_KEYS,
  SKILL_KEYS,
  ruleRef,
  rules,
  type RuleKey,
} from '#/lib/rules'

const conditions = browseLibrary(false, undefined, 'rules')
const byName = new Map(conditions.map((rule) => [rule.name.toLowerCase(), rule.slug]))
const statisticTerms = new Map<string, RuleKey>()
for (const key of [
  ...ABILITY_KEYS,
  ...CREATURE_TYPE_KEYS,
  ...SENSE_KEYS,
  ...SIZE_KEYS,
  ...SKILL_KEYS,
  'armor_class',
  'hit_points',
  'initiative',
  'speed',
  'challenge_rating',
  'passive_perception',
] as const) {
  statisticTerms.set(rules[key].name.toLowerCase(), key)
}
for (const key of ABILITY_KEYS) statisticTerms.set(key, key)
statisticTerms.set('challenge', 'challenge_rating')
const glossaryPattern = new RegExp(
  '\\b(' + [...statisticTerms.keys()].sort((a, b) => b.length - a.length).join('|') + ')\\b',
  'giu',
)

const pattern = new RegExp('\\b(' + conditions.map(({ name }) => name).join('|') + ')\\b', 'giu')

export function LibraryRuleText({
  line,
  search,
  version,
  damage,
  statistics = false,
}: {
  line: string
  search: ReturnType<typeof librarySearch>
  version: string
  damage?: 'list' | 'prose'
  statistics?: boolean
}) {
  return line.split(pattern).map((text, index) => {
    const slug = index % 2 === 1 ? byName.get(text.toLowerCase()) : undefined
    const rule = slug ? getLibraryEntry('rules', slug, false, version) : undefined
    if (!slug || !rule) {
      if (damage && libraryDamageTerms(text, damage === 'list').length)
        return formatDamage(text, damage, index)
      return statistics ? statisticText(text, index) : text
    }
    return (
      <HoverPreview key={slug + ':' + index} content={rule.sections[0]?.lines[0] ?? rule.summary}>
        <Link
          to="/library/$type/$slug"
          params={{ type: 'rules', slug }}
          search={{ dm: search.dm, q: search.q, version }}
          className="underline decoration-dotted underline-offset-4"
        >
          {text}
        </Link>
      </HoverPreview>
    )
  })
}

function formatDamage(text: string, damage: 'list' | 'prose', segment: number) {
  const terms = libraryDamageTerms(text, damage === 'list')
  return terms.length ? (
    <Fragment key={'damage:' + segment}>
      {terms.map(({ start, end, type }, index) => (
        <Fragment key={start}>
          {text.slice(terms[index - 1]?.end ?? 0, start)}
          <DamageType type={ruleRef(type)} interactive={false}>
            {text.slice(start, end)}
          </DamageType>
        </Fragment>
      ))}
      {text.slice(terms.at(-1)!.end)}
    </Fragment>
  ) : (
    text
  )
}

function statisticText(text: string, segment: number) {
  return (
    <Fragment key={'statistic:' + segment}>
      {text.split(glossaryPattern).map((part, index) => {
        const key = index % 2 === 1 ? statisticTerms.get(part.toLowerCase()) : undefined
        return key ? (
          <RuleTerm
            key={key + ':' + index}
            rule={ruleRef(key)}
            className={part.toLowerCase() === key && part.length === 3 ? 'uppercase' : undefined}
          >
            {part}
          </RuleTerm>
        ) : (
          part
        )
      })}
    </Fragment>
  )
}
