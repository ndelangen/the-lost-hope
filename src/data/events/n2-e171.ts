import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Onana rewards the party and forbids further dungeon deaths',
  day: 24,
  location: refs.locations.tempest,
  mark: { type: 'icon', name: 'gi/GiTrade' },
  notes: [
    [
      refs.npcs.onana_tempest,
      ' said he owned the destroyed ',
      refs.locations.temple_of_the_serpent_eclipse,
      ' and asked how the party had killed it. They described breaking the crystal and releasing ',
      refs.npcs.sarogarth,
      '.',
    ],
    [
      'He described losses of 55,000 gold, a reconstruction estimate of 340,000 gold, and roughly ten years of work. After speaking with ',
      refs.npcs.light_13th_marshal,
      ' through the ',
      refs.organizations.adventurers_guild,
      ', he had accepted responsibility for the cost. The party would owe nothing for the destruction.',
    ],
    [
      'He doubled the normal dungeon reward for the unprecedented achievement and paid the party 1,000 gold. He permitted further dungeon clearing but forbade killing any more dungeons in the ',
      refs.locations.three_sky_kingdoms,
      '. A scribe recorded the discussion.',
    ],
    [
      'He also offered five platinum if the party could defeat all his colosseum fighters. They discussed entering, but no colosseum visit or fight occurred.',
    ],
  ],
})
