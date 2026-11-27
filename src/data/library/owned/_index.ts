import type { OwnedCreature } from '#/lib/owned-creature'

import arcana_unleashed__battle_familiar from './arcana-unleashed/battle-familiar.ts'
import arcana_unleashed__dinosaur_spirit from './arcana-unleashed/dinosaur-spirit.ts'
import arcana_unleashed__plant_spirit from './arcana-unleashed/plant-spirit.ts'
import arcana_unleashed__vestige_companion from './arcana-unleashed/vestige-companion.ts'
import dragonlance_shadow_of_the_dragon_queen__andir_valmakos from './dragonlance-shadow-of-the-dragon-queen/andir-valmakos.ts'
import dragonlance_shadow_of_the_dragon_queen__ayik_ur from './dragonlance-shadow-of-the-dragon-queen/ayik-ur.ts'
import dragonlance_shadow_of_the_dragon_queen__hrigg_roundrook from './dragonlance-shadow-of-the-dragon-queen/hrigg-roundrook.ts'
import dragonlance_shadow_of_the_dragon_queen__iriad from './dragonlance-shadow-of-the-dragon-queen/iriad.ts'
import dragonlance_shadow_of_the_dragon_queen__levna_drakehorn from './dragonlance-shadow-of-the-dragon-queen/levna-drakehorn.ts'
import dragonlance_shadow_of_the_dragon_queen__tem_temble from './dragonlance-shadow-of-the-dragon-queen/tem-temble.ts'
import eberron_forge_of_the_artificer__homunculus_servant from './eberron-forge-of-the-artificer/homunculus-servant.ts'
import eberron_forge_of_the_artificer__steel_defender from './eberron-forge-of-the-artificer/steel-defender.ts'
import fizban_s_treasury_of_dragons__draconic_spirit from './fizban-s-treasury-of-dragons/draconic-spirit.ts'
import fizban_s_treasury_of_dragons__drake_companion from './fizban-s-treasury-of-dragons/drake-companion.ts'
import player_s_handbook_2024__aberrant_spirit from './player-s-handbook-2024/aberrant-spirit.ts'
import player_s_handbook_2024__animated_object from './player-s-handbook-2024/animated-object.ts'
import player_s_handbook_2024__beast_of_the_land from './player-s-handbook-2024/beast-of-the-land.ts'
import player_s_handbook_2024__beast_of_the_sea from './player-s-handbook-2024/beast-of-the-sea.ts'
import player_s_handbook_2024__beast_of_the_sky from './player-s-handbook-2024/beast-of-the-sky.ts'
import player_s_handbook_2024__bestial_spirit from './player-s-handbook-2024/bestial-spirit.ts'
import player_s_handbook_2024__celestial_spirit from './player-s-handbook-2024/celestial-spirit.ts'
import player_s_handbook_2024__construct_spirit from './player-s-handbook-2024/construct-spirit.ts'
import player_s_handbook_2024__draconic_spirit from './player-s-handbook-2024/draconic-spirit.ts'
import player_s_handbook_2024__elemental_spirit from './player-s-handbook-2024/elemental-spirit.ts'
import player_s_handbook_2024__fey_spirit from './player-s-handbook-2024/fey-spirit.ts'
import player_s_handbook_2024__fiendish_spirit from './player-s-handbook-2024/fiendish-spirit.ts'
import player_s_handbook_2024__giant_insect from './player-s-handbook-2024/giant-insect.ts'
import player_s_handbook_2024__otherworldly_steed from './player-s-handbook-2024/otherworldly-steed.ts'
import player_s_handbook_2024__undead_spirit from './player-s-handbook-2024/undead-spirit.ts'
import ravenloft_the_horrors_within__reanimated_companion from './ravenloft-the-horrors-within/reanimated-companion.ts'
import srd_5_2_1__giant_insect from './srd-5-2-1/giant-insect.ts'
import tasha_s_cauldron_of_everything__aberrant_spirit from './tasha-s-cauldron-of-everything/aberrant-spirit.ts'
import tasha_s_cauldron_of_everything__beast_of_the_land from './tasha-s-cauldron-of-everything/beast-of-the-land.ts'
import tasha_s_cauldron_of_everything__beast_of_the_sea from './tasha-s-cauldron-of-everything/beast-of-the-sea.ts'
import tasha_s_cauldron_of_everything__beast_of_the_sky from './tasha-s-cauldron-of-everything/beast-of-the-sky.ts'
import tasha_s_cauldron_of_everything__bestial_spirit from './tasha-s-cauldron-of-everything/bestial-spirit.ts'
import tasha_s_cauldron_of_everything__celestial_spirit from './tasha-s-cauldron-of-everything/celestial-spirit.ts'
import tasha_s_cauldron_of_everything__construct_spirit from './tasha-s-cauldron-of-everything/construct-spirit.ts'
import tasha_s_cauldron_of_everything__dancing_item from './tasha-s-cauldron-of-everything/dancing-item.ts'
import tasha_s_cauldron_of_everything__elemental_spirit from './tasha-s-cauldron-of-everything/elemental-spirit.ts'
import tasha_s_cauldron_of_everything__fey_spirit from './tasha-s-cauldron-of-everything/fey-spirit.ts'
import tasha_s_cauldron_of_everything__fiendish_spirit from './tasha-s-cauldron-of-everything/fiendish-spirit.ts'
import tasha_s_cauldron_of_everything__homunculus_servant from './tasha-s-cauldron-of-everything/homunculus-servant.ts'
import tasha_s_cauldron_of_everything__shadow_spirit from './tasha-s-cauldron-of-everything/shadow-spirit.ts'
import tasha_s_cauldron_of_everything__steel_defender from './tasha-s-cauldron-of-everything/steel-defender.ts'
import tasha_s_cauldron_of_everything__undead_spirit from './tasha-s-cauldron-of-everything/undead-spirit.ts'
import tasha_s_cauldron_of_everything__wildfire_spirit from './tasha-s-cauldron-of-everything/wildfire-spirit.ts'
import the_book_of_many_things__deck_defender from './the-book-of-many-things/deck-defender.ts'
import the_book_of_many_things__reaper_spirit from './the-book-of-many-things/reaper-spirit.ts'
/**
 * Every creature whose statistics follow its owner, by the publication holding its stat block and
 * its key. Each file beside this one is that creature's function; add a new one here too.
 */
