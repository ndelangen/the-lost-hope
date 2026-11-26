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
EXTRA=re.compile(r'^,?\s*plus (\d+) \((\d+d\d+)\) (\w+) damage',re.I)
SAVE=re.compile(r'DC (\d+) (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) sav',re.I)
class M:
  def __init__(s,g): s.g=g
  def group(s,i): return s.g[i]
def lenient(text):
  h=re.match(r'^(?:Make an? )?(Melee|Ranged|Melee or Ranged) (?:weapon |spell )?attack(?: roll)?[:,]? ?(?:at )?\+?(-?\d+)(?: to hit)?',text,re.I)
  if not h:
    h2=re.match(r'^\+(\d+) to hit (?:in|with a) (melee|ranged)',text,re.I)
    if not h2: return None
    class H:
      def group(s,i): return {1:h2.group(2),2:h2.group(1)}[i]
    h=H()
  head=text[:200]
  reach=re.search(r'reach (\d+) (?:ft|feet)|(\d+)-ft\.? reach|within (\d+) (?:ft|feet)',head)
  rng=re.search(r'range (\d+)/(\d+) (?:ft|feet)',head) or re.search(r'range (\d+)() (?:ft|feet)',head)
  d=re.search(r'(\d+) \((\d+d\d+)(?: ?([+−–-]) ?(\d+))?\) (\w+)(?: damage)?',text)
  flat=None if d else re.search(r'(?:Hit:?|hit,?|deals?|takes?)[^.]*?\b(\d+) (\w+) damage',text)
  if not d and not flat: return None
  g=[None]*14
  g[1]=h.group(1); g[2]=h.group(2)
  if reach: g[3]=next(x for x in reach.groups() if x)
  if rng: g[4],g[5]=rng.group(1),(rng.group(2) or rng.group(1))
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
  'traits','actions','bonus actions','reactions','armor','initiative','proficiency bonus',
  'legendary actions','lair actions','spellcasting','innate spellcasting'}
NOTES={'at the table','table notes'}
LORE={'description','habitats','habitat','appearance','printed source','references','lore topics in the source',
  'treasure','adapted from','source notes','printing note','encounter ecology'}
USAGE=re.compile(r' \((Recharge [^)]*|\d+/Day(?:[^)]*)?|Costs? \d+ Actions?|\d+ Actions?)\)$',re.I)
def usage(name,ab):
  '''Take a usage note off an ability name into uses and recharge; any other qualifier stays.'''
  m=USAGE.search(name)
  if not m: return name
  note=m.group(1)
  if note.lower().startswith('recharge'): ab['uses']=1; ab['recharge']=note.replace('-','–')
  else:
    dm=re.match(r'(\d+)/Day(?:,? or (\d+)/Day in (?:its |the )?Lair)?',note,re.I)
    if dm:
      ab['uses']=int(dm.group(1)); ab['recharge']='Long rest'+(f' ({dm.group(2)}/Day in its lair)' if dm.group(2) else '')
  return name[:m.start()]
def kebab(x): return re.sub(r'[^a-z0-9]+','-',x.lower()).strip('-')
ABW=r'(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)'
DMG=r'(\d+) \((\d+d\d+)(?: ?([+−–-]) ?(\d+))?\) (\w+) damage'
AREA=re.compile(r'(?:each creature|creatures?) (?:of its choice )?in (?:a|an|that|its) (\d+)-(?:foot|ft\.?)[- ](?:radius |high |long )?(cone|line|cube|sphere|emanation)(?: that is (\d+) (?:feet|ft\.?) wide)?',re.I)
LINE=re.compile(r'(\d+)-foot-long, (\d+)-foot-?wide Line',re.I)
def area_of(text):
  '''A save's area: "a 15-foot Cone", "a 20-foot-radius Sphere", "a 60-foot-long, 5-foot-wide Line".'''
  lm=LINE.search(text)
  if lm: return {'area':{'shape':'line','size':int(lm.group(1)),'width':int(lm.group(2))}}
  am=AREA.search(text)
  if am:
    t={'area':{'shape':am.group(2).lower(),'size':int(am.group(1))}}
    if am.group(3): t['area']['width']=int(am.group(3))
    return t
  return None
