import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Hex loses patience',
  location: refs.locations.fajanet_guildhall,
  npcs: [refs.npcs.hex],
  setup: [
    [
      refs.npcs.hex,
      ' is waiting in the guildhall the party goes to on the advice of ',
      refs.npcs.onana_tempest,
      ' in ',
      refs.scenes.onana_sends_the_party_on,
      '. They have been members for a while and still have not asked ',
      refs.npcs.light_13th_marshal,
      ' a single hard question.',
    ],
    [
      'What the party does not know is in the motivations of ',
      refs.npcs.hex,
      ' and the background of the ',
      refs.organizations.adventurers_guild,
      '. ',
      refs.npcs.hex,
      ' was let in only recently, remembers standing where the party stands now, and may not explain anything.',
    ],
  ],
  beats: [
    {
      title: 'Why are you not asking?',
      lines: [
        {
          do: [
            [
              refs.npcs.hex,
              ' listens to the party talk about their latest job, and finally cannot keep quiet.',
            ],
          ],
        },
        {
          speaker: refs.npcs.hex,
          say: [
            [
              'Do you really think that by going on simple adventures you are truly fulfilling the agenda of ',
              refs.npcs.light_13th_marshal,
              '?',
            ],
            ['Do you think the adventurers’ guild is all there is?'],
            [
              'You must have heard by now that ',
              refs.npcs.light_13th_marshal,
              ' is not allowed to have land, and can’t travel. Why are you not asking questions?!',
            ],
          ],
        },
        {
          note: [
            [
              'That is all the help they get. The last line hands them their first question; let them pick it up themselves.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiConversation',
          when: [['They ask ', refs.npcs.hex, ' what is really going on.']],
          response: [
            [
              refs.npcs.hex,
              ' shakes their head: it is not theirs to tell, and they would not be believed anyway. “Ask him. He is waiting for you to.”',
            ],
          ],
        },
        {
          icon: 'gi/GiPathDistance',
          when: [['They decide to go and ask.']],
          response: [
            [
              refs.npcs.light_13th_marshal,
              ' first wishes to speak to ',
              refs.pcs.auren,
              ' alone: run ',
              refs.scenes.light_walks_auren_through_fajanet,
              '. Once ',
              refs.pcs.auren,
              ' passes, run ',
              refs.scenes.questions_for_light,
              '.',
            ],
          ],
        },
        {
          icon: 'gi/GiShrug',
          when: [['They laugh it off, or take offence.']],
          response: [
            [
              refs.npcs.hex,
              ' shrugs and lets it go. The questions stay with the party, and ',
              refs.npcs.light_13th_marshal,
              ' keeps waiting.',
            ],
          ],
        },
      ],
    },
  ],
})
