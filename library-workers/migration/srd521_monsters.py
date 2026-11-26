"""Read the SRD 5.2.1 stat blocks (columns.sh output) into catalog-shaped printings that
parse5e.py converts like any other. Usage: srd521_monsters.py <srd521-cols.txt> <out.json>"""
import json,re,sys
SIZE=r'(?:Tiny|Small|Medium|Large|Huge|Gargantuan)'
lines=[l.replace('\x0c','').rstrip() for l in open(sys.argv[1],encoding='utf8')]
lines=[l.strip() for l in lines if l.strip() and not re.fullmatch(r'\d{1,3}',l.strip()) and l.strip()!='System Reference Document 5.2.1']
starts=[i for i in range(1,len(lines)-2) if re.match(SIZE+r'( or '+SIZE+r')? \w',lines[i]) and re.match(r'AC \d',lines[i+1])]
HEADS={'Traits','Actions','Bonus Actions','Reactions','Legendary Actions'}
def slug(n): return re.sub(r'[^a-z0-9]+','-',n.lower().replace('’','').replace("'",'')).strip('-')
out=[]
for n,i in enumerate(starts):
  name=lines[i-1]; end=(starts[n+1]-1) if n+1<len(starts) else min(len(lines),i+120)
  # Each page repeats the creature's name as a running head: drop those copies, and the next
  # creature's name before its block.
  nxt=lines[starts[n+1]-1] if n+1<len(starts) else None
  body=[l for l in lines[i+1:end] if l not in (name,nxt)]
  # A running head for a group ("Crawling Claw" above "Swarm of Crawling Claws") can trail too.
  while body and len(body[-1])<40 and not body[-1].endswith(('.',')',':')) and re.fullmatch(r"[A-Z][\w’'-]*(?: [A-Z][\w’'-]*)*",body[-1]): body.pop()
  stats={}; scores={}; saves=[]; other=[]; sections={}; cur=None; last_label=None
  for l in body:
    if l in HEADS: cur=l; sections[cur]=[]; continue
    if cur: sections[cur].append(l); continue
    m=re.match(r'AC (\d+)',l)
    if m: stats['Armor class']=m.group(1); continue
    m=re.match(r'Initiative ([+−-]\d+)',l)
    if m: stats['Initiative']=m.group(1).replace('−','-'); continue
    m=re.match(r'HP (\d+) \((.*)\)',l)
    if m: stats['Hit points']=m.group(1); stats['Hit dice']=m.group(2).replace('−','-'); continue
    if l.startswith('Speed '): stats['Speed']=l[6:]; continue
    if l.startswith('MOD SAVE'): continue
    pairs=re.findall(r'(Str|Dex|Con|Int|Wis|Cha) (\d+) ([+−-]\d+) ([+−-]\d+)',l)
    if pairs:
      for a,v,mo,sv in pairs:
        scores[a]=v
        if sv.replace('−','-')!=mo.replace('−','-'): saves.append(f'{a} {sv.replace("−","-")}')
      continue
    m=re.match(r'CR (\S+) \(',l)
    if m: stats['Challenge']=m.group(1); continue
    if re.match(r'(Skills|Resistances|Vulnerabilities|Immunities|Senses|Languages|Gear) ',l): other.append(l); last_label=l.split()[0]; continue
    if other and last_label: other[-1]+=' '+l
  if not scores or 'Armor class' not in stats: continue
  gm=[{'title':'Statistics','lines':[f'{k} · {v}' for k,v in stats.items()]+[f'{a} · {v}' for a,v in scores.items()]},
      {'title':'Classification','lines':[lines[i]]},
      {'title':'Other statistics','lines':[' '.join(o if o.endswith(('.',';')) else o+'.' for o in other if not o.startswith('Gear '))]}]
  if saves: gm.append({'title':'Saving throws','lines':saves})
  gear=[o for o in other if o.startswith('Gear ')]
  for h in ['Traits','Actions','Bonus Actions','Reactions','Legendary Actions']:
    if h in sections:
      # Entries start at "Name." on a new line; wrapped lines join with a space.
      entries=[]
      for l in sections[h]:
        if re.match(r'^[A-Z][\w’\'-]*(?: [\w’\'()/,–-]+){0,8}\. ',l) and not (entries and entries[-1].endswith((',','—'))) or not entries:
          entries.append(l)
        else: entries[-1]+=' '+l
      gm.append({'title':{'Bonus Actions':'Bonus actions','Legendary Actions':'Legendary actions'}.get(h,h),'lines':['\n'.join(entries)]})
  out.append({'type':'monsters','slug':slug(name),'name':name,'printings':[{'id':'srd-5-2-1','label':'SRD 5.2.1','edition':'2024 fifth edition','gm':gm,'gear':gear}]})
print(len(out),'stat blocks',file=sys.stderr)
json.dump(out,open(sys.argv[2],'w'),indent=1,ensure_ascii=False)
