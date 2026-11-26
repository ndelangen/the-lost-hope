import { expect, test } from 'vitest'

import {
  creatureRuleParagraphs,
  explainHitDice,
  printedCreatureAbilityKind,
  publishedCreatureSheet,
} from './published-creature-sheet'
import { getLibraryEntry } from './published-library'

test('keeps reviewed Aboleth action icons with the matching SRD printing', () => {
  const legacy = getLibraryEntry('monsters', 'aboleth', true, 'srd-5-1')!
  const revised = getLibraryEntry('monsters', 'aboleth', true, 'srd-5-2-1')!
  const actions = (entry: typeof legacy) =>
    entry.sections
      .find(({ title }) => title === 'Actions')!
      .lines.flatMap((line) => creatureRuleParagraphs(line, entry.abilityDisplay))

  expect(actions(legacy).map(({ title }) => title)).toEqual([
    'Multiattack.',
    'Tentacle.',
    'Tail.',
    'Enslave (3/Day).',
  ])
  expect(actions(legacy)[1]?.presentation).toEqual({
    icon: 'gi/GiTentacleStrike',
    kind: 'melee',
  })
  expect(actions(revised).map(({ title }) => title)).toEqual([
    'Multiattack.',
    'Tentacle.',
    'Consume Memories.',
    'Dominate Mind (2/Day).',
  ])
  const traits = revised.sections.find(({ title }) => title === 'Traits')!
  const cloud = traits.lines
    .flatMap((line) => creatureRuleParagraphs(line, revised.abilityDisplay))
    .find(({ title }) => title === 'Mucus Cloud.')
  expect(cloud?.presentation).toEqual({ icon: 'gi/GiSmokeBomb', kind: 'save' })
  expect(cloud?.text).toContain('Constitution Saving Throw: DC 14')
  expect(getLibraryEntry('monsters', 'aboleth', false)?.abilityDisplay).toBeUndefined()
})

test('uses the printed attack instruction when no reviewed icon or kind exists', () => {
  const [attack] = creatureRuleParagraphs(
    'Fist. Melee Weapon Attack: +5 to hit. The target makes a DC 12 Strength saving throw.',
  )
  expect(printedCreatureAbilityKind(attack.title!, attack.text)).toBe('melee')
})

test('separates action introductions from named options', () => {
  const display = { Lash: { kind: 'melee', icon: 'gi/GiTentacleStrike' } } as const
  expect(
    creatureRuleParagraphs('Legendary Action Uses: 3. Lash. The aboleth attacks.', display).map(
      ({ title }) => title,
    ),
  ).toEqual([undefined, 'Lash.'])
})

test('splits legacy Aboleth statistics into the original sheet sections', () => {
  const entry = getLibraryEntry('monsters', 'aboleth', true, 'srd-5-1')!
  const sheet = publishedCreatureSheet(entry.sections)
  expect(sheet.savingThrows.map(({ name, modifier }) => [name, modifier])).toEqual([
    ['Constitution', 6],
    ['Intelligence', 8],
    ['Wisdom', 6],
  ])
  expect(sheet.defenses.map(({ title }) => title)).toEqual(['Skills', 'Senses', 'Languages'])
  expect(sheet.otherStats).toContainEqual(['Passive Perception', '20'])
  expect(explainHitDice('18d10 + 36', '135')).toContain('This printing lists 135 HP.')
})

test('separates combined-range attacks for printings without reviewed metadata', () => {
  const entry = getLibraryEntry('monsters', 'archmage', true, 'srd-5-2-1')!
  const actions = entry.sections.find(({ title }) => title === 'Actions')!
  const burst = actions.lines
    .flatMap((line) => creatureRuleParagraphs(line))
    .find(({ title }) => title === 'Arcane Burst.')
  expect(burst && printedCreatureAbilityKind('Arcane Burst.', burst.text)).toBe('attack')
})

test('separates named non-attack actions and traits in compact printings', () => {
  const eel = getLibraryEntry('beasts', 'rivetback-eel', true)!
  const actions = eel.sections.find(({ title }) => title === 'Actions')!
  expect(
    actions.lines.flatMap((line) => creatureRuleParagraphs(line)).map(({ title }) => title),
  ).toEqual(['Bite.', 'Wedge.'])

  // A converted printing keeps its statistics in typed data, not in text sections.
  const lion = getLibraryEntry('beasts', 'lion', true, 'srd-5-1')!
  expect(lion.sections).toEqual([])
  expect(lion.selected.typed?.monster.key).toBe('lion')
})

test('keeps prose before a saving throw beside the structured save', async () => {
  const ape = getLibraryEntry('beasts', 'giant-ape', true, 'srd-5-2-1')!
  const { monsterPrinting } = await import('./library-monsters')
  const typed = monsterPrinting(ape.selected.typed!.monster, ape.selected.typed!.publication)!
  const toss = typed.printing.stats.abilities.find(({ key }) => key === 'boulder-toss')!
  expect(toss.text[0]).toMatch(/^The ape hurls/u)
  expect(toss.save).toMatchObject({ ability: 'dex', onSuccess: 'half' })
})

test('keeps both the structured and prose statistics of a staged scalable printing', () => {
  const land = getLibraryEntry('beasts', 'beast-of-the-land', true)!
  const id = land.printings.find(({ label }) => label === 'Player’s Handbook')?.id
  expect(id).toBeDefined()
  const profile = getLibraryEntry('beasts', 'beast-of-the-land', true, id)!
  const sheet = publishedCreatureSheet(profile.sections)
  expect(sheet.abilities).toContainEqual(['Strength', '14'])
  expect(
    sheet.defenses.find(({ title }) => title === 'Additional statistics')?.lines.join(' '),
  ).toContain('Base save modifiers')
})
