"""Give each library item the SRD 5.2.1 publishes its printed rules, as an "SRD 5.2.1" printing.
Usage: items_add_srd.py <srd-items.json>  (edits src/lib/published-library-catalog/entries.json)"""
import json,os,re,sys
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
path=os.path.join(REPO,'src/lib/published-library-catalog/entries.json')
norm=lambda n: re.sub(r'[^a-z0-9]','',n.lower().replace('’','').replace("'",'').rstrip('s'))
srd={norm(x['name']):x for x in json.load(open(sys.argv[1]))}
data=json.load(open(path)); added=0
for r in data:
  if r['type']!='items': continue
  x=srd.get(norm(r['name']))
  if not x or not x['text'] or any(p['id']=='srd-5-2-1' for p in r['printings']): continue
  lines=([f"Price · {x['price']}"] if x.get('price') else [])+([x['category']] if x.get('category') else [])
  # Shown first when the shop's own printing has no rules to read.
  first_empty=not (r['printings'][0].get('player') or r['printings'][0].get('gm'))
  r['printings'].insert(0 if first_empty else len(r['printings']),{'id':'srd-5-2-1','label':'SRD 5.2.1','edition':'2024 fifth edition','status':'Published rules',
    'player':[{'title':'Rules','lines':lines+[x['text']]}],'gm':[]})
  added+=1
json.dump(data,open(path,'w'),indent=2,ensure_ascii=False)
print('items given SRD rules',added)
