import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/refs'
import type { RuleCategory } from '#/definitions/rule'
import { SOURCE_REGISTRIES } from '#/lib/campaign-registries'
import { arcs, creatures, scenes } from '#/lib/dm-campaign'
import { RULE_ICONS } from '#/lib/rule-icons'
import { rules } from '#/lib/rules'

const ALL_RECORDS = { ...SOURCE_REGISTRIES, arc: arcs, scene: scenes, creature: creatures, rules }

type Found = { path: string; key: string; expected?: RuleCategory }

/** Every rules-term reference in the campaign, with the category its field expects. */
function ruleReferences(value: unknown, path: string, found: Found[] = []): Found[] {
  if (Array.isArray(value)) {
    const expected = /(damageVulnerabilities|damageResistances|damageImmunities)$/.test(path)
      ? 'damageType'
      : path.endsWith('conditionImmunities')
        ? 'condition'
        : undefined
    value.forEach((item, index) => {
      if (expected && isRuleRef(item))
        found.push({ path: `${path}[${index}]`, key: item.key, expected })
      else ruleReferences(item, `${path}[${index}]`, found)
    })
    return found
  }
  if (!value || typeof value !== 'object') return found
  if (isRuleRef(value)) {
    found.push({ path, key: value.key })
    return found
  }
  for (const [field, child] of Object.entries(value)) {
    // A damage roll's `type` names a damage type.
    if (field === 'type' && 'dice' in value && isRuleRef(child))
      found.push({ path: `${path}.type`, key: child.key, expected: 'damageType' })
    else ruleReferences(child, `${path}.${field}`, found)
  }
  return found
}

function isRuleRef(value: unknown): value is { ref: 'rule'; key: string } {
  return !!value && typeof value === 'object' && (value as { ref?: unknown }).ref === 'rule'
}

describe('rules glossary', () => {
  it('keeps typed ref keys synchronized with the glossary', () => {
    expect(Object.keys(rules).toSorted()).toEqual(Object.keys(refs.rules).toSorted())
  })

  it('names every term once', () => {
    const names = Object.values(rules).map((rule) => rule.name.toLowerCase())
    expect(names.length).toBe(new Set(names).size)
  })

  it('resolves every rules reference to a term of the kind its field expects', () => {
    const found = ruleReferences(ALL_RECORDS, 'campaign')
    expect(found.length).toBeGreaterThan(50)
    const problems = found.flatMap(({ path, key, expected }) => {
      const rule = (rules as Record<string, { category: RuleCategory }>)[key]
      if (!rule) return [`${path}: unknown term ${key}`]
      if (expected && rule.category !== expected)
        return [`${path}: ${key} is a ${rule.category}, expected a ${expected}`]
      return []
    })
    expect(problems).toEqual([])
  })
})

describe('rules glossary icons', () => {
  it('gives every damage type a registered icon', () => {
    const terms = Object.values(rules)
    const damageTypes = terms.filter((rule) => rule.category === 'damageType')
    expect(damageTypes.filter((rule) => !rule.icon)).toEqual([])
    expect(terms.filter((rule) => rule.icon && !(rule.icon in RULE_ICONS))).toEqual([])
  })
})
