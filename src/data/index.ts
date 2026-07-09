import quests from '#/data/quests/_index.ts'
import { refs } from '#/data/refs.ts'
import sessions from '#/data/sessions/_index.ts'
import { create as createCampaign } from '#/definitions/campaign.ts'

export default createCampaign({
  name: 'The Lost Hope',
  notes: [
    [
      'A homebrew D&D 5e campaign. The pitch, cleaned up, is the call to adventure that hooks the party:',
    ],
    [
      'In a world of different lives, some heroes are not born but made. Lost as to wander, a letter arrives…',
    ],
    [
      'Dear Adventurer, My name is ',
      refs.npcs.third_marshal_light,
      ', the Guildmaster of ',
      refs.locations.fajanet,
      ' and the Citadel of Reve. I humbly invite you to become one of my adventurers. I need strong-willed wanderers to go on an adventure. I will await your arrival.',
    ],
    [
      '— ',
      refs.npcs.third_marshal_light,
      ', Guildmaster of ',
      refs.locations.fajanet,
      ' and the Citadel of Reve',
    ],
  ],
  pitch: [
    ['The Campaign Pitch'],
    [
      'In a world of different lives, some heroes are not born but made. Lost as to wander, a letter arrives with the following contents:',
    ],
    ['5 GP'],
    ['Dear Adventurer,'],
    [
      'My name is ',
      refs.npcs.third_marshal_light,
      ', the Guildmaster of ',
      refs.locations.fajanet,
      ' and the Citadel of Reve. I humbly invite you to become one of my adventurers. I need strong-willed wanderers to go on an adventure. I will await your arrival.',
    ],
    [
      '— ',
      refs.npcs.third_marshal_light,
      ', Guildmaster of ',
      refs.locations.fajanet,
      ' and the Citadel of Reve',
    ],
    ['Cleaned version (for in-world use):'],
    [
      'Dear Adventurer, My name is Light, the Guildmaster of Fajanet and the Citadel of Reve. I humbly invite you to become one of my adventurers. I need strong-willed wanderers to go on an adventure. I will await your arrival. — Light, Guildmaster of Fajanet and the Citadel of Reve. (5 gold pieces enclosed.)',
    ],
    ['Original (verbatim, with errors):'],
    [
      "in a world of different lifes , some heroes are not born but made , lost as to wander a letter arrives with the following contents : 5 GP + Dear adventure my name is Light the guildmaster of fajanet and The citadel of Reve i humbly invite you to become one of my adventures i need strong willed wanders to go on a adventure i'll await your arival.",
    ],
    ['Spelling corrections applied:'],
    ['lifes → lives (plural of "life")'],
    ['Dear adventure → Dear Adventurer (addressee; capitalized as a proper address)'],
    ['my adventures → my adventurers (noun, not verb)'],
    ['wanders → wanderers (missing "-er")'],
    ['a adventure → an adventure (article agreement, vowel sound)'],
    ['arival → arrival (transposed letters)'],
    ['New canon introduced:'],
    [
      refs.npcs.third_marshal_light,
      ' — Guildmaster, first NPC the PCs ever encountered (in the fiction of the call-to-adventure).',
    ],
    [
      refs.locations.fajanet,
      ' — a city, seat of the guild; also called the Citadel of Reve, land of the 13th Marshal. "Reve" (French for "dream") may be a clue.',
    ],
    ['5 GP — the reward/incentive in the letter; treat as a campaign artifact.'],
  ],
  quests: [
    quests.dino_migration,
    quests.jims_past,
    quests.mystery_girl,
    quests.rare_animal_dealer,
    quests.the_tentacle_night,
    quests.who_is_light,
  ],
  sessions: [
    sessions.arrival_in_fajanet,
    sessions.quests_for_the_exotic_animal_dealer,
    sessions.the_fajanet_festival,
    sessions.the_mountain_and_the_dragon_family,
    sessions.the_dinosaur_chase_to_badesh,
    sessions.by_boat_to_fairhaven,
  ],
})
