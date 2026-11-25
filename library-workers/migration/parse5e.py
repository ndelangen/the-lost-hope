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
  if 'd' not in d: return int(d)+bonus
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
  flat=None if d else re.search(r'(?:Hit:?|hit,?|deals?|takes?)[^.]*?\b(\d+) (\w+) damage',text)
  if not d and not flat: return None
  g=[None]*14
  g[1]=h.group(1); g[2]=h.group(2)
  if reach: g[3]=next(x for x in reach.groups() if x)
  if rng: g[4],g[5]=rng.groups()
  if not reach and not rng: return None
  if d:
    g[8],g[9],g[10],g[11],g[12]=d.groups()
    g[13]=text[d.end():]
  else:
    g[8]=flat.group(1); g[9]=flat.group(1); g[12]=flat.group(2)
    g[13]=text[flat.end():]
  return M(g)
# What a converted printing reads, and the worker notes and lore it may safely leave behind.
READ={'statistics','classification','other statistics','skills','senses','saving throws','languages',
  'damage resistances','damage immunities','condition immunities','damage vulnerabilities','defenses',
  'traits','actions','bonus actions','reactions','armor','initiative','proficiency bonus'}
NOTES={'at the table','table notes'}
LORE={'description','habitats','habitat','appearance','printed source','references','lore topics in the source',
  'treasure','adapted from','source notes','printing note','encounter ecology'}
