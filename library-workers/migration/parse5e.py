"""Parse library 5e printings (free text) into typed stat blocks and verify every printed number
against what the typed block derives. Outputs JSON + a report."""
import json,re,sys,os,collections
D=os.environ.get('LIBRARY_JSON_DIR',os.path.join(os.path.dirname(__file__),'..','..','src','lib','published-library-catalog'))
ABIL=['str','dex','con','int','wis','cha']
ANAME={'strength':'str','dexterity':'dex','constitution':'con','intelligence':'int','wisdom':'wis','charisma':'cha'}
SKILLS={'acrobatics':'dex','animal handling':'wis','arcana':'int','athletics':'str','deception':'cha','history':'int','insight':'wis','intimidation':'cha','investigation':'int','medicine':'wis','nature':'int','perception':'wis','performance':'cha','persuasion':'cha','religion':'int','sleight of hand':'dex','stealth':'dex','survival':'wis'}
DAMAGE=['acid','bludgeoning','cold','fire','force','lightning','necrotic','piercing','poison','psychic','radiant','slashing','thunder']
CONDS=['blinded','charmed','deafened','exhaustion','frightened','grappled','incapacitated','invisible','paralyzed','petrified','poisoned','prone','restrained','stunned','unconscious']
SIZES=['tiny','small','medium','large','huge','gargantuan']
FIVE_E={'2014 fifth edition','2024 fifth edition','2014 fifth edition compatible','2024 fifth edition compatible','Fifth edition compatible',None}
def mod(s): return (s-10)//2
def crv(c):
  if '/' in c: a,b=c.split('/'); return int(a)/int(b)
  return float(c)