export const ownedCreatures: Readonly<Record<string, OwnedCreature>> = {
  'arcana_unleashed/battle_familiar': arcana_unleashed__battle_familiar,
  'arcana_unleashed/dinosaur_spirit': arcana_unleashed__dinosaur_spirit,
  'arcana_unleashed/plant_spirit': arcana_unleashed__plant_spirit,
  'arcana_unleashed/vestige_companion': arcana_unleashed__vestige_companion,
  'eberron_forge_of_the_artificer/homunculus_servant':
    eberron_forge_of_the_artificer__homunculus_servant,
  'eberron_forge_of_the_artificer/steel_defender': eberron_forge_of_the_artificer__steel_defender,
  'fizban_s_treasury_of_dragons/draconic_spirit': fizban_s_treasury_of_dragons__draconic_spirit,
  'fizban_s_treasury_of_dragons/drake_companion': fizban_s_treasury_of_dragons__drake_companion,
  'player_s_handbook_2024/aberrant_spirit': player_s_handbook_2024__aberrant_spirit,
  'player_s_handbook_2024/animated_object': player_s_handbook_2024__animated_object,
  'player_s_handbook_2024/beast_of_the_land': player_s_handbook_2024__beast_of_the_land,
  'player_s_handbook_2024/beast_of_the_sea': player_s_handbook_2024__beast_of_the_sea,
  'player_s_handbook_2024/beast_of_the_sky': player_s_handbook_2024__beast_of_the_sky,
  'player_s_handbook_2024/bestial_spirit': player_s_handbook_2024__bestial_spirit,
  'player_s_handbook_2024/celestial_spirit': player_s_handbook_2024__celestial_spirit,
  'player_s_handbook_2024/construct_spirit': player_s_handbook_2024__construct_spirit,
  'player_s_handbook_2024/draconic_spirit': player_s_handbook_2024__draconic_spirit,
  'player_s_handbook_2024/elemental_spirit': player_s_handbook_2024__elemental_spirit,
  'player_s_handbook_2024/fey_spirit': player_s_handbook_2024__fey_spirit,
  'player_s_handbook_2024/fiendish_spirit': player_s_handbook_2024__fiendish_spirit,
  'player_s_handbook_2024/giant_insect': player_s_handbook_2024__giant_insect,
  'player_s_handbook_2024/otherworldly_steed': player_s_handbook_2024__otherworldly_steed,
  'player_s_handbook_2024/undead_spirit': player_s_handbook_2024__undead_spirit,
  'ravenloft_the_horrors_within/reanimated_companion':
    ravenloft_the_horrors_within__reanimated_companion,
  'srd_5_2_1/giant_insect': srd_5_2_1__giant_insect,
  'tasha_s_cauldron_of_everything/aberrant_spirit': tasha_s_cauldron_of_everything__aberrant_spirit,
  'tasha_s_cauldron_of_everything/beast_of_the_land':
    tasha_s_cauldron_of_everything__beast_of_the_land,
  'tasha_s_cauldron_of_everything/beast_of_the_sea':
    tasha_s_cauldron_of_everything__beast_of_the_sea,
  'tasha_s_cauldron_of_everything/beast_of_the_sky':
    tasha_s_cauldron_of_everything__beast_of_the_sky,
  'tasha_s_cauldron_of_everything/bestial_spirit': tasha_s_cauldron_of_everything__bestial_spirit,
  'tasha_s_cauldron_of_everything/celestial_spirit':
    tasha_s_cauldron_of_everything__celestial_spirit,
  'tasha_s_cauldron_of_everything/construct_spirit':
    tasha_s_cauldron_of_everything__construct_spirit,
  'tasha_s_cauldron_of_everything/dancing_item': tasha_s_cauldron_of_everything__dancing_item,
  'tasha_s_cauldron_of_everything/elemental_spirit':
    tasha_s_cauldron_of_everything__elemental_spirit,
  'tasha_s_cauldron_of_everything/fey_spirit': tasha_s_cauldron_of_everything__fey_spirit,
  'tasha_s_cauldron_of_everything/fiendish_spirit': tasha_s_cauldron_of_everything__fiendish_spirit,
  'tasha_s_cauldron_of_everything/homunculus_servant':
    tasha_s_cauldron_of_everything__homunculus_servant,
  'tasha_s_cauldron_of_everything/shadow_spirit': tasha_s_cauldron_of_everything__shadow_spirit,
  'tasha_s_cauldron_of_everything/steel_defender': tasha_s_cauldron_of_everything__steel_defender,
  'tasha_s_cauldron_of_everything/undead_spirit': tasha_s_cauldron_of_everything__undead_spirit,
  'tasha_s_cauldron_of_everything/wildfire_spirit': tasha_s_cauldron_of_everything__wildfire_spirit,
  'the_book_of_many_things/deck_defender': the_book_of_many_things__deck_defender,
  'the_book_of_many_things/reaper_spirit': the_book_of_many_things__reaper_spirit,
  'dragonlance_shadow_of_the_dragon_queen/andir_valmakos':
    dragonlance_shadow_of_the_dragon_queen__andir_valmakos,
  'dragonlance_shadow_of_the_dragon_queen/ayik_ur': dragonlance_shadow_of_the_dragon_queen__ayik_ur,
  'dragonlance_shadow_of_the_dragon_queen/hrigg_roundrook':
    dragonlance_shadow_of_the_dragon_queen__hrigg_roundrook,
  'dragonlance_shadow_of_the_dragon_queen/iriad': dragonlance_shadow_of_the_dragon_queen__iriad,
  'dragonlance_shadow_of_the_dragon_queen/levna_drakehorn':
    dragonlance_shadow_of_the_dragon_queen__levna_drakehorn,
  'dragonlance_shadow_of_the_dragon_queen/tem_temble':
    dragonlance_shadow_of_the_dragon_queen__tem_temble,
}
