"""Give library items the rules openly licensed books print for them, from Open5e: magic items
(Vault of Magic, SRD 5.1, SRD 5.2) and SRD equipment. A matching catalog item gains a printing;
an item the catalog lacks becomes a new library entry. Run after items_add_srd.py.
Usage: items_open5e.py <magicitems.json> <items.json>"""
import json,os,re,sys
sys.path.insert(0,os.path.dirname(__file__))
from md_text import paragraphs as md_paragraphs
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
LABELS={'vom':('Vault of Magic','vault-of-magic'),'srd-2014':('SRD 5.1','srd-5-1'),'srd-2024':('SRD 5.2.1','srd-5-2-1')}
PUB={'vom':'vault_of_magic','srd-2014':'srd_5_1','srd-2024':'srd_5_2_1'}
norm=lambda n: re.sub(r'[^a-z0-9]','',n.lower().replace('’','').replace("'",'').rstrip('s'))
slug=lambda n: re.sub(r'[^a-z0-9]+','-',n.lower().replace('’','').replace("'",'')).strip('-')
def lines_of(x,magic):
  head=[]
  if magic:
    kind=x['category']['name']; rar=x['rarity']['name'] if x.get('rarity') else ''
    att=' (requires attunement'+(f" {x['attunement_detail']}" if x.get('attunement_detail') else '')+')' if x.get('requires_attunement') else ''
    head.append(f"{kind}, {rar.lower()}{att}".strip(', '))
  elif float(x.get('cost') or 0)>0:
    gp=float(x['cost']); head.append('Price · '+(f'{gp:g} GP' if gp>=1 else f'{gp*10:g} SP' if gp>=0.1 else f'{gp*100:g} CP'))
  if x.get('armor'): head.append('Armor Class · '+x['armor']['ac_display'])
  if x.get('weight') and float(x['weight'])>0: head.append(f"Weight · {float(x['weight']):g} {x.get('weight_unit') or 'lb'}")
  desc=re.split(r'\n#+ Sentient Magic Items',x.get('desc') or '')[0]   # Open5e appends this to some items
  body=md_paragraphs(desc)
  return head+body
path=os.path.join(REPO,'src/lib/published-library-catalog/entries.json')
data=json.load(open(path))
byname={}
for r in data:
  if r['type']=='items': byname.setdefault(norm(r['name']),r)
existing=set(byname)
added=new=0
def collapse(items):
  """Open5e lists "Flame Tongue Battleaxe", "Flame Tongue Club" … with one text: keep one, named
  by the words all their names share."""
  groups={}
  for x in items: groups.setdefault((x['document']['key'],x.get('desc')),[]).append(x)
  out=[]
  for (doc,desc),xs in groups.items():
    words=[re.sub(r'[(),]',' ',x['name']).split() for x in xs]
    common=[]
    for ws in zip(*words):
      if len(set(ws))==1: common.append(ws[0])
      else: break
    same=len({((x.get('rarity') or {}).get('key'),x.get('cost'),x.get('weight')) for x in xs})==1
    name=' '.join(common).rstrip(',')
    if len(xs)>1 and desc and same and len(common)>=2 and norm(name) not in existing:
      one=dict(xs[0]); one['name']=' '.join(common).rstrip(','); one['armor']=None; out.append(one)
    else: out+=xs
  return out
for src,magic in [(sys.argv[1],True),(sys.argv[2],False)]:
  for x in collapse(json.load(open(src))):
    doc=x['document']['key']
    if doc not in LABELS or not (x.get('desc') or '').strip(): continue
    label,pid=LABELS[doc]
    printing={'id':pid,'publication':{'ref':'publication','key':PUB[doc]},'label':label,'edition':'2024 fifth edition' if doc=='srd-2024' else '2014 fifth edition','status':'Published rules','player':[{'title':'Rules','lines':lines_of(x,magic)}],'gm':[]}
    r=byname.get(norm(x['name']))
    if r:
      if any(p['id']==pid for p in r['printings']): continue   # e.g. the SRD 5.2.1 PDF printing
      first_empty=not (r['printings'][0].get('player') or r['printings'][0].get('gm'))
      r['printings'].insert(0 if first_empty else len(r['printings']),printing); added+=1
    else:
      group=('Magic items' if magic else 'Equipment')
      rec={'type':'items','slug':slug(x['name']),'name':x['name'],'summary':'','group':group,'groups':[group],'printings':[printing]}
      if any(q['slug']==rec['slug'] for q in data if q['type']=='items'): rec['slug']+='-'+pid
      data.append(rec); byname[norm(x['name'])]=rec; new+=1
json.dump(data,open(path,'w'),indent=2,ensure_ascii=False)
print('items given printed rules',added,'new item entries',new)
