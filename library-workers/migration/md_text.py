"""Open5e text is markdown with hard-wrapped lines; turn it into paragraphs of plain prose."""
import re
def paragraphs(md):
  out=[]
  for block in re.split(r'\n\s*\n',(md or '').replace('\r','')):
    lines=[l.rstrip() for l in block.split('\n') if l.strip()]
    if not lines: continue
    # Tables and lists keep one row per line; prose lines join.
    if all(l.lstrip('> ').startswith('|') for l in lines):
      for l in lines:
        row=l.lstrip('> ').strip()
        if re.fullmatch(r'\|?[\s:|-]+\|?',row): continue
        out.append(' · '.join(c.strip() for c in row.strip('|').split('|')))
      continue
    cur=[]
    for l in lines:
      l=l.lstrip('> ').strip()
      if re.fullmatch(r'(\* ?){3,}|-{3,}',l): continue
      if re.match(r'[-*] ',l) or re.match(r'#+ ',l):
        if cur: out.append(' '.join(cur)); cur=[]
        out.append(('• '+l[2:]) if re.match(r'[-*] ',l) else re.sub(r'^#+ ','',l))
      else: cur.append(l)
    if cur: out.append(' '.join(cur))
  clean=[]
  for p in out:
    p=re.sub(r'\*\*\*?([^*]+?)\*\*\*?',r'\1',p); p=re.sub(r'(?<![\w*])\*([^*\n]+?)\*(?!\w)',r'\1',p)
    p=re.sub(r'(?<!\w)_([^_]+)_(?!\w)',r'\1',p); p=re.sub(r'\s+',' ',p).strip()
    if p: clean.append(p)
  return clean
