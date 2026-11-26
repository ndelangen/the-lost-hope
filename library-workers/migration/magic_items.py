"""Turn the catalog's printed magic-item rules into typed modules under src/data/library/magic-items.

Usage: python3 -I library-workers/migration/magic_items.py [--write]

Reads src/lib/published-library-catalog/entries.json. A printing converts when its Rules section
opens with a category line ("Weapon (Longsword), Rare (Requires Attunement)"); anything else stays
as catalog text. With --write it writes one module per publication plus `_index.ts`, and moves
each converted printing's rules out of the catalog, leaving a `typed` ref.
"""
import json, os, re, sys
from collections import defaultdict

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
CATALOG = os.path.join(REPO, 'src/lib/published-library-catalog/entries.json')
OUT = os.path.join(REPO, 'src/data/library/magic-items')
CATEGORIES = ['Ammunition', 'Armor', 'Potion', 'Ring', 'Rod', 'Scroll', 'Shield', 'Staff', 'Wand', 'Weapon', 'Wondrous Item']
RARITIES = ['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact', 'varies']
CONDS = ['blinded', 'charmed', 'deafened', 'frightened', 'grappled', 'incapacitated', 'invisible',
         'paralyzed', 'petrified', 'poisoned', 'prone', 'restrained', 'stunned', 'unconscious', 'exhaustion']

LINE = re.compile(
    r'^(?P<cat>' + '|'.join(CATEGORIES) + r')(?: \((?P<detail>[^)]*)\))?,\s*'
    r'(?P<rarity>(?:' + '|'.join(RARITIES) + r')(?: or (?:' + '|'.join(RARITIES) + r'))?|rarity varies|rarity by figurine)'
    r'(?:\s*\((?P<att>requires attunement[^)]*)\))?\s*$', re.I)

def js(v): return json.dumps(v, ensure_ascii=False)
def key(n): return re.sub(r'[^a-z0-9]+', '_', n.lower().replace('’', '').replace("'", '')).strip('_')

def para(t):
    """A paragraph, with conditions named as "the X condition" as rules terms."""
    out, last = [], 0
    for m in re.finditer(r'\b(' + '|'.join(c.capitalize() for c in CONDS) + r')\b(?= condition)', t):
        if m.start() > last: out.append(js(t[last:m.start()]))
        out.append('rules.' + m.group(1).lower()); last = m.end()
    if last < len(t): out.append(js(t[last:]))
    return '[' + ', '.join(out) + ']'

def parse(line):
    m = LINE.match(line.strip())
    if not m: return None
    rarity = m.group('rarity').lower()
    if rarity in ('rarity varies', 'rarity by figurine') or ' or ' in rarity: rarity = 'varies'
    att = m.group('att')
    attunement = None
    if att:
        rest = re.sub(r'^requires attunement\s*', '', att, flags=re.I).strip()
        attunement = rest or True
    cat = next(c for c in CATEGORIES if c.lower() == m.group('cat').lower())
    return {'category': cat, 'detail': m.group('detail'), 'rarity': rarity, 'attunement': attunement}

catalog = json.load(open(CATALOG))
records = catalog if isinstance(catalog, list) else catalog['records']
books = defaultdict(dict)
held = defaultdict(int)
converted = []
pending = []
for record in records:
    if record['type'] != 'items': continue
    for printing in record['printings']:
        if printing.get('typed') or not printing.get('publication'): continue
        sections = printing.get('player', []) + printing.get('gm', [])
        rules = [s for s in sections if s['title'] == 'Rules']
        if len(rules) != 1 or not rules[0]['lines']: continue
        head = parse(rules[0]['lines'][0])
        lines = rules[0]['lines'][1:]
        # A potion printed without its category line (Healing, Giant Strength) comes in kinds of
        # several rarities.
        if not head and record['slug'].startswith('potion-') and not rules[0]['lines'][0].startswith('Price'):
            head = {'category': 'Potion', 'detail': None, 'rarity': 'varies', 'attunement': None}
            lines = rules[0]['lines']
        if not head:
            held[printing['id']] += 1
            continue
        book = printing['publication']['key']
        k = key(record['name'])
        if k in books[book]: held['duplicate'] += 1; continue
        pending.append((record, printing, book, k, head, lines))
        books[book][k] = None

# Keys are unique across the library: the SRD 5.2.1 printing keeps the plain key, and another
# book's item whose key a different book also has takes its book's key as a suffix, as spells do.
seen = defaultdict(set)
for _, _, book, k, _, _ in pending: seen[k].add(book)
books = defaultdict(dict)
for record, printing, book, k, head, lines in pending:
    if book != 'srd_5_2_1' and len(seen[k]) > 1: k = f'{k}_{book}'
    paragraphs = [l.strip() for l in lines if l.strip()]
    if not paragraphs: held['no text'] += 1; continue
    books[book][k] = {**head, 'name': record['name'], 'paragraphs': paragraphs}
    converted.append((printing, book, k))

print(sum(len(b) for b in books.values()), 'items in', len(books), 'books; held', dict(held))
if '--write' not in sys.argv: sys.exit()

os.makedirs(OUT, exist_ok=True)
files = []
for book, items in sorted(books.items()):
    name = book.replace('_', '-')
    files.append((name, book))
    L = ["import { refs } from '#/data/generated/library-refs.ts'",
         "import { refs as campaignRefs } from '#/data/generated/refs.ts'",
         "import { createMagicItems } from '#/definitions/library.ts'", '',
         'const { rules } = campaignRefs', '', 'export default createMagicItems({']
    for k, it in sorted(items.items()):
        L += [f'  {k}: {{', f"    name: {js(it['name'])},", f"    category: {js(it['category'])},"]
        if it['detail']: L.append(f"    detail: {js(it['detail'])},")
        L.append(f"    rarity: {js(it['rarity'])},")
        if it['attunement']: L.append(f"    attunement: {js(it['attunement'])},")
        L += ['    text: ['] + [f'      {para(p)},' for p in it['paragraphs']] + ['    ],',
              f'    publication: refs.publications.{book},', '  },']
    L += ['})', '']
    text = '\n'.join(L)
    if 'rules.' not in text.split('createMagicItems({', 1)[1]:
        text = text.replace("import { refs as campaignRefs } from '#/data/generated/refs.ts'\n", '').replace('const { rules } = campaignRefs\n\n', '')
    open(os.path.join(OUT, f'{name}.ts'), 'w').write(text)
idx = [f"import {key(n)} from './{n}.ts'" for n, _ in files] + ['', '/** Every publication whose magic items the library holds. */', 'export default [']
idx += [f'  {key(n)},' for n, _ in files] + [']', '']
open(os.path.join(OUT, '_index.ts'), 'w').write('\n'.join(idx))

for printing, book, k in converted:
    for side in ('player', 'gm'):
        printing[side] = [s for s in printing.get(side, []) if s['title'] != 'Rules']
    printing['typed'] = {'magicItem': {'ref': 'magicItem', 'key': k}, 'publication': {'ref': 'publication', 'key': book}}
json.dump(catalog, open(CATALOG, 'w'), ensure_ascii=False, indent=2)
print('wrote', len(files), 'modules')
