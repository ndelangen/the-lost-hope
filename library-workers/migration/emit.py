"""Emit typed library TS modules from parse5e output for chosen publications."""
import json,re,os,sys,collections
H=os.path.dirname(__file__)
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
PUBS={
 'SRD 5.1':('srd_5_1','System Reference Document 5.1','Wizards of the Coast',2016,'5e-2014','D&D - 5th Edition (2014)/Rules/System Reference Document 5.1 (CC BY).pdf'),
 'Basic Rules (2018)':('basic_rules_2018','Basic Rules','Wizards of the Coast',2018,'5e-2014','D&D - 5th Edition (2014)/Rules/Basic Rules (2018).pdf'),
 'Monster Manual (2014)':('monster_manual_2014','Monster Manual','Wizards of the Coast',2014,'5e-2014','D&D - 5th Edition (2014)/Rules/Monster Manual.pdf'),
 'SRD 5.2.1':('srd_5_2_1','System Reference Document 5.2.1','Wizards of the Coast',2025,'5e-2024','D&D - 5th Edition (2024)/System Reference Document 5.2.1 (CC BY).pdf'),
 'Monster Manual (2024)':('monster_manual_2024','Monster Manual','Wizards of the Coast',2024,'5e-2024',None),
}
# Older reprints point at the book they reprint; that book holds the stat block.
REPRINT_OF={'basic_rules_2018':'monster_manual_2014','srd_5_1':'monster_manual_2014','srd_5_2_1':'monster_manual_2024'}
CONDS=['blinded','charmed','deafened','frightened','grappled','incapacitated','invisible','paralyzed','petrified','poisoned','prone','restrained','stunned','unconscious']
ICONS=[('spellcasting','gi/GiWizardStaff'),('sword','gi/GiBroadsword'),('scimitar','gi/GiBroadsword'),('rapier','gi/GiBroadsword'),('axe','gi/GiBattleAxe'),('bow','gi/GiCrossbow'),('mace','gi/GiFlangedMace'),('morningstar','gi/GiFlangedMace'),('dagger','gi/GiThrownDaggers'),('javelin','gi/GiThrownDaggers'),('spear','gi/GiThrownDaggers'),('trident','gi/GiThrownDaggers'),('pike','gi/GiThrownDaggers'),('glaive','gi/GiThrownDaggers'),('halberd','gi/GiThrownDaggers'),('hammer','gi/GiWarhammer'),('maul','gi/GiWarhammer'),('staff','gi/GiWizardStaff'),('club','gi/GiSpikedBat'),('sling','gi/GiSlingshot'),('fire','gi/GiFlame'),('frost','gi/GiIceBolt'),('cold','gi/GiIceBolt'),('lightning','gi/GiPowerLightning'),('teleport','gi/GiTeleport'),('invisib','gi/GiInvisible'),('bite','gi/GiFangs'),('fang','gi/GiFangs'),('claw','gi/GiClaws'),('talon','gi/GiClaws'),('tusk','gi/GiBullHorns'),('horn','gi/GiBullHorns'),('gore','gi/GiBullHorns'),('ram','gi/GiBull'),('hoof','gi/GiStomp'),('hooves','gi/GiStomp'),('stomp','gi/GiStomp'),('trampl','gi/GiStomp'),('sting','gi/GiPoisonBottle'),('poison','gi/GiPoisonBottle'),('tentacle','gi/GiTentacleStrike'),('constrict','gi/GiTentacleStrike'),('web','gi/GiSpiderWeb'),('spider','lucide/MoveUp'),('climb','lucide/MoveUp'),('fist','gi/GiFist'),('slam','gi/GiFist'),('rock','gi/GiSlingshot'),('beak','gi/GiRaven'),('peck','gi/GiRaven'),('fly','gi/GiFeather'),('flyby','gi/GiFeather'),('wing','gi/GiBatWing'),('echolocation','gi/GiEchoRipples'),('hearing','gi/GiHumanEar'),('smell','gi/GiNoseSide'),('scent','gi/GiNoseSide'),('sight','lucide/Eye'),('pack','lucide/UsersRound'),('swarm','lucide/UsersRound'),('breath','gi/GiDragonBreath'),('hold breath','gi/GiWaterSplash'),('amphibious','gi/GiWaterSplash'),('water','gi/GiWaterSplash'),('charge','gi/GiBull'),('pounce','gi/GiPaw'),('leap','gi/GiFrogFoot'),('jump','gi/GiFrogFoot'),('multiattack','gi/GiPaw'),('tail','gi/GiWhiplash'),('tongue','gi/GiTongue'),('camouflage','gi/GiInvisible'),('spit','gi/GiPoisonBottle'),('frightful','gi/GiDeathSkull'),('rampage','gi/GiDeathSkull'),('relentless','lucide/HeartPulse'),('swallow','gi/GiSlime'),('engulf','gi/GiSlime')]
def icon(name,ab):
  n=name.lower()
  for k,v in ICONS:
    if k in n: return v
  if 'attack' in ab: return 'lucide/Target'
  return 'gi/GiPaw' if ab['timing']=='trait' else 'gi/GiMagicSwirl'
