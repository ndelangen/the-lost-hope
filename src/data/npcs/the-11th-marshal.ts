import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'The 11th Marshal',
  location: refs.locations.the_marshal_s_deep,
  species: 'Aboleth',
  languages: ['Deep Speech'],
  notes: [
    [
      'An aboleth that rules ',
      refs.locations.the_caves_of_steel,
      ' from the bottom of ',
      refs.locations.the_marshal_s_waters,
      '.',
    ],
  ],
  memberships: [
    {
      organization: refs.organizations.marshals_court,
      status: 'active',
      rank: '11th Marshal',
    },
  ],
  motivations: [
    [
      'It keeps its people alive for one reason: an army that can take the first blow if another marshal attacks. It decides who has children, so every birth is a future soldier and every escape costs it one.',
    ],
    [
      'It does not care what they love, hate or dream of. To it they are less than insects, meatballs that roll around until it needs them to roll into battle.',
    ],
    [
      'It prefers thinking food. The fleet fishes for the people’s own meals, and also hunts sentient sea creatures for the Marshal’s table.',
    ],
  ],
  background: [
    [
      'Everyone born in ',
      refs.locations.the_caves_of_steel,
      ' is bound from birth by three laws. They keep their own thoughts and wishes. When a law applies, their body obeys it. They recite the laws in the first person:',
    ],
    [
      'First Law: I may not injure the Marshal or, through inaction, allow the Marshal to come to harm.',
    ],
    [
      'Second Law: I must obey the orders given to me by the Marshal, except where such orders would conflict with the First Law.',
    ],
    [
      'Third Law: I must not leave the Marshal’s waters, nor take any action that would allow me to leave them, as long as doing so does not conflict with the First or Second Law.',
    ],
    [
      'The laws rule in its place, so it does not have to govern. It rests on the seabed and can go years without speaking to its people. It never goes anywhere itself: it always sends a mind-controlled minion.',
    ],
    [
      'The laws are a deliberate echo of Asimov’s Three Laws of Robotics, turned around: the people must protect their master. As in Asimov’s stories, the puzzle is what the laws actually say, which one takes precedence, and the gap between that and what the Marshal meant.',
    ],
  ],
  stats: {
    size: 'large',
    type: 'aberration',
    cr: '10',
    ac: 17,
    armor: 'natural armor',
    hitDice: '20d10',
    speed: { walk: 10, swim: 40 },
    scores: { str: 21, dex: 9, con: 15, int: 18, wis: 15, cha: 18 },
    saves: {
      dex: 'proficient',
      con: 'proficient',
      int: 'proficient',
      wis: 'proficient',
    },
    skills: {
      history: 'expert',
      perception: 'expert',
    },
    senses: { darkvision: 120 },
    abilities: [
      {
        key: 'amphibious',
        name: 'Amphibious',
        timing: 'trait',
        icon: 'gi/GiWaterSplash',
        text: ['It can breathe air and water.'],
      },
      {
        key: 'telepathy',
        name: 'Telepathy',
        timing: 'trait',
        icon: 'gi/GiTelepathy',
        text: [
          'It speaks mind to mind with any creature within 120 ft. that has a language, and with anyone it has ',
          refs.rules.charmed,
          ' at any distance.',
        ],
      },
      {
        key: 'mucus-cloud',
        name: 'Mucus Cloud',
        timing: 'trait',
        icon: 'gi/GiSlime',
        save: {
          ability: 'con',
          dc: 'con',
          target: { area: { shape: refs.rules.emanation, size: 5 } },
          onFail: {
            also: ['It is diseased for 24 hours: it can breathe only underwater.'],
          },
          onSuccess: 'none',
        },
        text: [
          'Only while it is underwater. A creature makes the save when it touches the aboleth, hits it with a melee attack within 5 ft., or starts its turn within 5 ft. of it.',
        ],
      },
      {
        key: 'eldritch-restoration',
        name: 'Eldritch Restoration',
        timing: 'trait',
        icon: 'lucide/HeartPulse',
        text: [
          'If it is destroyed, it gains a new body in 5d10 days and revives with all its hit points, somewhere of the DM’s choosing.',
        ],
      },
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: [
          'If it fails a ',
          refs.rules.saving_throw,
          ', it can choose to succeed instead. Four uses in its lair.',
        ],
        uses: 3,
        recharge: 'Long rest',
      },
      {
        key: 'multiattack',
        name: 'Multiattack',
        timing: 'action',
        icon: 'gi/GiPowerLightning',
        intent: 'damage',
        text: [
          'Two ',
          { ability: 'tentacle' },
          ' attacks, then ',
          { ability: 'consume-memories' },
          ' or ',
          { ability: 'dominate-mind' },
          ' if it is available.',
        ],
      },
      {
        key: 'tentacle',
        name: 'Tentacle',
        timing: 'action',
        icon: 'gi/GiTentacleStrike',
        intent: 'damage',
        attack: {
          kind: 'melee',
          ability: 'str',
          reach: 15,
          damage: [{ dice: '2d6', type: refs.rules.bludgeoning, addModifier: true }],
        },
        text: [
          'A Large or smaller target is ',
          refs.rules.grappled,
          ' (escape DC 14) by one of its three tentacles.',
        ],
      },
      {
        key: 'consume-memories',
        name: 'Consume Memories',
        timing: 'action',
        icon: 'gi/GiBrain',
        intent: 'damage',
        save: {
          ability: 'int',
          dc: 'int',
          target: { creatures: 1, range: 30 },
          onFail: { damage: [{ dice: '3d6', type: refs.rules.psychic }] },
          onSuccess: 'half',
        },
        text: [
          'Only a creature it has ',
          refs.rules.charmed,
          ' or ',
          refs.rules.grappled,
          '. If this drops a humanoid to 0 hit points, the aboleth takes its memories.',
        ],
      },
      {
        key: 'dominate-mind',
        name: 'Dominate Mind',
        timing: 'action',
        icon: 'gi/GiCharm',
        save: {
          ability: 'wis',
          dc: 'int',
          target: { creatures: 1, range: 30 },
          onFail: {
            conditions: [refs.rules.charmed],
            also: [
              'It stays charmed until the aboleth dies or they are on different planes of existence, and it obeys the aboleth’s telepathic commands.',
            ],
          },
        },
        uses: 2,
        recharge: 'Long rest',
      },
    ],
    legendary: {
      uses: 3,
      actions: [
        {
          key: 'lash',
          name: 'Lash',
          icon: 'gi/GiTentacleStrike',
          intent: 'damage',
          text: ['It makes one ', { ability: 'tentacle' }, ' attack.'],
        },
        {
          key: 'psychic-drain',
          name: 'Psychic Drain',
          icon: 'gi/GiBrain',
          intent: 'damage',
          text: [
            'If it has at least one creature ',
            refs.rules.charmed,
            ' or ',
            refs.rules.grappled,
            ', it uses ',
            { ability: 'consume-memories' },
            ' and regains 1d10 hit points.',
          ],
        },
      ],
    },
    source: {
      adaptedFrom: ['srd-2024_aboleth'],
    },
  },
})
