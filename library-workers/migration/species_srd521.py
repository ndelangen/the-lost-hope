"""Read the SRD 5.2.1 species and give each library species entry an "SRD 5.2.1" printing with
its traits. Usage: species_srd521.py <srd521-cols.txt>  (edits the catalog's entries.json)"""
import json,os,re,sys
REPO=os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..'))
raw=[l.replace('\x0c','').rstrip() for l in open(sys.argv[1],encoding='utf8')]
keep=[]
for k,l in enumerate(raw):
  s=l.strip()
  if not s or s=='System Reference Document 5.2.1': continue
  if re.fullmatch(r'\d{1,3}',s) and any(x.strip()=='System Reference Document 5.2.1' for x in raw[max(0,k-3):k+4]): continue
  keep.append(s)
start=keep.index('Species Descriptions')
species=[]; i=start+1
while i<len(keep):
  if i+1<len(keep) and keep[i+1].startswith('Creature Type:'):
    name=keep[i]; j=i+1; head=[]
    while re.match(r'(Creature Type|Size|Speed):',keep[j]) or (head and head[-1].count('(')>head[-1].count(')')) or (head and head[-1].endswith(',')) or (head and re.match(r'(feet tall|chosen when)',keep[j])):
      if head and not re.match(r'(Creature Type|Size|Speed):',keep[j]): head[-1]+=' '+keep[j]
      else: head.append(keep[j])
      j+=1
    body=[]
    while j<len(keep) and not (j+1<len(keep) and keep[j+1].startswith('Creature Type:')) and not keep[j].startswith('Chapter') and keep[j] not in ('Equipment','Feats','Backgrounds'):
      body.append(keep[j]); j+=1
    species.append((name,head,body)); i=j
  else:
    i+=1
    if species and i-start>3000: break
LEAD=re.compile(r"^([A-Z][\w’'-]*(?: [\w’'-]+){0,4}(?: \([^)]*\))?)\. ")
out={}
for name,head,body in species:
  paras=[]; table=None
  for l in body:
    starts=LEAD.match(l) and (not paras or paras[-1].endswith(('.',':',')')))
    short=len(l)<40 and not l.endswith('.') and not LEAD.match(l)
    if table is not None and (starts or not short):
      paras.append(table[0]+': '+'; '.join(table[1:])); table=None
    if table is not None: table.append(l); continue
    if short and (not paras or paras[-1].endswith('.')) and re.search(r'(Ancestors|Lineages|Legacies|Ancestry|Ancestries)$',l): table=[l]; continue
    if not paras or starts: paras.append(l)
    elif paras[-1].endswith('-') and l[:1].islower(): paras[-1]=paras[-1][:-1]+l
    else: paras[-1]+=' '+l
  if table: paras.append(table[0]+': '+'; '.join(table[1:]))
  out[name]=head+paras
# Full-width tables come out cut by the column crop; these rows are copied from pdftotext -layout.
TABLES={
 'Draconic Ancestors':['Draconic Ancestors: Black, Acid; Blue, Lightning; Brass, Fire; Bronze, Lightning; Copper, Acid; Gold, Fire; Green, Poison; Red, Fire; Silver, Cold; White, Cold.'],
 'Elven Lineages':['Elven Lineages (level 1 benefit; level 3 spell; level 5 spell):',
   'Drow: The range of your Darkvision increases to 120 feet. You also know the Dancing Lights cantrip. Level 3: Faerie Fire. Level 5: Darkness.',
   'High Elf: You know the Prestidigitation cantrip. Whenever you finish a Long Rest, you can replace that cantrip with a different cantrip from the Wizard spell list. Level 3: Detect Magic. Level 5: Misty Step.',
   'Wood Elf: Your Speed increases to 35 feet. You also know the Druidcraft cantrip. Level 3: Longstrider. Level 5: Pass without Trace.',
   'Intelligence, Wisdom, or Charisma is your spellcasting ability for the spells you cast with this trait (choose the ability when you select the lineage).'],
 'Fiendish Legacies':['Fiendish Legacies (level 1 benefit; level 3 spell; level 5 spell):',
   'Abyssal: You have Resistance to Poison damage. You also know the Poison Spray cantrip. Level 3: Ray of Sickness. Level 5: Hold Person.',
   'Chthonic: You have Resistance to Necrotic damage. You also know the Chill Touch cantrip. Level 3: False Life. Level 5: Ray of Enfeeblement.',
   'Infernal: You have Resistance to Fire damage. You also know the Fire Bolt cantrip. Level 3: Hellish Rebuke. Level 5: Darkness.'],
}
for name,lines in out.items():
  fixed=[]
  for l in lines:
    l=re.sub(r' Level 3 Level 5 .*$','',l)   # stray cells of a table printed on another page
    t=next((t for t in TABLES if l.startswith(t+':')),None)
    fixed+=TABLES[t] if t else [l]
    # A table printed away from its trait goes right after the trait that names it.
    for t in TABLES:
      if t+' table' in l and not t in ' '.join(fixed[:-1]) and not any(x.startswith(t) for x in lines): fixed+=TABLES[t]
  out[name]=fixed
  missing=[t for t in TABLES if any(t+' table' in x for x in fixed) and not any(x.startswith(t) for x in fixed)]
  if missing: sys.exit(f'{name}: table not found: {missing}')
path=os.path.join(REPO,'src/lib/published-library-catalog/entries.json')
data=json.load(open(path)); added=0
norm=lambda n: re.sub(r'[^a-z]','',n.lower())
for r in data:
  if r['type']!='species' or norm(r['name']) not in {norm(n) for n in out}: continue
  lines=out[next(n for n in out if norm(n)==norm(r['name']))]
  traits={'title':'Species traits','lines':lines}
  have=next((p for p in r['printings'] if p['id']=='srd-5-2-1'),None)
  if have:
    # The worker's summary of the SRD printing gives way to the printed traits.
    have['player']=[traits]; have['status']='Published rules'; have.setdefault('edition','2024 fifth edition')
  else:
    r['printings'].insert(0,{'id':'srd-5-2-1','label':'SRD 5.2.1','edition':'2024 fifth edition','status':'Published rules','player':[traits],'gm':[]})
  added+=1
json.dump(data,open(path,'w'),indent=2,ensure_ascii=False)
print('species found',len(out),list(out),'library entries given SRD traits',added)
