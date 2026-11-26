import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.infernal_machine_rebuild,
  monsters: {
    two_headed_crocodile: {
      name: 'Two-Headed Crocodile',
      page: 89,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Swamp', 'Temple guardroom'],
      appearance: [['A low, armored crocodile with two independent heads and one long tail.']],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 12,
        armor: 'natural armor',
        hitDice: '3d10',
        speed: { walk: 20, swim: 30 },
        scores: { str: 15, dex: 10, con: 13, int: 2, wis: 10, cha: 5 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'hold-breath',
            name: 'Hold Breath',
            timing: 'trait',
            icon: 'gi/GiDragonBreath',
            text: ['The crocodile holds its breath for up to 15 minutes.'],
          },
          {
            key: 'two-heads',
            name: 'Two Heads',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'It has advantage on Wisdom (Perception) checks and on saves against being ',
              rules.blinded,
              ', ',
              rules.charmed,
              ', ',
              rules.deafened,
              ', ',
              rules.frightened,
              ', ',
              rules.stunned,
              ', or knocked ',
              rules.unconscious,
              '.',
            ],
          },
          {
            key: 'wakeful',
            name: 'Wakeful',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['If one head falls asleep, the other stays awake.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Make two ', { ability: 'bite' }, ' attacks.'],
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
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
            },
            text: [
              'Grapples the creature, escape DC 12. The captive is ',
              rules.restrained,
              ' while ',
              rules.grappled,
              '. The head holding it cannot bite another target until the grapple ends.',
            ],
          },
        ],
      },
    },
  },
})