# One key per monster across publications; renamed reprints use the current (2024) name.
ALIASES={'giant_sea_horse':'giant_seahorse','sea_horse':'seahorse','giant_poisonous_snake':'giant_venomous_snake',
  'poisonous_snake':'venomous_snake','swarm_of_poisonous_snakes':'swarm_of_venomous_snakes','giant_rat_diseased':'diseased_giant_rat'}
# The open licenses the library uses text under, with the notices they ask for (OGL Section 15).
LICENSES={
  'srd_5_1':('cc-by-4.0','This work includes material from the System Reference Document 5.1 (“SRD 5.1”) by Wizards of the Coast LLC, available at https://dnd.wizards.com/resources/systems-reference-document. The SRD 5.1 is licensed under the Creative Commons Attribution 4.0 International License.'),
  'srd_5_2_1':('cc-by-4.0','This work includes material from the System Reference Document 5.2.1 (“SRD 5.2.1”) by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License.'),
  'deep_magic':('ogl-1.0a','Deep Magic for 5th Edition. © 2020 Open Design LLC; Authors: Dan Dillon, Chris Harris, and Jeff Lee.'),
  'deep_magic_extended':('ogl-1.0a','Deep Magic Extended. © Open Design LLC d/b/a Kobold Press.'),
  'tome_of_heroes':('ogl-1.0a','Tome of Heroes. © 2022 Open Design LLC; Authors: Kelly Pawlik, Ben McFarland, and Brian Suskind.'),
  'vault_of_magic':('ogl-1.0a','Vault of Magic. © 2021 Open Design LLC; Authors: Phillip Larwood, Jeff Lee, and Christopher Lockey.'),
  'warlock_zine':('ogl-1.0a','Warlock. © 2017 Open Design LLC; Authors: Wolfgang Baur and others.'),
  'tome_of_beasts':('ogl-1.0a','Tome of Beasts. © 2016 Open Design; Authors: Chris Harris, Dan Dillon, Rodrigo Garcia Carmona, and Wolfgang Baur.'),
  'tome_of_beasts_2':('ogl-1.0a','Tome of Beasts 2. © 2020 Open Design LLC; Authors: Wolfgang Baur, Celeste Conowitch, Darrin Drader, James Introcaso, Philip Larwood, Jeff Lee, Kelly Pawlik, Brian Suskind, Mike Welham.'),
  'tome_of_beasts_3':('ogl-1.0a','Tome of Beasts 3. © 2022 Open Design LLC; Authors: Eytan Bernstein, Celeste Conowitch, Benjamin L. Eastman, Robert Fairbanks, Scott Gable, Basheer Ghouse, Richard Green, Jeremy Hochhalter, Jeff Lee, Christopher Lockey, Sarah Madsen, Ben McFarland, Jonathan Miley, Kelly Pawlik, Sebastian Rombach, Chelsea Steverson, Brian Suskind, Mike Welham.'),
  'tome_of_beasts_2023':('ogl-1.0a','Tome of Beasts 1 (2023 Edition). © 2023 Open Design LLC; Authors: Dan Dillon, Chris Harris, Rodrigo Garcia Carmona, and Wolfgang Baur.'),
  'creature_codex':('ogl-1.0a','Creature Codex. © 2018 Open Design LLC; Authors: Wolfgang Baur, Dan Dillon, Richard Green, James Haeck, Chris Harris, Jeremy Hochhalter, James Introcaso, Chris Lockey, Shawn Merwin, and Jon Sawatsky.'),
  'taldorei_campaign_setting':('ogl-1.0a',"Critical Role: Tal'Dorei Campaign Setting. © 2017 Green Ronin Publishing, LLC; Authors: Matthew Mercer, James Haeck."),
  'spells_that_dont_suck':('cc-by-4.0',"Spells That Don't Suck by Ben Somers (somanyrobots) and Omega Ankh, licensed under the Creative Commons Attribution 4.0 International License."),
}
# Openly licensed spell books loaded from Open5e (spells_open5e.py).
SPELL_PUBS={
  'deep_magic':('deep_magic','Deep Magic for 5th Edition','Kobold Press',2020,'5e-2014',None),
  'deep_magic_extended':('deep_magic_extended','Deep Magic Extended','Kobold Press',None,'5e-2014',None),
  'tome_of_heroes':('tome_of_heroes','Tome of Heroes','Kobold Press',2022,'5e-2014',None),
  'vault_of_magic':('vault_of_magic','Vault of Magic','Kobold Press',2021,'5e-2014',None),
  'warlock_zine':('warlock_zine','Warlock','Kobold Press',2017,'5e-2014',None),
  'spells_that_dont_suck':('spells_that_dont_suck',"Spells That Don't Suck",'Somanyrobots',2025,'5e-2014',None),
}
OPEN5E_PUBS={
  'Tome of Beasts':('tome_of_beasts','Tome of Beasts','Kobold Press',2016,'5e-2014',None),
  'Tome of Beasts 2':('tome_of_beasts_2','Tome of Beasts 2','Kobold Press',2020,'5e-2014',None),
  'Tome of Beasts 3':('tome_of_beasts_3','Tome of Beasts 3','Kobold Press',2022,'5e-2014',None),
  'Tome of Beasts 1 (2023 Edition)':('tome_of_beasts_2023','Tome of Beasts 1 (2023 Edition)','Kobold Press',2023,'5e-2014',None),
  'Creature Codex':('creature_codex','Creature Codex','Kobold Press',2018,'5e-2014',None),
  "Tal'dorei Campaign Setting":('taldorei_campaign_setting',"Tal'Dorei Campaign Setting",'Green Ronin Publishing',2017,'5e-2014',None),
}
CORE=['monster_manual_2014','monster_manual_2024','srd_5_1','srd_5_2_1','basic_rules_2018']
PUBLISHERS=['Wizards of the Coast','Kobold Press','MCDM','Ghostfire Gaming','Darrington Press','Hit Point Press','Green Ronin','Free League','Critical Role','Legendary Games','Mage Hand Press','Loot Tavern','Ghostfire']
def catalog_pdfs():
  import csv
  path='/Users/me/Projects/DND/Books/output/Catalog.csv'
  if not os.path.exists(path): return {}
  return {re.sub(r'[^a-z0-9]','',row['Title'].lower()):row['Output path'] for row in csv.DictReader(open(path))}
