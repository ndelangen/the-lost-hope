import { expect, test } from 'vitest'

import { monsterPrinting } from './library-monsters'
import {
  creatureRuleParagraphs,
  explainHitDice,
  printedCreatureAbilityKind,
  publishedCreatureSheet,
} from './published-creature-sheet'
import { getLibraryEntry } from './published-library'
import { loadAllLibraryDetails } from './published-library-data'

await loadAllLibraryDetails()

/**
 * A printing still held as catalog text, in the shape the catalog stores: the Aboleth as the
 * catalog held it before it was typed, with the icons a review gave its abilities.
 */
const heldAboleth = {
  sections: [
    {
      title: 'Saving throws',
      lines: ['Con +6', 'Int +8', 'Wis +6'],
    },
    { title: 'Skills', lines: ['History +12, Perception +10.'] },
    { title: 'Senses', lines: ['Darkvision 120 ft., passive Perception 20.'] },
    { title: 'Languages', lines: ['Deep Speech, telepathy 120 ft.'] },
    {
      title: 'Actions',
      lines: [
        'Multiattack. Make three Tentacle attacks.\nTentacle. Melee weapon attack, +9 to hit, reach 10 ft., one target. Hit 12 (2d6 + 5) bludgeoning.\nTail. Melee weapon attack, +9 to hit, reach 10 ft., one target. Hit 15 (3d6 + 5) bludgeoning.\nEnslave (3/day). One creature the aboleth can see within 30 ft. makes a DC 14 Wisdom save.',
      ],
    },
  ],
  display: {
    Multiattack: { icon: 'gi/GiCrossedSlashes', kind: 'attack' },
    Tentacle: { icon: 'gi/GiTentacleStrike', kind: 'melee' },
    Tail: { icon: 'gi/GiWhiplash', kind: 'melee' },
    Enslave: { icon: 'gi/GiCharm', kind: 'save' },
  },
} as const

test('keeps reviewed action icons on a held printing', () => {
  const actions = heldAboleth.sections
    .find(({ title }) => title === 'Actions')!
    .lines.flatMap((line) => creatureRuleParagraphs(line, heldAboleth.display))
  expect(actions.map(({ title }) => title)).toEqual([
    'Multiattack.',
    'Tentacle.',
    'Tail.',
    'Enslave (3/day).',
  ])
  expect(actions[1]?.presentation).toEqual({ icon: 'gi/GiTentacleStrike', kind: 'melee' })
  expect(actions[3]?.presentation).toEqual({ icon: 'gi/GiCharm', kind: 'save' })
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

test("splits a held printing's statistics into the original sheet sections", () => {
  const sheet = publishedCreatureSheet(heldAboleth.sections)
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
  expect(
    creatureRuleParagraphs(
      "Bite. Melee attack roll +4, reach 5 ft. Hit: 5 (1d6 + 2) piercing damage.\nWedge. The eel jams itself into a crack and can't be pulled free.",
    ).map(({ title }) => title),
  ).toEqual(['Bite.', 'Wedge.'])

  // A converted printing keeps its statistics in typed data, not in text sections.
  const lion = getLibraryEntry('monsters', 'lion', true, 'srd-5-1')!
  expect(lion.sections).toEqual([])
  expect(
    lion.selected.typed && 'monster' in lion.selected.typed && lion.selected.typed.monster.key,
  ).toBe('lion')
})

test('keeps prose before a saving throw beside the structured save', async () => {
  const ape = getLibraryEntry('monsters', 'giant-ape', true, 'srd-5-2-1')!
  const { loadMonsterPrinting } = await import('./load-monster')
  const ref = ape.selected.typed
  if (!ref || !('monster' in ref)) throw new Error('the ape is typed')
  const typed = (await loadMonsterPrinting(ref.monster, ref.publication))!
  const toss = typed.printing.stats.abilities.find(({ key }) => key === 'boulder-toss')!
  expect(toss.text[0]).toMatch(/^The ape hurls/u)
  expect(toss.save).toMatchObject({ ability: 'dex', onSuccess: 'half' })
})

test('types a scalable companion with the level it scales by', () => {
  const land = monsterPrinting(
    { ref: 'monster', key: 'beast_of_the_land' },
    { ref: 'publication', key: 'player_s_handbook_2024' },
  )!
  expect(land.owned).toEqual({
    publication: 'player_s_handbook_2024',
    monster: 'beast_of_the_land',
  })
  expect(land.printing.stats.scores.str).toBe(14)
})
