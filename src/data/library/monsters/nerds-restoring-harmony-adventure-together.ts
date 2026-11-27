import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.nerds_restoring_harmony_adventure_together,
  monsters: {
    emo: {
      name: 'Emo',
      alignment: 'lawful evil',
      languages: ['Deep Speech', 'Undercommon'],
      habitats: ['underdark'],
      stats: {
        size: 'large',
        type: 'aberration',
        cr: '13',
        ac: 18,
        armor: 'natural armor',
        hitDice: '19d10',
        speed: { walk: 0, fly: 20 },
        scores: { str: 10, dex: 14, con: 18, int: 17, wis: 15, cha: 17 },
        saves: { int: 'proficient', wis: 'proficient', cha: 'proficient' },
        skills: { perception: 'expert' },
        senses: { darkvision: 120 },
        conditionImmunities: [rules.prone],
        abilities: [
          {
            key: 'antimagic-cone',
            name: 'Antimagic Cone',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              "Emo's central eye creates an area of antimagic, as in the antimagic field spell, in a 150-foot cone. At the start of each of its turns, Emo decides which way the cone faces and whether the cone is active. The area works against Emo's own eye rays.",
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
              damage: [{ dice: '4d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'eye-rays',
            name: 'Eye Rays',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Emo shoots three of the following magical eye rays at random (reroll duplicates), choosing one to three targets it can see within 120 feet of it: 1.',
            ],
          },
          {
            key: 'happiness-ray',
            name: 'Happiness Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'wis', printed: 14 },
              ' Wisdom saving throw or fall ',
              { effect: 'happiness-laughing' },
              '. 2.',
            ],
            effects: [
              {
                key: 'happiness-laughing',
                name: 'Helpless with laughter',
                lands: { on: 'save', save: 'wis', dc: 'wis', printed: 14 },
                conditions: [rules.prone, rules.incapacitated],
                text: ['with laughter, becoming ', rules.incapacitated, ' and unable to stand up'],
                lasts: { kind: 'until', text: ['1 minute or until Emo harms the creature'] },
                ends: { repeatSave: ['end-of-turn'] },
              },
            ],
          },
          {
            key: 'sadness-ray',
            name: 'Sadness Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'dex', save: 'int' },
              ' Intelligence saving throw. On a failed save, the target is overcome by sorrow and takes 3d6 psychic damage, and ',
              { effect: 'sadness-sorrow' },
              '. On a successful save, the target takes half as much damage and suffers none of the other effects. 3.',
            ],
            effects: [
              {
                key: 'sadness-sorrow',
                name: 'Overcome by sorrow',
                lands: { on: 'save', save: 'int', dc: 'dex' },
                text: [
                  "it can't take a reaction until the end of its next turn. On its next turn, it can use either an action or a bonus action, not both.",
                ],
                lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
              },
            ],
          },
          {
            key: 'anger-ray',
            name: 'Anger Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'wis', printed: 14 },
              ' Wisdom saving throw or be compelled to duel with Emo for 1 minute. ',
              { effect: 'anger-duel' },
              ' 4.',
            ],
            effects: [
              {
                key: 'anger-duel',
                name: 'Compelled to duel',
                lands: { on: 'save', save: 'wis', dc: 'wis', printed: 14 },
                text: [
                  'The target has disadvantage on attack rolls against creatures other than Emo and must make a Wisdom saving throw each time it attempts to move more than 30 feet away from Emo.',
                ],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
              },
            ],
          },
          {
            key: 'anxiety-ray',
            name: 'Anxiety Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'dex', save: 'int' },
              ' Intelligence saving throw or lose the ability to distinguish friend from foe, regarding all creatures it can see as enemies for 1 minute. ',
              { effect: 'anxiety-foes' },
              ' 5.',
            ],
            effects: [
              {
                key: 'anxiety-foes',
                name: 'Anxiety',
                lands: { on: 'save', save: 'int', dc: 'dex' },
                text: [
                  "Whenever the affected creature targets another creature with an attack, spell, or other ability, it must choose the target at random from among the creatures it can see within range of the attack, spell, or other ability it's using. If an enemy provokes an opportunity attack from the affected creature, the creature must make that attack if it is able to.",
                ],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
                ends: { repeatSave: ['damaged'] },
              },
            ],
          },
          {
            key: 'fear-ray',
            name: 'Fear Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'wis', printed: 14 },
              ' Wisdom saving throw or be ',
              { effect: 'fear-frightened' },
              '. 6.',
            ],
            effects: [
              {
                key: 'fear-frightened',
                name: 'Frightened by fear ray',
                lands: { on: 'save', save: 'wis', dc: 'wis', printed: 14 },
                conditions: [rules.frightened],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
                ends: { repeatSave: ['end-of-turn'] },
              },
            ],
          },
          {
            key: 'desolation-ray',
            name: 'Desolation Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'int', printed: 14 },
              ' Intelligence saving throw. On a successful save, the target takes 5d10 psychic damage, and the spell ends. On a failed save, the target takes 5d10 psychic damage and perceives itself to be confined within an illusory stone cell ',
              { effect: 'desolation-restrained' },
              '. 7.',
            ],
            effects: [
              {
                key: 'desolation-restrained',
                name: 'Confined in an illusory cell',
                lands: { on: 'save', save: 'int', dc: 'int', printed: 14 },
                conditions: [rules.restrained],
                text: [
                  "The target can't see or hear anything beyond the cell and is ",
                  rules.restrained,
                  '.',
                ],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
              },
            ],
          },
          {
            key: 'jealousy-ray',
            name: 'Jealousy Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'wis', printed: 14 },
              ' Wisdom saving throw or become ',
              { effect: 'jealousy-charmed' },
              '. 8.',
            ],
            effects: [
              {
                key: 'jealousy-charmed',
                name: 'Charmed by jealousy ray',
                lands: { on: 'save', save: 'wis', dc: 'wis', printed: 14 },
                conditions: [rules.charmed],
                text: [
                  'While the target is ',
                  rules.charmed,
                  ' in this way, it must use its action before moving on each of its turns to make a melee attack against a creature that Emo chooses.',
                ],
                lasts: { kind: 'time', amount: '1', unit: 'minute' },
                ends: { repeatSave: ['end-of-turn'] },
              },
            ],
          },
          {
            key: 'disgusting-ray',
            name: 'Disgusting Ray',
            timing: 'action',
            icon: 'gi/GiPoisonBottle',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'dex', save: 'con' },
              ' Constitution saving throw against poison. On a failed save, the target is enveloped in sphere of yellow, nauseating gas and spends its action on its next turn retching and reeling. 9.',
            ],
            effects: [],
          },
          {
            key: 'surprise-ray',
            name: 'Surprise Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'dex' },
              ' Dexterity saving throw or be ',
              { effect: 'surprise-blinded' },
              '. 10.',
            ],
            effects: [
              {
                key: 'surprise-blinded',
                name: 'Blinded by spray of color',
                lands: { on: 'save', save: 'dex', dc: 'dex' },
                conditions: [rules.blinded],
                text: ['by a spray of color'],
                lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
              },
            ],
          },
          {
            key: 'trust-ray',
            name: 'Trust Ray',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The targeted creature must succeed on a ',
              { dc: 'int', save: 'wis' },
              ' Wisdom saving throw or be ',
              { effect: 'trust-charmed' },
              ' by Emo.',
            ],
            effects: [
              {
                key: 'trust-charmed',
                name: 'Charmed by trust ray',
                lands: { on: 'save', save: 'wis', dc: 'int' },
                conditions: [rules.charmed],
                lasts: { kind: 'until', text: ['1 hour or until Emo harms the creature'] },
              },
            ],
          },
        ],
        legendary: {
          uses: 3,
          actions: [
            {
              key: 'eye-ray',
              name: 'Eye Ray',
              icon: 'gi/GiMagicSwirl',
              text: ['Emo uses one random eye ray.'],
            },
          ],
        },
      },
    },
    mr_greystone: {
      name: 'Mr. Greystone',
      tags: ['human'],
      alignment: 'lawful evil',
      languages: ['Common', 'Goblin'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '5',
        ac: 15,
        armor: 'studded leather',
        hitDice: '15d8',
        speed: { walk: 30 },
        scores: { str: 18, dex: 15, con: 16, int: 10, wis: 12, cha: 15 },
        saves: { str: 'proficient', dex: 'proficient', con: 'proficient' },
        skills: { athletics: 'expert', intimidation: 'proficient' },
        abilities: [
          {
            key: 'brave',
            name: 'Brave',
            timing: 'trait',
            icon: 'gi/GiPaw',
          },
          {
            key: 'mr',
            name: 'Mr',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Greystone has advantage on saving throws against being ',
              rules.frightened,
              '.',
            ],
            effects: [],
          },
          {
            key: 'brute',
            name: 'Brute',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'A melee weapon deals one extra die of its damage when Mr. Greystone hits with it (included in the attack).',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
          },
          {
            key: 'mr-2',
            name: 'Mr',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: ['Greystone makes two melee attacks or two ranged attacks.'],
          },
          {
            key: 'club',
            name: 'Club',
            timing: 'action',
            icon: 'gi/GiSpikedBat',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'hand-crossbow',
            name: 'Hand Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
