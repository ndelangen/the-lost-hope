#!/usr/bin/env bun
/**
 * Reference mapping of timeline marks for all events.
 * Marks follow rules in .agents/skills/plan-campaign-entity/SKILL.md
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const EVENTS_DIR = join(dirname(fileURLToPath(import.meta.url)), '../src/data/events')

const MARKS: Record<string, { type: 'avatar'; url: string } | { type: 'icon'; name: string }> = {
  'n2-e001': { type: 'icon', name: 'gi/GiSailboat' },
  'n2-e002': { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  'n2-e003': { type: 'icon', name: 'gi/GiCrossedSwords' },
  'n2-e004': { type: 'icon', name: 'fa/FaDoorOpen' },
  'n2-e005': { type: 'icon', name: 'fa/FaBeer' },
  'n2-e006': { type: 'icon', name: 'fa/FaMoon' },
  'n2-e007': { type: 'icon', name: 'gi/GiWaveCrest' },
  'n2-e008': { type: 'icon', name: 'gi/GiGhost' },
  'n2-e009': { type: 'icon', name: 'fa/FaSun' },
  'n2-e010': { type: 'icon', name: 'fa/FaLandmark' },
  'n2-e011': { type: 'icon', name: 'hi/HiSparkles' },
  'n2-e012': { type: 'icon', name: 'fa/FaScroll' },
  'n2-e013': { type: 'icon', name: 'fa/FaMapMarkerAlt' },
  'n2-e014': { type: 'icon', name: 'fa/FaDoorOpen' },
  'n2-e015': { type: 'icon', name: 'gi/GiFeather' },
  'n2-e016': { type: 'icon', name: 'gi/GiCrossedSwords' },
  'n2-e017': { type: 'icon', name: 'gi/GiFeather' },
  'n2-e018': { type: 'icon', name: 'fa/FaMapMarkerAlt' },
  'n2-e019': { type: 'icon', name: 'fa/FaLandmark' },
  'n2-e020': { type: 'icon', name: 'fa/FaEnvelope' },
  'n2-e021': { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  'n2-e022': { type: 'icon', name: 'fa/FaDoorOpen' },
  'n2-e023': { type: 'avatar', url: '/assets/pcs/mr-peace.png' },
  'n2-e024': { type: 'icon', name: 'fa/FaMapMarkerAlt' },
  'n2-e025': { type: 'icon', name: 'fa/FaGlassCheers' },
  'n2-e026': { type: 'icon', name: 'fa/FaUserPlus' },
  'n2-e027': { type: 'icon', name: 'gi/GiFootsteps' },
  'n2-e028': { type: 'icon', name: 'fa/FaDoorOpen' },
  'n2-e029': { type: 'icon', name: 'fa/FaMoon' },
  'n2-e030': { type: 'icon', name: 'fa/FaSign' },
  'n2-e031': { type: 'icon', name: 'fa/FaChurch' },
  'n2-e032': { type: 'icon', name: 'gi/GiPuzzle' },
  'n2-e033': { type: 'icon', name: 'hi/HiSparkles' },
  'n2-e034': { type: 'icon', name: 'fa/FaBalanceScale' },
  'n2-e035': { type: 'icon', name: 'gi/GiFeather' },
  'n2-e036': { type: 'icon', name: 'fa/FaUserTimes' },
  'n2-e037': { type: 'icon', name: 'gi/GiPineTree' },
  'n2-e038': { type: 'icon', name: 'gi/GiForestCamp' },
  'n2-e039': { type: 'icon', name: 'gi/GiCrossedSwords' },
  'n2-e040': { type: 'icon', name: 'gi/GiPineTree' },
}

function formatMark(mark: (typeof MARKS)[string]): string {
  if (mark.type === 'avatar') {
    return `mark: { type: 'avatar', url: '${mark.url}' },`
  }
  return `mark: { type: 'icon', name: '${mark.name}' },`
}

for (const [slug, mark] of Object.entries(MARKS)) {
  const file = join(EVENTS_DIR, `${slug}.ts`)
  let content = readFileSync(file, 'utf8')
  content = content.replace(/mark: \{[^}]+\},?\n?/g, `${formatMark(mark)}\n  `)
  writeFileSync(file, content)
}

console.log(`synced marks for ${Object.keys(MARKS).length} events`)
