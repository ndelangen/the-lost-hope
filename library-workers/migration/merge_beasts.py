"""Fold the catalog's beasts into its monsters: one creature list, filtered by creature type.

A beast that also has a monster record gives that record its printings; a printing of a
publication the monster record already holds is dropped, keeping whichever copy is typed (or the
fuller one). Every other beast becomes a monster grouped as "Beast". Run after emit.py."""
import json,os
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
CAT=os.path.join(REPO,'src/lib/published-library-catalog')
FILES=['entries','monsters-a-f','monsters-g-p','monsters-q-z']
data={f:json.load(open(os.path.join(CAT,f+'.json'))) for f in FILES}
monsters={r['slug']:r for f in FILES for r in data[f] if r['type']=='monsters'}
def weight(p): return (1 if 'typed' in p else 0, len(json.dumps(p)))
merged=moved=dropped=0
for f in FILES:
  keep=[]
  for r in data[f]:
    if r['type']!='beasts': keep.append(r); continue
    target=monsters.get(r['slug'])
    if target is None:
      r['type']='monsters'; r['group']='Beast'; r['groups']=['Beast']; keep.append(r); moved+=1; continue
    for p in r['printings']:
      same=next((q for q in target['printings'] if q['label']==p['label']),None)
      if same is None: target['printings'].append(p); continue
      dropped+=1
      if weight(p)>weight(same): target['printings'][target['printings'].index(same)]=p
    # Keep the beast's artwork too, after the creature's own, as alternates.
    for image in r.get('art') or []:
      if image['file'] not in {a['file'] for a in target.get('art') or []}:
        target.setdefault('art',[]).append(image)
    merged+=1
  data[f]=keep
for f in FILES:
  for r in data[f]:
    if r['type']=='monsters':
      # One spelling per creature type: "fiend" and "Fiend" are one group.
      r['group']=r['group'][:1].upper()+r['group'][1:]
      if 'groups' in r: r['groups']=sorted({g[:1].upper()+g[1:] for g in r['groups']})
  json.dump(data[f],open(os.path.join(CAT,f+'.json'),'w'),indent=2,ensure_ascii=False)
print('merged',merged,'moved',moved,'duplicate printings dropped',dropped)
