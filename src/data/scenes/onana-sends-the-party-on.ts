import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Onana sends the party on',
  location: refs.locations.master_of_puppets_commanders_office,
  illustrations: ['/assets/scenes/onana-sends-the-party-on.png'],
  npcs: [refs.npcs.onana_tempest],
  setup: [
    [
      'The war was a defeat for the ',
      refs.organizations.tempest_family,
      '. Most of its warships are destroyed and ',
      refs.locations.nimbus,
      ' is badly damaged. Nobody could catch the flying fortress, and it is out of view. The family will rebuild, but it will take time.',
    ],
    [
      'The sky islands are too busy for visitors. Everyone is making repairs, and the islands are switching to a war economy: shops are closing down, the shipyard is expanding, and people are turning to making war assets.',
    ],
    [
      'The party handed ',
      refs.items.ride_the_lightning,
      ' over in ',
      refs.scenes.garran_comes_for_the_cruiser,
      '. ',
      refs.npcs.onana_tempest,
      ' sees them once more in his office aboard ',
      refs.items.master_of_puppets,
      '.',
    ],
    [
      'Where this goes is settled: they leave the sky islands on their own ship and head for the nearest guildhall of the ',
      refs.organizations.adventurers_guild,
      ', which ',
      refs.npcs.onana_tempest,
      ' says is to the north, in ',
      refs.locations.rustmoor,
      '. The wording of his lines and the answers to their questions are a draft: say them in your own words.',
    ],
  ],
  beats: [
    {
      title: 'Get out of here',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [['Get out of here. We’ll be rebuilding for a while.']],
        },
        {
          note: [
            [
              'He means it kindly. There is nothing left for them to do here: ',
              refs.locations.nimbus,
              ' is rubble, and the yards will be rebuilding the fleet for months.',
            ],
          ],
        },
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              'Look out of the window. Every pair of hands on these islands is patching a hull or making shot. The shops are shutting, and the shipyard is growing. There is little here for people like you, not for a long while.',
            ],
            ['You are welcome back, whenever you like. Just not to stay, not now.'],
          ],
        },
        {
          note: [
            [
              'Both are settled: there is very little for them to do on the sky islands, and they are welcome back.',
            ],
          ],
        },
      ],
    },
    {
      title: 'Little Purple, as she is',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              'You’ll have your ship back. I hope you don’t mind that we already started to ready it for combat. You can have it as-is.',
            ],
          ],
        },
        {
          do: [
            [
              refs.beasts.wolfie,
              ' and ',
              refs.npcs.crowy,
              ' are aboard ',
              refs.items.little_purple,
              ': they slept through the end of the battle somewhere in ',
              refs.locations.nimbus,
              ', and the crew of ',
              refs.npcs.onana_tempest,
              ' found them and brought them aboard. ',
              refs.beasts.sir_fabulous,
              ' is aboard too, where the party left him.',
            ],
          ],
        },
        {
          note: [
            [
              'His crew got as far as two more cannons, four in all, and one man-cannon: a boarding torpedo tube like the one the party rode in ',
              refs.scenes.boarding_ride_the_lightning,
              '. The man-cannon came at the cost of cabin space and storage. She has no extra armour.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A debt',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              'The ',
              refs.organizations.tempest_family,
              ' owes you a debt for returning ',
              refs.items.ride_the_lightning,
              ' to us.',
            ],
            ['But the real reward is it not falling into enemy hands.'],
          ],
        },
      ],
    },
    {
      title: 'A word of advice',
      lines: [
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            ['A word of advice, if you will have it: go to a guildhall.'],
            [
              'The nearest hall of the ',
              refs.organizations.adventurers_guild,
              ' is to the north, in ',
              refs.locations.rustmoor,
              '. Take your ship and go.',
            ],
          ],
        },
        {
          note: [
            [
              'This is the hook, and the one thing he must get across. There is no guildhall on the sky islands, so it sends them off the islands.',
            ],
            [
              'Why he cares is in his motivations: he is an ally of ',
              refs.npcs.light_13th_marshal,
              ' and thinks the party may be ready for his test. He does not say so. The letter he gives them, below, lets them work it out.',
            ],
          ],
        },
        {
          do: [
            [
              'Let them ask questions. The likely ones are below; he answers briefly, because he has a fleet to rebuild.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiPathDistance',
          when: [['They ask what ', refs.locations.rustmoor, ' is.']],
          response: [
            [
              '“A town of scavengers on the edge of ',
              refs.locations.the_old_battlefield,
              '. They pick the old wrecks clean and sell what still works. You will not find it pretty.”',
            ],
          ],
        },
        {
          icon: 'gi/GiPointing',
          when: [['They ask how to get there, or how far it is.']],
          response: [
            ['“North. Keep the islands behind you and you cannot miss the coast.”'],
            [
              'Keep the distance vague. They will not fly straight there: dusk falls and they lose their bearings, which leads into ',
              refs.scenes.a_fleet_on_an_empty_sea,
              '.',
            ],
          ],
        },
        {
          icon: 'gi/GiConversation',
          when: [['They ask what the guildhall there is like.']],
          response: [
            [
              '“New. Last I heard they were still building it.” He does not know more, and does not pretend to.',
            ],
            [
              'If they ask ',
              refs.npcs.crowy,
              ', he knows a little more: “Still under construction. It will be operational soon, though. Good choice.” That is all he knows.',
            ],
          ],
        },
        {
          icon: 'gi/GiAirZigzag',
          when: [['They ask where the fortress went.']],
          response: [
            ['“North. Then it dropped into the clouds.”'],
            [
              'That is all anyone saw. It is the same way he is sending them, so flying north can be the party chasing ',
              refs.pcs.jim,
              ' as well as leaving.',
            ],
          ],
        },
        {
          icon: 'gi/GiShrug',
          when: [['They ask why there is no guildhall on the sky islands.']],
          response: [
            ['“There was one, once. That is a long story, and not one for today.”'],
            [
              'Leave it there. Why it closed is not settled. His letter for ',
              refs.npcs.light_13th_marshal,
              ', below, hints that he wants one back.',
            ],
          ],
        },
        {
          icon: 'gi/GiHand',
          when: [['They offer to stay and help rebuild.']],
          response: [
            ['“What we need now is hammers and coin, not heroes. You have done your part. Go.”'],
          ],
        },
        {
          icon: 'gi/GiWoodenCrate',
          when: [['They want to buy supplies before they leave.']],
          response: [
            [
              'Most shops are shut, or selling only to the shipyard now. What they can still find is your call; keep it to basics, and pricey.',
            ],
          ],
        },
        {
          icon: 'gi/GiTakeMyMoney',
          when: [['They ask what the debt is worth, or when it will be paid.']],
          response: [
            [
              '“When we are on our feet again, the family will remember. Come back then.” He promises nothing more today.',
            ],
          ],
        },
        {
          icon: 'gi/GiMagnifyingGlass',
          when: [['They ask why he questioned them in the Zone of Truth.']],
          response: [
            ['“A friend asked me to. If he wants you to know why, he will tell you himself.”'],
            [
              'The friend is ',
              refs.npcs.light_13th_marshal,
              '. He does not name him. The letter he hands them, below, gives it away if they read it.',
            ],
          ],
        },
        {
          icon: 'gi/GiSecretBook',
          when: [
            [
              'They doubt the guild, or ',
              refs.npcs.light_13th_marshal,
              ', after ',
              refs.pcs.jim,
              '’s warning.',
            ],
          ],
          response: [
            [
              '“He is a friend of my family. I have no reason to doubt him.” He does not argue the point and does not ask what they were told.',
            ],
          ],
        },
      ],
    },
    {
      title: 'A letter for Light',
      lines: [
        {
          do: [['He hands them a sealed letter addressed to ', refs.npcs.light_13th_marshal, '.']],
        },
        {
          speaker: refs.npcs.onana_tempest,
          say: [
            [
              'One more thing. I want this delivered to ',
              refs.npcs.light_13th_marshal,
              '. Personally delivered: into his hands, not left at a desk.',
            ],
          ],
        },
        {
          note: [
            [
              'This is the one letter of ',
              refs.npcs.onana_tempest,
              '. On this road it comes by his hand. If they had run with the cruiser, he would have sent it, worded a little differently, to ',
              refs.locations.fajanet,
              ' with ',
              refs.items.little_purple,
              ': see ',
              refs.scenes.garran_comes_for_the_cruiser,
              '.',
            ],
            [
              'It is a second reason to go to a guildhall: its booth carries one person to the office of ',
              refs.npcs.light_13th_marshal,
              '. In ',
              refs.locations.rustmoor,
              ' that booth is not connected yet, as in ',
              refs.scenes.hex_loses_patience,
              '.',
            ],
          ],
        },
      ],
      outcomes: [
        {
          icon: 'gi/GiFeatheredWing',
          when: [['They ask why ', refs.npcs.crowy, ' cannot take it.']],
          response: [['“Some things should not travel in a bird’s stomach.”']],
        },
        {
          icon: 'gi/GiSecretBook',
          when: [['They break the seal and read it.']],
          response: [
            ['Read it to them evenly, without comment:'],
            ['“To the 13th Marshal Light, from Onana Tempest.'],
            ['Dear ally,'],
            [
              'I regret to inform you our nation has suffered a defeat against ',
              refs.organizations.the_eyeless_hand,
              '. And that during this attack one of your guild’s members has been lost.',
            ],
            [
              'The bearers of this letter are the party I observed, as requested. They returned ',
              refs.items.ride_the_lightning,
              ' to us, as they promised. They have shown courage, strength and a strong mind. Attached you will see their answers to the questions you wished me to ask. It is my humble opinion they might be ready to endure your test.',
            ],
            ['Whilst we rebuild, perhaps we could renegotiate having a guildhall here, again.”'],
            [
              'A broken seal cannot be hidden. ',
              refs.npcs.light_13th_marshal,
              ' will see it when they hand it over.',
            ],
          ],
        },
      ],
    },
  ],
  outcomes: [
    {
      icon: 'gi/GiSunset',
      when: [
        ['They want to follow the smoke trail from ', refs.events.n2_e203, ' after the fortress.'],
      ],
      response: [
        [
          'Significant time has passed since they gave up the cruiser. The sun is setting, and it is getting too dark to follow trails of smoke.',
        ],
        [
          'They also need to get their bearings first: they spent some time aboard the ship, and it moved and turned a lot.',
        ],
        [
          'The smoke tracks ',
          refs.npcs.the_fiddler,
          ', and he is no longer aboard the fortress. The trail does not lead there any more.',
        ],
        [
          'If they fly off the islands after it anyway, run ',
          refs.scenes.a_fleet_on_an_empty_sea,
          '.',
        ],
      ],
    },
    {
      icon: 'gi/GiFeatheredWing',
      when: [['They take the advice and fly north.']],
      response: [
        [
          'Run ',
          refs.scenes.a_fleet_on_an_empty_sea,
          ' on the flight. ',
          refs.npcs.hex,
          ' is waiting in the guildhall of ',
          refs.locations.rustmoor,
          ': ',
          refs.scenes.hex_loses_patience,
          ' comes after it.',
        ],
      ],
    },
  ],
})
