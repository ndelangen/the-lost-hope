import { refs } from '#/data/generated/refs.ts'
import { create as createScene } from '#/definitions/scene.ts'

export default createScene({
  name: 'Running from the battle-cruiser',
  location: refs.locations.skynet_nimbus_crossing,
  battleMaps: [refs.locations.beasts_and_dwarf_s_airship_decks, refs.locations.sky_bridge_ferry],
  npcs: [refs.npcs.corwin_hale, refs.npcs.captain_garran, refs.npcs.tempest_soldier],
  setup: [
    [
      'Halfway across to ',
      refs.locations.nimbus,
      ', a shadow slides over the deck. ',
      refs.items.master_of_puppets,
      ', a battle-cruiser of the ',
      refs.organizations.tempest_family,
      ' many times their size, has turned out of the cloud and is coming straight for them. A horn sounds, and its signal lamps flash one order: heave to. It does not wait for an answer.',
    ],
    [
      'Three rounds, three problems. Read each problem out and ask every player what their character does about it. Any sensible answer earns one check against the DC given. Put a token on the table for every grappling line that holds the vessel.',
    ],
    [
      'Round one, the hooks are cast. A volley of grappling hooks arcs across the gap. Can they evade? DC 13. Every failure is a hook that bites into the hull, and one more always lands whatever they roll. Place a token for each.',
    ],
    [
      'Round two, the hooks hold. The lines go taut, and the cruiser starts to winch them in. Can they get loose? DC 15, because the barbs are sunk deep. Every success takes a token away.',
    ],
    [
      'Round three, alongside. The cruiser draws level and blots out the sky. Forty soldiers stand at its rail, and boarding planks swing out. What do they do? This one is theirs to answer: see the outcomes.',
    ],
  ],
  notes: [
    [
      'This is a chase without a map. The tokens are the whole score, and the players can see them, so say out loud what each roll did to the lines.',
    ],
    [
      'Evading, round one: a ',
      refs.rules.dex,
      ' check at the helm to swerve, ',
      refs.rules.perception,
      ' to call the turn as the gunners fire, an attack against AC 15 to knock a hook out of the air, ',
      refs.rules.survival,
      ' or ',
      refs.rules.stealth,
      ' to drop into a cloud bank, ',
      refs.rules.arcana,
      ' to push the half-charged crystal. On the airship, retracting the mast leaves the hooks less to catch: the next check has advantage. A spell that plainly helps, such as fog or wind, succeeds without a roll.',
    ],
    [
      'Getting loose, round two: an attack against AC 15 to cut a line, ',
      refs.rules.athletics,
      ' to pry out a barb, ',
      refs.rules.acrobatics,
      ' to climb out along the hull, ',
      refs.rules.sleight_of_hand,
      ' to slip the hook, ',
      refs.rules.arcana,
      ' or fire on the rope. Nobody falls to their death: a character who fails by 5 or more over the side ends up dangling from a line and spends round three climbing back.',
    ],
    [
      'If ',
      refs.npcs.corwin_hale,
      ' is flying, he rolls each round too, with +5. ',
      refs.pcs.swift_starblade,
      ' is not aboard, so hand his player those rolls.',
    ],
    [
      'On the ferry the helmsman wants to obey the signal. Round one then starts with the party talking or forcing him out of it.',
    ],
    [
      'Wherever they point the bow, the crossing ends at ',
      refs.locations.nimbus,
      ': the half-charged crystal reaches no further, and neither does the ferry.',
    ],
  ],
  outcomes: [
    {
      when: [['They heave to, in any round.']],
      response: [
        [
          'The chase ends. The cruiser comes alongside gently, and ',
          refs.npcs.captain_garran,
          ' is at his friendliest. Run “Boarded by the battle-cruiser”.',
        ],
      ],
    },
    {
      when: [['They signal who they are.']],
      response: [
        [
          'The cruiser does not slow down, but ',
          refs.npcs.captain_garran,
          ' is at the rail waving by round three. Run “Boarded by the battle-cruiser” and start from the moment he recognises them.',
        ],
      ],
    },
    {
      when: [['Round three, they break away.']],
      response: [
        [
          'If lines still hold, each character first gets one last try at a line, DC 15. Then count the tokens.',
        ],
      ],
      followUps: [
        {
          when: [['No line holds them.']],
          response: [
            [
              'They skip the boarding. They slide out from under the cruiser and set down on the wrecked docks of ',
              refs.locations.nimbus,
              ' on their own terms. ',
              refs.pcs.swift_starblade,
              ' is there, and the party is whole again.',
            ],
            [
              refs.items.master_of_puppets,
              ' pursues and simply docks next to them. ',
              refs.npcs.captain_garran,
              ' walks down the gangway, more impressed than annoyed, recognises them, and asks all of them aboard for a word with ',
              refs.npcs.onana_tempest,
              '. His soldiers ring their vessel on the quay.',
            ],
            [
              'Skip “Boarded by the battle-cruiser” and run “',
              refs.npcs.onana_tempest,
              ' calls the party to war” with ',
              refs.pcs.swift_starblade,
              ' present.',
            ],
          ],
        },
        {
          when: [['A line still holds.']],
          response: [
            [
              'They are caught and reach ',
              refs.locations.nimbus,
              ' in tow with a scarred hull. Run “Boarded by the battle-cruiser”.',
            ],
          ],
        },
      ],
    },
    {
      when: [['Round three, they get ready to fight.']],
      response: [
        [
          'Each character gets one prepared action before the first soldiers land. Then run “Boarded by the battle-cruiser” with its combat notes.',
        ],
      ],
    },
    {
      when: [['Round three, they try something else.']],
      response: [
        [
          'Hiding below, bluffing, or jumping across to the cruiser all end the same way: ',
          refs.npcs.captain_garran,
          ' recognises them. Reward a good idea with his respect, then run “Boarded by the battle-cruiser”.',
        ],
      ],
    },
  ],
})
