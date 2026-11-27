import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Hex loses patience',
  location: refs.locations.rustmoor_guildhall,
  illustrations: ['/assets/scenes/hex-loses-patience.png'],
  npcs: [refs.npcs.hex, refs.npcs.sneeve],
  setup: [
    [
      refs.npcs.hex,
      ' is facilitating the construction of the guildhall the party goes to on the advice of ',
      refs.npcs.onana_tempest,
      ' in ',
      refs.scenes.onana_sends_the_party_on,
      '. They have been members for a while and still have not asked ',
      refs.npcs.light_13th_marshal,
      ' a single hard question.',
    ],
    [
      'The guildhall is not operational yet. Its booth has no standing connection to ',
      refs.locations.fajanet,
      ': establishing the portal is something only ',
      refs.npcs.light_13th_marshal,
      ' can do, and he is a very, very busy person. ',
      refs.locations.the_flying_whale,
      ', the ship of ',
      refs.npcs.sylvia,
      ', is in ',
      refs.locations.rustmoor,
      ' too.',
    ],
    [
      'It is the party’s second day in ',
      refs.locations.rustmoor,
      ', the day after the full moon. ',
      refs.pcs.auren,
      ' is not with them: ',
      refs.npcs.hex,
      ' fetched him in the night for ',
      refs.scenes.light_walks_auren_through_fajanet,
      '.',
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
      title: 'A busy guildhall',
      lines: [
        {
          do: [
            [
              refs.npcs.hex,
              ' greets the party, a bit happy to see them, but busy: the guildhall is going up around them. ',
              refs.npcs.sneeve,
              ' is running errands.',
            ],
          ],
        },
      ],
    },
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
              ' is not allowed to have land, and can’t travel.',
            ],
            ['WHEN ARE YOU GOING TO START ASKING QUESTIONS?!'],
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
              'From this guildhall the way to ask is the booth, and it opens only when ',
              refs.npcs.light_13th_marshal,
              ' establishes the portal. He does so once he is done with ',
              refs.pcs.auren,
              ': run ',
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