def convert(r,p):
  issues=[]
  for s_ in p['gm']+(p.get('player') or []):
    t=s_['title'].lower()
    if t not in READ and t not in LORE and t not in NOTES and s_['lines']:
      issues.append(f'section not converted: {s_["title"]}')
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
  if not cls and g('Size') and g('Type'):
    # Encounter-reference printings keep size, type and alignment as separate statistics.
    t=g('Type'); tm=re.match(r'([A-Za-z]+)(?: \(([^)]*)\))?',t)
    cls=f"{g('Size').split(' ')[0]} {t}"+(f", {g('Alignment')}" if g('Alignment') else '')
  swarm=re.match(r'(Tiny|Small|Medium|Large|Huge|Gargantuan) swarm of (Tiny|Small|Medium|Large|Huge|Gargantuan) ([A-Za-z]+)(?: \(([^)]*)\))?,? ?(.*)$',cls,re.I)
  if swarm:
    t=swarm.group(3).lower()
    t=t[:-3]+'y' if t.endswith('ies') else t[:-1] if t.endswith('s') else t
    t={'monstrosit':'monstrosity','fiend':'fiend','beast':'beast','undead':'undead'}.get(t,t)
    cls=f'{swarm.group(1)} {t}'+(f' ({swarm.group(4)})' if swarm.group(4) else '')+(', '+swarm.group(5) if swarm.group(5) else '')
  cm=re.match(r'(Tiny|Small|Medium|Large|Huge|Gargantuan)(?: or \w+)? ([A-Za-z]+)(?: \(([^)]*)\))?,? ?(.*)$',cls,re.I)
  if not cm: raise Fail('classification '+cls)
  size=cm.group(1).lower(); ctype=cm.group(2).lower(); tags=cm.group(3); align=cm.group(4).strip().lower() or None
  cr=cr.split(' ')[0]
  if not re.match(r'^\d+(/\d+)?$',cr): raise Fail('cr '+cr)
  prof=pb(cr)
  block={**({'swarmOf':swarm.group(2).lower()} if swarm else {}),'size':size,'type':ctype,'cr':cr,'ac':int(re.match(r'\d+',ac).group()),'hitDice':dice,
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
  # Defenses, however the worker phrased them: each clause runs to the next defense keyword.
  KW=r'(?:Damage |Condition )?(?:Resistant to|Resistances?|Resists?|Immunities|Immune to|Vulnerabilit(?:y|ies)|Vulnerable to)'
  defense_text=' '.join((sec(p,'Other statistics') or [])+(sec(p,'Defenses') or [])
    +[t+' '+'; '.join(sec(p,t) or []) for t in ['Damage resistances','Damage immunities','Condition immunities','Damage vulnerabilities'] if sec(p,t)])
  for m in re.finditer('('+KW+r')\s*:?\s*(.*?)(?=\s'+KW+r'|\sSenses|\sLanguages|\. |\.$|;\s*(?:Senses|Languages)|$)',defense_text,re.I):
    head=m.group(1).lower(); body=m.group(2).lower()
    if 'nonmagical' in body or 'silvered' in body or 'adamantine' in body or 'magic' in body:
      issues.append('qualified damage defense needs a rule'); continue
    dmg=[d for d in DAMAGE if re.search(r'\b'+d+r'\b',body)]
    cond=[c for c in CONDS if re.search(r'\b'+c+r'\b',body)]
    leftover=re.sub(r'\b('+'|'.join(DAMAGE+CONDS)+r'|and|or|damage|the|condition|conditions)\b|[,;.]','',body).strip()
    if leftover: issues.append(f'defense words not understood: {leftover[:40]}')
    if 'vulnerab' in head: field='damageVulnerabilities'
    elif 'resist' in head:
      field='damageResistances'
      if cond: issues.append('condition resistance has no field'); cond=[]
    else: field='damageImmunities'
    if dmg: block[field]=sorted(set(block.get(field,[])+dmg),key=DAMAGE.index)
    if cond and 'immun' in head: block['conditionImmunities']=sorted(set(block.get('conditionImmunities',[])+cond),key=CONDS.index)
  for word,field in [('resist','damageResistances'),('immun','damageImmunities'),('vulnerab','damageVulnerabilities')]:
    if re.search(word,defense_text,re.I) and field not in block and not (word=='immun' and 'conditionImmunities' in block) and not any('defense' in i for i in issues):
      issues.append(f'{word} mentioned but not captured')
  langs=re.search(r'Languages ([^.]*?)(?:\.|$)',other)
  if sec(p,'Languages'):
    langs=re.match(r'(.*)$','; '.join(sec(p,'Languages')))
  armor=re.search(r'\(([^)]*armor[^)]*|[^)]*mail[^)]*|[^)]*shield[^)]*)\)',ac or '')
  armor_text=armor.group(1) if armor else None
  if not armor_text and re.search(r'natural armor',' '.join(sec(p,'Armor') or [])+' '+other,re.I): armor_text='natural armor'
  if armor_text: block['armor']=armor_text.strip()
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

        tohit=int(am.group(2)); cands=ability_for(tohit,scores,prof)
        dmgb=int(am.group(11) or 0)*(-1 if am.group(10) in ('-','−') else 1)
        cands=[a for a in cands if mod(scores[a])==dmgb] or cands
        if not cands: issues.append(f'{name}: to-hit +{tohit} not str/dex+PB'); continue
        a=cands[0]
        fixed='d' not in am.group(9)
        if fixed: dmgb=mod(scores[a])  # a fixed amount never adds the modifier
        if avg(am.group(9),0 if fixed else mod(scores[a]))!=int(am.group(8)): issues.append(f'{name}: damage avg')
        if dmgb!=mod(scores[a]): issues.append(f'{name}: damage bonus {dmgb} != {a} mod')
        if am.group(12).lower() not in DAMAGE: issues.append(f'{name}: damage type {am.group(12)}')
        atk={'kind':kind,'ability':a}
        if kind=='melee':
          atk['reach']=int(am.group(3))
          if am.group(4): atk['thrown']=[int(am.group(4)),int(am.group(5))]
        else: atk['range']=[int(am.group(4)),int(am.group(5))]
        dmg=[{'dice':am.group(9),'type':am.group(12).lower(),'addModifier':not fixed}]
        rest=am.group(13).strip()
        em=EXTRA.match(rest)
        if em:
          if avg(em.group(2))!=int(em.group(1)): issues.append(f'{name}: extra damage avg')
          dmg.append({'dice':em.group(2),'type':em.group(3).lower()}); rest=rest[em.end():].strip()
        atk['damage']=dmg; ab['attack']=atk; ab['intent']='damage'
        rest=re.sub(r'^[.,;]\s*','',rest).strip()
        if rest: rest=rest[0].upper()+rest[1:]
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
  json.dump(out,open(os.path.join(os.environ.get('MIGRATION_OUT',os.path.dirname(__file__)),'out-'+'-'.join(sorted(types))+'.json'),'w'),indent=1)
  print(tally); [print(f'{c:5} {w}') for w,c in why.most_common(40)]
main()
