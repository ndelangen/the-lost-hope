import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.player_s_handbook_2024,
  monsters: {
    aberrant_spirit: {
      name: 'Aberrant Spirit',
      page: 322,
      alignment: 'neutral',
      languages: ['Deep Speech', 'understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Aberration', min: 4, max: 9 },
        options: [
          {
            key: 'beholderkin',
            name: 'Beholderkin',
            form: true,
            speed: { fly: 30 },
            abilities: [
              {
                key: 'eye-ray',
                name: 'Eye Ray',
                timing: 'action',
                icon: 'gi/GiEyeTarget',
                intent: 'damage',
                attack: {
                  kind: 'ranged',
                  ability: 'int',
                  range: [150, 150],
                  damage: [{ dice: '1d8', type: rules.psychic, addModifier: true }],
                },
                text: [],
              },
            ],
          },
          {
            key: 'mind-flayer',
            name: 'Mind Flayer',
            form: true,
            abilities: [
              {
                key: 'whispering-aura',
                name: 'Whispering Aura',
                timing: 'trait',
                icon: 'gi/GiPsychicWaves',
                intent: 'damage',
                save: {
                  ability: 'wis',
                  dc: 'int',
                  target: { area: { shape: rules.emanation, size: 5 } },
                  onFail: { damage: [{ dice: '2d6', type: rules.psychic }] },
                },
                text: [
                  "At the start of each of the spirit's turns, the spirit emits psionic energy if it doesn't have the ",
                  rules.incapacitated,
                  ' condition. Each creature other than you within 5 feet of the spirit saves.',
                ],
              },
              {
                key: 'psychic-slam',
                name: 'Psychic Slam',
                timing: 'action',
                icon: 'gi/GiPsychicWaves',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'int',
                  reach: 5,
                  damage: [{ dice: '1d8', type: rules.psychic, addModifier: true }],
                },
                text: [],
              },
            ],
          },
          {
            key: 'slaad',
            name: 'Slaad',
            form: true,
            abilities: [
              {
                key: 'regeneration',
                name: 'Regeneration',
                timing: 'trait',
                icon: 'gi/GiHealthIncrease',
                text: [
                  'The spirit regains 5 Hit Points at the start of its turn if it has at least 1 Hit Point.',
                ],
              },
              {
                key: 'claw',
                name: 'Claw',
                timing: 'action',
                icon: 'gi/GiClaws',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'int',
                  reach: 5,
                  damage: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
                },
                text: [
                  "The target can't regain Hit Points until the start of the spirit's next turn.",
                ],
              },
            ],
          },
        ],
        size: 'medium',
        type: 'aberration',
        cr: '0',
        ac: 11,
        hitDice: '1d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 10, con: 15, int: 16, wis: 10, cha: 6 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.psychic],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of attacks equal to half this spell's level (round down).",
            ],
          },
        ],
      },
    },
    animated_object: {
      name: 'Animated Object',
      page: 240,
      alignment: 'unaligned',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Animate Objects', min: 5, max: 9 },
        options: [
          {
            key: 'medium-or-smaller',
            name: 'Medium or Smaller',
            form: true,
            abilities: [
              {
                key: 'slam',
                name: 'Slam',
                timing: 'action',
                icon: 'gi/GiPunch',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [{ dice: '1d4', type: rules.force, addModifier: true }],
                },
                text: [
                  'Force damage equal to (the spell level - 4)d4 + 3 + your spellcasting ability modifier.',
                ],
              },
            ],
          },
          {
            key: 'large',
            name: 'Large',
            form: true,
            size: 'large',
            abilities: [
              {
                key: 'slam-large',
                name: 'Slam',
                timing: 'action',
                icon: 'gi/GiPunch',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [{ dice: '2d6', type: rules.force, addModifier: true }],
                },
                text: [
                  'Force damage equal to (the spell level - 3)d6 + 3 + your spellcasting ability modifier.',
                ],
              },
            ],
          },
          {
            key: 'huge',
            name: 'Huge',
            form: true,
            size: 'huge',
            abilities: [
              {
                key: 'slam-huge',
                name: 'Slam',
                timing: 'action',
                icon: 'gi/GiPunch',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [{ dice: '2d12', type: rules.force, addModifier: true }],
                },
                text: [
                  'Force damage equal to (the spell level - 3)d12 + 3 + your spellcasting ability modifier.',
                ],
              },
            ],
          },
        ],
        size: 'medium',
        type: 'construct',
        cr: '0',
        ac: 15,
        hitDice: '1d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 10, con: 10, int: 3, wis: 3, cha: 1 },
        senses: { blindsight: 30 },
        abilities: [],
      },
    },
    beast_of_the_land: {
      name: 'Beast of the Land',
      page: 123,
      alignment: 'neutral',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'class', of: 'Ranger', min: 3, max: 20 },
        size: 'medium',
        type: 'beast',
        cr: '0',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d8',
        speed: { walk: 40, climb: 40 },
        scores: { str: 14, dex: 14, con: 15, int: 8, wis: 14, cha: 11 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'primal-bond',
            name: 'Primal Bond',
            timing: 'trait',
            icon: 'gi/GiHandOfGod',
            text: [
              'Add your Proficiency Bonus to any ability check or saving throw the beast makes.',
            ],
          },
          {
            key: 'beasts-strike',
            name: "Beast's Strike",
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
            text: [
              'Bludgeoning, Piercing, or Slashing damage (your choice when you summon the beast). If the beast moved at least 20 feet straight toward the target before the hit, the target takes an extra ',
              { roll: '1d6' },
              ' damage of the same type, and the target has the ',
              rules.prone,
              ' condition if it is a Large or smaller creature.',
            ],
          },
        ],
      },
    },
    beast_of_the_sea: {
      name: 'Beast of the Sea',
      page: 124,
      alignment: 'neutral',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'class', of: 'Ranger', min: 3, max: 20 },
        size: 'medium',
        type: 'beast',
        cr: '0',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d8',
        speed: { walk: 5, swim: 60 },
        scores: { str: 14, dex: 14, con: 15, int: 8, wis: 14, cha: 11 },
        senses: { darkvision: 90 },
        abilities: [
          {
            key: 'amphibious',
            name: 'Amphibious',
            timing: 'trait',
            icon: 'gi/GiFangs',
            text: ['The beast can breathe air and water.'],
          },
          {
            key: 'primal-bond',
            name: 'Primal Bond',
            timing: 'trait',
            icon: 'gi/GiHandOfGod',
            text: [
              'Add your Proficiency Bonus to any ability check or saving throw the beast makes.',
            ],
          },
          {
            key: 'beasts-strike',
            name: "Beast's Strike",
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
              'Bludgeoning or Piercing damage (your choice when you summon the beast), and the target has the ',
              rules.grappled,
              ' condition (escape DC equals your spell save DC).',
            ],
          },
        ],
      },
    },
    beast_of_the_sky: {
      name: 'Beast of the Sky',
      page: 124,
      alignment: 'neutral',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'class', of: 'Ranger', min: 3, max: 20 },
        size: 'small',
        type: 'beast',
        cr: '0',
        ac: 13,
        armor: 'natural armor',
        hitDice: '3d6',
        speed: { walk: 10, fly: 60 },
        scores: { str: 6, dex: 16, con: 13, int: 8, wis: 14, cha: 11 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'flyby',
            name: 'Flyby',
            timing: 'trait',
            icon: 'gi/GiAngelWings',
            text: [
              "The beast doesn't provoke Opportunity Attacks when it flies out of an enemy's reach.",
            ],
          },
          {
            key: 'primal-bond',
            name: 'Primal Bond',
            timing: 'trait',
            icon: 'gi/GiHandOfGod',
            text: [
              'Add your Proficiency Bonus to any ability check or saving throw the beast makes.',
            ],
          },
          {
            key: 'beasts-strike',
            name: "Beast's Strike",
            timing: 'action',
            icon: 'gi/GiBirdClaw',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.slashing, addModifier: true }],
            },
            text: [],
          },
        ],
      },
    },
    bestial_spirit: {
      name: 'Bestial Spirit',
      page: 323,
      alignment: 'neutral',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Beast', min: 2, max: 9 },
        options: [
          {
            key: 'air',
            name: 'Air',
            form: true,
            speed: { fly: 60 },
            abilities: [
              {
                key: 'flyby',
                name: 'Flyby',
                timing: 'trait',
                icon: 'gi/GiFeather',
                text: [
                  "The spirit doesn't provoke ",
                  rules.opportunity_attack,
                  " when it flies out of an enemy's reach.",
                ],
              },
            ],
          },
          {
            key: 'land',
            name: 'Land',
            form: true,
            speed: { climb: 30 },
            abilities: [
              {
                key: 'pack-tactics',
                name: 'Pack Tactics',
                timing: 'trait',
                icon: 'gi/GiPaw',
                text: [
                  'The spirit has ',
                  rules.advantage,
                  " on an attack roll against a creature if at least one of the spirit's allies is within 5 feet of the creature and the ally doesn't have the ",
                  rules.incapacitated,
                  ' condition.',
                ],
              },
            ],
          },
          {
            key: 'water',
            name: 'Water',
            form: true,
            speed: { swim: 30 },
            abilities: [
              {
                key: 'pack-tactics',
                name: 'Pack Tactics',
                timing: 'trait',
                icon: 'gi/GiPaw',
                text: [
                  'The spirit has ',
                  rules.advantage,
                  " on an attack roll against a creature if at least one of the spirit's allies is within 5 feet of the creature and the ally doesn't have the ",
                  rules.incapacitated,
                  ' condition.',
                ],
              },
              {
                key: 'water-breathing',
                name: 'Water Breathing',
                timing: 'trait',
                icon: 'gi/GiWaterSplash',
                text: ['The spirit can breathe only underwater.'],
              },
            ],
          },
        ],
        size: 'small',
        type: 'beast',
        cr: '0',
        ac: 11,
        hitDice: '1d6',
        speed: { walk: 30 },
        scores: { str: 18, dex: 11, con: 16, int: 4, wis: 14, cha: 5 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              'The spirit makes a number of ',
              { ability: 'rend' },
              " attacks equal to half this spell's level (round down).",
            ],
          },
          {
            key: 'rend',
            name: 'Rend',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
            text: [],
          },
        ],
      },
    },
    celestial_spirit: {
      name: 'Celestial Spirit',
      page: 323,
      alignment: 'neutral',
      languages: ['Celestial', 'understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Celestial', min: 5, max: 9 },
        options: [
          {
            key: 'avenger',
            name: 'Avenger',
            form: true,
            abilities: [
              {
                key: 'radiant-bow',
                name: 'Radiant Bow',
                timing: 'action',
                icon: 'gi/GiCrossbow',
                intent: 'damage',
                attack: {
                  kind: 'ranged',
                  ability: 'dex',
                  range: [600, 600],
                  damage: [{ dice: '2d6', type: rules.radiant, addModifier: true }],
                },
                text: [],
              },
            ],
          },
          {
            key: 'defender',
            name: 'Defender',
            form: true,
            abilities: [
              {
                key: 'radiant-mace',
                name: 'Radiant Mace',
                timing: 'action',
                icon: 'gi/GiFlangedMace',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [
                    { dice: '1d10', type: rules.radiant, addModifier: true },
                    { dice: '1', type: rules.radiant },
                  ],
                },
                text: [
                  'The spirit can choose itself or another creature it can see within 10 feet of the target. The chosen creature gains ',
                  { roll: '1d10' },
                  ' ',
                  rules.temporary_hit_points,
                  '.',
                ],
              },
            ],
          },
        ],
        size: 'large',
        type: 'celestial',
        cr: '0',
        ac: 11,
        hitDice: '1d10',
        speed: { walk: 30, fly: 40 },
        scores: { str: 16, dex: 14, con: 16, int: 10, wis: 14, cha: 16 },
        senses: { darkvision: 60 },
        damageResistances: [rules.radiant],
        conditionImmunities: [rules.charmed, rules.frightened],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of attacks equal to half this spell's level (round down).",
            ],
          },
          {
            key: 'healing-touch',
            name: 'Healing Touch',
            timing: 'action',
            icon: 'gi/GiHealthIncrease',
            intent: 'healing',
            uses: 1,
            recharge: 'Long rest',
            text: [
              'The spirit touches another creature. The target regains ',
              rules.hit_points,
              ' equal to ',
              { roll: '2d8' },
              " + the spell's level.",
            ],
          },
        ],
      },
    },
    construct_spirit: {
      name: 'Construct Spirit',
      page: 324,
      alignment: 'neutral',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Construct', min: 4, max: 9 },
        options: [
          {
            key: 'clay',
            name: 'Clay',
            form: true,
            abilities: [
              {
                key: 'berserk-lashing',
                name: 'Berserk Lashing',
                timing: 'reaction',
                icon: 'gi/GiFist',
                text: [
                  'Trigger: The spirit takes damage from a creature. Response: The spirit makes a ',
                  { ability: 'slam' },
                  ' attack against that creature if possible, or the spirit moves up to half its ',
                  rules.speed,
                  ' toward that creature without provoking ',
                  rules.opportunity_attack,
                  '.',
                ],
              },
            ],
          },
          {
            key: 'metal',
            name: 'Metal',
            form: true,
            abilities: [
              {
                key: 'heated-body',
                name: 'Heated Body',
                timing: 'trait',
                icon: 'gi/GiFlame',
                intent: 'damage',
                text: [
                  'A creature that hits the spirit with a melee attack or that starts its turn in a grapple with the spirit takes ',
                  { roll: '1d10' },
                  ' Fire damage.',
                ],
              },
            ],
          },
          {
            key: 'stone',
            name: 'Stone',
            form: true,
            abilities: [
              {
                key: 'stony-lethargy',
                name: 'Stony Lethargy',
                timing: 'trait',
                icon: 'gi/GiStomp',
                save: {
                  ability: 'wis',
                  dc: 'wis',
                  target: {
                    creatures: 1,
                    range: 10,
                    which:
                      'that starts its turn within 10 feet of the spirit and that the spirit can see',
                  },
                  onFail: {
                    also: [
                      "Until the start of its next turn, the target can't make ",
                      rules.opportunity_attack,
                      ', and its ',
                      rules.speed,
                      ' is halved.',
                    ],
                  },
                },
                text: [
                  'When a creature starts its turn within 10 feet of the spirit, the spirit can target it with magical energy if the spirit can see it.',
                ],
              },
            ],
          },
        ],
        size: 'medium',
        type: 'construct',
        cr: '0',
        ac: 13,
        hitDice: '1d8',
        speed: { walk: 30 },
        scores: { str: 18, dex: 10, con: 18, int: 14, wis: 11, cha: 5 },
        senses: { darkvision: 60 },
        damageResistances: [rules.poison],
        conditionImmunities: [
          rules.charmed,
          rules.exhaustion,
          rules.frightened,
          rules.paralyzed,
          rules.poisoned,
        ],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              'The spirit makes a number of ',
              { ability: 'slam' },
              " attacks equal to half this spell's level (round down).",
            ],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.bludgeoning, addModifier: true }],
            },
            text: [],
          },
        ],
      },
    },
    draconic_spirit: {
      name: 'Draconic Spirit',
      page: 325,
      alignment: 'neutral',
      languages: ['Draconic', 'understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Dragon', min: 5, max: 9 },
        options: [
          {
            key: 'acid',
            name: 'Acid',
            form: true,
            replaces: ['shared-resistances', 'breath-weapon'],
            abilities: [
              {
                key: 'shared-resistances',
                name: 'Shared Resistances',
                timing: 'trait',
                icon: 'gi/GiShield',
                text: [
                  'You have ',
                  rules.resistance,
                  ' to ',
                  rules.acid,
                  ' damage until the spell ends.',
                ],
              },
              {
                key: 'breath-weapon',
                name: 'Breath Weapon',
                timing: 'action',
                icon: 'gi/GiDragonBreath',
                intent: 'damage',
                save: {
                  ability: 'dex',
                  dc: 'con',
                  target: {
                    area: {
                      shape: rules.cone,
                      size: 30,
                    },
                  },
                  onFail: {
                    damage: [
                      {
                        dice: '2d6',
                        type: rules.acid,
                      },
                    ],
                  },
                  onSuccess: 'half',
                },
                text: [],
              },
            ],
          },
          {
            key: 'cold',
            name: 'Cold',
            form: true,
            replaces: ['shared-resistances', 'breath-weapon'],
            abilities: [
              {
                key: 'shared-resistances',
                name: 'Shared Resistances',
                timing: 'trait',
                icon: 'gi/GiShield',
                text: [
                  'You have ',
                  rules.resistance,
                  ' to ',
                  rules.cold,
                  ' damage until the spell ends.',
                ],
              },
              {
                key: 'breath-weapon',
                name: 'Breath Weapon',
                timing: 'action',
                icon: 'gi/GiDragonBreath',
                intent: 'damage',
                save: {
                  ability: 'dex',
                  dc: 'con',
                  target: {
                    area: {
                      shape: rules.cone,
                      size: 30,
                    },
                  },
                  onFail: {
                    damage: [
                      {
                        dice: '2d6',
                        type: rules.cold,
                      },
                    ],
                  },
                  onSuccess: 'half',
                },
                text: [],
              },
            ],
          },
          {
            key: 'fire',
            name: 'Fire',
            form: true,
            replaces: ['shared-resistances', 'breath-weapon'],
            abilities: [
              {
                key: 'shared-resistances',
                name: 'Shared Resistances',
                timing: 'trait',
                icon: 'gi/GiShield',
                text: [
                  'You have ',
                  rules.resistance,
                  ' to ',
                  rules.fire,
                  ' damage until the spell ends.',
                ],
              },
              {
                key: 'breath-weapon',
                name: 'Breath Weapon',
                timing: 'action',
                icon: 'gi/GiDragonBreath',
                intent: 'damage',
                save: {
                  ability: 'dex',
                  dc: 'con',
                  target: {
                    area: {
                      shape: rules.cone,
                      size: 30,
                    },
                  },
                  onFail: {
                    damage: [
                      {
                        dice: '2d6',
                        type: rules.fire,
                      },
                    ],
                  },
                  onSuccess: 'half',
                },
                text: [],
              },
            ],
          },
          {
            key: 'lightning',
            name: 'Lightning',
            form: true,
            replaces: ['shared-resistances', 'breath-weapon'],
            abilities: [
              {
                key: 'shared-resistances',
                name: 'Shared Resistances',
                timing: 'trait',
                icon: 'gi/GiShield',
                text: [
                  'You have ',
                  rules.resistance,
                  ' to ',
                  rules.lightning,
                  ' damage until the spell ends.',
                ],
              },
              {
                key: 'breath-weapon',
                name: 'Breath Weapon',
                timing: 'action',
                icon: 'gi/GiDragonBreath',
                intent: 'damage',
                save: {
                  ability: 'dex',
                  dc: 'con',
                  target: {
                    area: {
                      shape: rules.cone,
                      size: 30,
                    },
                  },
                  onFail: {
                    damage: [
                      {
                        dice: '2d6',
                        type: rules.lightning,
                      },
                    ],
                  },
                  onSuccess: 'half',
                },
                text: [],
              },
            ],
          },
          {
            key: 'poison',
            name: 'Poison',
            form: true,
            replaces: ['shared-resistances', 'breath-weapon'],
            abilities: [
              {
                key: 'shared-resistances',
                name: 'Shared Resistances',
                timing: 'trait',
                icon: 'gi/GiShield',
                text: [
                  'You have ',
                  rules.resistance,
                  ' to ',
                  rules.poison,
                  ' damage until the spell ends.',
                ],
              },
              {
                key: 'breath-weapon',
                name: 'Breath Weapon',
                timing: 'action',
                icon: 'gi/GiDragonBreath',
                intent: 'damage',
                save: {
                  ability: 'dex',
                  dc: 'con',
                  target: {
                    area: {
                      shape: rules.cone,
                      size: 30,
                    },
                  },
                  onFail: {
                    damage: [
                      {
                        dice: '2d6',
                        type: rules.poison,
                      },
                    ],
                  },
                  onSuccess: 'half',
                },
                text: [],
              },
            ],
          },
        ],
        size: 'large',
        type: 'dragon',
        cr: '0',
        ac: 14,
        hitDice: '1d10',
        speed: {
          walk: 30,
          fly: 60,
          swim: 30,
        },
        scores: {
          str: 19,
          dex: 14,
          con: 17,
          int: 10,
          wis: 14,
          cha: 14,
        },
        senses: {
          blindsight: 30,
          darkvision: 60,
        },
        damageResistances: [rules.acid, rules.cold, rules.fire, rules.lightning, rules.poison],
        conditionImmunities: [rules.charmed, rules.frightened, rules.poisoned],
        abilities: [
          {
            key: 'shared-resistances',
            name: 'Shared Resistances',
            timing: 'trait',
            icon: 'gi/GiShield',
            text: [
              'When you summon the spirit, choose one of its Resistances. You have ',
              rules.resistance,
              ' to the chosen damage type until the spell ends.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of Rend attacks equal to half the spell's level (round down), and it uses Breath Weapon.",
            ],
          },
          {
            key: 'rend',
            name: 'Rend',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [
                {
                  dice: '1d6',
                  type: rules.piercing,
                  addModifier: true,
                },
              ],
            },
            text: [],
          },
          {
            key: 'breath-weapon',
            name: 'Breath Weapon',
            timing: 'action',
            icon: 'gi/GiDragonBreath',
            intent: 'damage',
            save: {
              ability: 'dex',
              dc: 'con',
              target: {
                area: {
                  shape: rules.cone,
                  size: 30,
                },
              },
              onFail: {
                damage: [
                  {
                    dice: '2d6',
                  },
                ],
                also: [
                  'The damage is of a type this spirit has ',
                  rules.resistance,
                  ' to (your choice when you cast the spell).',
                ],
              },
              onSuccess: 'half',
            },
            text: [],
          },
        ],
      },
    },
    elemental_spirit: {
      name: 'Elemental Spirit',
      page: 325,
      alignment: 'neutral',
      languages: ['Primordial', 'understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Elemental', min: 4, max: 9 },
        options: [
          {
            key: 'air',
            name: 'Air',
            form: true,
            damageResistances: [rules.lightning, rules.thunder],
            speed: {
              fly: 40,
            },
            abilities: [
              {
                key: 'amorphous-form',
                name: 'Amorphous Form',
                timing: 'trait',
                icon: 'gi/GiSlime',
                text: [
                  'The spirit can move through a space as narrow as 1 inch wide without it counting as Difficult Terrain.',
                ],
              },
              {
                key: 'hover',
                name: 'Hover',
                timing: 'trait',
                icon: 'gi/GiFeather',
                text: ['Air only: Fly 40 ft. (hover).'],
              },
              {
                key: 'slam',
                name: 'Slam',
                timing: 'action',
                icon: 'gi/GiPunch',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [
                    {
                      dice: '1d10',
                      type: rules.lightning,
                      addModifier: true,
                    },
                  ],
                },
                text: [],
              },
            ],
          },
          {
            key: 'earth',
            name: 'Earth',
            form: true,
            damageResistances: [rules.piercing, rules.slashing],
            speed: {
              burrow: 40,
            },
            abilities: [
              {
                key: 'slam',
                name: 'Slam',
                timing: 'action',
                icon: 'gi/GiPunch',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [
                    {
                      dice: '1d10',
                      type: rules.bludgeoning,
                      addModifier: true,
                    },
                  ],
                },
                text: [],
              },
            ],
          },
          {
            key: 'fire',
            name: 'Fire',
            form: true,
            damageImmunities: [rules.fire],
            abilities: [
              {
                key: 'amorphous-form',
                name: 'Amorphous Form',
                timing: 'trait',
                icon: 'gi/GiSlime',
                text: [
                  'The spirit can move through a space as narrow as 1 inch wide without it counting as Difficult Terrain.',
                ],
              },
              {
                key: 'slam',
                name: 'Slam',
                timing: 'action',
                icon: 'gi/GiPunch',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [
                    {
                      dice: '1d10',
                      type: rules.fire,
                      addModifier: true,
                    },
                  ],
                },
                text: [],
              },
            ],
          },
          {
            key: 'water',
            name: 'Water',
            form: true,
            damageResistances: [rules.acid],
            speed: {
              swim: 40,
            },
            abilities: [
              {
                key: 'amorphous-form',
                name: 'Amorphous Form',
                timing: 'trait',
                icon: 'gi/GiSlime',
                text: [
                  'The spirit can move through a space as narrow as 1 inch wide without it counting as Difficult Terrain.',
                ],
              },
              {
                key: 'slam',
                name: 'Slam',
                timing: 'action',
                icon: 'gi/GiPunch',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [
                    {
                      dice: '1d10',
                      type: rules.cold,
                      addModifier: true,
                    },
                  ],
                },
                text: [],
              },
            ],
          },
        ],
        size: 'medium',
        type: 'elemental',
        cr: '0',
        ac: 11,
        hitDice: '1d8',
        speed: {
          walk: 40,
        },
        scores: {
          str: 18,
          dex: 15,
          con: 17,
          int: 4,
          wis: 10,
          cha: 16,
        },
        senses: {
          darkvision: 60,
        },
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.exhaustion, rules.paralyzed, rules.petrified, rules.poisoned],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of Slam attacks equal to half this spell's level (round down).",
            ],
          },
        ],
      },
    },
    fey_spirit: {
      name: 'Fey Spirit',
      page: 326,
      alignment: 'neutral',
      languages: ['Sylvan', 'understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Fey', min: 3, max: 9 },
        options: [
          {
            key: 'fuming',
            name: 'Fuming',
            form: true,
            replaces: ['fey-step'],
            abilities: [
              {
                key: 'fey-step',
                name: 'Fey Step',
                timing: 'bonus action',
                icon: 'gi/GiMagicPortal',
                text: [
                  'The spirit magically teleports up to 30 feet to an unoccupied space it can see. The spirit has Advantage on the next attack roll it makes before the end of this turn.',
                ],
              },
            ],
          },
          {
            key: 'mirthful',
            name: 'Mirthful',
            form: true,
            replaces: ['fey-step'],
            abilities: [
              {
                key: 'fey-step',
                name: 'Fey Step',
                timing: 'bonus action',
                icon: 'gi/GiMagicPortal',
                save: {
                  ability: 'wis',
                  dc: 'cha',
                  target: {
                    creatures: 1,
                    range: 10,
                    which: 'the spirit can see',
                  },
                  onFail: {
                    also: [
                      'The target is ',
                      rules.charmed,
                      ' by you and the spirit for 1 minute or until the target takes any damage.',
                    ],
                  },
                },
                text: [
                  'The spirit magically teleports up to 30 feet to an unoccupied space it can see.',
                ],
              },
            ],
          },
          {
            key: 'tricksy',
            name: 'Tricksy',
            form: true,
            replaces: ['fey-step'],
            abilities: [
              {
                key: 'fey-step',
                name: 'Fey Step',
                timing: 'bonus action',
                icon: 'gi/GiMagicPortal',
                text: [
                  'The spirit magically teleports up to 30 feet to an unoccupied space it can see. The spirit fills a 10-foot ',
                  rules.cube,
                  ' within 5 feet of it with magical Darkness, which lasts until the end of its next turn.',
                ],
              },
            ],
          },
        ],
        size: 'small',
        type: 'fey',
        cr: '0',
        ac: 12,
        hitDice: '1d6',
        speed: {
          walk: 30,
          fly: 30,
        },
        scores: {
          str: 13,
          dex: 16,
          con: 14,
          int: 14,
          wis: 11,
          cha: 16,
        },
        senses: {
          darkvision: 60,
        },
        conditionImmunities: [rules.charmed],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of Fey Blade attacks equal to half this spell's level (round down).",
            ],
          },
          {
            key: 'fey-blade',
            name: 'Fey Blade',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [
                {
                  dice: '2d6',
                  type: rules.force,
                  addModifier: true,
                },
              ],
            },
            text: [],
          },
          {
            key: 'fey-step',
            name: 'Fey Step',
            timing: 'bonus action',
            icon: 'gi/GiMagicPortal',
            text: [
              "The spirit magically teleports up to 30 feet to an unoccupied space it can see. Then one of the following effects occurs, based on the spirit's chosen mood: Fuming: the spirit has Advantage on the next attack roll it makes before the end of this turn. Mirthful: one creature the spirit can see within 10 feet of itself saves; on a failed save the target is ",
              rules.charmed,
              ' by you and the spirit for 1 minute or until the target takes any damage. Tricksy: the spirit fills a 10-foot ',
              rules.cube,
              ' within 5 feet of it with magical Darkness, which lasts until the end of its next turn.',
            ],
          },
        ],
      },
    },
    fiendish_spirit: {
      name: 'Fiendish Spirit',
      page: 327,
      alignment: 'neutral',
      languages: ['Abyssal', 'Infernal', 'Telepathy 60 ft.'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Fiend', min: 6, max: 9 },
        options: [
          {
            key: 'demon',
            name: 'Demon',
            form: true,
            speed: {
              climb: 40,
            },
            abilities: [
              {
                key: 'death-throes',
                name: 'Death Throes',
                timing: 'trait',
                icon: 'gi/GiExplosionRays',
                intent: 'damage',
                save: {
                  ability: 'dex',
                  dc: 'cha',
                  target: {
                    area: {
                      shape: rules.emanation,
                      size: 10,
                    },
                  },
                  onFail: {
                    damage: [
                      {
                        dice: '2d10',
                        type: rules.fire,
                      },
                    ],
                    also: ["The damage also increases by this spell's level."],
                  },
                  onSuccess: 'half',
                },
                text: [
                  'When the spirit drops to 0 Hit Points or the spell ends, the spirit explodes.',
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
                  damage: [
                    {
                      dice: '1d12',
                      type: rules.necrotic,
                      addModifier: true,
                    },
                  ],
                },
                text: [],
              },
            ],
          },
          {
            key: 'devil',
            name: 'Devil',
            form: true,
            speed: {
              fly: 60,
            },
            abilities: [
              {
                key: 'devil-s-sight',
                name: "Devil's Sight",
                timing: 'trait',
                icon: 'gi/GiSemiClosedEye',
                text: ["Magical Darkness doesn't impede the spirit's Darkvision."],
              },
              {
                key: 'fiery-strike',
                name: 'Fiery Strike',
                timing: 'action',
                icon: 'gi/GiFireBolt',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'cha',
                  reach: 5,
                  thrown: [150, 150],
                  damage: [
                    {
                      dice: '2d6',
                      type: rules.fire,
                      addModifier: true,
                    },
                  ],
                },
                text: [],
              },
            ],
          },
          {
            key: 'yugoloth',
            name: 'Yugoloth',
            form: true,
            abilities: [
              {
                key: 'claws',
                name: 'Claws',
                timing: 'action',
                icon: 'gi/GiClaws',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [
                    {
                      dice: '1d8',
                      type: rules.slashing,
                      addModifier: true,
                    },
                  ],
                },
                text: [
                  'Immediately after the attack hits or misses, the spirit can teleport up to 30 feet to an unoccupied space it can see.',
                ],
              },
            ],
          },
        ],
        size: 'large',
        type: 'fiend',
        cr: '0',
        ac: 12,
        hitDice: '1d10',
        speed: {
          walk: 40,
        },
        scores: {
          str: 13,
          dex: 16,
          con: 15,
          int: 10,
          wis: 10,
          cha: 16,
        },
        senses: {
          darkvision: 60,
        },
        damageResistances: [rules.fire],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of attacks equal to half this spell's level (round down).",
            ],
          },
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiMagicShield',
            text: [
              'The spirit has Advantage on saving throws against spells and other magical effects.',
            ],
          },
        ],
      },
    },
    giant_insect: {
      name: 'Giant Insect',
      page: 279,
      alignment: 'unaligned',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Giant Insect', min: 4, max: 9 },
        options: [
          {
            key: 'centipede',
            name: 'Centipede',
            form: true,
            abilities: [
              {
                key: 'venomous-spew',
                name: 'Venomous Spew',
                timing: 'bonus action',
                icon: 'gi/GiPoisonGas',
                save: {
                  ability: 'con',
                  dc: 'con',
                  target: {
                    creatures: 1,
                    range: 10,
                    which: 'the insect can see',
                  },
                  onFail: {
                    conditions: [rules.poisoned],
                    also: [
                      "The target has the Poisoned condition until the start of the insect's next turn.",
                    ],
                  },
                },
                text: [],
              },
            ],
          },
          {
            key: 'spider',
            name: 'Spider',
            form: true,
            abilities: [
              {
                key: 'web-bolt',
                name: 'Web Bolt',
                timing: 'action',
                icon: 'gi/GiSpiderWeb',
                intent: 'damage',
                attack: {
                  kind: 'ranged',
                  ability: 'dex',
                  range: [60, 60],
                  damage: [
                    {
                      dice: '1d10',
                      type: rules.bludgeoning,
                      addModifier: true,
                    },
                  ],
                },
                text: [
                  "The target's ",
                  rules.speed,
                  " is reduced to 0 until the start of the insect's next turn.",
                ],
              },
            ],
          },
          {
            key: 'wasp',
            name: 'Wasp',
            form: true,
            speed: {
              fly: 40,
            },
            abilities: [],
          },
        ],
        size: 'large',
        type: 'beast',
        cr: '0',
        ac: 11,
        hitDice: '1d10',
        speed: {
          walk: 40,
          climb: 40,
        },
        scores: {
          str: 17,
          dex: 13,
          con: 15,
          int: 4,
          wis: 14,
          cha: 3,
        },
        senses: {
          darkvision: 60,
        },
        abilities: [
          {
            key: 'spider-climb',
            name: 'Spider Climb',
            timing: 'trait',
            icon: 'gi/GiSpiderAlt',
            text: [
              'The insect can climb difficult surfaces, including along ceilings, without needing to make an ability check.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The insect makes a number of attacks equal to half this spell's level (round down).",
            ],
          },
          {
            key: 'poison-jab',
            name: 'Poison Jab',
            timing: 'action',
            icon: 'gi/GiStinger',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 10,
              damage: [
                {
                  dice: '1d6',
                  type: rules.piercing,
                  addModifier: true,
                },
                {
                  dice: '1d4',
                  type: rules.poison,
                },
              ],
            },
            text: [],
          },
        ],
      },
    },
    otherworldly_steed: {
      name: 'Otherworldly Steed',
      page: 273,
      alignment: 'neutral',
      languages: ['telepathy 1 mile (works only with you)'],
      stats: {
        scaling: { by: 'spell', of: 'Find Steed', min: 2, max: 9 },
        options: [
          {
            key: 'celestial',
            name: 'Celestial',
            form: true,
            type: 'celestial',
            abilities: [
              {
                key: 'otherworldly-slam',
                name: 'Otherworldly Slam',
                timing: 'action',
                icon: 'gi/GiChargingBull',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [{ dice: '1d8', type: rules.radiant, addModifier: true }],
                },
                text: [],
              },
              {
                key: 'healing-touch',
                name: 'Healing Touch',
                timing: 'bonus action',
                icon: 'gi/GiHealing',
                intent: 'healing',
                uses: 1,
                recharge: 'Long rest',
                text: [
                  'One creature within 5 feet of the steed regains a number of hit points equal to ',
                  { roll: '2d8' },
                  " + the spell's level.",
                ],
              },
            ],
          },
          {
            key: 'fey',
            name: 'Fey',
            form: true,
            type: 'fey',
            abilities: [
              {
                key: 'otherworldly-slam',
                name: 'Otherworldly Slam',
                timing: 'action',
                icon: 'gi/GiChargingBull',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [{ dice: '1d8', type: rules.psychic, addModifier: true }],
                },
                text: [],
              },
              {
                key: 'fey-step',
                name: 'Fey Step',
                timing: 'bonus action',
                icon: 'gi/GiTeleport',
                uses: 1,
                recharge: 'Long rest',
                text: [
                  'The steed teleports, along with its rider, to an unoccupied space of your choice up to 60 feet away from itself.',
                ],
              },
            ],
          },
          {
            key: 'fiend',
            name: 'Fiend',
            form: true,
            type: 'fiend',
            abilities: [
              {
                key: 'otherworldly-slam',
                name: 'Otherworldly Slam',
                timing: 'action',
                icon: 'gi/GiChargingBull',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [{ dice: '1d8', type: rules.necrotic, addModifier: true }],
                },
                text: [],
              },
              {
                key: 'fell-glare',
                name: 'Fell Glare',
                timing: 'bonus action',
                icon: 'gi/GiEvilEyes',
                intent: 'support',
                uses: 1,
                recharge: 'Long rest',
                save: {
                  ability: 'wis',
                  dc: 'wis',
                  target: { creatures: 1, range: 60, which: 'the steed can see' },
                  onFail: {
                    conditions: [rules.frightened],
                    also: ['The target is frightened until the end of your next turn.'],
                  },
                },
                text: [],
              },
            ],
          },
        ],
        size: 'large',
        type: 'celestial',
        cr: '0',
        ac: 10,
        hitDice: '2d10',
        speed: { walk: 60 },
        scores: { str: 18, dex: 12, con: 14, int: 6, wis: 12, cha: 8 },
        abilities: [
          {
            key: 'flight',
            name: 'Flight',
            timing: 'trait',
            icon: 'gi/GiAngelWings',
            text: ['The steed has a fly speed of 60 feet if it is summoned with a level 4+ spell.'],
          },
          {
            key: 'life-bond',
            name: 'Life Bond',
            timing: 'trait',
            icon: 'gi/GiHealthIncrease',
            text: [
              "When you regain hit points from a level 1+ spell, the steed regains the same number of hit points if you're within 5 feet of it.",
            ],
          },
        ],
      },
    },
    undead_spirit: {
      name: 'Undead Spirit',
      page: 328,
      alignment: 'neutral',
      languages: ['understands the languages you know'],
      stats: {
        scaling: { by: 'spell', of: 'Summon Undead', min: 3, max: 9 },
        options: [
          {
            key: 'ghostly',
            name: 'Ghostly',
            form: true,
            speed: { fly: 40 },
            abilities: [
              {
                key: 'incorporeal-passage',
                name: 'Incorporeal Passage',
                timing: 'trait',
                icon: 'gi/GiGhost',
                text: [
                  'The spirit can move through other creatures and objects as if they were difficult terrain. If it ends its turn inside an object, it is shunted to the nearest unoccupied space and takes ',
                  { roll: '1d10' },
                  ' force damage for every 5 feet traveled.',
                ],
              },
              {
                key: 'deathly-touch',
                name: 'Deathly Touch',
                timing: 'action',
                icon: 'gi/GiSkullCrack',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'cha',
                  reach: 5,
                  damage: [{ dice: '1d8', type: rules.necrotic, addModifier: true }],
                },
                text: [
                  'The target has the ',
                  rules.frightened,
                  ' condition until the end of its next turn.',
                ],
              },
            ],
          },
          {
            key: 'putrid',
            name: 'Putrid',
            form: true,
            abilities: [
              {
                key: 'festering-aura',
                name: 'Festering Aura',
                timing: 'trait',
                icon: 'gi/GiPoisonCloud',
                save: {
                  ability: 'con',
                  dc: 'cha',
                  target: { area: { shape: rules.emanation, size: 5 } },
                  onFail: {
                    conditions: [rules.poisoned],
                    also: ['The condition lasts until the start of its next turn.'],
                  },
                },
                text: ['Any creature (other than you) that starts its turn within the aura.'],
              },
              {
                key: 'rotting-claw',
                name: 'Rotting Claw',
                timing: 'action',
                icon: 'gi/GiClaws',
                intent: 'damage',
                attack: {
                  kind: 'melee',
                  ability: 'str',
                  reach: 5,
                  damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
                },
                text: [
                  'If the target has the ',
                  rules.poisoned,
                  ' condition, it has the ',
                  rules.paralyzed,
                  ' condition until the end of its next turn.',
                ],
              },
            ],
          },
          {
            key: 'skeletal',
            name: 'Skeletal',
            form: true,
            abilities: [
              {
                key: 'grave-bolt',
                name: 'Grave Bolt',
                timing: 'action',
                icon: 'gi/GiSkeleton',
                intent: 'damage',
                attack: {
                  kind: 'ranged',
                  ability: 'dex',
                  range: [150, 150],
                  damage: [{ dice: '2d4', type: rules.necrotic, addModifier: true }],
                },
                text: [],
              },
            ],
          },
        ],
        size: 'medium',
        type: 'undead',
        cr: '0',
        ac: 11,
        armor: 'natural armor',
        hitDice: '1d8',
        speed: { walk: 30 },
        scores: { str: 12, dex: 16, con: 15, int: 4, wis: 10, cha: 9 },
        senses: { darkvision: 60 },
        damageImmunities: [rules.necrotic, rules.poison],
        conditionImmunities: [rules.exhaustion, rules.frightened, rules.paralyzed, rules.poisoned],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiStrikingArrows',
            text: [
              "The spirit makes a number of attacks equal to half this spell's level (round down).",
            ],
          },
        ],
      },
    },
  },
})
