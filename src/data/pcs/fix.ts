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
      organization: refs.organizations.the_eyeless_hand,
      status: 'active',
      rank: 'Bounty Hunter',
    },
    {
      organization: refs.organizations.lucky_palm,
      status: 'active',
      rank: 'Member',
    },
  ],
  notes: [
    ['A recurring adventurer.'],
    [
      'Secret: a bounty hunter sent by ',
      refs.organizations.the_eyeless_hand,
      ' to find ',
      refs.pcs.jim,
      '. She is actively hunting him.',
    ],
    [
      'Secret: the DM has stated that she has a special connection to an unidentified organization of necromancers. Players suspect this connection prevented her from receiving a normal guild tattoo, but that explanation is unconfirmed and the player characters do not know about it.',
    ],
    ['She travels with potion deliveries and is trusted to make official deliveries.'],
    [
      'Earlier notes referred to the player or character as “Afienna”; Fix is the confirmed character name.',
    ],
  ],
})
