"""Read the SRD 5.2.1 spell chapter (pdftotext output) into spell records.
Usage: spells_srd521.py <srd521.txt> <out.json>"""
import json,re,sys
SCHOOLS=['Abjuration','Conjuration','Divination','Enchantment','Evocation','Illusion','Necromancy','Transmutation']
lines=[re.sub(r'^Component:','Components:',l.rstrip()) for l in open(sys.argv[1],encoding='utf8')]
# Page furniture
lines=[l for l in lines if l.strip() and not re.fullmatch(r'\d{1,3}',l.strip()) and l.strip()!='System Reference Document 5.2.1']
HEAD=re.compile(r'^(?:Level (\d) ('+'|'.join(SCHOOLS)+r')|('+'|'.join(SCHOOLS)+r') Cantrip) \((.*)$')
spells=[]; i=0
while i<len(lines):
  m=HEAD.match(lines[i]) if i>0 else None
  if m and i+1<len(lines) and (lines[i+1].startswith('Casting Time:') or (i+2<len(lines) and lines[i+2].startswith('Casting Time:'))):
    name=lines[i-1].strip()
    classes=m.group(4); j=i+1
    while not classes.endswith(')'): classes+=' '+lines[j].strip(); j+=1
    fields={}; KEYS=['Casting Time','Range','Components','Duration']
    while len(fields)<4 and j<len(lines):
      key=next((k for k in KEYS if lines[j].startswith(k+':')),None)
      if not key: break
      v=lines[j][len(key)+1:].strip(); j+=1
      # A value can wrap: a long reaction trigger or material component.
      while j<len(lines) and not any(lines[j].startswith(k+':') for k in KEYS) and (
          v.count('(')>v.count(')') or key=='Casting Time'):
        v+=' '+lines[j].strip(); j+=1
      fields[key]=v
    if len(fields)<4: i+=1; continue
    body=[]
    while j<len(lines):
      if lines[j].strip()=='Rules Glossary': break
      n=HEAD.match(lines[j+1]) if j+1<len(lines) else None
      if n and j+2<len(lines) and (lines[j+2].startswith('Casting Time:') or (j+3<len(lines) and lines[j+3].startswith('Casting Time:'))): break
      body.append(lines[j]); j+=1
    if spells: pass
    spells.append({'name':name,'level':int(m.group(1)) if m.group(1) else 0,'school':(m.group(2) or m.group(3)).lower(),
      'classes':[c.strip() for c in classes.rstrip(')').split(',')],'castingTime':fields['Casting Time'],'range':fields['Range'],
      'components':fields['Components'],'duration':fields['Duration'],'body':body})
    i=j
  else: i+=1
# Paragraphs: a new one starts at a bold lead-in ("Using a Higher-Level Spell Slot.", "Aquatic Adaptation.")
LEAD=re.compile(r'^((?:[A-Z][\w’\'-]*)(?: (?:[A-Z][\w’\'-]*|of|the|a|an|and|or|to|in|on|with|for)){0,6})\. [A-Z]')
for s in spells:
  paras=[]
  for l in s.pop('body'):
    if not paras or LEAD.match(l): paras.append(l)
    elif paras[-1].endswith('-') and l[:1].islower(): paras[-1]=paras[-1][:-1]+l
    else: paras[-1]+=' '+l
  s['paragraphs']=paras
print(len(spells),'spells',file=sys.stderr)
json.dump(spells,open(sys.argv[2],'w'),indent=1,ensure_ascii=False)
