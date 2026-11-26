#!/bin/bash
# Two-column PDF to text in reading order: each page's left column, then its right column.
# Usage: columns.sh <pdf> <out.txt> [first page] [last page]
pdf="$1"; out="$2"
pages=$(pdfinfo "$pdf" | awk '/^Pages:/ {print $2}')
read -r w h < <(pdfinfo "$pdf" | awk '/^Page size:/ {print int($3), int($5)}')
half=$((w / 2))
: > "$out"
for ((p=${3:-1}; p<=${4:-$pages}; p++)); do
  pdftotext -q -f $p -l $p -x 0 -y 0 -W $half -H $h "$pdf" - >> "$out"
  pdftotext -q -f $p -l $p -x $half -y 0 -W $((w - half)) -H $h "$pdf" - >> "$out"
done
