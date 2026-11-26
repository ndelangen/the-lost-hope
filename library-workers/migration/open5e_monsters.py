"""Turn Open5e's structured creatures (openly licensed books) into catalog-shaped printings for
parse5e.py, which converts and checks them like any other. Creatures the catalog lacks become
new library entries (`new_entry`). Usage: open5e_monsters.py <open5e creatures.json> <out.json>"""
import json,re,sys
# Open5e document -> the label the library shows for it. Black Flag is its own ruleset (fixed hit
# points, no hit dice) and the SRDs come from their PDFs, so they stay out.
DOCS={'tob':'Tome of Beasts','tob2':'Tome of Beasts 2','tob3':'Tome of Beasts 3','tob-2023':'Tome of Beasts 1 (2023 Edition)',
      'ccdx':'Creature Codex','tdcs':"Tal'dorei Campaign Setting"}
def slug(n): return re.sub(r'[^a-z0-9]+','-',n.lower().replace('’','').replace("'",'')).strip('-')
def cr(v):
  return {0.125:'1/8',0.25:'1/4',0.5:'1/2'}.get(v,str(int(v)) if v==int(v) else str(v))
AB={'strength':'Str','dexterity':'Dex','constitution':'Con','intelligence':'Int','wisdom':'Wis','charisma':'Cha'}
out=[]
for c in json.load(open(sys.argv[1])):
  label=DOCS.get(c['document']['key'])
  if not label or not c.get('hit_dice'): continue
  ri=c['resistances_and_immunities']
  speed=', '.join(f"{v} ft." if k=='walk' else f"{k} {v} ft." for k,v in c['speed'].items() if k not in ('unit','hover') and v)
  stats=[f"Armor class · {c['armor_class']}"+(f" ({c['armor_detail']})" if c.get('armor_detail') else ''),
         f"Hit points · {c['hit_points']}",f"Hit dice · {c['hit_dice'].replace('+',' + ').replace('-',' - ')}",
         f"Challenge · {cr(c['challenge_rating'])}",f"Speed · {speed or '0 ft.'}"]+[f"{AB[k]} · {v}" for k,v in c['ability_scores'].items()]
  props=[]
  # Open5e lists some skills at the plain modifier; only proficient ones are printed.
  pb=max(2,-(-int(c['challenge_rating'])//4)+1) if c['challenge_rating']>=1 else 2
  SK={'acrobatics':'dexterity','animal_handling':'wisdom','arcana':'intelligence','athletics':'strength','deception':'charisma','history':'intelligence','insight':'wisdom','intimidation':'charisma','investigation':'intelligence','medicine':'wisdom','nature':'intelligence','perception':'wisdom','performance':'charisma','persuasion':'charisma','religion':'intelligence','sleight_of_hand':'dexterity','stealth':'dexterity','survival':'wisdom'}
  c['skill_bonuses']={k:v for k,v in (c.get('skill_bonuses') or {}).items() if k in SK and v!=c['modifiers'][SK[k]]}
  if c.get('skill_bonuses'): props.append('Skills '+', '.join(f"{k.replace('_',' ').title()} +{v}" if v>=0 else f"{k.replace('_',' ').title()} {v}" for k,v in c['skill_bonuses'].items()))
  for disp,label_ in [('damage_vulnerabilities_display','Damage Vulnerabilities'),('damage_resistances_display','Damage Resistances'),('damage_immunities_display','Damage Immunities'),('condition_immunities_display','Condition Immunities')]:
    if ri.get(disp): props.append(f'{label_} {ri[disp]}')
  senses=[f'{s} {c[s+"_range"]} ft.' for s in ['blindsight','darkvision','tremorsense','truesight'] if c.get(s+'_range')]
  props.append('Senses '+', '.join(senses+[f"passive Perception {c['passive_perception']}"]))
  props.append('Languages '+(c['languages'].get('as_string') or '—'))
  gm=[{'title':'Statistics','lines':stats},
      {'title':'Classification','lines':[f"{c['size']['name']} {c['type']['name'].lower()}, {c['alignment']}"]},
      {'title':'Other statistics','lines':['. '.join(props)+'.']}]
  saves=[f"{AB[k]} {'+' if v>=0 else ''}{v}" for k,v in (c.get('saving_throws') or {}).items()]
  if saves: gm.append({'title':'Saving throws','lines':saves})
  if c.get('traits'): gm.append({'title':'Traits','lines':['\n'.join(f"{t['name']}. {t['desc'].strip()}" for t in c['traits'])]})
  def entry(a):
    name=a['name']; u=a.get('usage_limits') or {}
    if u.get('type')=='RECHARGE_ON_ROLL' and '(' not in name: name+=f" (Recharge {u['param']}–6)" if u['param']<6 else ' (Recharge 6)'
    if u.get('type')=='PER_DAY' and '(' not in name: name+=f" ({u['param']}/Day)"
    if a.get('limited_to_form') and '(' not in name: name+=f" ({a['limited_to_form']} Form Only)"
    if a.get('legendary_action_cost',0) and a['legendary_action_cost']>1 and '(' not in name: name+=f" (Costs {a['legendary_action_cost']} Actions)"
    desc=re.sub(r'\s+',' ',a['desc'].strip())
    return f"{name}. {desc}"
  acts=sorted(c['actions'],key=lambda a:a.get('order_in_statblock') or 0)
  for kind,title in [('ACTION','Actions'),('BONUS_ACTION','Bonus actions'),('REACTION','Reactions')]:
    xs=[entry(a) for a in acts if a['action_type']==kind and not re.search(r'\(Costs \d',a['name'])]
    if xs: gm.append({'title':title,'lines':['\n'.join(xs)]})
  leg=[entry(a) for a in acts if a['action_type']=='LEGENDARY_ACTION']
  if leg:
    # Open5e keeps no legendary preamble; Kobold Press creatures take three, as 5e's do.
    gm.append({'title':'Legendary actions','lines':['The creature can take 3 legendary actions.\n'+'\n'.join(leg)]})
  out.append({'type':'monsters','slug':slug(c['name']),'name':c['name'],'new_entry':True,'group':c['type']['name'],
              'printings':[{'id':'open5e-'+c['key'],'label':label,'edition':'2014 fifth edition compatible','gm':gm}]})
print(len(out),'creatures',file=sys.stderr)
json.dump(out,open(sys.argv[2],'w'),indent=1,ensure_ascii=False)
