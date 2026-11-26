import { refs } from '#/data/generated/refs.ts'
import { create as createBeast } from '#/definitions/beast.ts'

export default createBeast({
  name: 'Giant Spider',
  avatar: '/assets/beasts/giant-spider-portrait.png',
  location: refs.locations.fajanet_tunnels,
  species: 'Giant Spider',
  notes: [
    [
      'A giant spider in the ',
      refs.locations.fajanet_tunnels,
      ', guarding the ',
      refs.beasts.phoenix_chick,
      ' in a cocoon. Why it was guarding a phoenix — its own prey, or on behalf of someone like the missing-animal dealer — is unexplained.',
    ],
  ],
  stats: {
    size: 'large',
    type: 'beast',
    cr: '1',
    ac: 14,
    armor: 'natural armor',
    hitDice: '4d10',
    speed: { walk: 30, climb: 30 },
    scores: { str: 14, dex: 16, con: 12, int: 2, wis: 11, cha: 4 },
    skills: { perception: 'expert', stealth: 'expert' },
    senses: { darkvision: 60 },
    abilities: [
      {
        key: 'spider-climb',
        name: 'Spider Climb',
        timing: 'trait',
        icon: 'lucide/MoveUp',
        text: [
          'Climbs difficult surfaces, including ceilings, at ',
          { speed: 'climb' },
          ' without an ability check.',
        ],
      },
      {
        key: 'web-walker',
        name: 'Web Walker',
        timing: 'trait',
        icon: 'lucide/Footprints',
        text: [
          'Ignores movement restrictions caused by webs, and knows where any creature touching the same web is.',
        ],
      },
      {
        key: 'bite',
        name: 'Bite',
        timing: 'action',
        icon: 'gi/GiFangs',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [
            { dice: '1d8', type: refs.rules.piercing, addModifier: true },
            { dice: '2d6', type: refs.rules.poison },
          ],
        },
      },
      {
        key: 'web',
        name: 'Web',
        timing: 'action',
        icon: 'gi/GiSpiderWeb',
        save: {
          ability: 'dex',
          dc: 'dex',
          target: { creatures: 1, range: 60, which: 'it can see' },
          onFail: {
            also: [{ effect: 'stuck-in-web' }],
          },
        },
        uses: 1,
        recharge: 'Recharge 5–6',
        effects: [
          {
            key: 'stuck-in-web',
            name: 'Stuck in the web',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.restrained],
            text: ['AC 10, 5 HP, vulnerable to fire, immune to poison and psychic.'],
            lasts: { kind: 'until', text: ['the web is destroyed'] },
          },
        ],
      },
    ],
    source: { adaptedFrom: ['srd-2024_giant-spider'] },
  },
})
