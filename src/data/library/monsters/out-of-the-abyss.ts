import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.out_of_the_abyss,
  monsters: {
    giant_riding_lizard: {
      name: 'Giant Riding Lizard',
      page: 131,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Underdark'],
      appearance: [
        ['A sturdy four-legged olive lizard with a long tail, pale throat, and clawed toes.'],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/4',
        ac: 12,
        armor: 'natural armor',
        hitDice: '3d10',
        speed: { walk: 30, climb: 30 },
        scores: { str: 15, dex: 12, con: 13, int: 2, wis: 10, cha: 5 },
        senses: { darkvision: 30 },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'Cross difficult surfaces, including the underside of ceilings, without an ability check.',
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
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    giant_rocktopus: {
      name: 'Giant Rocktopus',
      page: 28,
      alignment: 'unaligned',
      languages: [],
      habitats: ['underwater'],
      appearance: [
        [
          'A mottled russet octopus with a knobbly mantle and eight sucker-lined arms. Its coloration can shift to blend with rock.',
        ],
      ],
      tableNotes: [
        [
          'For the published land encounter, allow air breathing as a DM ruling. Keep Ink Cloud underwater-only. A Tentacles hit grapples the target immediately. It can spend an action to attempt a DC 16 Strength (Athletics) or Dexterity (Acrobatics) escape check.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 11,
        hitDice: '8d10',
        speed: { walk: 20, climb: 10, swim: 60 },
        scores: { str: 17, dex: 13, con: 13, int: 4, wis: 10, cha: 4 },
        skills: { perception: 'expert', stealth: 'expert' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'camouflage',
            name: 'Camouflage',
            timing: 'trait',
            icon: 'gi/GiInvisible',
            text: [
              'Advantage on Dexterity (Stealth) checks in any terrain. The variant removes Hold Breath. Water Breathing is inherited from Giant Octopus and permits breathing only underwater. See the table ruling.',
            ],
          },
          {
            key: 'tentacles',
            name: 'Tentacles',
            timing: 'action',
            icon: 'gi/GiTentacleStrike',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 15,
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
            text: [
              'A creature hit is ',
              { effect: 'tentacle-grapple' },
              ' (escape DC 16)',
              ' for the duration',
              '. The rocktopus cannot use Tentacles on a different target until the grapple ends.',
            ],
            effects: [
              {
                key: 'tentacle-grapple',
                name: 'Grappled and restrained',
                lands: { on: 'hit' },
                conditions: [rules.grappled, rules.restrained],
                lasts: { kind: 'until', text: ['the grapple ends'] },
              },
            ],
          },
          {
            key: 'ink-cloud',
            name: 'Ink Cloud',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Underwater only. Ink heavily obscures the 20-ft. radius around the rocktopus for 1 minute. A significant current can disperse it sooner. After releasing the ink, it can Dash as a bonus action. Recharge after a short or long rest.',
            ],
          },
        ],
      },
    },
  },
})
