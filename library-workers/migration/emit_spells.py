"""Write src/data/library/spells.ts from spells_srd521.py output. Usage: emit_spells.py <spells.json>"""
import json,os,re,sys
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
CONDS=['blinded','charmed','deafened','frightened','grappled','incapacitated','invisible','paralyzed','petrified','poisoned','prone','restrained','stunned','unconscious','exhaustion']
def js(v): return json.dumps(v,ensure_ascii=False)
def key(n): return re.sub(r'[^a-z0-9]+','_',n.lower().replace('’','').replace("'",'')).strip('_')
def para(t):
  # Conditions named as "the X condition" become rules terms.
  out=[]; last=0
  for m in re.finditer(r'\b('+'|'.join(c.capitalize() for c in CONDS)+r')\b(?= condition)',t):
    if m.start()>last: out.append(js(t[last:m.start()]))
    out.append('rules.'+m.group(1).lower()); last=m.end()
  if last<len(t): out.append(js(t[last:]))
  return '['+', '.join(out)+']'
spells=json.load(open(sys.argv[1]))
# The PDF's tables and bullet lists come out as running text. Break them back into one paragraph
# per row or bullet ("¶" marks a break); table headers stay as a lead-in line.
TABLES={
  'Confusion':[(r' (1d10 Behavior for the Turn) ',r'¶\1¶'),(r' (2–6|7–8|9–10) The target',r'¶\1: The target'),(r'¶1d10 Behavior for the Turn¶1 ',r'¶1d10 Behavior for the Turn¶1: '),(r' (At the end of each of its turns)',r'¶\1')],
  'Reincarnate':[(r' 1d10 Species 1d10 Species 1 Roll again\. 6 Goliath 2 Dragonborn 7 Halfling 3 Dwarf 8 Human 4 Elf 9 Orc 5 Gnome 10 Tiefling ',
     '¶1d10 Species¶1: Roll again.¶2: Dragonborn¶3: Dwarf¶4: Elf¶5: Gnome¶6: Goliath¶7: Halfling¶8: Human¶9: Orc¶10: Tiefling¶')],
  'Control Weather':[(r'^120 ',''),(r' Precipitation Stage Condition 1 Clear 2 Light clouds 3 Overcast or ground fog 4 Rain, hail, or snow 5 Torrential rain, driving hail, or blizzard Temperature Wind Stage Condition Stage 1 Heat wave 1 Calm 2 Hot 2 Moderate wind 3 Warm 3 Strong wind 4 Cool 4 Gale 5 Cold 5 Storm 6 Freezing Condition',
     '¶Precipitation: 1 Clear; 2 Light clouds; 3 Overcast or ground fog; 4 Rain, hail, or snow; 5 Torrential rain, driving hail, or blizzard.¶Temperature: 1 Heat wave; 2 Hot; 3 Warm; 4 Cool; 5 Cold; 6 Freezing.¶Wind: 1 Calm; 2 Moderate wind; 3 Strong wind; 4 Gale; 5 Storm.')],
  'Teleport':[(r' Teleportation Outcome Mishap Similar Area Off Target On Target Permanent circle — — — 01–00 Linked object — — — 01–00 Very familiar 01–05 06–13 14–24 25–00 Seen casually 01–33 34–43 44–53 54–00 Viewed once or described 01–43 44–53 54–73 74–00 False destination 01–50 51–00 — — Familiarity Familiarity\. ',
     '¶Teleportation Outcome (d100: Mishap / Similar Area / Off Target / On Target)¶Permanent circle: — / — / — / 01–00¶Linked object: — / — / — / 01–00¶Very familiar: 01–05 / 06–13 / 14–24 / 25–00¶Seen casually: 01–33 / 34–43 / 44–53 / 54–00¶Viewed once or described: 01–43 / 44–53 / 54–73 / 74–00¶False destination: 01–50 / 51–00 / — / —¶Familiarity. ')],
  'Prismatic Spray':[(r' Prismatic Rays 1d8 Ray ','¶Prismatic Rays (1d8)¶'),(r' 1d8 Ray ',' '),(r' ([2-8]) (Orange|Yellow|Green|Blue|Indigo|Violet|Special)\.',r'¶\1: \2.'),(r'¶1 Red\.','¶1: Red.'),(r'Prismatic Rays \(1d8\)¶1 Red\.','Prismatic Rays (1d8)¶1: Red.')],
  'Prismatic Wall':[(r' Prismatic Layers Order Effects 1 Red\.','¶Prismatic Layers¶1: Red.'),(r' ([2-7]) (Orange|Yellow|Green|Blue|Indigo|Violet)\.',r'¶\1: \2.')],
  'Augury':[(r' Omens Omen For Results That Will Be … Weal Good Woe Bad Weal and woe Good and bad Indifference Neither good nor bad ',
     '¶Omens¶Weal: good results.¶Woe: bad results.¶Weal and woe: good and bad results.¶Indifference: neither good nor bad results.¶')],
  'Divine Word':[(r' Divine Word Effects Hit Points Effect ','¶Divine Word Effects (by current Hit Points)¶'),(r' (21–30|31–40|41–50) The target',r'¶\1: The target'),(r'¶0–20 The target','¶0–20: The target')],
  'Scrying':[(r' Your Knowledge of the Target Is … Save Modifier Secondhand \(heard of the target\) \+5 Firsthand \(met the target\) \+0 Extensive \(know the target well\) −5 You Have the Target’s … Save Modifier Picture or other likeness −2 Garment or other possession −4 Body part, lock of hair, or bit of nail −10 ',
     '¶Knowledge of the target: secondhand (heard of the target) +5; firsthand (met the target) +0; extensive (know the target well) −5.¶Connection to the target: picture or other likeness −2; garment or other possession −4; body part, lock of hair, or bit of nail −10.¶')],
  'Creation':[(r' Materials Material Duration Vegetable matter 24 hours Stone or crystal 12 hours Precious metals 1 hour Gems 10 minutes Adamantine or mithral 1 minute ',
     '¶Materials: vegetable matter, 24 hours; stone or crystal, 12 hours; precious metals, 1 hour; gems, 10 minutes; adamantine or mithral, 1 minute.¶')],
}
for s_ in spells:
  rules=TABLES.get(s_['name'],[])
  out=[]
  for p in s_['paragraphs']:
    for a,b in rules: p=re.sub(a,b,p)
    p=p.replace(' • ','¶• ')
    out+=[x.strip() for x in p.split('¶') if x.strip()]
  s_['paragraphs']=out
L=["import { refs } from '#/data/generated/library-refs.ts'","import { refs as campaignRefs } from '#/data/generated/refs.ts'","import { createSpells } from '#/definitions/library.ts'","","const { rules } = campaignRefs","","/** The spells of the System Reference Document 5.2.1 (CC BY 4.0). */","export default createSpells({"]
for s in sorted(spells,key=lambda x:key(x['name'])):
  L+=[f"  {key(s['name'])}: {{",f"    name: {js(s['name'])},",f"    level: {s['level']},",f"    school: {js(s['school'])},",f"    classes: {js(s['classes'])},",
      f"    castingTime: {js(s['castingTime'])},",f"    range: {js(s['range'])},",f"    components: {js(s['components'])},",f"    duration: {js(s['duration'])},",
      "    text: ["]+[f"      {para(p)}," for p in s['paragraphs']]+["    ],","    publication: refs.publications.srd_5_2_1,","  },"]
L+=["})",""]
open(os.path.join(REPO,'src/data/library/spells.ts'),'w').write('\n'.join(L))
print(len(spells))