def save_damage(m,scores,save_ab,issues,name):
  dice=m.group(2); bonus=int(m.group(4) or 0)*(-1 if m.group(3) in ('-','−','–') else 1)
  d={'dice':dice,'type':m.group(5).lower()}
  if d['type'] not in DAMAGE: issues.append(f'{name}: damage type {d["type"]}')
  if bonus:
    # The save's DC ability supplies this modifier; build_save picks an ability that fits both.
    d['addModifier']=True; d['_bonus']=bonus
  if avg(dice,bonus)!=int(m.group(1)): issues.append(f'{name}: save damage avg')
  return d
CTX={'caster':None}
# Spell names the library holds (src/data/library/spells.ts), longest first so "Greater
# Invisibility" wins over "Invisibility".
_SPELLS_TS=os.path.join(os.path.dirname(__file__),'..','..','src','data','library','spells.ts')
SPELLS={}
if os.path.exists(_SPELLS_TS):
  src_=open(_SPELLS_TS,encoding='utf8').read()
  for k_,n_ in re.findall(r"^  ([a-z0-9_]+): \{\n    name: ['\"](.+?)['\"],",src_,re.M): SPELLS[n_.lower()]=k_
SPELL_RE=re.compile(r'\b('+'|'.join(re.escape(n) for n in sorted(SPELLS,key=len,reverse=True))+r')\b',re.I) if SPELLS else None
def spell_tokens(text):
  '''Spell names in a spell list (after the first colon) or right after "cast(s)" become spell refs.'''
  if not SPELL_RE: return [text]
  out=[]; pos=0
  colon=text.find(':')
  for m in SPELL_RE.finditer(text):
    listed=colon>=0 and m.start()>colon
    cast=re.search(r'\bcasts? (?:the )?(?:[A-Z][\w’\']*(?:,| or| and)? )*$',text[max(0,m.start()-60):m.start()]) is not None
    if not (listed or cast): continue
    out.append(text[pos:m.start()]); out.append({'spell':SPELLS[m.group(1).lower()]}); pos=m.end()
  out.append(text[pos:])
  return [x for x in out if x!='']
CASTER=re.compile(r'(Intelligence|Wisdom|Charisma)\b[^.]{0,40}spellcasting ability|spellcasting ability (?:is )?(Intelligence|Wisdom|Charisma)|using (Intelligence|Wisdom|Charisma)\b')
def caster_of(text):
  m=CASTER.search(text or '')
  return ANAME[(m.group(1) or m.group(2) or m.group(3)).lower()] if m else None
