import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_06_the_ghost,
  monsters: {
    cooshee_mastiff: {
      name: 'Cooshee (Mastiff)',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Greenhall'],
      appearance: [
        [
          'A broad-chested elven hound with a moss-green coat mottled with irregular dark brown patches and a strong muzzle.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/8',
        ac: 12,
        hitDice: '1d8',
        speed: { walk: 40 },
        scores: { str: 13, dex: 14, con: 12, int: 3, wis: 12, cha: 7 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The mastiff has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
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
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
            text: [
              'If the target is a creature, it must succeed on a ',
              { dc: 'str' },
              ' Strength saving throw or be ',
              { effect: 'knocked-prone' },
              '.',
            ],
            effects: [
              {
                key: 'knocked-prone',
                name: 'Knocked prone',
                lands: { on: 'save', save: 'str', dc: 'str' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
    giant_wolf_spider: {
      name: 'Giant Wolf Spider',
      page: 26,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Ettercap nest'],
      appearance: [
        ['A low, hairy spider with stout banded legs and a dark-striped brown abdomen.'],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        hitDice: '2d8',
        speed: { walk: 40, climb: 40 },
        scores: { str: 12, dex: 16, con: 13, int: 3, wis: 12, cha: 4 },
        skills: { perception: 'proficient', stealth: 'expert' },
        senses: { darkvision: 60, blindsight: 10 },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'lucide/MoveUp',
            text: [
              'It can climb difficult surfaces, including ceilings while upside down, without an ability check.',
            ],
          },
          {
            key: 'web-sense',
            name: 'Web Sense',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: [
              'When touching a web, the spider knows the exact position of any other creature touching that web.',
            ],
          },
          {
            key: 'web-walker',
            name: 'Web Walker',
            timing: 'trait',
            icon: 'gi/GiSpiderWeb',
            text: ['Webbing does not restrict its movement.'],
          },
          {
            key: 'bites',
            name: 'Bites',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 5, which: 'it hits' },
              onFail: {
                damage: [{ dice: '2d6', type: rules.poison }],
              },
              onSuccess: 'half',
            },
            text: [
              'If the poison drops the target to 0 hit points, it is stable and ',
              rules.poisoned,
              ' for 1 hour even if it regains hit points. It is ',
              rules.paralyzed,
              ' while ',
              rules.poisoned,
              ' this way.',
            ],
          },
        ],
      },
    },
    strahd_zombie: {
      name: 'Strahd Zombie',
      alignment: 'unaligned',
      languages: ['understands Common but can’t speak'],
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '1',
        ac: 8,
        hitDice: '4d8',
        speed: { walk: 20 },
        scores: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 },
        saves: { wis: 'proficient' },
        senses: { darkvision: 60 },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'loathsome-limbs',
            name: 'Loathsome Limbs',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Whenever the zombie takes at least 5 bludgeoning or slashing damage at one time, roll a d20 to determine what else happens to it: 1-8: One leg is severed from the zombie if it has any legs left. 9-16: One arm is severed from the zombie if it has any arms left. 17-20: The zombie is decapitated. If the zombie is reduced to 0 hit points, all parts of it die. Until then, a severed part acts on the zombie’s initiative and has its own action and movement. A severed part has AC 8. Any damage it takes is subtracted from the zombie’s hit points. DDAL04-06 The Ghost Peter Fitzpatrick (order #9139669) A severed leg is unable to attack and has a speed of 5 feet. A severed arm has a speed of 5 feet and can make one claw attack on its turn, with disadvantage on the attack roll. Each time the zombie loses an arm, it loses a claw attack. If the head is severed, the zombie loses its bite attack and its body is ',
              rules.blinded,
              ' unless the head can see it. The severed head has a speed of 0 feet. It can make a bite attack, but only against a target in its space. The zombie’s speed is halved if its missing a leg. If it loses both legs, it falls ',
              rules.prone,
              '. If it has both arms, it can crawl. With only one arm, it can still crawl, but its speed is halved. With no arms or legs, its speed is 0 feet, and can’t benefit from bonuses to speed.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The zombie makes three attacks: one with its bite and two with its claws.'],
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
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
