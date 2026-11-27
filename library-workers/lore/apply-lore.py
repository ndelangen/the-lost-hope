"""Write researched looks, behaviour and lore into typed library creatures.

Usage: python3 -I library-workers/lore/apply-lore.py <batch.json> <result.json>... [--dry] [--replace]

Each batch names a creature's key and the publication whose printing should carry it; each
result gives, per key, `appearance` and `lore` written in our own words, optional `habitats`, and
the `sources` read, or `review` when nothing reliable was found. The text goes on that one
printing (a creature's looks and lore exist once, not on every reprint): `appearance`, then
`lore` with a line linking its sources, and `habitats` when the printing has none. A printing
that already has looks or lore is left alone, unless `--replace` is given (for a rewrite of
those two fields). Reviews are printed for the human-review list.
"""
import json
import os
import re
import sys

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
args = [a for a in sys.argv[1:] if not a.startswith('--')]
dry = '--dry' in sys.argv
replace = '--replace' in sys.argv
pairs = [(args[i], args[i + 1]) for i in range(0, len(args), 2)]
DASH = re.compile(r'\s[—–]\s|—')
MIRROR = re.compile(r'5etools|5e\.tools|githubusercontent', re.I)
PUBLICATIONS = dict(re.findall(r"^  ([a-z0-9_]+): \{\n    name: ['\"](.+?)['\"],", open(os.path.join(REPO, 'src/data/library/publications.ts')).read(), re.M))


def closing(s, i):
    depth, quote = 0, None
    while i < len(s):
        c = s[i]
        if quote:
            if c == '\\':
                i += 2
                continue
            if c == quote:
                quote = None
        elif c in "'\"`":
            quote = c
        elif c in '{[':
            depth += 1
        elif c in '}]':
            depth -= 1
            if depth == 0:
                return i
        i += 1
    raise ValueError('unbalanced')


def drop_field(block, name):
    """Remove a top-level `name: [...]` field (and its trailing comma and line) from a creature block."""
    m = re.search(r'\n(\s*)' + name + r': \[', block)
    if not m or m.start() > block.index('stats: {'):
        return block
    end = closing(block, m.end() - 1) + 1
    if block[end:end + 1] == ',':
        end += 1
    return block[:m.start()] + block[end:]


def js(v):
    return json.dumps(v, ensure_ascii=False)


def check(entry):
    problems = []
    for field in ('appearance', 'lore'):
        text = entry.get(field)
        # Looks are optional: a source that never describes them leaves them out.
        if field == 'appearance' and text is None:
            continue
        if not isinstance(text, str) or len(text.split()) < 6:
            problems.append(f'{field} missing or too short')
        elif re.search(r'\d+ \(\d+d\d+|\bDC \d+|\bAC \d+|\+\d+ to hit|\bhit points?\b', text, re.I):
            problems.append(f'{field} carries game numbers')
    sources = entry.get('sources') or []
    if not sources or not all(isinstance(s, dict) and s.get('label') and (not s.get('url') or str(s['url']).startswith('https://')) for s in sources):
        problems.append('sources missing, unlabelled or not https')
    return problems


written, reviews, failed = 0, [], []
files = {}
for batch_path, result_path in pairs:
    batch = {b['key']: b for b in json.load(open(batch_path))}
    for entry in json.load(open(result_path)):
        key = entry.get('key')
        if key not in batch:
            failed.append((key, 'not in batch'))
            continue
        if 'review' in entry:
            reviews.append((batch[key]['name'], batch[key]['publication'], entry['review']))
            continue
        problems = check(entry)
        if problems:
            failed.append((key, '; '.join(problems)))
            continue
        path = os.path.join(REPO, 'src/data/library/monsters', batch[key]['publication'].replace('_', '-') + '.ts')
        if path not in files:
            files[path] = open(path).read()
        source = files[path]
        m = re.search(r'\n    ' + re.escape(key) + r': \{', source)
        if not m:
            failed.append((key, 'creature not in module'))
            continue
        open_ = m.end() - 1
        close = closing(source, open_)
        block = source[open_:close + 1]
        head = block.split('stats: {')[0]
        if 'appearance:' in head or 'lore:' in head:
            if not replace:
                continue
            block = drop_field(drop_field(block, 'appearance'), 'lore')
        appearance = DASH.sub(', ', entry['appearance'].strip()) if entry.get('appearance') else None
        lore = DASH.sub(', ', entry['lore'].strip())
        links = []
        cited = []
        for s in entry['sources'][:3]:
            url = s.get('url') or ''
            # A mirror of a book's own text is not a source to send a reader to: cite the book.
            if MIRROR.search(url):
                s = {'label': PUBLICATIONS.get(batch[key]['publication'], batch[key]['publication'])}
                url = ''
            if any(c['label'] == s['label'] for c in cited):
                continue
            cited.append({'label': s['label'], 'url': url})
        for i, s in enumerate(cited):
            if i:
                links.append(js(', '))
            links.append('{ type: "link", label: ' + js(s['label']) + ', url: ' + js(s['url']) + ' }' if s['url'] else js(s['label']))
        fields = ([f'appearance: [[{js(appearance)}]],'] if appearance else []) + [f'lore: [[{js(lore)}], [{js("Sources: ")}, {", ".join(links)}]],']
        if entry.get('habitats') and 'habitats:' not in head:
            fields.append('habitats: ' + js([h.strip() for h in entry['habitats'] if h.strip()][:4]) + ',')
        at = block.index('stats: {')
        line_start = block.rindex('\n', 0, at) + 1
        indent = block[line_start:at]
        block = block[:line_start] + ''.join(indent + f + '\n' for f in fields) + block[line_start:]
        files[path] = source[:open_] + block + source[close + 1:]
        written += 1

if not dry:
    for path, source in files.items():
        open(path, 'w').write(source)
print(f'{written} written, {len(reviews)} for review, {len(failed)} failed')
for key, why in failed:
    print('- failed', key, why)
for name, pub, why in reviews:
    print('- review', f'{name} ({pub}):', why)