def extract_save(ab,text,scores,prof,issues):
  """Structure the most common save shapes; returns the text left for the ability."""
  name=ab['name']
  m=re.search(ABW+r' Saving Throw: DC (\d+), (.*?)\. Failure: '+DMG+r'(.*?)(?:(?<=\.) Success: (Half damage)(?: only)?\.|$|(?<=\.) (?=Success:))',text)
  if m:
    a=ANAME[m.group(1).lower()]; dc=int(m.group(2)); who=m.group(3)
    damage=save_damage(type('M',(),{'group':lambda s,i:[None,*m.groups()[3:8]][i]})(),scores,a,issues,name)
    rest_fail=m.group(9).strip(' ,.'); success=m.group(10)
    both=''
    fm=re.search(r'\s*Failure or Success:',rest_fail)
    if fm: both=rest_fail[fm.start():].strip(); rest_fail=rest_fail[:fm.start()].strip(' ,.')
    extra=None
    xm=re.match(r'^(?:,\s*)?plus '+DMG+r'[,.]?\s*',rest_fail,re.I)
    if xm:
      extra=save_damage(type('M',(),{'group':lambda s_,i:[None,*xm.groups()][i]})(),scores,ANAME[m.group(1).lower()],issues,name)
      rest_fail=rest_fail[xm.end():].strip(' ,.')
    area=area_of(who)
    if area:
      target=area
      where=re.search(r'within (\d+) (?:feet|ft)',who)
      if where: target['range']=int(where.group(1))
    else:
      tm=re.match(r'(one|two|three) ((?:[A-Z]\w+ or \w+ |\w+ )?)creatures?(?: (.*?))? within (\d+) (?:feet|ft\.?)(?: (.*))?$',who)
      if not tm: issues.append(f'{name}: save target not understood: {who[:40]}'); return text
      target={'creatures':{'one':1,'two':2,'three':3}[tm.group(1)],'range':int(tm.group(4))}
      which=' '.join(x.strip() for x in [tm.group(3),tm.group(5)] if x and x.strip())
      if tm.group(2).strip(): which=('that is '+tm.group(2).strip()+(' '+which if which else '')).strip()
      if which: target['which']=which
    ab['save']=build_save(a,dc,target,[damage]+([extra] if extra else []),rest_fail,'half' if success else 'none',scores,prof,issues,name)
    ab['intent']='damage'
    if rest_fail and re.search(r'\d+ \(\d+d\d+',rest_fail): issues.append(f'{name}: printed numbers left in a save rider')
    return (text[:m.start()]+' '+both+' '+text[m.end():]).strip()
  m=re.search(r'\b(?:the target|it|the creature|that creature|each creature[^.]*?)(?: also)?(?: must)? (?:make|makes|succeed on|succeeds on|pass|passes) a DC (\d+) '+ABW+r' sav(?:ing throw|e)(?:,? (?:taking|and takes|or take) |\. (?:It|The target|The creature|On a failure, the creature|On a failed save, the creature|A target) takes )'+DMG+r'(?: on a (?:failed save|failure))?(,? or half (?:as much )?(?:damage )?on a success(?:ful one)?|\. On a success, it takes half (?:that|as much) damage)?\.?',text,re.I)
  if m:
    a=ANAME[m.group(2).lower()]; dc=int(m.group(1))
    damage=save_damage(type('M',(),{'group':lambda s,i:[None,*m.groups()[2:7]][i]})(),scores,a,issues,name)
    area=area_of(text[:m.start()+60])
    if area: target=area
    elif 'attack' in ab:
      at=ab['attack']; rng=at['reach'] if 'reach' in at else at['range'][0]
      if not rng: issues.append(f'{name}: save on a creature in its space'); return text
      target={'creatures':1,'range':rng,'which':'it hits'}
    else:
      issues.append(f'{name}: save target not understood'); return text
    ab['save']=build_save(a,dc,target,[damage],'', 'half' if m.group(8) else 'none',scores,prof,issues,name)
    ab['intent']='damage'
    rest=re.sub(r'\s+',' ',(text[:m.start()]+' '+text[m.end():])).strip()
    rest=re.sub(r'^(?:and|,|\.)\s+','',rest,flags=re.I).strip()
    rest=re.sub(r'\s(?:and|,)\s*$','',rest).strip()
    return rest[:1].upper()+rest[1:]
  # Any other phrasing: a DC save in one sentence and its damage in that sentence or the next.
  m=re.search(r'DC (\d+) '+ABW+r' sav(?:ing throw|e)',text,re.I)
  if m:
    after=text[m.end():]
    d=re.search(DMG,after[:260])
    if d and not re.search(r'\bDC \d+',after[:d.start()]):
      a=ANAME[m.group(2).lower()]; dc=int(m.group(1))
      tail=after[d.end():d.end()+90]
      half=re.match(r'[^.]*(?:\.\s*)?[^.]*\bhalf\b',tail,re.I) is not None
      # Sentence edges, not counting the period of "ft.".
      ends=[e.end() for e in re.finditer(r'(?<!\bft)(?<!\bfeet)\.\s',text)]
      start=max([e for e in ends if e<=m.start()],default=0)
      area=area_of(text[:m.end()])
      if area: target=area
      elif 'attack' in ab and (ab['attack'].get('reach') or ab['attack'].get('range')):
        at=ab['attack']; target={'creatures':1,'range':at['reach'] if 'reach' in at else at['range'][0],'which':'it hits'}
      else:
        if re.search(r'starts? its turn|enters|ends? its turn',text,re.I):
          issues.append(f'{name}: aura save not structured'); return text
        cm=re.search(r'(?:one|a) (?:creature|target)[^.]*? within (\d+) (?:feet|ft)',text[:m.end()+10],re.I)
        if not cm: issues.append(f'{name}: save target not understood'); return text
        target={'creatures':1,'range':int(cm.group(1))}
      damage=save_damage(type('M',(),{'group':lambda s,i:[None,*d.groups()][i]})(),scores,a,issues,name)
      ab['save']=build_save(a,dc,target,[damage],'','half' if half else 'none',scores,prof,issues,name)
      ab['intent']='damage'
      end=m.end()+d.end()
      stop=min([e for e in ends if e>end],default=len(text))
      if half:
        h=re.search(r'\bhalf\b[^.]*\.?',text[end:]); stop=max(stop,end+h.end()) if h else stop
      # The save sentence becomes structure only when it says nothing else: no condition, no
      # duration, no further number. Otherwise the printing waits for a closer look.
      span=text[start:stop].replace(m.group(0),'').replace(d.group(0),'')
      if re.search(r'\b(?:'+'|'.join(CONDS)+r')\b|\d|minute|hour|round|until|speed|push|pull|knock',span,re.I):
        ab.pop('save',None); ab['intent']=ab.get('intent','support') if 'attack' not in ab else 'damage'
        issues.append(f'{name}: save rider not structured'); return text
      rest=(text[:start]+' '+text[stop:]).strip()
      return re.sub(r'\s+',' ',rest)
  return text
