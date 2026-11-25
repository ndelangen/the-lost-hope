export const libraryTypes = {
  items: 'Items',
  monsters: 'Monsters',
  beasts: 'Beasts',
  species: 'Playable species',
  ideas: 'Encounter ideas',
} as const

export type SrdVersion = 'srd-5-1' | 'srd-5-2-1'
export type LibraryType = keyof typeof libraryTypes
export type LibrarySection = { title: string; lines: readonly string[] }
type LibraryPrinting = {
  id: SrdVersion | 'original'
  label: string
  gm: readonly LibrarySection[]
}
type LibraryRecord = {
  type: LibraryType
  slug: string
  name: string
  summary: string
  group: string
  gmOnly?: true
  printings: readonly [LibraryPrinting, ...LibraryPrinting[]]
}

export const publishedLibrary: readonly LibraryRecord[] = [
  {
    type: 'items',
    slug: 'bag-of-holding',
    name: 'Bag of Holding',
    summary: 'A magic bag that holds much more than its outer dimensions suggest.',
    group: 'Adventuring gear',
    printings: [
      {
        id: 'srd-5-1',
        label: 'SRD 5.1',
        gm: [
          {
            title: 'Capacity and handling',
            lines: [
              'The bag can carry up to 500 pounds and 64 cubic feet. It weighs 15 pounds regardless of what it holds.',
              'Taking an item out requires an action. Overloading, piercing, or tearing the bag destroys it and scatters its contents into the Astral Plane.',
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'monsters',
    slug: 'owlbear',
    name: 'Owlbear',
    summary: 'A large, feathered predator with an owl’s head and the body of a bear.',
    group: 'Monstrosities',
    printings: [
      {
        id: 'srd-5-1',
        label: 'SRD 5.1',
        gm: [
          {
            title: 'Combat',
            lines: [
              'AC 13 · HP 59 (7d10 + 21) · Speed 40 ft. · CR 3',
              'STR 20, DEX 12, CON 17, INT 3, WIS 12, CHA 7.',
              'Perception +3, darkvision 60 ft., passive Perception 13. Advantage on Perception checks relying on sight or smell.',
              'Multiattack. Make one Beak attack and one Claws attack. Both are +7 to hit with 5 ft. reach. Beak deals 10 (1d10 + 5) piercing. Claws deal 14 (2d8 + 5) slashing.',
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'beasts',
    slug: 'wolf',
    name: 'Wolf',
    summary: 'A swift pack hunter that tracks prey by sound and scent.',
    group: 'Beasts',
    printings: [
      {
        id: 'srd-5-1',
        label: 'SRD 5.1',
        gm: [
          {
            title: 'Combat',
            lines: [
              'AC 13 · HP 11 (2d8 + 2) · Speed 40 ft. · CR 1/4',
              'STR 12, DEX 15, CON 12, INT 3, WIS 12, CHA 6.',
              'Perception +3, Stealth +4, passive Perception 13. Advantage on Perception checks relying on hearing or smell.',
              'Pack Tactics. Has advantage on an attack against a creature if an ally of the wolf is within 5 ft. of that creature and is not incapacitated.',
              'Bite. +4 to hit, reach 5 ft. A hit deals 7 (2d4 + 2) piercing damage. A creature hit must make a DC 11 Strength save or fall prone.',
            ],
          },
        ],
      },
      {
        id: 'srd-5-2-1',
        label: 'SRD 5.2.1',
        gm: [
          {
            title: 'Combat',
            lines: [
              'AC 12 · HP 11 (2d8 + 2) · Speed 40 ft. · Initiative +2 (12) · CR 1/4',
              'STR 14, DEX 15, CON 12, INT 3, WIS 12, CHA 6.',
              'Perception +5, Stealth +4, darkvision 60 ft., passive Perception 15.',
              'Pack Tactics. Has advantage on an attack against a creature if an ally of the wolf is within 5 ft. of that creature and is not incapacitated.',
              'Bite. +4 to hit, reach 5 ft. A hit deals 5 (1d6 + 2) piercing damage. A Medium or smaller creature hit has the Prone condition.',
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'species',
    slug: 'dwarf',
    name: 'Dwarf',
    summary:
      'A playable people with darkvision, resistance to poison, and a knack for examining stonework.',
    group: 'Playable species',
    printings: [{ id: 'srd-5-1', label: 'SRD 5.1', gm: [] }],
  },
  {
    type: 'ideas',
    slug: 'the-split-trail',
    name: 'The Split Trail',
    summary: 'An encounter idea for a woodland journey.',
    group: 'Wilderness',
    gmOnly: true,
    printings: [
      {
        id: 'original',
        label: 'Original encounter idea',
        gm: [
          {
            title: 'Setup',
            lines: [
              'Two trails lead away from a torn pack. One carries the tracks of a wounded stag. The other has prints from a wolf that separated from its pack.',
              'Following the stag leads to a stream crossing and time to help it. Following the wolf gives the party a chance to surprise the pack before it circles back.',
            ],
          },
        ],
      },
    ],
  },
]
