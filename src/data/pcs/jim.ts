import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Jim',
  player: 'norbertdlangen',
  url: 'https://www.dndbeyond.com/characters/159958003',
  avatar: '/assets/pcs/jim-ghost.png',
  previousPortraits: [
    {
      url: '/assets/pcs/jim.jpg',
      description: 'Jim in his human form before becoming ethereal',
      until: 24,
    },
    {
      url: '/assets/pcs/jim-kenku.jpg',
      description: 'Jim wearing his former kenku disguise',
      until: 20,
    },
  ],
  status: 'retired',
  species: 'Human (formerly disguised as a Kenku)',
  class: 'Bard / Sorcerer',
  subclass: 'College of Tragedy',
  level: 5,
  stats: {
    size: 'medium',
    type: 'humanoid',
    ac: 14,
    armor: 'leather',
    maxHp: 32,
    spellSlots: [4, 3, 2],
    speed: { walk: 30 },
    scores: { str: 10, dex: 16, con: 12, int: 12, wis: 10, cha: 16 },
    saves: { dex: 'proficient', cha: 'proficient' },
    skills: {
      arcana: 'expert',
      performance: 'expert',
      persuasion: 'proficient',
      sleight_of_hand: 'proficient',
      stealth: 'proficient',
      survival: 'proficient',
    },
    abilities: [
      {
        key: 'spellcasting',
        name: 'Spellcasting',
        timing: 'trait',
        icon: 'gi/GiMusicalNotes',
        text: [
          'You cast bard and sorcerer spells with Charisma (save ',
          { dc: 'cha' },
          '). One Disguise Self a day is free (Magic Initiate): once between long rests you can cast it without spending a slot.',
        ],
        effects: [],
      },
      {
        key: 'alert',
        name: 'Alert',
        timing: 'trait',
        icon: 'gi/GiHourglass',
        text: [
          'You add your proficiency bonus to initiative, and right after rolling you can swap initiative with a willing ally.',
        ],
      },
      {
        key: 'jack-of-all-trades',
        name: 'Jack of All Trades',
        timing: 'trait',
        icon: 'gi/GiCardRandom',
        text: ['You add 1 to ability checks with skills you are not proficient in.'],
      },
      {
        key: 'dagger',
        name: 'Dagger',
        timing: 'action',
        icon: 'gi/GiThrownDaggers',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'dex',
          damage: [{ dice: '1d4', type: refs.rules.piercing, addModifier: true }],
        },
        text: ['Thrown 20/60 ft. You carry four, and the Dagger of Passive Aggression.'],
      },
      {
        key: 'vicious-mockery',
        name: 'Vicious Mockery',
        timing: 'action',
        icon: 'gi/GiTongue',
        intent: 'damage',
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { creatures: 1, range: 60 },
          onFail: {
            damage: [{ dice: '2d6', type: refs.rules.psychic }],

            also: [{ effect: 'mocked' }],
          },
        },
        effects: [
          {
            key: 'mocked',
            name: 'Disadvantage on next attack',
            lands: { on: 'failed-save' },
            text: [
              'It has ',
              refs.rules.disadvantage,
              ' on its next attack roll before the end of its next turn.',
            ],
            lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
          },
        ],
      },
      {
        key: 'sleep',
        name: 'Sleep',
        timing: 'action',
        icon: 'gi/GiHourglass',
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { area: { shape: refs.rules.sphere, size: 5 }, range: 60, chosen: true },
          onFail: {
            also: [{ effect: 'asleep' }],
          },
        },
        text: ['Uses a slot.'],
        effects: [
          {
            key: 'asleep',
            name: 'Asleep',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.incapacitated],
            lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
            ends: {
              repeatSave: ['end-of-turn'],
              cure: ['it takes damage or someone wakes it'],
            },
            becomes: {
              failures: 1,
              key: 'fast-asleep',
              name: 'Fast asleep',
              conditions: [refs.rules.unconscious],
              text: ['For the rest of the spell, up to 1 minute (', refs.rules.concentration, ').'],
              lasts: { kind: 'time', amount: '1', unit: 'minute' },
              ends: { cure: ['it takes damage or someone wakes it'] },
            },
          },
        ],
      },
      {
        key: 'heroism',
        name: 'Heroism',
        timing: 'action',
        icon: 'gi/GiKnightBanner',
        intent: 'support',
        text: [
          'A creature you touch ',
          { effect: 'emboldened' },
          '. One more creature per slot level above 1st.',
        ],
        effects: [
          {
            key: 'emboldened',
            name: 'Emboldened',
            lands: { on: 'use' },
            text: [
              'It can’t be ',
              refs.rules.frightened,
              ' and gains 3 temporary ',
              refs.rules.hit_points,
              ' at the start of each of its turns, for up to 1 minute (',
              refs.rules.concentration,
              ').',
            ],
            lasts: { kind: 'time', amount: '1', unit: 'minute' },
          },
        ],
      },
      {
        key: 'false-life',
        name: 'False Life',
        timing: 'action',
        icon: 'gi/GiHealingShield',
        intent: 'healing',
        text: [
          'You gain 2d4 + 4 temporary ',
          refs.rules.hit_points,
          ', 5 more per slot level above 1st.',
        ],
      },
      {
        key: 'disguise-self',
        name: 'Disguise Self',
        timing: 'action',
        icon: 'gi/GiDoubleFaceMask',
        text: ['For 1 hour you and your gear look different, within the same kind of body.'],
      },
      {
        key: 'friends',
        name: 'Friends',
        timing: 'action',
        icon: 'gi/GiCharm',
        save: {
          ability: 'wis',
          dc: 'cha',
          target: { creatures: 1, range: 10, which: 'creature that isn’t fighting you' },
          onFail: {
            also: [{ effect: 'friends-charm' }],
          },
        },
        effects: [
          {
            key: 'friends-charm',
            name: 'Charmed',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.charmed],
            lasts: {
              kind: 'until',
              text: [
                '1 minute (',
                refs.rules.concentration,
                '), or until you or your allies harm it',
              ],
            },
          },
        ],
      },
      {
        key: 'utility-cantrips',
        name: 'Light, Mage Hand, Mending, Message, Minor Illusion, Prestidigitation',
        timing: 'action',
        icon: 'gi/GiMagicSwirl',
        text: ['Small everyday magic. Comprehend Languages as a ritual.'],
      },
      {
        key: 'bardic-inspiration',
        name: 'Bardic Inspiration',
        timing: 'bonus action',
        icon: 'gi/GiAnthem',
        intent: 'support',
        text: [
          'A creature within 60 ft. that can see or hear you gets a d6. Within the next hour, when it fails a d20 test, it can roll the die and add it.',
        ],
        uses: 3,
        recharge: 'Long rest',
      },
      {
        key: 'innate-sorcery',
        name: 'Innate Sorcery',
        timing: 'bonus action',
        icon: 'gi/GiMagicSwirl',
        text: [
          'For 1 minute your sorcerer spells’ save DC is 1 higher and you have ',
          refs.rules.advantage,
          ' on sorcerer spell attacks.',
        ],
        uses: 2,
        recharge: 'Long rest',
      },
      {
        key: 'poetry-in-misery',
        name: 'Poetry in Misery',
        timing: 'reaction',
        icon: 'gi/GiFeather',
        text: [
          'When you or an ally within 30 ft. rolls a 1 on a d20, you regain one ',
          { ability: 'bardic-inspiration' },
          '.',
        ],
      },
      {
        key: 'sorrowful-fate',
        name: 'Sorrowful Fate',
        timing: 'trait',
        icon: 'gi/GiDeathSkull',
        text: [
          'Once per short rest, when you or an ally you see forces a save, you spend a ',
          { ability: 'bardic-inspiration' },
          ' to make it a Charisma save. On a failure the target also takes 1d6 ',
          refs.rules.psychic,
          ' damage, and if it drops to 0 within the minute it speaks darkly poetic last words.',
        ],
        uses: 1,
        recharge: 'Short rest',
      },
    ],
  },
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'former',
      rank: 'Member',
    },
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'former',
      rank: 'Finger',
    },
    {
      organization: refs.organizations.beasts_and_dwarf,
      status: 'former',
      rank: 'Founder',
    },
  ],
  notes: [
    [
      'Jim is a human who hid as a kenku, on the run from both the law and ',
      refs.organizations.the_eyeless_hand,
      ', the guild he betrayed.',
    ],
    [
      'Jim grew up in a human-dominated slum inside ',
      refs.organizations.the_eyeless_hand,
      ', surrounded by smugglers, money launderers, and black-market facilitators. The organization’s narcotics trade and the resulting addiction hollowed out his community through overdoses, betrayal, imprisonment, executions, and disappearances. His hatred of narcotics comes from those personal losses.',
    ],
    [
      'Music began as a criminal tool for distraction, signaling, and laundering coin, but became Jim’s means of survival and reason to live. He plays fiddle and lute for expression, manipulation, and storytelling, and uses a wargong for intimidation and emotional impact.',
    ],
    [
      'Jim wants to bring joy, relief, or meaning into the world through music. He is guarded and slow to trust, protective of outcasts and victims, and easily angered by cruelty and abuses of power; when disillusioned, his empathy can turn into bitter mockery, psychological pressure, and retaliation.',
    ],
    [
      'He bears an ',
      refs.organizations.the_eyeless_hand,
      ' mark in an undisclosed location (separate from his tongue guild-mark).',
    ],
    [
      'Source-of-truth split: this file is canonical for fiction (the former kenku disguise and secrets); the D&D Beyond sheet is canonical for rules (Human, Bard/Sorcerer, College of Tragedy). When they conflict, the sheet wins for mechanics and this file wins for fiction.',
    ],
    [
      refs.pcs.fix,
      ' knows that Jim is his real name but has not learned his face or species. Why the law wants him remains hidden from the party.',
    ],
    [
      'Before his disappearance, Jim checked ',
      refs.items.robertos_map_pages,
      ' each evening when he was alone to look for new messages.',
    ],
    ['His Sorcerer origin/bloodline has not been disclosed.'],
    ['Ryan’s first notes described him as a quiet kenku bard.'],
  ],
  background: [
    [
      'Jim knows the true identity of ',
      refs.npcs.the_father,
      ' — likely why the Hand wants him back or dead.',
    ],
    [
      'Jim could have killed himself at any time. He never did, because ',
      refs.npcs.the_father,
      ' can raise people from the dead easily. He was looking for a way to die that would make that impossible. That is what he was after when he played the ',
      refs.items.deck_of_many_more_things,
      ' in ',
      refs.events.n2_e105,
      '. The worst card in the deck would have been the best outcome for him.',
    ],
    [
      'What he did inside ',
      refs.organizations.the_eyeless_hand,
      ', and why the order was to bring him back alive, is recorded on ',
      refs.npcs.the_father,
      '.',
    ],
    [
      'Jim’s human identity remains secret outside Devan, Cassian, and Swift unless the player says otherwise.',
    ],
  ],
})