def build_save(a,dc,target,damage,also,success,scores,prof,issues,name):
  order=[a]+([CTX['caster']] if CTX['caster'] else [])+['con','str','dex','wis','int','cha']
  bonuses={d_.pop('_bonus') for d_ in damage if '_bonus' in d_}
  if len(bonuses)>1: issues.append(f'{name}: save damage adds two different modifiers')
  fits=lambda b: all(mod(scores[b])==x for x in bonuses)
  built=next((b for b in order if 8+prof+mod(scores[b])==dc and fits(b)),None)
  if not built and bonuses:
    # The book's DC breaks the formula: keep it printed, on the ability the damage uses.
    built=next((b for b in order if fits(b)),None)
    if not built: issues.append(f'{name}: save damage bonus is not a modifier the block has')
    sv={'ability':a,'dc':built or a,'printedDc':dc,'target':target,'onFail':{'damage':damage}}
  else:
    sv=None
  if sv is None: sv={'ability':a,'dc':built or a,**({} if built else {'printedDc':dc}),'target':target,'onFail':{'damage':damage}}
  also=re.sub(r'^(?:and|,)\s+','',also or '',flags=re.I).strip()
  if also: sv['onFail']['also']=[also[0].upper()+also[1:]+'.']
  if success=='half': sv['onSuccess']='half'
  return sv
