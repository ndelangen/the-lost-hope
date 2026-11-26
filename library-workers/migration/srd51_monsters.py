"""Read 2014-format stat blocks (columns.sh output of SRD 5.1, the 2014 Monster Manual or the
Basic Rules) into catalog-shaped printings for parse5e.py.
Usage: srd51_monsters.py <cols.txt> <out.json> <label> <printing id>"""
import json,re,sys
SIZE=r'(?:Tiny|Small|Medium|Large|Huge|Gargantuan)'
raw=[re.sub(r'[\t\r \xa0]+',' ',l.replace('\x0c','').replace('\u00ad','').replace('\u2010','-')).strip() for l in open(sys.argv[1],encoding='utf8',newline='').read().split('\n')]
lines=[l for l in raw if l and not re.fullmatch(r'\d{1,3}',l) and not l.startswith('System Reference Document') and l!='Not for resale. Permission granted to print or photocopy this document for personal use only.']
label,pid=sys.argv[3],sys.argv[4]
starts=[i for i in range(1,len(lines)-2) if re.match(SIZE+r'(?: or '+SIZE+r')? [a-z]',lines[i],re.I) and ',' in lines[i] and lines[i+1].startswith('Armor Class')]
HEADS={'Actions','Reactions','Legendary Actions','Bonus Actions','Lair Actions'}
LABELS=('Saving Throws','Skills','Damage Vulnerabilities','Damage Resistances','Damage Immunities','Condition Immunities','Senses','Languages','Challenge')
def slug(n): return re.sub(r'[^a-z0-9]+','-',n.lower().replace('’','').replace("'",'')).strip('-')
out=[]
for n,i in enumerate(starts):
  name=lines[i-1]
  end=(starts[n+1]-1) if n+1<len(starts) else min(len(lines),i+150)
  body=lines[i+1:end]
  stats={}; nums=[]; other=[]; sections={'Traits':[]}; cur=None; phase='head'
  for l in body:
    if l in HEADS: cur=l; sections[cur]=[]; continue
    if cur: sections[cur].append(l); continue
    m=re.match(r'Armor Class (\d+)(?: \((.*)\))?',l)
    if m: stats['Armor class']=m.group(1)+(f' ({m.group(2)})' if m.group(2) else ''); continue
    m=re.match(r'Hit Points (\d+) \((.*)\)',l)
    if m: stats['Hit points']=m.group(1); stats['Hit dice']=m.group(2).replace('−','-'); continue
    if l.startswith('Speed '): stats['Speed']=l[6:]; continue
    if re.fullmatch(r'(STR|DEX|CON|INT|WIS|CHA)',l): continue
    found=re.findall(r'(\d+) \(([+−-]\d+)\)',l)
    if found and len(nums)<6 and phase=='head': nums+=found; continue
    if l.startswith(LABELS):
      phase='props'; other.append(l)
      m=re.match(r'Challenge (\S+)',l)
      if m: stats['Challenge']=m.group(1); phase='traits'
      continue
    if phase=='props' and other: other[-1]+=' '+l; continue
    if phase=='traits': sections['Traits'].append(l)
  if len(nums)<6 or 'Armor class' not in stats: continue
  scores=dict(zip(['Str','Dex','Con','Int','Wis','Cha'],[v for v,_ in nums[:6]]))
  saves=[]
  for o in other:
    if o.startswith('Saving Throws'): saves=[f'{a} {v}' for a,v in re.findall(r'(Str|Dex|Con|Int|Wis|Cha) ([+−-]\d+)',o)]
  props=[o for o in other if not o.startswith(('Challenge','Saving Throws'))]
  gm=[{'title':'Statistics','lines':[f'{k} · {v}' for k,v in stats.items()]+[f'{a} · {v}' for a,v in scores.items()]},
      {'title':'Classification','lines':[lines[i]]},
      {'title':'Other statistics','lines':[' '.join(o if o.endswith('.') else o+'.' for o in props)]}]
  if saves: gm.append({'title':'Saving throws','lines':saves})
  for h,lines_ in sections.items():
    if not lines_: continue
    entries=[]
    for l in lines_:
      if not entries or (re.match(r'^[A-Z][\w’\'-]*(?: [\w’\'()/,–-]+){0,8}\. ',l) and entries[-1].endswith(('.',')'))): entries.append(l)
      else: entries[-1]+=' '+l
    gm.append({'title':{'Legendary Actions':'Legendary actions','Bonus Actions':'Bonus actions','Lair Actions':'Lair actions'}.get(h,h),'lines':['\n'.join(entries)]})
  out.append({'type':'monsters','slug':slug(name),'name':name,'printings':[{'id':pid,'label':label,'edition':'2014 fifth edition','gm':gm}]})
print(len(out),'stat blocks',file=sys.stderr)
json.dump(out,open(sys.argv[2],'w'),indent=1,ensure_ascii=False)
