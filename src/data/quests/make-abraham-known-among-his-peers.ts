import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Make Abraham Known Among His Peers',
  icon: 'gi/GiLaurels',
  type: 'mission',
  notes: [[refs.pcs.jim, ' must help ', refs.npcs.abraham, ' gain recognition from his peers.']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e056,
      ': ',
      refs.pcs.jim,
      ' promised to seek out the peers of ',
      refs.npcs.abraham,
      ' and spread stories of his heroic acts. The peers are unidentified and no deadline was set.',
    ],
    [
      refs.events.n2_e039,
      ': ',
      refs.npcs.abraham,
      '’s first recorded rescue carried the party away from pursuing dinosaurs.',
    ],
    [
      refs.events.n2_e054,
      ': ',
      refs.npcs.abraham,
      '’s second recorded rescue carried the party out of ',
      refs.locations.shadowpeak,
      ', although ',
      refs.pcs.jim,
      '’s stampede caused innocent casualties.',
    ],
    [
      'If ',
      refs.pcs.jim,
      ' fails, ',
      refs.npcs.abraham,
      ' has threatened to stampede him or bite off one of his fingers.',
    ],
  ],
  conclusion: [],
})