def finalize(block,scores,prof,issues):
  '''Give each ability a key and turn its text into tokens: save DCs the block derives, sibling
  abilities by key, conditions as rules terms. Anything that leaves a printed number in prose is
  held, because the stat block must derive it.'''
  keys={}
  every=block['abilities']+block.get('legendary',{}).get('actions',[])+block.get('lairActions',[])
  for ab in every:
    k=kebab(ab['name']); base=k; n=2
    while k in keys.values(): k=f'{base}-{n}'; n+=1
    keys[id(ab)]=k; ab['key']=k
  names=sorted(((ab['name'],ab['key']) for ab in every if len(ab['name'])>3 and ab['name']!='Multiattack'),key=lambda x:-len(x[0]))
  for ab in every:
    text=' '.join(ab.pop('text',[])).strip()
    if re.fullmatch(r'(?:on a hit|on hit)\.?',text,re.I): text=''
    if not text: continue
    text=extract_save(ab,text,scores,prof,issues)
    if 'save' in ab and 'also' in ab['save']['onFail']:
      ab['save']['onFail']['also']=[ab['save']['onFail']['also'][0]]
    if not text: continue
    if re.search(r'\d+ \(\d+d\d+',text) or re.search(r'[+]\d+ to hit|attack roll:? [+]',text,re.I):
      issues.append(f"{ab['name']}: printed numbers left in prose")
    cm=re.search(r'(Intelligence|Wisdom|Charisma)\b[^.]{0,40}spellcasting ability|spellcasting ability (?:is )?(Intelligence|Wisdom|Charisma)|using (Intelligence|Wisdom|Charisma)\b',text)
    caster=ANAME[(cm.group(1) or cm.group(2) or cm.group(3)).lower()] if cm else CTX['caster']
    toks=[]; pos=0
    pat=re.compile(r'(?:[+](\d+) to hit with spell attacks|[Ss]pell attacks? (?:bonus )?[+](\d+))|(?<!escape )\bDC (\d+)(?: (Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma))?\b|\b('+'|'.join(CONDS)+r')\b'+(r'|\b('+'|'.join(re.escape(n) for n,_ in names)+r')\b' if names else ''),re.I)
    for m in pat.finditer(text):
      if m.start()>pos: toks.append(text[pos:m.start()])
      if m.group(1) or m.group(2):
        v=int(m.group(1) or m.group(2)); hits=[a for a in ([caster] if caster else [])+['int','wis','cha'] if mod(scores[a])+prof==v]
        if hits:
          if m.group(1): toks.append({'toHit':hits[0]}); toks.append(' to hit with spell attacks')
          else: toks.append(m.group(0).split('+')[0]); toks.append({'toHit':hits[0]})
        else: issues.append(f"{ab['name']}: spell attack bonus not derivable"); toks.append(m.group(0))
      elif m.group(3) and re.match(r'\s*(?:(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s*)?(?:\([A-Za-z ]+\)\s*)?check',text[m.end(3):]):
        # An ability-check DC is a fixed number to beat, not a save the block derives.
        toks.append(m.group(0))
      elif m.group(3):
        # Built from the ability saved with when that derives it, then the casting ability.
        dc=int(m.group(3)); named=ANAME.get((m.group(4) or '').lower())
        order=([named] if named else [])+([caster] if caster else [])+['con','str','dex','wis','int','cha']
        built=next((a for a in order if 8+prof+mod(scores[a])==dc),None)
        printed={}
        if not built:
          # The book breaks the formula: keep its DC on the save's or casting ability.
          built=named or caster or 'con'; printed={'printed':dc}
        toks.append({'dc':built,**({'save':named} if named and named!=built else {}),**printed})
        if m.group(4): toks.append(' '+m.group(4))
      elif m.group(5): toks.append({'rule':m.group(5).lower()})
      else:
        hit=next((n for n,_ in names if n==m.group(6)),None)
        if hit is None: toks.append(m.group(0)); pos=m.end(); continue
        key=dict(names)[hit]
        if key==ab['key']: toks.append(m.group(0))
        else: toks.append({'ability':key})
      pos=m.end()
    if pos<len(text): toks.append(text[pos:])
    merged=[]
    for t in toks:
      if isinstance(t,str) and merged and isinstance(merged[-1],str): merged[-1]+=t
      elif t!='': merged.append(t)
    if 'spellcasting' in ab['name'].lower() or re.search(r'\bcasts? ',' '.join(x for x in merged if isinstance(x,str))):
      merged=[y for x in merged for y in (spell_tokens(x) if isinstance(x,str) else [x])]
    ab['text']=merged
