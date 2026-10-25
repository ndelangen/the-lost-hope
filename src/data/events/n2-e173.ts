import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Onana describes the Tempest family and debt slavery',
  day: 24,
  location: refs.locations.tempest,
  mark: { type: 'icon', name: 'gi/GiScales' },
  notes: [
    [
      refs.npcs.onana_tempest,
      ' said he had established the trading port on ',
      refs.locations.nimbus,
      '. He explained that an adventurer who stole entrusted goods could be enslaved for the resulting debt. He described his brother ',
      refs.npcs.charles_tempest,
      ' as setting up fraudulent jobs to acquire slaves.',
    ],
    [
      'He discussed the numerous siblings and internal rivalries of the ',
      refs.organizations.tempest_family,
      ', along with shipbuilding, golem workshops, and other magical industry on ',
      refs.locations.skynet,
      '.',
    ],
    [
      'Asked about reaching the ',
      refs.locations.feywild,
      ', he described a cloud bridge that opens at intervals. He said its appearances could be predicted with nearly ninety percent certainty, and discussed links to the moon. The party did not use the bridge.',
    ],
  ],
})
