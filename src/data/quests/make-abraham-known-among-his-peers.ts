import { refs } from '#/data/generated/refs.ts'
import { create as createQuest } from '#/definitions/quest.ts'

export default createQuest({
  name: 'Make Abraham Known Among His Peers',
  icon: 'gi/GiLaurels',
  notes: [[refs.pcs.jim, ' must help ', refs.npcs.abraham, ' gain recognition from his peers.']],
  status: 'open',
  clues: [
    [
      refs.events.n2_e056,
      ': Jim promised to seek out Abraham’s peers and spread stories of his heroic acts. The peers are unidentified and no deadline was set.',
    ],
    [
      refs.events.n2_e039,
      ': Abraham’s first recorded rescue carried the party away from pursuing dinosaurs.',
    ],
    [
      refs.events.n2_e054,
      ': Abraham’s second recorded rescue carried the party out of ShadowPeak, although Jim’s stampede caused innocent casualties.',
    ],
    ['If Jim fails, Abraham has threatened to stampede him or bite off one of his fingers.'],
  ],
  conclusion: [],
})