def convert(r,p):
  issues=[]
  CTX['caster']=caster_of(' '.join(l for s_ in p['gm'] for l in s_['lines']))
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
  ini=g('Initiative') or (re.search(r'Initiative ([+−-]?\d+)',other) or [None,None])[1]
  if ini:
    iv=int(re.match(r'[+−-]?\d+',ini.replace('−','-')).group().replace('+',''))
    if iv==mod(scores['dex'])+prof: block['initiative']='proficient'
    elif iv==mod(scores['dex'])+2*prof: block['initiative']='expert'
    elif iv!=mod(scores['dex']): issues.append(f'initiative {iv} not derivable')
  saves={}
  for l in sec(p,'Saving throws') or []:
    for nm,val in re.findall(r'(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma|Str|Dex|Con|Int|Wis|Cha)\b ([+−-]\d+)',l,re.I):
      a=ANAME.get(nm.lower(),nm.lower()[:3]); v=int(val.replace('−','-'))
      if v==mod(scores[a])+prof: saves[a]='proficient'
      elif v!=mod(scores[a]): issues.append(f'save {a} {v}')
  sm=re.search(r'Saving Throws ([^.]*?)(?: Skills| Senses| Damage| Condition|\.|$)',other)
  if sm:
    for a,v in re.findall(r'(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma|Str|Dex|Con|Int|Wis|Cha)\b ([+−-]\d+)',sm.group(1),re.I):
      a=ANAME.get(a.lower(),a.lower()[:3]); v=int(v.replace('−','-'))
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
  if not langs and re.search(r'\bno(?: listed)?\b[^.]*\blanguages\b|\bno languages\b|lists no languages',other,re.I):
    langs=re.match(r'(none)','none')
  if not langs:
    lm=re.search(r'Languages:? ([^.]+)',other)
    langs=lm
  if sec(p,'Languages'):
    langs=re.match(r'(.*)$','; '.join(sec(p,'Languages')))
  armor=re.search(r'\(([^)]*armor[^)]*|[^)]*mail[^)]*|[^)]*shield[^)]*)\)',ac or '')
  armor_text=armor.group(1) if armor else None
  if not armor_text and re.search(r'natural armor',' '.join(sec(p,'Armor') or [])+' '+other,re.I): armor_text='natural armor'
  if armor_text: block['armor']=armor_text.strip()
  abilities=[]
  for title in ['Spellcasting','Innate spellcasting']:
    lines=sec(p,title)
    if lines:
      parts=[x.strip().rstrip(';') for l in lines for x in l.split('\n') if x.strip()]
      text=''.join(x+('' if i==len(parts)-1 else (' ' if x.endswith(('.',':')) else '; ')) for i,x in enumerate(parts))
      timing='action' if re.search(r'as (?:an|a Magic) action|Magic action',text,re.I) else 'trait'
      abilities.append({'name':title,'timing':timing,'text':[text]})
  for timing,title in [('trait','Traits'),('action','Actions'),('bonus action','Bonus actions'),('reaction','Reactions')]:
    lines=sec(p,title)
    if not lines: continue
    pre,items=split_abilities(lines)
    if pre: issues.append(f'unparsed {title} text: {pre[:60]}')
    for name,text in items:
      ab={'timing':timing}
      ab['name']=usage(name,ab)
      am=lenient(text)
      if am:
        kind='melee' if am.group(3) else 'ranged'

        spell=bool(re.match(r'^(?:Make an? )?(?:Melee|Ranged|Melee or Ranged) spell attack',text,re.I))
        # 2024 books say "Attack Roll" for spells too: damage with no modifier on a caster is one.
        if not spell and CTX['caster'] and not am.group(11) and mod(scores[CTX['caster']])+prof==int(am.group(2)) and not any(mod(scores[x])+prof==int(am.group(2)) and mod(scores[x])==0 for x in ('str','dex')):
          spell=True
        tohit=int(am.group(2)); cands=ability_for(tohit,scores,prof,(([CTX['caster']] if CTX['caster'] else [])+['int','wis','cha']) if spell else ('str','dex'))
        dmgb=int(am.group(11) or 0)*(-1 if am.group(10) in ('-','−','–') else 1)
        cands=[a for a in cands if mod(scores[a])==dmgb] or cands
        printed=None
        if not cands:
          # The book breaks the formula: keep its bonus, on the ability its damage uses.
          pool=('int','wis','cha') if spell else ('str','dex')
          by_damage=[x for x in pool if mod(scores[x])==dmgb]
          cands=by_damage or [max(pool,key=lambda x:scores[x])]
          printed=tohit
        a=cands[0]
        fixed='d' not in am.group(9)
        # Damage adds the attack's modifier, or nothing at all (a fixed amount, most spell attacks).
        plain=fixed or (dmgb==0 and mod(scores[a])!=0)
        if avg(am.group(9),0 if plain else mod(scores[a]))!=int(am.group(8)): issues.append(f'{name}: damage avg')
        if not plain and dmgb!=mod(scores[a]): issues.append(f'{name}: damage bonus {dmgb} != {a} mod')
        if am.group(12).lower() not in DAMAGE: issues.append(f'{name}: damage type {am.group(12)}')
        atk={'kind':kind,'ability':a,**({'printedBonus':printed} if printed is not None else {})}
        if kind=='melee':
          atk['reach']=int(am.group(3))
          if am.group(4): atk['thrown']=[int(am.group(4)),int(am.group(5))]
        else: atk['range']=[int(am.group(4)),int(am.group(5))]
        dmg=[{'dice':am.group(9),'type':am.group(12).lower(),'addModifier':not plain}]
        rest=am.group(13).strip()
        em=EXTRA.match(rest)
        if em:
          if avg(em.group(2))!=int(em.group(1)): issues.append(f'{name}: extra damage avg')
          dmg.append({'dice':em.group(2),'type':em.group(3).lower()}); rest=rest[em.end():].strip()
        vm=re.match(r'^,?\s*or (\d+) \((\d+d\d+)(?: ?([+−–-]) ?(\d+))?\) (\w+) damage,? (?:if used with two hands|when used with two hands|with a two-handed (?:melee )?attack|if wielded with two hands|when wielded with two hands)[^.]*\.?',rest,re.I)
        if vm and kind=='melee':
          vb=int(vm.group(4) or 0)*(-1 if vm.group(3) in ('-','−','–') else 1)
          if vb!=mod(scores[a]) or avg(vm.group(2),vb)!=int(vm.group(1)): issues.append(f'{name}: two-handed damage does not derive')
          atk['twoHanded']=[{'dice':vm.group(2),'type':vm.group(5).lower(),'addModifier':True}]
          rest=rest[vm.end():].strip()
        atk['damage']=dmg; ab['attack']=atk; ab['intent']='damage'
        rest=re.sub(r'^[.,;]?\s*(?:and\s+)?','',rest,flags=re.I).strip()
        if rest: rest=rest[0].upper()+rest[1:]
        if rest: ab['text']=[rest]
      else:
        if re.search(r'attack',text,re.I) and re.search(r'\+\d+',text) and not name.startswith('Multiattack'): issues.append(f'{name}: unparsed attack')
        ab['text']=[text]
      abilities.append(ab)
  # A spell list can run straight into the next trait ("…faerie fire Spider Climb. The drider…"):
  # split it back out, and keep each spell tier on its own clause.
  split=[]
  for ab in abilities:
    split.append(ab)
    if 'spellcasting' not in ab['name'].lower() or not ab.get('text'): continue
    t=' '.join(ab['text'])
    t=re.sub(r'(?<=[a-z\)]) (?=(?:At Will|At will|\d+/[Dd]ay(?: [Ee]ach)?|Cantrips|\d+(?:st|nd|rd|th) level)\b[^:.]{0,20}[:.])','; ',t)
    colon=t.rfind(':')
    hm=re.search(r'(?<=[a-z\)]) ((?:[A-Z][\w’\'-]*)(?: [A-Z][\w’\'-]*){0,3})\. ',t[colon+1:]) if colon>=0 else None
    if hm:
      head=t[:colon+1+hm.start()]; rest=t[colon+1+hm.start()+1:]
      ab['text']=[head]
      for n_,x_ in split_abilities([rest])[1]:
        extra={'timing':ab['timing']}; extra['name']=usage(n_,extra); extra['text']=[x_]; split.append(extra)
    else: ab['text']=[t]
  abilities=split
  # SRD 5.1's background text follows its stat block, and the worker text ran it into the last
  # ability. Trailing sentences with no game terms move to lore.
  lore=None
  if p.get('label')=='SRD 5.1' and abilities and abilities[-1].get('text'):
    t=' '.join(abilities[-1]['text'])
    sents=re.split(r'(?<=[a-z\)\.])(?<!\bft\.)\s+(?=[A-Z])',t)
    RULES=re.compile(r'\d|\bDC\b|damage|saving throw|hit points|\baction|reaction|advantage|\bspeed\b|\b(can|must|equipment|trait|control|grappl\w*|attack\w*|invisible|dies|turns?|moves?|target|hits?|regains?|immune|effect|spells?|engulf\w*|size)\b',re.I)
    words={w.lower() for w in re.findall(r'[A-Za-z]+',r['name']) if len(w)>2}
    OPEN=re.compile(r'^(Unlike|Smaller|Larger|These|Some|Many|Most|Although|Found|Known|Often|Typically|Usually|Few|Even|In the wild|Whether)\b')
    def starts_lore(x):
      head={w.lower().rstrip('s') for w in re.findall(r'[A-Za-z]+',x)[:4]}
      return (OPEN.match(x) or head & {w.rstrip('s') for w in words}) and not RULES.search(x)
    cut=len(sents)
    for i in range(1,len(sents)):
      if starts_lore(sents[i]) and not any(RULES.search(y) for y in sents[i:]): cut=i; break
    if cut<len(sents):
      lore=' '.join(sents[cut:]); abilities[-1]['text']=[' '.join(sents[:cut])]
  block['abilities']=abilities
  NUM={'one':1,'two':2,'three':3,'four':4,'five':5}
  leg=sec(p,'Legendary actions')
  if leg:
    joined=' '.join(leg)
    um=re.search(r'\b(\d+|[Oo]ne|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive) (?:legendary actions|uses|actions per round)|Legendary Action Uses: (\d+)',joined)
    if not um: issues.append('legendary uses not understood')
    else:
      uses=int(um.group(2) or NUM.get(um.group(1).lower(),um.group(1)))
      lm=re.search(r'\((\d+) in (?:its |the )?[Ll]air\)',joined)
      acts=[]
      for name,text in split_abilities(leg)[1]:
        cm=re.search(r'\((?:Costs )?(\d+) [Aa]ctions?\)',name)
        ab={'timing':'legendary','text':[text]}
        ab['name']=usage(name,ab); ab.pop('uses',None); ab.pop('recharge',None)
        if cm and int(cm.group(1))>1: ab['cost']=int(cm.group(1))
        am=lenient(text)
        if am: issues.append(f"{ab['name']}: legendary attack written out")
        acts.append(ab)
      if not acts: issues.append('legendary actions not understood')
      block['legendary']={'uses':uses,'actions':acts,**({'lairUses':int(lm.group(1))} if lm else {})}
  lair=sec(p,'Lair actions')
  if lair:
    pre,items=split_abilities(lair)
    if not items: issues.append('lair actions are not named')
    block['lairActions']=[{'name':n,'timing':'lair','text':[t]} for n,t in items]
  finalize(block,scores,prof,issues)
  src_line=' '.join(sec(p,'Printed source') or [])
  pg=re.search(r'\bpp?\. (\d+)',src_line)
  page=int(pg.group(1)) if pg else None
  if langs is None and not sec(p,'Languages'):
    issues.append('languages not captured')
  meta={'lore':lore,'alignment':align,'tags':tags,'languages':langs.group(1).strip() if langs else None,'page':page}
  return block,meta,issues
