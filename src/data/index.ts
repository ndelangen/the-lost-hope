import { refs } from '#/data/generated/refs.ts'
import quests from '#/data/quests/_index.ts'
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
      refs.npcs.light_13th_marshal,
      ', the Guildmaster of ',
      refs.locations.fajanet,
      ' and the Citadel of Reve. I humbly invite you to become one of my adventurers. I need strong-willed wanderers to go on an adventure. I will await your arrival.',
    ],
    [
      '— ',
      refs.npcs.light_13th_marshal,
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
    [
      'The invitation also arrived with a package to open. The surviving message left its contents as an ellipsis, so what each adventurer received is unknown.',
    ],
    ['Dear Adventurer,'],
    [
      'My name is ',
      refs.npcs.light_13th_marshal,
      ', the Guildmaster of ',
      refs.locations.fajanet,
      ' and the Citadel of Reve. I humbly invite you to become one of my adventurers. I need strong-willed wanderers to go on an adventure. I will await your arrival.',
    ],
    [
      '— ',
      refs.npcs.light_13th_marshal,
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
      refs.npcs.light_13th_marshal,
      ' — Guildmaster, first NPC the PCs ever encountered (in the fiction of the call-to-adventure).',
    ],
    [
      refs.locations.fajanet,
      ' — a small settlement and guild seat, also called the Citadel of ',
      refs.locations.reve,
      '. Reve is the surrounding region, not a hidden clue.',
    ],
    ['5 GP — the reward/incentive in the letter; treat as a campaign artifact.'],
  ],
  houseRules: [
    ['Character creation'],
    [
      'Use the Player’s Handbook plus one additional source for character creation. Backstories may use the full fantasy setting.',
    ],
    [
      'Create characters who can work with the party rather than solitary wanderers; lone characters are difficult to involve in the campaign.',
    ],
    ['DM tokens'],
    ['The DM awards DM tokens for thinking outside the box, good solutions, and great roleplay.'],
    [
      'DM tokens can grant advantage on a roll or, when enough are saved, purchase uncommon, rare, legendary, or custom magic items. A custom item may grow in power with its owner.',
    ],
    ['Curse tokens'],
    [
      'Curse tokens reward decisions so disastrous that they create problems for the whole party. A player also receives one curse token for every 15 minutes they are late and for breaking character.',
    ],
    ['At the table'],
    [
      'Drinking a potion uses a bonus action. Natural 20s invite the rule of cool; natural 1s invite entertainingly bad consequences.',
    ],
    ['Both DM tokens and curse tokens are intended to create fun for different play styles.'],
  ],
  quests: [
    quests.bring_swift_s_sister_to_sylvia,
    quests.dino_migration,
    quests.the_cursed_sword,
    quests.the_fairhaven_invasion,
    quests.jims_past,
    quests.make_abraham_known_among_his_peers,
    quests.mystery_girl,
    quests.rare_animal_dealer,
    quests.the_tentacle_night,
    quests.who_is_giggles,
    quests.who_is_light,
  ],
  sessions: [
    sessions.arrival_in_fajanet,
    sessions.quests_for_the_exotic_animal_dealer,
    sessions.the_fajanet_festival,
    sessions.from_fajanet_to_fairhaven,
    sessions.fairhaven_shadows,
    sessions.fairhaven_fallout,
    sessions.heroes_and_rivals,
    sessions.the_fall_of_fairhaven,
    sessions.verdant_haven_to_shadowpeak,
    sessions.escape_from_shadowpeak,
    sessions.the_flying_bazaar,
    sessions.the_fiddlers_game,
  ],
})