def pb(c): return max(2,-(-int(crv(c))//4)+1) if crv(c)>=1 else 2
def avg(d,bonus=0):
  n,f=map(int,d.split('d')); return n*(f+1)//2+bonus
def sec(p,t):
  for s in p['gm']+(p.get('player') or []):
    if s['title'].lower()==t.lower(): return s['lines']
  return None
def stat(p,k):
  for l in sec(p,'Statistics') or []:
    a,_,b=l.partition(' · ')
    if a.lower()==k.lower(): return b.strip()
class Fail(Exception): pass
def parse_speed(s):
  out={}
  for part in re.split(r',\s*',s):
    m=re.match(r'(?:(walk|climb|fly|swim|burrow)\s*)?(\d+)\s*(?:ft\.?)?(?:\s*\((hover)\))?',part.strip(),re.I)
    if not m: raise Fail('speed '+s)
    out[(m.group(1) or 'walk').lower()]=int(m.group(2))
  return out
def ability_for(bonus,scores,prof,cands=('str','dex')):
  hits=[a for a in cands if mod(scores[a])+prof==bonus]
  return hits
def split_abilities(lines):
  # Join, then split on "Name. " headings (Capitalized words followed by optional parenthetical then '.')
  text=' '.join(x.strip() for l in lines for x in l.split('\n') if x.strip())
  parts=re.split(r'(?:(?<=^)|(?<=\. )|(?<=\.\) ))((?:[A-Z][\w’\'-]*)(?: (?:[A-Z][\w’\'-]*|of|the|and|to|in|a|from|with|\d+))*(?: \([^)]*\))?)\. ',text)
  res=[]; i=1
  pre=parts[0].strip()
  while i<len(parts):
    res.append((parts[i],parts[i+1].strip())); i+=2
  return pre,res
ATK=re.compile(r'^(Melee|Ranged|Melee or Ranged) (?:Weapon |Spell )?Attack(?: Roll)?:?,? \+?(-?\d+)(?: to hit)?,? (?:reach (\d+) ft\.|range (\d+)/(\d+) ft\.)(?:,? (?:or range (\d+)/(\d+) ft\.))?,?(?: one target| one creature)?\.? Hit:? (?:for )?(\d+) \((\d+d\d+)(?: ?([+−-]) ?(\d+))?\) (\w+) damage(.*)$',re.I)
EXTRA=re.compile(r'^,? plus (\d+) \((\d+d\d+)\) (\w+) damage',re.I)
SAVE=re.compile(r'DC (\d+) (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) sav',re.I)
class M:
  def __init__(s,g): s.g=g
  def group(s,i): return s.g[i]
def lenient(text):
  h=re.match(r'^(?:Make an? )?(Melee|Ranged|Melee or Ranged) (?:weapon |spell )?attack(?: roll)?[:,]? ?(?:at )?\+?(-?\d+)(?: to hit)?',text,re.I)
  if not h: return None
  head=text[:200]
  reach=re.search(r'reach (\d+) ft|(\d+)-ft\.? reach|within (\d+) ft',head)
  rng=re.search(r'range (\d+)/(\d+) ft',head)
  d=re.search(r'(\d+) \((\d+d\d+)(?: ?([+−-]) ?(\d+))?\) (\w+)(?: damage)?',text)
  if not d: return None
  g=[None]*14
  g[1]=h.group(1); g[2]=h.group(2)
  if reach: g[3]=next(x for x in reach.groups() if x)
  if rng: g[4],g[5]=rng.groups()
  if not reach and not rng: return None
  g[8],g[9],g[10],g[11],g[12]=d.groups()
  g[13]=text[d.end():]
  return M(g)
def convert(r,p):
  issues=[]
  g=lambda k: stat(p,k)
  ac=g('Armor class'); hp=g('Hit points'); hd=g('Hit dice'); cr=g('Challenge')
  if not (ac and hp and hd and cr): raise Fail('missing core')
  scores={}
  for a in ABIL:
    v=g(a.capitalize()) or g({'str':'Strength','dex':'Dexterity','con':'Constitution','int':'Intelligence','wis':'Wisdom','cha':'Charisma'}[a])
    if not v: raise Fail('missing score '+a)
    scores[a]=int(v)
  m=re.match(r'(\d+d\d+)(?: ?([+−-]) ?(\d+))?$',hd.replace('–','-'))
  if not m: raise Fail('hit dice '+hd)
  dice=m.group(1); n=int(dice.split('d')[0])
  bonus=int(m.group(3) or 0)*(-1 if m.group(2) in ('-','−') else 1)
  if bonus!=n*mod(scores['con']): issues.append(f'hit dice bonus {bonus} != {n}x con mod')
  if avg(dice,n*mod(scores['con']))!=int(hp): issues.append(f'HP {hp} != derived {avg(dice,n*mod(scores["con"]))}')
  cls=' '.join(sec(p,'Classification') or [])
  cm=re.match(r'(Tiny|Small|Medium|Large|Huge|Gargantuan)(?: or \w+)? ([A-Za-z]+)(?: \(([^)]*)\))?,? ?(.*)$',cls,re.I)
  if not cm: raise Fail('classification '+cls)
  if re.search(r'swarm',cls,re.I): raise Fail('swarm: the stat block has no swarm size yet')
  size=cm.group(1).lower(); ctype=cm.group(2).lower(); tags=cm.group(3); align=cm.group(4).strip().lower() or None
  cr=cr.split(' ')[0]
  if not re.match(r'^\d+(/\d+)?$',cr): raise Fail('cr '+cr)
  prof=pb(cr)
  block={'size':size,'type':ctype,'cr':cr,'ac':int(re.match(r'\d+',ac).group()),'hitDice':dice,
         'speed':parse_speed(g('Speed') or '0'),'scores':scores}
  other=' '.join((sec(p,'Other statistics') or [])+(sec(p,'Skills') or [])+(sec(p,'Senses') or []))
  skills={}
  for name,ab in SKILLS.items():
    mm=re.search(re.escape(name)+r' ([+−-]\d+)',other,re.I)
    if mm:
      v=int(mm.group(1).replace('−','-')); base=mod(scores[ab])
      if v==base+prof: skills[name.replace(' ','_')]='proficient'
      elif v==base+2*prof: skills[name.replace(' ','_')]='expert'
      else: issues.append(f'skill {name} {v} not mod+PB')
  if skills: block['skills']=skills
  senses={}
  for s in ['darkvision','blindsight','tremorsense','truesight']:
    mm=re.search(s+r' (\d+) ft',other,re.I)
    if mm: senses[s]=int(mm.group(1))
  if senses: block['senses']=senses
  pp=re.search(r'passive Perception (\d+)',other,re.I)
  if pp:
    want=10+mod(scores['wis'])+{'proficient':prof,'expert':2*prof}.get(skills.get('perception'),0)
    if int(pp.group(1))!=want: issues.append(f'passive perception {pp.group(1)} != {want}')
  saves={}
  for l in sec(p,'Saving throws') or []:
    mm=re.match(r'(\w+) ([+−-]\d+)',l)
    if mm:
      a=ANAME.get(mm.group(1).lower(),mm.group(1).lower()[:3]); v=int(mm.group(2).replace('−','-'))
      if v==mod(scores[a])+prof: saves[a]='proficient'
      elif v!=mod(scores[a]): issues.append(f'save {a} {v}')
  sm=re.search(r'Saving Throws ([^.]*?)(?: Skills| Senses| Damage| Condition|\.|$)',other)
  if sm:
    for a,v in re.findall(r'(Str|Dex|Con|Int|Wis|Cha) ([+−-]\d+)',sm.group(1)):
      a=a.lower(); v=int(v.replace('−','-'))
      if v==mod(scores[a])+prof: saves[a]='proficient'
      else: issues.append(f'save {a} {v}')
  if saves: block['saves']=saves
  for key,label in [('damageResistances','resist'),('damageImmunities','immun'),('damageVulnerabilities','vulnerab')]:
    mm=re.search(r'Damage '+label+r'\w* ([^.]*)',other,re.I)
    if mm:
      lst=[d for d in DAMAGE if d in mm.group(1).lower()]
      if lst: block[key]=lst
      if 'nonmagical' in mm.group(1).lower(): issues.append('nonmagical damage qualifier')
  mm=re.search(r'Condition immun\w* ([^.]*)',other,re.I)
  if mm: block['conditionImmunities']=[c for c in CONDS if c in mm.group(1).lower()]
  langs=re.search(r'Languages ([^.]*?)(?:\.|$)',other)
  abilities=[]
  for timing,title in [('trait','Traits'),('action','Actions'),('bonus action','Bonus actions'),('reaction','Reactions')]:
    lines=sec(p,title)
    if not lines: continue
    pre,items=split_abilities(lines)
    if pre: issues.append(f'unparsed {title} text: {pre[:60]}')
    for name,text in items:
      ab={'name':re.sub(r' \([^)]*\)$','',name),'timing':timing}
      rc=re.search(r'\((Recharge [^)]*|\d+/Day)\)',name)
      if rc:
        ab['uses']=1
        if rc.group(1).startswith('Recharge'): ab['recharge']=rc.group(1).replace('-','–')
        else: ab['uses']=int(rc.group(1).split('/')[0]); ab['recharge']='Long rest'
      am=lenient(text)
      if am:
        kind='melee' if am.group(3) else 'ranged'
        if am.group(1).lower().startswith('melee or') or am.group(6): issues.append(f'{name}: melee-or-ranged attack needs two modes')
        tohit=int(am.group(2)); cands=ability_for(tohit,scores,prof)
        dmgb=int(am.group(11) or 0)*(-1 if am.group(10) in ('-','−') else 1)
        cands=[a for a in cands if mod(scores[a])==dmgb] or cands
        if not cands: issues.append(f'{name}: to-hit +{tohit} not str/dex+PB'); continue
        a=cands[0]
        if avg(am.group(9),mod(scores[a]))!=int(am.group(8)): issues.append(f'{name}: damage avg')
        if dmgb!=mod(scores[a]): issues.append(f'{name}: damage bonus {dmgb} != {a} mod')
        if am.group(12).lower() not in DAMAGE: issues.append(f'{name}: damage type {am.group(12)}')
        atk={'kind':kind,'ability':a}
        if kind=='melee': atk['reach']=int(am.group(3))
        else: atk['range']=[int(am.group(4)),int(am.group(5))]
        dmg=[{'dice':am.group(9),'type':am.group(12).lower(),'addModifier':dmgb!=0 or True}]
        rest=am.group(13).strip()
        em=EXTRA.match(rest)
        if em:
          if avg(em.group(2))!=int(em.group(1)): issues.append(f'{name}: extra damage avg')
          dmg.append({'dice':em.group(2),'type':em.group(3).lower()}); rest=rest[em.end():].strip()
        atk['damage']=dmg; ab['attack']=atk; ab['intent']='damage'
        rest=rest.lstrip('.').strip()
        if rest: ab['text']=[rest]
      else:
        sv=SAVE.search(text)
        if sv:
          dc=int(sv.group(1)); hits=[a for a in ABIL if 8+prof+mod(scores[a])==dc]
          if not hits: issues.append(f'{name}: DC {dc} not derivable')
        if re.search(r'attack',text,re.I) and re.search(r'\+\d+',text) and not name.startswith('Multiattack'): issues.append(f'{name}: unparsed attack')
        ab['text']=[text]
      abilities.append(ab)
  block['abilities']=abilities
  meta={'alignment':align,'tags':tags,'languages':langs.group(1).strip() if langs else None}
  return block,meta,issues
def main():
  recs=[]
  for f in ['entries','monsters-a-f','monsters-g-p','monsters-q-z']: recs+=json.load(open(os.path.join(D,f+'.json')))
  types=set(sys.argv[1].split(',')) if len(sys.argv)>1 else {'beasts'}
  out=[]; tally=collections.Counter(); why=collections.Counter()
  for r in recs:
    if r['type'] not in types: continue
    for p in r['printings']:
      if p.get('edition') not in FIVE_E: tally['other system']+=1; continue
      try:
        b,meta,iss=convert(r,p)
        tally['clean' if not iss else 'needs review']+=1
        for i in iss: why[re.sub(r'^[^:]*: ','',re.sub(r'\d+','N',i))[:50]]+=1
        out.append({'type':r['type'],'slug':r['slug'],'name':r['name'],'printing':p['id'],'label':p['label'],'edition':p.get('edition'),'block':b,'meta':meta,'issues':iss})
      except Fail as e:
        tally['unparsed']+=1; why['FAIL '+str(e)[:40]]+=1
  json.dump(out,open(os.path.join(os.path.dirname(__file__),'out-'+'-'.join(sorted(types))+'.json'),'w'),indent=1)
  print(tally); [print(f'{c:5} {w}') for w,c in why.most_common(40)]
main()
