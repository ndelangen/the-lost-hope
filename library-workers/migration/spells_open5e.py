"""Write spell modules from the Open5e API's openly licensed books (CC BY 4.0 or OGL 1.0a):
src/data/library/spells/<publication>.ts. Usage: spells_open5e.py <open5e spells.json>
The SRD 5.2.1 spells come from the PDF (spells_srd521.py/emit_spells.py) and are not redone here."""
import json,os,re,sys
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
# Open5e document -> library publication key. A5E is its own game system and stays out.
DOCS={'srd-2014':'srd_5_1','deepm':'deep_magic','deepmx':'deep_magic_extended','toh':'tome_of_heroes',
      'kp':'kobold_press_compilation','wz':'warlock_zine','spells-that-dont-suck':'spells_that_dont_suck'}
CONDS=['blinded','charmed','deafened','frightened','grappled','incapacitated','invisible','paralyzed','petrified','poisoned','prone','restrained','stunned','unconscious']
def js(v): return json.dumps(v,ensure_ascii=False)
def key(n): return re.sub(r'[^a-z0-9]+','_',n.lower().replace('’','').replace("'",'')).strip('_')
TIME={'action':'Action','bonus-action':'Bonus Action','reaction':'Reaction','round':'1 round','1minute':'1 minute','5minutes':'5 minutes','10minutes':'10 minutes','1hour':'1 hour','8hours':'8 hours','12hours':'12 hours','24hours':'24 hours','1week':'1 week'}
def para(t):
  out=[]; last=0
  for m in re.finditer(r'\b('+'|'.join(CONDS)+r')\b',t,re.I):
    if m.start()>last: out.append(js(t[last:m.start()]))
    out.append('rules.'+m.group(1).lower()); last=m.end()
  if last<len(t): out.append(js(t[last:]))
  return '['+', '.join(out)+']'
def clean(t):
  t=re.sub(r'\*\*\*?([^*]+?)\*\*\*?',r'\1',t)          # markdown bold/italic
  t=re.sub(r'(?<!\w)_([^_]+)_(?!\w)',r'\1',t)
  return t.strip()
def paragraphs(desc):
  out=[]
  for block in re.split(r'\n\s*\n|\n(?=[-*|] )|\n(?=\S)',desc or ''):
    b=clean(block)
    if not b or re.fullmatch(r'\|?[\s:|-]+\|?',b): continue   # table rule lines
    if b.startswith('|'): b=' · '.join(c.strip() for c in b.strip('|').split('|'))
    b=re.sub(r'^[-*] ','• ',b)
    out.append(b)
  return out
reserved=set()
srd521=open(os.path.join(REPO,'src/data/library/spells/srd-5-2-1.ts')).read()
reserved|=set(re.findall(r'^  ([a-z0-9_]+): \{$',srd521,re.M))
spells=json.load(open(sys.argv[1]))
bydoc={}
for s in spells:
  pk=DOCS.get(s['document']['key'])
  if pk: bydoc.setdefault(pk,[]).append(s)
for pk,items in bydoc.items():
  L=["import { refs } from '#/data/generated/library-refs.ts'","import { refs as campaignRefs } from '#/data/generated/refs.ts'","import { createSpells } from '#/definitions/library.ts'","","const { rules } = campaignRefs","",
     f"/** Spells from {items[0]['document']['name']} ({items[0]['document']['publisher']['name']}), via Open5e. */","export default createSpells({"]
  for s in sorted(items,key=lambda x:key(x['name'])):
    k=key(s['name'])
    # The same name in another book is a different spell text: suffix the book.
    if k in reserved: k=f'{k}_{pk}'
    reserved.add(k)
    comps=', '.join(x for x,on in [('V',s['verbal']),('S',s['somatic']),('M',s['material'])] if on)
    if s['material'] and s.get('material_specified'): comps+=f" ({s['material_specified']})"
    ct=TIME.get(s['casting_time'],s['casting_time'])
    if s['casting_time']=='reaction' and s.get('reaction_condition'): ct+=', '+s['reaction_condition']
    if s['ritual']: ct+=' or Ritual'
    dur=s['duration'] or 'Instantaneous'
    if s['concentration'] and not dur.lower().startswith('concentration'): dur='Concentration, up to '+dur
    dur=dur[:1].upper()+dur[1:]
    text=paragraphs(s['desc'])
    if s.get('higher_level'): text.append(('At Higher Levels. ' if pk!='srd_5_2_1' else 'Using a Higher-Level Spell Slot. ')+clean(s['higher_level']))
    if not text: continue
    classes=[c['name'] for c in s.get('classes') or []] or ['—']
    L+=[f"  {k}: {{",f"    name: {js(s['name'])},",f"    level: {s['level']},",f"    school: {js(s['school']['key'])},",f"    classes: {js(classes)},",
        f"    castingTime: {js(ct)},",f"    range: {js(s['range_text'] or 'Self')},",f"    components: {js(comps or 'None')},",f"    duration: {js(dur)},",
        "    text: ["]+[f"      {para(p)}," for p in text]+["    ],",f"    publication: refs.publications.{pk},","  },"]
  L+=["})",""]
  txt='\n'.join(L)
  if 'rules.' not in txt.split('const { rules } = campaignRefs',1)[1]:
    txt=txt.replace("import { refs as campaignRefs } from '#/data/generated/refs.ts'\n",'').replace('const { rules } = campaignRefs\n\n','')
  open(os.path.join(REPO,'src/data/library/spells',pk.replace('_','-')+'.ts'),'w').write(txt)
  print(pk,len(items))