PDFS=catalog_pdfs()
def publication_for(r,printing):
  '''A publication other than the core books, from what the printing says about itself. Publisher
  and year are left out when the printing does not state them.'''
  label=r['label']; src=' '.join(next((s['lines'] for s in printing['gm'] if s['title']=='Printed source'),[]))
  pub=next((x for x in PUBLISHERS if src.startswith(x) or (' '+x+',') in src),None)
  ym=re.search(r'\((\d{4})\)',label) or re.search(r'\((?:[A-Z][a-z]+ )?(\d{4})\)',src)
  rs='5e-2024' if (r['edition'] or '').startswith('2024') else '5e-2014'
  pdf=PDFS.get(re.sub(r'[^a-z0-9]','',re.sub(r'\(.*?\)','',label).lower()))
  name=re.sub(r' \((\d{4})\)$','',label)
  return (keyify(label),name,pub,int(ym.group(1)) if ym else None,rs,pdf)
def keyify(s): return re.sub(r'[^a-z0-9]+','_',s.lower()).strip('_')
def kebab(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
def js(v): return json.dumps(v,ensure_ascii=False)
CONDS=['blinded','charmed','deafened','frightened','grappled','incapacitated','invisible','paralyzed','petrified','poisoned','prone','restrained','stunned','unconscious']
def cond_tokens(text):
  out=[]; last=0
  for m in re.finditer(r'\b('+'|'.join(CONDS)+r')\b',text,re.I):
    if m.start()>last: out.append(text[last:m.start()])
    out.append({'rule':m.group(1).lower()}); last=m.end()
  if last<len(text): out.append(text[last:])
  return out
def tokens(parts):
  out=[]
  for t in parts:
    if isinstance(t,str): out.append(js(t))
    elif 'spell' in t: out.append('refs.spells.'+t['spell'])
    elif 'toHit' in t: out.append('{ toHit: '+js(t['toHit'])+' }')
    elif 'dc' in t: out.append('{ dc: '+js(t['dc'])+(', save: '+js(t['save']) if 'save' in t else '')+(', printed: '+str(t['printed']) if 'printed' in t else '')+' }')
    elif 'ability' in t: out.append('{ ability: '+js(t['ability'])+' }')
    elif 'roll' in t: out.append('{ roll: '+js(t['roll'])+(', mod: '+js(t['mod']) if 'mod' in t else '')+(', printed: '+str(t['printed']) if 'printed' in t else '')+' }')
    else: out.append('rules.'+t['rule'])
  return '['+', '.join(out)+']'
def ability_ts(ab,keys,ind):
  i=' '*ind
  key=ab['key']
  L=[f'{i}{{',f'{i}  key: {js(key)},',f'{i}  name: {js(ab["name"])},']
  if ab['timing'] not in ('legendary','lair'): L.append(f'{i}  timing: {js(ab["timing"])},')
  L.append(f'{i}  icon: {js(icon(ab["name"],ab))},')
  if 'cost' in ab: L.append(f'{i}  cost: {ab["cost"]},')
  if 'intent' in ab: L.append(f'{i}  intent: {js(ab["intent"])},')
  if 'attack' in ab:
    a=ab['attack']
    L.append(f'{i}  attack: {{'); L.append(f'{i}    kind: {js(a["kind"])},'); L.append(f'{i}    ability: {js(a["ability"])},')
    if a['kind']=='melee':
      L.append(f'{i}    reach: {a["reach"]},')
      if 'thrown' in a: L.append(f'{i}    thrown: [{a["thrown"][0]}, {a["thrown"][1]}],')
    else: L.append(f'{i}    range: [{a["range"][0]}, {a["range"][1]}],')
    if 'twoHanded' in a:
      L.append(f'{i}    twoHanded: [')
      for d in a['twoHanded']: L.append(f'{i}      {{ dice: {js(d["dice"])}, type: rules.{d["type"]}, addModifier: true }},')
      L.append(f'{i}    ],')
    if 'printedBonus' in a: L.append(f'{i}    printedBonus: {a["printedBonus"]},')
    L.append(f'{i}    damage: [')
    for d in a['damage']:
      add=', addModifier: true' if d.get('addModifier') else ''
      L.append(f'{i}      {{ dice: {js(d["dice"])}, type: refs.rules.{d["type"]}{add} }},')
    L.append(f'{i}    ],'); L.append(f'{i}  }},')
  if 'save' in ab:
    sv=ab['save']; t=sv['target']
    L.append(f'{i}  save: {{'); L.append(f'{i}    ability: {js(sv["ability"])},'); L.append(f'{i}    dc: {js(sv["dc"])},')
    if 'area' in t:
      ar=t['area']; w=f', width: {ar["width"]}' if 'width' in ar else ''
      rg=f', range: {t["range"]}' if 'range' in t else ''
      L.append(f'{i}    target: {{ area: {{ shape: rules.{ar["shape"]}, size: {ar["size"]}{w} }}{rg} }},')
    else:
      wh=f', which: {js(t["which"])}' if 'which' in t else ''
      L.append(f'{i}    target: {{ creatures: {t["creatures"]}, range: {t["range"]}{wh} }},')
    L.append(f'{i}    onFail: {{')
    L.append(f'{i}      damage: [')
    for d in sv['onFail']['damage']:
      add=', addModifier: true' if d.get('addModifier') else ''
      L.append(f'{i}        {{ dice: {js(d["dice"])}, type: rules.{d["type"]}{add} }},')
    L.append(f'{i}      ],')
    if 'also' in sv['onFail']: L.append(f'{i}      also: {tokens(cond_tokens(sv["onFail"]["also"][0]))},')
    L.append(f'{i}    }},')
    if sv.get('onSuccess')=='half': L.append(f"{i}    onSuccess: 'half',")
    if 'printedDc' in sv: L.append(f'{i}    printedDc: {sv["printedDc"]},')
    L.append(f'{i}  }},')
  if ab.get('text'): L.append(f'{i}  text: {tokens(ab["text"])},')
  if 'uses' in ab: L.append(f'{i}  uses: {ab["uses"]},')
  if 'recharge' in ab: L.append(f'{i}  recharge: {js(ab["recharge"])},')
  L.append(f'{i}}},')
  return L
def same_block(a,b):
  strip=lambda x: json.dumps({k:v for k,v in x.items() if k not in ('abilities','legendary','lairActions')},sort_keys=True)+json.dumps([(y['name'],y.get('attack'),y.get('save'),y.get('uses'),y.get('recharge'),y.get('cost')) for y in x['abilities']+x.get('legendary',{}).get('actions',[])+x.get('lairActions',[])],sort_keys=True)
  return strip(a)==strip(b)
def main():
  types=sys.argv[1]
  rows=json.load(open(os.path.join(os.environ.get('MIGRATION_OUT',H),'out-'+types+'.json')))
  # A printing read from the source PDF wins over the worker's text of the same printing.
  # A printing held only for unrecorded languages can still be an unchanged reprint of a core
  # book's stat block; it then takes that printing's languages along with everything else.
  for r in rows: r['lang_only']=r['issues']==['languages not captured']
  rows=sorted((r for r in rows if not r['issues'] or r['lang_only']),key=lambda r:(not r.get('pdf'),r['lang_only']))
  recs_for_pubs={}
  for f in ['entries','monsters-a-f','monsters-g-p','monsters-q-z']:
    for rec in json.load(open(os.path.join(os.environ.get('LIBRARY_JSON_DIR',os.path.join(REPO,'src/lib/published-library-catalog')),f+'.json'))):
      for p in rec['printings']: recs_for_pubs[(rec['type'],rec['slug'],p['id'])]=p
  for extra in filter(None,os.environ.get('EXTRA_PRINTINGS','').split(':')):
    for rec in json.load(open(extra)):
      for p in rec['printings']: recs_for_pubs.setdefault((rec['type'],rec['slug'],p['id']),p)
  for r in rows:
    if r['label'] in OPEN5E_PUBS: PUBS[r['label']]=OPEN5E_PUBS[r['label']]
    if r['label'] not in PUBS: PUBS[r['label']]=publication_for(r,recs_for_pubs.get((r['type'],r['slug'],r['printing'])) or {'gm':[]})
  # appearance/habitats from the source records
  recs={}
  for f in ['entries','monsters-a-f','monsters-g-p','monsters-q-z']:
    for r in json.load(open(os.path.join(os.environ.get('LIBRARY_JSON_DIR',os.path.join(REPO,'src/lib/published-library-catalog')),f+'.json'))):
      for p in r['printings']: recs[(r['type'],r['slug'],p['id'])]=p
  bypub=collections.defaultdict(dict); reprints=collections.defaultdict(list)
  bykey=collections.defaultdict(dict)
  held=[]
  for r in rows:
    key=ALIASES.get(keyify(r['slug']),keyify(r['slug'])); pk=PUBS[r['label']][0]
    if pk in bykey[key]:
      # The worker's copy of a printing already read from the PDF is expected; anything else is news.
      if not bykey[key][pk].get('pdf'): held.append(f'{pk}/{key}: second printing in one publication ({r["slug"]})')
      continue
    bykey[key][pk]=r
  for h in held: print('held',h)
  for key,pubs in bykey.items():
    for pk,r in pubs.items():
      # An unchanged reprint points at the core book that holds the stat block.
      target=REPRINT_OF.get(pk) or next((c for c in CORE if c!=pk and c in pubs and same_block(pubs[c]['block'],r['block']) and not pubs[c].get('lang_only') and pk not in CORE),None)
      if target and target in pubs and same_block(pubs[target]['block'],r['block']) and not pubs[target].get('lang_only'):
        reprints[(target,key)].append(pk); continue
      if r['lang_only']: continue
      bypub[pk][key]=r
  outdir=os.path.join(REPO,'src/data/library/monsters'); os.makedirs(outdir,exist_ok=True)
  unrecorded=[]
  for pk,mons in bypub.items():
    L=["import { refs } from '#/data/generated/library-refs.ts'","import { refs as rules } from '#/data/generated/refs.ts'","import { createPublicationMonsters } from '#/definitions/library.ts'","","const refsRules = rules.rules","",
       "export default createPublicationMonsters({",f"  publication: refs.publications.{pk},","  monsters: {"]
    for key in sorted(mons):
      r=mons[key]; b=r['block']; m=r['meta']
      # Habitats, appearance and notes come from the worker's record of the same printing.
      src=next((recs[k] for k in [(t,r['slug'],r['printing']) for t in ('monsters','beasts','npcs')] if k in recs),{'gm':[]})
      L.append(f'    {key}: {{'); L.append(f'      name: {js(r["name"])},')
      rp=reprints.get((pk,key))
      if rp: L.append('      reprintedIn: ['+', '.join(f'refs.publications.{x}' for x in sorted(rp))+'],')
      if m['tags']: L.append(f'      tags: {js([t.strip() for t in m["tags"].split(",")])},')
      if m.get('page'): L.append(f'      page: {m["page"]},')
      if m['alignment']: L.append(f'      alignment: {js(m["alignment"])},')
      langs=m['languages']
      if langs is None: unrecorded.append(f"{r['label']}: {r['name']}")
      elif langs.strip().lower() in ('none','—','-','—','–',''): L.append('      languages: [],')
      else:
        # Split on commas outside parentheses: "Primordial (Ignan, Terran)" is one language.
        names=[x.strip() for x in re.split(r'[,;](?![^()]*\))',langs)] if not re.search(r'\b(Speaks|Understands)\b',langs) else [x.strip() for x in langs.split(';')]
        L.append(f'      languages: {js(names)},')
      hab=next((s['lines'] for s in src['gm'] if s['title']=='Habitats'),None)
      if hab:
        hab=[h.strip().rstrip('.') for x in hab for h in x.split(',') if h.strip().rstrip('.')]
        L.append(f'      habitats: {js(hab)},')
      app=next((s['lines'] for s in src['gm'] if s['title']=='Appearance'),None)
      if app: L.append(f'      appearance: [{js(app)}],')
      if m.get('lore'): L.append(f'      lore: [[{js(m["lore"])}]],')
      notes=[l for s in src['gm'] if s['title'].lower() in ('at the table','table notes') for l in s['lines']]
      if notes: L.append(f'      tableNotes: [{", ".join("["+js(n)+"]" for n in notes)}],')
      L.append('      stats: {')
      if 'swarmOf' in b: L.append(f'        swarmOf: {js(b["swarmOf"])},')
      for k in ['size','type','cr','ac']: L.append(f'        {k}: {js(b[k])},')
      if 'armor' in b: L.append(f'        armor: {js(b["armor"])},')
      L.append(f'        hitDice: {js(b["hitDice"])},')
      L.append('        speed: {'+', '.join(f'{k}: {v}' for k,v in b['speed'].items())+'},')
      L.append('        scores: {'+', '.join(f'{k}: {v}' for k,v in b['scores'].items())+'},')
      if 'initiative' in b: L.append(f'        initiative: {js(b["initiative"])},')
      for k in ['saves','skills','senses']:
        if k in b: L.append(f'        {k}: {{'+', '.join(f'{kk.replace("-","_")}: {js(v)}' for kk,v in b[k].items())+'},')
      if b.get('nonmagicalExcept'): L.append(f"        nonmagicalExcept: {js(b['nonmagicalExcept'])},")
      for k in ['damageResistances','damageImmunities','damageVulnerabilities','conditionImmunities','nonmagicalResistances','nonmagicalImmunities']:
        if b.get(k): L.append(f'        {k}: ['+', '.join('refs.rules.'+x for x in b[k])+'],')
      L.append('        abilities: [')
      keys=set()
      for ab in b['abilities']: L+=ability_ts(ab,keys,10)
      L.append('        ],')
      if 'legendary' in b:
        lg=b['legendary']
        L.append('        legendary: {'); L.append(f'          uses: {lg["uses"]},')
        if 'lairUses' in lg: L.append(f'          lairUses: {lg["lairUses"]},')
        L.append('          actions: [')
        for ab in lg['actions']: L+=ability_ts(ab,keys,12)
        L.append('          ],'); L.append('        },')
      if b.get('lairActions'):
        L.append('        lairActions: [')
        for ab in b['lairActions']: L+=ability_ts(ab,keys,10)
        L.append('        ],')
      L.append('      },'); L.append('    },')
    L+=['  },','})','']
    txt='\n'.join(L).replace("refs.rules.","rules.").replace("import { refs as rules } from '#/data/generated/refs.ts'","import { refs as campaignRefs } from '#/data/generated/refs.ts'").replace("const refsRules = rules.rules","const { rules } = campaignRefs")
    if 'rules.' not in txt.split('const { rules } = campaignRefs',1)[1]:
      txt=txt.replace("import { refs as campaignRefs } from '#/data/generated/refs.ts'\n",'').replace('const { rules } = campaignRefs\n\n','')
    open(os.path.join(outdir,pk.replace('_','-')+'.ts'),'w').write(txt)
    print(pk,len(mons))
  files=sorted(pk.replace('_','-')+'.ts' for pk in bypub)
  L=[f"import {f[:-3].replace('-','_')} from './{f}'" for f in files]
  L+=['','/** Every publication whose monsters the library holds as typed data. */','export default ['+', '.join(f[:-3].replace('-','_') for f in files)+']','']
  open(os.path.join(outdir,'_index.ts'),'w').write('\n'.join(L))
  # publications
  L=["import { createPublications } from '#/definitions/library.ts'","","export default createPublications({"]
  used={pk for pk in bypub}|{x for v in reprints.values() for x in v}|set(CORE)|{'vault_of_magic'}
  # Spell books need their publication too (src/data/library/spells).
  spell_dir=os.path.join(REPO,'src/data/library/spells')
  for f in os.listdir(spell_dir):
    used|=set(re.findall(r'refs\.publications\.(\w+)',open(os.path.join(spell_dir,f)).read()))
  for pk,entry in SPELL_PUBS.items():
    if pk not in {v[0] for v in PUBS.values()}: PUBS['spells:'+pk]=entry
  for label,(pk,name,pub,year,rs,pdf) in sorted(PUBS.items(),key=lambda kv:kv[1][0]):
    if pk not in used: continue
    L.append(f'  {pk}: {{'); L.append(f'    name: {js(name)},')
    if pub: L.append(f'    publisher: {js(pub)},')
    if year: L.append(f'    year: {year},')
    L.append(f'    ruleset: {js(rs)},')
    if pk in LICENSES:
      L.append(f'    license: {js(LICENSES[pk][0])},'); L.append(f'    notice: {js(LICENSES[pk][1])},')
    if pdf: L.append(f'    pdf: {js(pdf)},')
    L.append('  },')
  L+=['})','']
  open(os.path.join(REPO,'src/data/library/publications.ts'),'w').write('\n'.join(L))
  print('reprints',sum(len(v) for v in reprints.values()))
  with open(os.path.join(REPO,'library-workers','languages-not-recorded.md'),'w') as f:
    f.write('# Creatures whose languages our sources do not record\n\nThe library shows "Not recorded" for these. Fill them from the books when we have them.\n\n')
    f.write(''.join(f'- {x}\n' for x in sorted(unrecorded)))
  print('languages not recorded',len(unrecorded))
  # Each converted printing keeps only its place in the old catalog (label, art, link) and points
  # at its typed printing, so its statistics exist once.
  typed={}
  kept={(pk,key) for pk,mons in bypub.items() for key in mons}|{(x,key) for (t,key),xs in reprints.items() for x in xs}
  for key,pubs in bykey.items():
    for pk,r in pubs.items():
      if (pk,key) in kept: typed[(r['type'],r['slug'],r['printing'])]=(key,pk)
  cat=os.path.join(REPO,'src/lib/published-library-catalog')
  # Typed creatures from new sources that the catalog has no entry for get one, so they can be
  # found; the printing itself is only a typed ref.
  have={(r_['type'],r_['slug']) for f in ['entries','monsters-a-f','monsters-g-p','monsters-q-z'] for r_ in json.load(open(os.path.join(cat,f+'.json')))}
  have|={('monsters',sl) for t,sl in have if t=='beasts'}|{('beasts',sl) for t,sl in have if t=='monsters'}
  new_entries={}
  for key,pubs in bykey.items():
    for pk,r in pubs.items():
      if (pk,key) in kept and r.get('new_entry') and ('monsters',r['slug']) not in have:
        e=new_entries.setdefault(r['slug'],{'type':'monsters','slug':r['slug'],'name':r['name'],'summary':'','group':(r.get('group') or 'Unclassified').capitalize(),'printings':[]})
        if not any(p_['id']==r['printing'] for p_ in e['printings']): e['printings'].append({'id':r['printing'],'label':r['label'],'gm':[]})
  for slug_,e in new_entries.items():
    f='monsters-a-f' if slug_[:1]<='f' else 'monsters-g-p' if slug_[:1]<='p' else 'monsters-q-z'
    path=os.path.join(cat,f+'.json'); data=json.load(open(path)); data.append(e)
    json.dump(data,open(path,'w'),indent=2,ensure_ascii=False)
  print('new catalog entries',len(new_entries))
  # A creature that the catalog already has gains a printing for each new source.
  added=0
  for f in ['entries','monsters-a-f','monsters-g-p','monsters-q-z']:
    path=os.path.join(cat,f+'.json'); data=json.load(open(path))
    for rec in data:
      if rec['type'] not in ('monsters','beasts') or rec['slug'] in new_entries: continue
      for key,pubs in bykey.items():
        for pk,r in pubs.items():
          if (pk,key) in kept and r.get('new_entry') and r['slug']==rec['slug'] and not any(p_['id']==r['printing'] for p_ in rec['printings']):
            rec['printings'].append({'id':r['printing'],'label':r['label'],'gm':[]}); added+=1
    json.dump(data,open(path,'w'),indent=2,ensure_ascii=False)
  print('new printings on existing entries',added)
  for f in ['entries','monsters-a-f','monsters-g-p','monsters-q-z']:
    path=os.path.join(cat,f+'.json'); data=json.load(open(path)); changed=0
    for rec in data:
      for p in rec['printings']:
        # Beasts are folded into monsters (merge_beasts.py): match either type.
        hit=next((typed[k] for k in [(t,rec['slug'],p['id']) for t in ('beasts','monsters')] if k in typed and (rec['type']==k[0] or rec['type'] in ('beasts','monsters'))),None)
        if hit:
          key,pk=hit
          for k in ['gm','player','status','edition','abilityDisplay','variantName']: p.pop(k,None)
          p['typed']={'monster':{'ref':'monster','key':key},'publication':{'ref':'publication','key':pk}}
          changed+=1
    json.dump(data,open(path,'w'),indent=2,ensure_ascii=False)
    print('catalog',f,changed)
if __name__=="__main__": main()
