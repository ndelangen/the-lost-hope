import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The shipwright describes grievances against the Tempests',
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiDaggers' },
  notes: [
    [
      'While discussing the two favors owed for ',
      refs.items.beasts_and_dwarf_s_airship,
      ', ',
      refs.npcs.esia,
      ' raised grievances against ',
      refs.npcs.celeste_tempest,
      ' and ',
      refs.npcs.brend_tempest,
      '. She accused the former of owning slaves. Her explanation involving a fiancée or former partner is too unclear to resolve.',
    ],
    [
      'She accused ',
      refs.npcs.brend_tempest,
      ' of extortion, driving her father out of his shop and ruining the family. She linked the loss to her father dying young and discussed a change of surname. The party considered revenge against the nobles, but the precise tasks and targets of both favors were not settled.',
    ],
    [
      'The party also discussed ',
      refs.npcs.charles_tempest,
      ', though the shipwright said he was not her problem. No attack, killing, or completed favor occurred.',
    ],
  ],
})
