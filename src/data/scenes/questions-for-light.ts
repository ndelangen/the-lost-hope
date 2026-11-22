import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Questions for Light',
  location: refs.locations.fajanet_guildhall,
  npcs: [refs.npcs.light_13th_marshal],
  setup: [
    [
      'The party comes to ',
      refs.npcs.light_13th_marshal,
      ' with questions of their own. He has been waiting for this, and it is the first part of his test. What is true behind every answer is in his background and that of the ',
      refs.organizations.adventurers_guild,
      '.',
    ],
    [
      'It mirrors ',
      refs.scenes.light_walks_auren_through_fajanet,
      ', where he only asked. Here he only answers: exactly what he is asked, truthfully, and nothing more. A vague question gets a small answer and a sharp one gets a lot. A question they have not earned yet he meets with a question of his own.',
    ],
    [
      'There is no order to this scene. Let the players lead, and play whichever answer below fits what they ask. The second part of the test is not worked out yet.',
    ],
  ],
  beats: [
    {
      title: 'He does not look up',
      lines: [
        {
          do: [
            [
              refs.npcs.light_13th_marshal,
              ' sits behind stacks of paper, writing. He keeps writing while the party files in.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['You have come to ask me something.']],
        },
        {
          note: [
            [
              'Keep his answers short. Let him glance at his desk, and let his hand drift back to the pen between questions. He is friendly, never defensive, and never fills a silence.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Back to work',
      lines: [
        {
          note: [
            [
              'He ends the meeting himself, kindly, once they have what their questions earned or the questions turn idle.',
            ],
          ],
        },
        {
          speaker: refs.npcs.light_13th_marshal,
          say: [['I had better get back to my work. Come back when you have better questions.']],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiDoubleFaceMask',
      when: [[refs.pcs.cassian_veyl, ' asks what he meant by “a necessary evil”.']],
      response: [
        [
          '“I make the thing that is poisoning the world, and I hand it to the twelve who burn it.” He stops there.',
        ],
      ],
      followUps: [
        {
          icon: 'gi/GiConversation',
          when: [['They ask why he does it.']],
          response: [['“Because I stopped once.” If they ask what happened, see “Why not stop?”.']],
        },
      ],
    },
    {
      icon: 'gi/GiPrisoner',
      when: [['They ask why he may not own land or travel.']],
      response: [['“Twelve armies agreed on one thing in their lives: that I stay here.”']],
      followUps: [
        {
          icon: 'gi/GiOpenGate',
          when: [['They ask what happens if he leaves.']],
          response: [['“They stop getting what I give them, and they come to take it.”']],
        },
      ],
    },
    {
      icon: 'gi/GiSecretBook',
      when: [['They ask whether the guild is all there is.']],
      response: [['“No. You are in the part that anyone can join.”']],
      followUps: [
        {
          icon: 'gi/GiPointing',
          when: [['They ask what the other part is for.']],
          response: [
            [
              'He tells them plainly what he needs people for, and watches their faces while he does. How they take it matters more to him than what they say.',
            ],
          ],
        },
      ],
    },
    {
      icon: 'gi/GiCancel',
      when: [['They ask why he does not simply stop.']],
      response: [['“I did, once.”']],
      followUps: [
        {
          icon: 'gi/GiFlyingFlag',
          when: [['They ask what happened.']],
          response: [
            [
              'He tells them about the invasion and how he gave in. This is his strongest card, and he plays it only when asked.',
            ],
          ],
        },
      ],
    },
    {
      icon: 'gi/GiMagnifyingGlass',
      when: [['They ask what he is always writing.']],
      response: [['“Everyone who uses it. While I remember them, they are not lost.”']],
      followUps: [
        {
          icon: 'gi/GiHourglass',
          when: [['They ask what happens while he is not writing.']],
          response: [
            [
              '“Then this conversation has a price, and you are not the ones paying it.” This is the big one. Let it land, let them count back how long they have kept him talking, and go to “Back to work” soon after.',
            ],
          ],
        },
      ],
    },
    {
      icon: 'gi/GiPuzzle',
      when: [['They come angry, holding up the warning ', refs.pcs.jim, ' left them.']],
      response: [
        [
          'He does not defend himself. “',
          refs.pcs.jim,
          ' asked better questions than you have so far. Ask me what he asked.”',
        ],
      ],
    },
    {
      icon: 'gi/GiHoodedFigure',
      when: [['They ask who ', refs.npcs.the_father, ' is.']],
      response: [
        [
          '“A recruit who asked the right questions and drew the wrong conclusion.” No more than that.',
        ],
      ],
    },
    {
      icon: 'gi/GiSunrise',
      when: [['They ask how he means it to end.']],
      response: [
        [
          'They have not earned this one. He answers with a question: “What would you give up to end it?” and listens to each of them.',
        ],
      ],
    },
  ],
})
