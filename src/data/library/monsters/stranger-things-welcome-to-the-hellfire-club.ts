import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.stranger_things_welcome_to_the_hellfire_club,
  monsters: {
    cultist_of_demogorgon: {
      name: 'Cultist of Demogorgon',
      alignment: 'chaotic evil',
      languages: ['Common'],
      appearance: [
        [
          'A cultist in a costume imitating Demogorgon, with a two-faced monstrous mask and tentacled sleeves.',
        ],
      ],
      lore: [
        [
          'Cultists spread extreme beliefs by drastic means, often following obscure mystic paths or fixating on prophecy. Some serve Demogorgon, the self-styled Prince of Demons, dressing like their two-headed god to frighten those they want to rule, and, like him, delight in chaos, domination and ruin.',
        ],
        ['Sources: ', 'Stranger Things: Welcome to the Hellfire Club'],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '1/8',
        ac: 12,
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 14, con: 10, int: 10, wis: 11, cha: 10 },
        saves: { wis: 'proficient' },
        skills: { deception: 'proficient', religion: 'proficient' },
        abilities: [
          {
            key: 'ritual-sickle',
            name: 'Ritual Sickle',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '2', type: rules.slashing }],
            },
            text: ['Plus 1 Necrotic damage.'],
          },
        ],
      },
    },
    dardew: {
      name: 'Dardew',
      alignment: 'chaotic neutral',
      languages: ['Abyssal', 'Common', 'Infernal'],
      appearance: [
        [
          'A cambion with red skin, leathery wings and a smooth, booming voice, carrying a wicked lute.',
        ],
      ],
      lore: [
        [
          'Dardew, known as the Banished, is a suave performer with blazing ambition who will secretly strike a few infernal deals to give an audience a really great show. When talk fails he underlines his words with bold flourishes on his wicked lute.',
        ],
        ['Sources: ', 'Stranger Things: Welcome to the Hellfire Club'],
      ],
      stats: {
        size: 'medium',
        type: 'fiend',
        cr: '5',
        ac: 19,
        hitDice: '14d8',
        speed: { walk: 30, fly: 60 },
        scores: { str: 18, dex: 18, con: 16, int: 14, wis: 12, cha: 16 },
        saves: { int: 'proficient', cha: 'proficient' },
        skills: { deception: 'proficient', perception: 'proficient', performance: 'expert' },
        senses: { darkvision: 120 },
        damageResistances: [rules.cold, rules.fire, rules.lightning, rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'Dardew makes two attacks, using ',
              { ability: 'fiery-claw' },
              ' or ',
              { ability: 'power-chord' },
              ' in any combination.',
            ],
          },
          {
            key: 'fiery-claw',
            name: 'Fiery Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [
                { dice: '1d8', type: rules.slashing, addModifier: true },
                { dice: '2d6', type: rules.fire },
              ],
            },
          },
          {
            key: 'power-chord',
            name: 'Power Chord',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            intent: 'damage',
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 120, which: 'Dardew can see' },
              onFail: {
                damage: [{ dice: '3d6', type: rules.thunder, addModifier: true }],
              },
            },
            effects: [],
          },
          {
            key: 'silver-tongue',
            name: 'Silver Tongue',
            timing: 'bonus action',
            icon: 'gi/GiTongue',
            text: [
              'Charisma Saving Throw: ',
              { dc: 'con' },
              ', one creature Dardew can see within 60 feet. Failure: The creature has the ',
              { effect: 'charmed' },
              '.',
            ],
            effects: [
              {
                key: 'charmed',
                name: 'Charmed',
                lands: { on: 'save', save: 'cha', dc: 'con' },
                conditions: [rules.charmed],
                lasts: { kind: 'turn', boundary: 'start', whose: 'source' },
              },
            ],
          },
        ],
      },
    },
    demobat: {
      name: 'Demobat',
      tags: ['demon'],
      alignment: 'chaotic evil',
      languages: [],
      appearance: [
        [
          'A slimy winged thing flaps past with four serrated tentacles trailing behind it. Its eyeless head splits open into a toothed mouth.',
        ],
      ],
      lore: [
        [
          'A pest of the demonic realms that hunts in flocks. It wraps its tails around prey to strangle and pin it while feeding.',
        ],
        ['Sources: ', 'Stranger Things: Welcome to the Hellfire Club'],
      ],
      stats: {
        size: 'tiny',
        type: 'fiend',
        cr: '1/2',
        ac: 13,
        hitDice: '6d4',
        speed: { walk: 10, fly: 40 },
        scores: { str: 4, dex: 16, con: 12, int: 2, wis: 10, cha: 6 },
        senses: { blindsight: 60 },
        damageResistances: [rules.cold, rules.lightning],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '2d6', type: rules.piercing, addModifier: true }],
            },
            text: ['With Advantage if the target is ', rules.grappled, ' by a Demobat.'],
            effects: [],
          },
          {
            key: 'tentacles',
            name: 'Tentacles',
            timing: 'action',
            icon: 'gi/GiTentacleStrike',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
            text: [
              'If the target is a Medium or smaller creature, the target has the ',
              { effect: 'tentacle-grab' },
              ' from all four tentacles.',
            ],
            effects: [
              {
                key: 'tentacle-grab',
                name: 'Grabbed',
                lands: { on: 'hit' },
                conditions: [rules.grappled],
                lasts: { kind: 'until-removed' },
                ends: { escape: { dc: 'str', printed: 13 } },
              },
            ],
          },
        ],
      },
    },
    demodog: {
      name: 'Demodog',
      tags: ['demon'],
      alignment: 'chaotic evil',
      languages: [],
      appearance: [
        [
          'A hairless, four-legged beast with wrinkled hide and no face prowls through the gloom. When it attacks, its head peels open into a flower of toothed, fleshy petals around powerful jaws.',
        ],
      ],
      lore: [
        [
          'A pack predator that grows out of limacine larvae and, like wolves, swarms prey in dark places. Its howls unsettle even hardened adventurers.',
        ],
        ['Sources: ', 'Stranger Things: Welcome to the Hellfire Club'],
      ],
      stats: {
        size: 'small',
        type: 'fiend',
        cr: '1',
        ac: 14,
        hitDice: '6d6',
        speed: { walk: 50 },
        scores: { str: 16, dex: 15, con: 12, int: 6, wis: 12, cha: 6 },
        skills: { stealth: 'proficient' },
        senses: { blindsight: 60 },
        damageResistances: [rules.cold, rules.lightning],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.poisoned],
        abilities: [
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              "The demodog has Advantage on an attack roll against a creature if at least one of the demodog's allies is within 5 feet of the creature and the ally doesn't have the ",
              rules.incapacitated,
              ' condition.',
            ],
            effects: [],
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
              'If the target is a Medium or smaller creature, it has the ',
              { effect: 'bitten-prone' },
              '.',
            ],
            effects: [
              {
                key: 'bitten-prone',
                name: 'Prone',
                lands: { on: 'hit' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
        ],
      },
    },
    demodragon: {
      name: 'Demodragon',
      tags: ['demon'],
      languages: [],
      appearance: [
        [
          'Two bulbous, featureless heads sit on one monstrous body with three writhing tails and big wings. When threatened, each head blooms open into glistening flesh and teeth around crushing jaws.',
        ],
      ],
      lore: [
        [
          "Demogorgon's former pet, now the gatekeeper of the final challenge in the Hellfire Games in the Nine Hells. It was raised by vile magic from a beheaded black dragon's corpse. The original head is gone, yet the breath survives, so it can spit bone-dissolving acid with no warning.",
        ],
        ['Sources: ', 'Stranger Things: Welcome to the Hellfire Club'],
      ],
      habitats: ['Nine Hells'],
      stats: {
        size: 'huge',
        type: 'fiend',
        cr: '5',
        ac: 16,
        hitDice: '12d12',
        speed: { walk: 40, fly: 60 },
        scores: { str: 19, dex: 10, con: 15, int: 8, wis: 12, cha: 10 },
        initiative: 'proficient',
        saves: { con: 'proficient', wis: 'proficient' },
        senses: { blindsight: 120 },
        damageResistances: [rules.acid, rules.cold, rules.lightning],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.charmed, rules.frightened, rules.poisoned],
        abilities: [
          {
            key: 'baleful-presence',
            name: 'Baleful Presence',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Sources of light in a 120-foot Emanation originating from the demodragon flicker wildly. Nonmagical sources of Bright Light in that area instead shed Dim Light.',
            ],
          },
          {
            key: 'regeneration',
            name: 'Regeneration',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The demodragon regains 10 Hit Points at the start of each of its turns if it has at least 1 Hit Point',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The demodragon makes two ', { ability: 'bite' }, ' attacks.'],
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
              reach: 10,
              damage: [
                { dice: '2d6', type: rules.piercing, addModifier: true },
                { dice: '1d8', type: rules.acid },
              ],
            },
          },
          {
            key: 'acid-breath',
            name: 'Acid Breath',
            timing: 'action',
            icon: 'gi/GiDragonBreath',
            intent: 'damage',
            save: {
              ability: 'dex',
              dc: 'con',
              target: { area: { shape: rules.line, size: 30, width: 5 } },
              onFail: {
                damage: [{ dice: '4d10', type: rules.acid }],
              },
              onSuccess: 'half',
            },
            uses: 1,
            recharge: 'Recharge 5–6',
            effects: [],
          },
        ],
      },
    },
    demogorgon_spawn: {
      name: 'Demogorgon Spawn',
      tags: ['demon'],
      alignment: 'chaotic evil',
      languages: [],
      appearance: [
        [
          'A lean biped with a smooth, bulbous head advances while lights flicker around it. The head opens like a blossom into a gaping maw ringed with five or more toothed petals.',
        ],
      ],
      lore: [
        [
          'Offspring of the demon lord Demogorgon, resilient predators that chase their prey without letting up. Flickering light often warns of their approach.',
        ],
        ['Sources: ', 'Stranger Things: Welcome to the Hellfire Club'],
      ],
      stats: {
        size: 'medium',
        type: 'fiend',
        cr: '2',
        ac: 15,
        hitDice: '8d8',
        speed: { walk: 40 },
        scores: { str: 17, dex: 15, con: 13, int: 8, wis: 12, cha: 7 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        senses: { blindsight: 60 },
        damageResistances: [rules.cold, rules.lightning],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.charmed, rules.frightened, rules.poisoned],
        abilities: [
          {
            key: 'baleful-presence',
            name: 'Baleful Presence',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Sources of light in a 60-foot Emanation originating from the spawn flicker wildly. Nonmagical sources of Bright Light in that area instead shed Dim Light.',
            ],
          },
          {
            key: 'regeneration',
            name: 'Regeneration',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The spawn regains 5 Hit Points at the start of each of its turns if it has at least 1 Hit Point.',
            ],
          },
          {
            key: 'running-leap',
            name: 'Running Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: ['With a 10-foot running start, the spawn can Long Jump up to 30 feet.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The spawn makes two ', { ability: 'claw' }, ' attacks.'],
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
              reach: 10,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
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
            text: [
              'If the target is a Medium or smaller creature, it has the ',
              { effect: 'grabbed' },
              '.',
            ],
            effects: [
              {
                key: 'grabbed',
                name: 'Grabbed',
                lands: { on: 'hit' },
                conditions: [rules.grappled, rules.blinded],
                lasts: { kind: 'until-removed' },
                ends: { escape: { dc: 'str', printed: 13 } },
              },
            ],
          },
        ],
      },
    },
    flizzlebin: {
      name: 'Flizzlebin',
      tags: ['gnome'],
      alignment: 'chaotic good',
      languages: ['Common', 'Dwarvish', 'Gnomish'],
      appearance: [['Flizzlebin is a trickster known as the Vanishing Gnome.']],
      lore: [
        [
          'He lures new adventurers into dungeons to test them, and loves a game of hiding in a dangerous dungeon and handing priceless treasure to anyone who finds him.',
        ],
        ['Sources: ', 'Stranger Things: Welcome to the Hellfire Club'],
      ],
      stats: {
        size: 'small',
        type: 'humanoid',
        cr: '1',
        ac: 12,
        hitDice: '7d6',
        speed: { walk: 30 },
        scores: { str: 8, dex: 14, con: 15, int: 16, wis: 10, cha: 12 },
        skills: { arcana: 'proficient', stealth: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'magic-resistance',
            name: 'Magic Resistance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Flizzlebin has Advantage on saving throws against spells and other magical effects.',
            ],
          },
          {
            key: 'ventriloquist',
            name: 'Ventriloquist',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Flizzlebin can project his voice from anywhere within 1 mile of himself.'],
          },
          {
            key: 'dazzling-confetti',
            name: 'Dazzling Confetti',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'int',
              reach: 5,
              thrown: [60, 60],
              damage: [{ dice: '2d6', type: rules.radiant, addModifier: true }],
            },
          },
          {
            key: 'vanishing-trick',
            name: 'Vanishing Trick',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Flizzlebin has the ',
              rules.invisible,
              ' condition for 10 minutes. This effect ends early immediately after Flizzlebin makes an attack roll, deals damage, or has the ',
              rules.incapacitated,
              ' condition, or if his hat is removed.',
            ],
            uses: 3,
            recharge: 'Long rest',
            effects: [],
          },
          {
            key: 'distracting-glitter',
            name: 'Distracting Glitter',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Trigger: Flizzlebin is hit by an attack roll. Response: Flizzlebin adds 2 to his AC against that attack, possibly causing it to miss.',
            ],
          },
        ],
      },
    },
  },
})
