import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'A local gang describes the Tempest siblings',
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiChecklist' },
  notes: [
    [
      'The party stopped a local criminal to ask about the ',
      refs.organizations.tempest_family,
      ' and met the ',
      refs.npcs.skynet_gang_leader,
      ', ',
      refs.npcs.brodus,
      ' and ',
      refs.npcs.bart,
      '. They offered Arcane Dust and claimed it could grant temporary magical abilities. No purchase or use was recorded.',
    ],
    [
      'They described ',
      refs.npcs.selene_tempest,
      ', ',
      refs.npcs.anton_tempest,
      ', and ',
      refs.npcs.rudolf_tempest,
      '. They said the artificer had survived an accident, but did not know whether he still practiced his craft. They disagreed with ',
      refs.npcs.onana_tempest,
      ' about which sibling was youngest.',
    ],
    [
      'The gang said ',
      refs.npcs.tempest_patriarch,
      ' controlled enough trade to halt cargo for years. They did not know every sibling or identify a reliable successor.',
    ],
    [
      'They said ',
      refs.npcs.brend_tempest,
      ' employed them for debt collection, kidnapping, and violence. They disliked ',
      refs.npcs.anton_tempest,
      ", who had tried to buy them out of crime, but were reluctant to act against their patron's family without his approval.",
    ],
  ],
})