def main():
  recs=[]
  for f in ['entries','monsters-a-f','monsters-g-p','monsters-q-z']: recs+=json.load(open(os.path.join(D,f+'.json')))
  types=set(sys.argv[1].split(',')) if len(sys.argv)>1 else {'beasts'}
  # Printings read straight from a source PDF (srd521_monsters.py) join the worker printings.
  for extra in filter(None,os.environ.get('EXTRA_PRINTINGS','').split(':')):
    for rec in json.load(open(extra)):
      rec['from_pdf']=True; recs.append(rec)
  out=[]; tally=collections.Counter(); why=collections.Counter()
  for r in recs:
    if r['type'] not in types: continue
    for p in r['printings']:
      if p.get('edition') not in FIVE_E: tally['other system']+=1; continue
      try:
        b,meta,iss=convert(r,p)
        tally['clean' if not iss else 'needs review']+=1
        for i in iss: why[re.sub(r'^[^:]*: ','',re.sub(r'\d+','N',i))[:50]]+=1
        out.append({'pdf':bool(r.get('from_pdf')),'type':r['type'],'slug':r['slug'],'name':r['name'],'printing':p['id'],'label':p['label'],'edition':p.get('edition'),'block':b,'meta':meta,'issues':iss})
      except Fail as e:
        tally['unparsed']+=1; why['FAIL '+str(e)[:40]]+=1
  json.dump(out,open(os.path.join(os.environ.get('MIGRATION_OUT',os.path.dirname(__file__)),'out-'+'-'.join(sorted(types))+'.json'),'w'),indent=1)
  print(tally); [print(f'{c:5} {w}') for w,c in why.most_common(40)]
main()
