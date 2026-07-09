// Auto-synced registry keys — no entity imports (breaks refs ↔ data type cycle).

export const EVENTS_KEYS = [
  'n2_e001',
  'n2_e002',
  'n2_e003',
  'n2_e004',
  'n2_e005',
  'n2_e006',
  'n2_e007',
  'n2_e008',
  'n2_e009',
  'n2_e010',
  'n2_e011',
  'n2_e012',
  'n2_e013',
  'n2_e014',
  'n2_e015',
  'n2_e016',
  'n2_e017',
  'n2_e018',
  'n2_e019',
  'n2_e020',
  'n2_e021',
  'n2_e022',
  'n2_e023',
  'n2_e024',
  'n2_e025',
  'n2_e026',
  'n2_e027',
  'n2_e028',
  'n2_e029',
  'n2_e030',
  'n2_e031',
  'n2_e032',
  'n2_e033',
  'n2_e034',
  'n2_e035',
  'n2_e036',
  'n2_e037',
  'n2_e038',
  'n2_e039',
  'n2_e040',
] as const
export type EventKey = (typeof EVENTS_KEYS)[number]

export const NPCS_KEYS = [
  'abraham',
  'angel_of_the_mountain',
  'bob_the_gate_troll',
  'displacer_beast',
  'dragon_children',
  'dragon_of_the_mountain',
  'giant_spider',
  'goblin_grass_keepers',
  'mystery_girl',
  'phoenix_chick',
  'rare_animal_dealer',
  'samantha',
  'the_father',
  'third_marshal_light',
] as const
export type NpcKey = (typeof NPCS_KEYS)[number]

export const PCS_KEYS = [
  'cassian_veyl',
  'devan',
  'jim',
  'mr_peace',
  'revin_grumblefist',
  'swift_starblade',
  'victor_the_badesh_lumberjack',
  'william_greenhove',
] as const
export type PcKey = (typeof PCS_KEYS)[number]

export const LOCATIONS_KEYS = [
  'world',
  'badesh',
  'badesh_forest',
  'fairhaven',
  'fajanet',
  'fajanet_tunnels',
  'fajanet_guildhall',
  'holy_site',
  'mountain_cliff',
  'mountain_top',
  'puzzle_room',
  'shadow_realm',
  'the_boat_to_fajanet_celesta',
  'the_green_light',
  'the_nest',
  'trapdoor',
] as const
export type LocationKey = (typeof LOCATIONS_KEYS)[number]

export const QUESTS_KEYS = [
  'dino_migration',
  'jims_past',
  'mystery_girl',
  'rare_animal_dealer',
  'the_tentacle_night',
  'who_is_light',
] as const
export type QuestKey = (typeof QUESTS_KEYS)[number]

export const SESSIONS_KEYS = [
  'arrival_in_fajanet',
  'the_mountain_the_dragon_family_and_the_road_to_badesh',
] as const
export type SessionKey = (typeof SESSIONS_KEYS)[number]

export const ORGANIZATIONS_KEYS = ['adventurers_guild', 'the_eyeless_hand'] as const
export type OrganizationKey = (typeof ORGANIZATIONS_KEYS)[number]
