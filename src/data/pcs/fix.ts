import { refs } from '#/data/generated/refs.ts'
import { create as createPC } from '#/definitions/pc.ts'

export default createPC({
  name: 'Fix',
  player: 'Eefiene',
  url: '',
  status: 'occasional',
  memberships: [
    {
      organization: refs.organizations.adventurers_guild,
      status: 'active',
      rank: 'Member',
    },
    {
      organization: refs.organizations.lucky_palm,
      status: 'active',
      rank: 'Member',
    },
  ],
  secretMemberships: [
    {
      organization: refs.organizations.the_eyeless_hand,
      status: 'active',
      rank: 'Bounty Hunter',
    },
  ],
  notes: [
    ['A recurring adventurer.'],
    ['She travels with potion deliveries and is trusted to make official deliveries.'],
    [
      'Earlier notes referred to the player or character as “Afienna”; Fix is the confirmed character name.',
    ],
  ],
  background: [
    [
      'A bounty hunter sent by ',
      refs.organizations.the_eyeless_hand,
      ' to find ',
      refs.pcs.jim,
      '. She is actively hunting him.',
    ],
    [
      'She made a deal with an unidentified organization of necromancers. That deal is how she came under the control of ',
      refs.npcs.the_father,
      ', who raises the dead through them. Players suspect the necromancer connection prevented her from receiving a normal guild tattoo. They are right, but the player characters do not know it, and nobody at the table knows the Father is behind it.',
    ],
    [
      'The tattoo of the ',
      refs.organizations.adventurers_guild,
      ' does not take on someone the Father already controls, so hers is fake and gives her none of its protection. The shadow that revived her in ',
      refs.events.n2_e057,
      ' was the deal at work.',
    ],
  ],
})
