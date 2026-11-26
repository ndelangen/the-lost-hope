"""Write typed equipment modules from `equipment_srd521.py` output and the reviewed effects.

Usage: python3 -I library-workers/migration/emit_equipment.py <equipment.json> <effects.json>

Writes src/data/library/equipment/srd-5-2-1.ts, with each entry's effects from `<effects.json>`
(`{ key: [effect, ...] }`, written by hand after reading every entry; an entry it doesn't list
leaves nothing lasting: `effects: []`), and the `_index.ts` registry. The typed module is the
source of truth once written: edit it, not these inputs. Conditions named in the text
("the Poisoned condition") become rules terms.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(__file__)
REPO = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT = os.path.join(REPO, 'src/data/library/equipment')
CONDS = ['blinded', 'charmed', 'deafened', 'frightened', 'grappled', 'incapacitated', 'invisible',
         'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'stunned', 'unconscious', 'exhaustion']
# Magic items the gear chapter lists with the gear; they live with the magic items.
MAGIC = {'potion_of_healing'}
# Fixes for what the PDF's text layer garbles.
FIXES = [('11/2 pints', '1½ pints'), ('10-footsquare', '10-foot-square'), ('15foot', '15-foot')]


def js(value):
    return json.dumps(value, ensure_ascii=False)


CONDITION_WORD = re.compile(r'\b(' + '|'.join(c.capitalize() for c in CONDS) + r')\b')


def tokens(value):
    """A JSON token list as TypeScript: rule refs as `rules.x`, and a condition named in a string
    ("the Restrained condition", "while Poisoned") as its rules term."""
    out = []
    for token in value:
        if isinstance(token, dict) and token.get('ref') == 'rule':
            out.append('rules.' + token['key'])
            continue
        last = 0
        for m in CONDITION_WORD.finditer(token):
            if m.start() > last:
                out.append(js(token[last:m.start()]))
            out.append('rules.' + m.group(1).lower())
            last = m.end()
        if last < len(token):
            out.append(js(token[last:]))
    return '[' + ', '.join(out) + ']'


def effect_ts(effect):
    """An effect as TypeScript, its token lists with rules refs."""
    def value(key, v):
        if key in ('text', 'cure') or (key == 'text' and isinstance(v, list)):
            return tokens(v)
        if key == 'conditions':
            return '[' + ', '.join('rules.' + c['key'] for c in v) + ']'
        if isinstance(v, dict):
            return '{ ' + ', '.join(f'{k}: {value(k, x)}' for k, x in v.items()) + ' }'
        return js(v)
    return '{ ' + ', '.join(f'{k}: {value(k, v)}' for k, v in effect.items()) + ' }'


def para(text):
    for wrong, right in FIXES:
        text = text.replace(wrong, right)
    out, last = [], 0
    for m in re.finditer(r'\b(' + '|'.join(c.capitalize() for c in CONDS) + r')\b(?= condition)', text):
        if m.start() > last:
            out.append(js(text[last:m.start()]))
        out.append('rules.' + m.group(1).lower())
        last = m.end()
    if last < len(text):
        out.append(js(text[last:]))
    return '[' + ', '.join(out) + ']'


entries = json.load(open(sys.argv[1]))
effects = json.load(open(sys.argv[2]))
L = [
    "import { refs } from '#/data/generated/library-refs.ts'",
    "import { refs as campaignRefs } from '#/data/generated/refs.ts'",
    "import { createEquipment } from '#/definitions/library.ts'",
    '',
    'const { rules } = campaignRefs',
    '',
    '/** The adventuring gear and sample poisons of the System Reference Document 5.2.1 (CC BY 4.0). */',
    'export default createEquipment({',
]
for e in sorted(entries, key=lambda x: x['key']):
    if e['key'] in MAGIC:
        continue
    # The Spell Scroll entry has no price line of its own and runs into the Signal Whistle, and a
    # table's row read as a line of text ends in no sentence.
    text = [
        p for p in e['text']
        if not p.startswith('A Spell Scroll (Cantrip)') and re.search(r'[.:!?”)]$', p) and p.count(' ') > 2
    ]
    L.append(f"  {e['key']}: {{")
    L.append(f"    name: {js(e['name'])},")
    L.append(f"    category: {js(e['category'])},")
    if e.get('detail'):
        L.append(f"    detail: {js(e['detail'])},")
    if e.get('price'):
        L.append(f"    price: {{ amount: {e['price']['amount']}, coin: {js(e['price']['coin'])} }},")
    if e.get('weight'):
        L.append(f"    weight: {e['weight']},")
    L.append('    text: [' + ', '.join(para(p) for p in text) + '],')
    L.append('    effects: [' + ', '.join(effect_ts(x) for x in effects.get(e['key'], [])) + '],')
    L.append('    publication: refs.publications.srd_5_2_1,')
    L.append('  },')
L.append('})')
os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, 'srd-5-2-1.ts'), 'w').write('\n'.join(L) + '\n')
open(os.path.join(OUT, '_index.ts'), 'w').write(
    "import srd_5_2_1 from './srd-5-2-1.ts'\n\n/** Every publication whose equipment the library holds. */\nexport default [srd_5_2_1]\n")
print('wrote', sum(1 for e in entries if e['key'] not in MAGIC), 'entries')
