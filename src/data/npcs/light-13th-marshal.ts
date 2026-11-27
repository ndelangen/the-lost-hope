import { refs } from '#/data/generated/refs.ts'
import { create as createNPC } from '#/definitions/npc.ts'

export default createNPC({
  name: 'Light 13th Marshal',
  avatar: '/assets/npcs/light-13th-marshal-portrait.png',
  location: refs.locations.fajanet_guildhall,
  species: 'unknown',
  notes: [
    [
      'Leader of the ',
      refs.organizations.adventurers_guild,
      ' in ',
      refs.locations.fajanet,
      "; the party's main quest-giver.",
    ],
    ['The price of the one favor he grants each new recruit is unstated.'],
    ['He is one of the thirteen world governors and holds the formal rank of 13th Marshal.'],
    ['He has an enormous amount of paperwork to do and never sleeps.'],
  ],
  motivations: [
    [
      'He wants the loss to stop, and he knows he cannot keep his work up. His plan is to put down the pen. When he stops writing, the true cost lands on everyone at once: a huge part of the world is lost, and what remains is forced to give up shadow. He has tried everything else with earlier parties, and he believes this is the only way left.',
    ],
    [
      'That is why he recruits adventurers all over the world through the ',
      refs.organizations.adventurers_guild,
      '. When he stops, its members are meant to be the hope that is still standing.',
    ],
    [
      'Until then he spreads his influence slowly and carefully, and he keeps the other twelve marshals fighting each other just enough. None of them may win outright. If too many unite, or too many are destroyed, their attention falls on him again. The infighting drives up the use of Arcane Dust, so his workload only ever grows.',
    ],
    [
      'At the end of it he wants the world rid of the Dust that feeds war and mind control, the leak near ',
      refs.locations.fajanet,
      ' closed so it stops taking people, and then, finally, rest, and to enjoy the world again.',
    ],
    [
      'He also wants to break the world out of its stagnation. Since the Second Great War the world has been stuck: the twelve marshals hold it, and everything runs on Arcane Dust, so nobody needs to invent anything new. Freed from the twelve and from the Dust, the world can enter a new era of innovation.',
    ],
    [
      'He cannot tell adventurers to stay away from the fuel and the drug, because the warning would raise suspicion. He accepts that some of them will be lost too.',
    ],
  ],
  background: [
    [
      'Only he can establish portals: the links between guildhall booths, and the portals that drop Arcane Dust to the marshals.',
    ],
    [
      'Writing is remembering. He records every use of shadow fuel and Arcane Dust. If he remembers, the users remember, and what he has written down is not lost. That is the paperwork, and it is why he never sleeps.',
    ],
    [
      'Every moment he is not writing is lost for good. Each meeting where he has to talk is paid for by someone else, with their memories and their sense of self, and it makes the work of ',
      refs.npcs.the_father,
      ' easier. He will reveal this to a party eventually.',
    ],
    [
      'He produces Arcane Dust and supplies it to the other twelve marshals, and to no one else. That is the deal. Stopping at once is impossible. He tried to stop production before: enough marshals united against him that his land and people were invaded, and he had to concede. Now he supplies it as they demand.',
    ],
    [
      'The twelve fuel their war machines with it and fight each other. They see him as a thing that has to go on but must never grow too strong. They keep him to his own land, he may not go wherever he wants, and their use of the Dust floods him with more records than he can keep.',
    ],
    [
      'Corruption among the marshals is rampant and open. A secondary market in Dust exists, and there is nothing he can do about it.',
    ],
    [
      'It never occurred to him that writing could be used to change a person until ',
      refs.npcs.the_father,
      ' worked it out. He has neither the skill nor the wish to practise it, and he does not want it to be how this ends. Under his workload he does make the occasional mistake in what he writes.',
    ],
    [
      'He is not really powerful enough for this. He no longer has the power to keep even the promises he makes to his adventurers.',
    ],
    [
      'He told ',
      refs.pcs.cassian_veyl,
      ', and nobody else, that he is a necessary evil. When he said it is not recorded yet, so it has no event. He meant four things.',
    ],
    [
      'He makes the harm sustainable. Because he records the loss, the fuel and the drug cost people less than they should, so the world never has to stop using them. Without him millions would be lost at once. With him it never ends.',
    ],
    [
      'He cannot keep up, so he chooses. Whatever he does not get to is lost, and he decides who is remembered. He lets go of the people nobody will miss.',
    ],
    [
      'What he remembers, he holds. Someone whose self survives in his files partly belongs to him. That is the weight behind his favours and contracts.',
    ],
    [
      'He made ',
      refs.npcs.the_father,
      '. One of his earlier attempts taught a recruit his secret, and the recruit turned it into a weapon.',
    ],
    ['Still open: why the twelve cannot simply kill him.'],
  ],
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Guildmaster',
    },
    {
      organization: refs.organizations.marshals_court,
      status: 'active',
      rank: '13th Marshal',
    },
  ],
  stats: {
    size: 'medium',
    type: 'celestial',
    cr: '12',
    ac: 17,
    hitDice: '18d8',
    speed: {
      walk: 30,
      fly: 60,
    },
    scores: {
      str: 12,
      dex: 16,
      con: 18,
      int: 20,
      wis: 20,
      cha: 22,
    },
    saves: {
      int: 'proficient',
      wis: 'proficient',
      cha: 'proficient',
    },
    skills: {
      arcana: 'proficient',
      insight: 'expert',
      persuasion: 'proficient',
    },
    senses: {
      truesight: 60,
    },
    damageResistances: [refs.rules.radiant],
    abilities: [
      {
        key: 'marshals-authority',
        name: 'Marshal’s Authority',
        timing: 'trait',
        icon: 'gi/GiHolySymbol',
        text: [
          'Can’t be ',
          refs.rules.charmed,
          ' or ',
          refs.rules.frightened,
          '. A creature that has signed one of his contracts has ',
          refs.rules.disadvantage,
          ' on saves against his abilities.',
        ],
        effects: [],
      },
      {
        key: 'legendary-resistance',
        name: 'Legendary Resistance',
        timing: 'trait',
        icon: 'lucide/Shield',
        text: ['If he fails a ', refs.rules.saving_throw, ', he can choose to succeed instead.'],
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
          'Three ',
          {
            ability: 'radiant-lance',
          },
          ' attacks.',
        ],
      },
      {
        key: 'radiant-lance',
        name: 'Radiant Lance',
        timing: 'action',
        icon: 'gi/GiSunbeams',
        intent: 'damage',
        attack: {
          kind: 'ranged',
          ability: 'cha',
          range: [120, 120],
          damage: [
            {
              dice: '2d8',
              type: refs.rules.radiant,
              addModifier: true,
            },
          ],
        },
      },
      {
        key: 'blinding-light',
        name: 'Blinding Light',
        timing: 'action',
        icon: 'gi/GiSunbeams',
        intent: 'damage',
        save: {
          ability: 'con',
          dc: 'cha',
          target: { area: { shape: refs.rules.emanation, size: 30 }, chosen: true },
          onFail: {
            damage: [{ dice: '6d8', type: refs.rules.radiant }],

            also: [{ effect: 'blinded-by-light' }],
          },
          onSuccess: 'half',
        },
        uses: 1,
        recharge: 'Recharge 5–6',
        effects: [
          {
            key: 'blinded-by-light',
            name: 'Blindness',
            lands: { on: 'failed-save' },
            conditions: [refs.rules.blinded],
            lasts: { kind: 'turn', boundary: 'end', whose: 'target' },
          },
        ],
      },
      {
        key: 'grant-a-favour',
        name: 'Grant a Favour',
        timing: 'bonus action',
        icon: 'gi/GiScrollUnfurled',
        intent: 'healing',
        text: [
          'One creature within 60 ft. under contract with him regains 4d8 HP or ends one condition.',
        ],
      },
    ],
    source: {
      adaptedFrom: ['srd-2024_archmage', 'srd-2024_deva'],
      changes:
        'One of the thirteen world governors: archmage-level casting expressed as light, with a deva’s wings. His true species is unknown.',
    },
  },
})
