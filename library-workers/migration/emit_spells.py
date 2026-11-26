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
L=["import { refs } from '#/data/generated/library-refs.ts'","import { refs as campaignRefs } from '#/data/generated/refs.ts'","import { createSpells } from '#/definitions/library.ts'","","const { rules } = campaignRefs","","/** The spells of the System Reference Document 5.2.1 (CC BY 4.0). */","export default createSpells({"]
for s in sorted(spells,key=lambda x:key(x['name'])):
  L+=[f"  {key(s['name'])}: {{",f"    name: {js(s['name'])},",f"    level: {s['level']},",f"    school: {js(s['school'])},",f"    classes: {js(s['classes'])},",
      f"    castingTime: {js(s['castingTime'])},",f"    range: {js(s['range'])},",f"    components: {js(s['components'])},",f"    duration: {js(s['duration'])},",
      "    text: ["]+[f"      {para(p)}," for p in s['paragraphs']]+["    ],","    publication: refs.publications.srd_5_2_1,","  },"]
L+=["})",""]
open(os.path.join(REPO,'src/data/library/spells.ts'),'w').write('\n'.join(L))
print(len(spells))
