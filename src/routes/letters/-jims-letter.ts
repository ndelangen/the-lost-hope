import { refs } from '#/data/generated/refs.ts'
import type { EntityRef } from '#/definitions/kind'
import type { SealedText } from '#/lib/sealed-text'

export type LetterSection = {
  id: string
  recipient: EntityRef
  clue: string
  sealed: SealedText
}

/**
 * Jim's farewell letter, left on Roberto's map pages. Only the opening is readable; each personal
 * section is sealed under the word its recipient holds, and the finale under all four words in
 * order. The plain text is kept out of the repository (sealed with `scripts/seal-letter.ts`).
 */
export const JIMS_LETTER = {
  greeting: 'Beasts & Dwarf,',
  opening: [
    'I am sorry. For the storm that chases me, for the sword I would not wrap, for forty-one poisoned guests, and for every bill you paid because of me. I brought the Eyeless Hand to your door, and you stayed anyway.',
    'I did not know a life could have days like the ones I had with you. They were the best of my whole life. Thank you for every one of them.',
    'He reads these pages, so the rest is hidden. Each of you holds one word he was never there to hear. Speak it, and my ink will come back.',
  ],
  sections: [
    {
      id: 'devan',
      recipient: refs.pcs.devan,
      clue: 'For the one whose stone heard Roberto’s last answer. What did you name it?',
      sealed: {
        salt: 'bnThRvkFtoQKIqD7FXwgjA==',
        iv: 'AFtV+Xl0KO/mD2JC',
        data: 'O6hyZxECqtn71xgOyXVYeLED3yu4I8XTSZyZmB8oiwuyvw/43Ah6f10LcCLtp0/nlTpz2AW7K6kSg9M6jpwYp/ZQ5Q0SsE5671KuLWjejoqCgovWJ7IgMVzPOs8tb0lBEA==',
      },
    },
    {
      id: 'cassian',
      recipient: refs.pcs.cassian_veyl,
      clue: 'For the one who believed he was cured. What does your stomach refuse?',
      sealed: {
        salt: 'W6X/kSkaRFHZUIJzQz5etw==',
        iv: 'aXW8/sTwiWc05GWa',
        data: '79a3zkKxn6VVhmW70Sz3eK9tIYDP9pbHl8K/zO9tjsNV/tAHb4czZ1sfF+Wkj2CaHy8LvCJQqvJDP1Zyb3WDLoJRttAYCtfajemjDvosETuEqvGRwIN4KdyROD9TskJtcvwd+N8dNqc/ggrbnBF1YXs=',
      },
    },
    {
      id: 'swift',
      recipient: refs.pcs.swift_starblade,
      clue: 'For the captain whose bird flew me a rope. What kind of bird?',
      sealed: {
        salt: '5Om+fMLCW/mirXJvwTCYsg==',
        iv: 'NTrWQn0r61TuwosR',
        data: '5cSxN0r4iT9RUuvccYWYTIEYFKyfQrOgFjpSUQNwYLflwNTTo8axeqoeFJNdn8na7GbxrjLgZs3hQyaU2oWSDo9xn43XyRYwq1iG8xaZqEXLj3iaA9MuG+qRy5fN2yQSNvOnFpA5er7PTvGf5aWh',
      },
    },
    {
      id: 'crowy',
      recipient: refs.npcs.crowy,
      clue: 'For the bird in the cage, the first night at the Sullen Monk. What did I give you?',
      sealed: {
        salt: 'wDJ4t17WIK+KGsoycIkhQw==',
        iv: 'XQA8yD+L/CJbt+dZ',
        data: 'AcaYn8myT4QvRxVPK2gexjDqqPzQs+spzJD9Gzrh6M/6TAwsM0cxDrhiapUD+DztK4BaL2kU7nSeuGZBKEmHKnGIcCFzRO2LlPH4S6A0Bsp3prU9jclxklcNuGV5WEWnpZsYoKuo1g==',
      },
    },
  ] satisfies LetterSection[],
  finale: {
    clue: 'For all of you, together.',
    sealed: {
      salt: 'xwfjPee0K4w+Ec6r7UVmnQ==',
      iv: 'dTbP8FIqmHFRzc4W',
      data: 'APZXc842eeEUR+4ZrSX0nqa0QfQjyfujZa0tMIN8chW+wXZH9rz8LsxIzVnY8v7iaKVPT+QfYjP+CpJo55v1UD2Ng55eIJdqvpdAbE/40gGyP6eBKi+t/1wTx7c0puCkBgG2TQj1as4CxgBHWqAgXgbHrrPVQILotKZFf7yP//jFCp83TiMj0Tsx7n4wwQJzHvjVttOgncGa0zpmBf1t8S/TjsKNXTCc6AErL46PcGbSMPAsqIO8GoBscUfeWJ6G7/hh1V520JhlKT6X0/nyW4kxlPudIbVGDtujVs2Qyj1gdvE07eEZLxc29mIhlvm2xWRujZ7tEADtRqs24CgF+JH3niBHDA==',
    },
  },
}
