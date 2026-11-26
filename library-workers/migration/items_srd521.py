"""Read SRD 5.2.1 adventuring gear ("Name (price)") and magic items ("Name" then "Wondrous Item,
Rare (Requires Attunement)") with their rules text. Usage: items_srd521.py <cols.txt> <out.json>"""
import json,re,sys
lines=[l.replace('\x0c','').rstrip() for l in open(sys.argv[1],encoding='utf8')]
lines=[l.strip() for l in lines if l.strip() and not re.fullmatch(r'\d{1,3}',l.strip()) and l.strip()!='System Reference Document 5.2.1']
GEAR=re.compile(r"^([A-Z][\w’',() -]{1,40}?) \((\d[\d,]* (?:CP|SP|EP|GP|PP))\)$")
KIND=r'(?:Wondrous Item|Armor|Weapon|Potion|Ring|Rod|Scroll|Staff|Wand)'
MAGIC=re.compile(r'^'+KIND+r'(?: \([^)]*\))?, (?:Common|Uncommon|Rare|Very Rare|Legendary|Artifact|Rarity Varies)')
items=[]; i=0
def body_from(j):
  out=[]
  while j<len(lines):
    if GEAR.match(lines[j]) or (j+1<len(lines) and MAGIC.match(lines[j+1])) or lines[j] in ('Magic Items A–Z','Monsters','Rules Glossary','Tools','Mounts and Vehicles','Lifestyle Expenses'): break
    out.append(lines[j]); j+=1
  return out,j
start=next(i for i,l in enumerate(lines) if l=='Adventuring Gear' and i>5000)
i=start
while i<len(lines):
  m=GEAR.match(lines[i])
  if m:
    body,j=body_from(i+1)
    items.append({'name':m.group(1),'price':m.group(2),'kind':'gear','text':' '.join(body)}); i=j; continue
  if i+1<len(lines) and MAGIC.match(lines[i+1]) and len(lines[i])<45:
    body,j=body_from(i+2)
    items.append({'name':lines[i],'kind':'magic','category':lines[i+1],'text':' '.join(body)}); i=j; continue
  i+=1
for it in items: it['text']=re.sub(r'(\w)- (\w)',r'\1\2',it['text'])
print(len(items),'items',sum(1 for x in items if x['kind']=='magic'),'magic',file=sys.stderr)
json.dump(items,open(sys.argv[2],'w'),indent=1,ensure_ascii=False)
