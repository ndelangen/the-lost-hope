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
 * Jim's farewell letter, left on Roberto's map pages. Everything but the footer is sealed: each
 * personal section under the word its recipient holds, and the shared opening and closing under
 * all four words joined in section order. The plain text is kept out of the repository (sealed
 * with `scripts/seal-letter.ts`).
 */
export const JIMS_LETTER = {
  sharedLabel: 'For all four of you. Your four words as one, in the order of this letter.',
  opening: {
    salt: 'p0RvU7q7J2giUDTlJic8DA==',
    iv: 'tZsIkvBqsKBlBDwn',
    data: '/LwLzDkYc2jtvKqVsnx+e105vJFzy3suv+nGgiZndFcJsouUQ0/2pxVRqelZY4q/3XG5DymOmhHqHaw4Y+6dYOg02ai+B/8JFaMskJpN9olrUl7avC9/LzhCQWkMFYQmdlZxFFzkZiISQQm0JeWztSqL0q+atY6pSUCUK/YYtlrFXncB1w8/HpDmtGQRknol6ZkU+faZ/KIwZHs3lfAjOQIPNiQEXsgcVmYk1TRwPdlcPWLRDdw+wTJ5yARidOYEsZnPZnZwNCwY/xPSyDIJa6kZu4FShhvPYNhqtsnXcagIJ8CmoxIpk/VZPr+c+rorQI3qsUW9U9rR+6Zca40WttQ9bsh3U867yT3rdSpV/7NHdZNm46jZ06/Qqs80X7QyjeaO1hVQr8lak35udTvrdL4ur9xo7IhpP/jkkkqTpBV3JLQcYcMQWISUKhUqhOuXXiYb4tYu+V5nXNJHHhC2KffkHVifpjiIunCUreFOF/az/ZwDr+Q/tiPEOWS7M2c=',
  },
  sections: [
    {
      id: 'devan',
      recipient: refs.pcs.devan,
      clue: 'For the one whose stone heard Roberto’s last answer. What did you name it?',
      sealed: {
        salt: '6xGo3uYamQExv+HoiNWnkQ==',
        iv: '3eAS4AlRCpllgONU',
        data: 'dPmB2/Bi2/RigJXEu01gvAnUL5fOOHcsK+aABgbKAXl+zkEiAwLO98Vd5ii26SgBxeLlqPtcHAOLCGr1DZsExdeDk8l7YAsI9JQ4cwy0hJLNroiBK4Ql+Fu9yMajTXH2PQ==',
      },
    },
    {
      id: 'cassian',
      recipient: refs.pcs.cassian_veyl,
      clue: 'For the one who believed he was cured. What does your stomach refuse?',
      sealed: {
        salt: 'xrn/iuEoplAmuyZTUyrMLw==',
        iv: 'Wmkn5LNDT2Km9Tws',
        data: '80KGrmTJ12ikJoXhQlggIxQGA+CWEyXYDcYYJhbOf3Eke0DIctUG7KTDq9x3Tf4AqRAsWnJPPRwCoScpQneejW5tR5tJTpd0N9zUv6IW4czL8RwMfwaOscvgDDqcATHndqtvTdKcQWuQWuUyEnWvI1Y=',
      },
    },
    {
      id: 'swift',
      recipient: refs.pcs.swift_starblade,
      clue: 'For the captain whose bird flew me a rope. What kind of bird?',
      sealed: {
        salt: '1i/659CVrXEZmLn9oqyaqA==',
        iv: 'c777HfMxRLI76erN',
        data: 'QyFL8lMOWMkHi3+1nnvLuyqMWyHVMYjsjXBWhe4dpF7Qg/Jz0Q4UZ0LucRNU/PC4/0A3+k3CUa/q4xDZP179oojUhp1TtXC1imuFHraCNFpolcnIxoggNAALB8nTPjE6H9goNSeZubnMQ2Npiccf',
      },
    },
    {
      id: 'crowy',
      recipient: refs.npcs.crowy,
      clue: 'For the bird in the cage, the first night at the Sullen Monk. What did I give you?',
      sealed: {
        salt: 'hxS/CcKu0nleuMynIpohKg==',
        iv: 'CUCEVAvz0rlfswvy',
        data: 'HT73mqx8SO9dO6AJ8iMltfntOeY6FK1ISOI4U85U3UyyqkLYp6Q1OS29r4gg5pjiivultkCLFCGLlIRMZhoKU6gTGacUwNJc/LLvSDkkhaNbx70E8+bzilvFWlM1tPDmCMdLr9KBTQ==',
      },
    },
  ] satisfies LetterSection[],
  closing: {
    salt: '3BhDYO+oixIUo4XyFUR0CA==',
    iv: 'USc5KROMEyFBG9yr',
    data: '1XG0aOPxlgBKUsbp8vThD3bg0t0aNiNuqhyhIPTzpSQOx94gLJ/v7ib1sn4cbJPP3v6QeSjItD3SOzqx2c8J9Z+XIgel66SDDtXPA3PWgWgUAvZ8pCP0P8jfR+dwdbEDDVLVSItwoP6LZoDKI9mptwF+f33LO72OKAkPT0Po00UrS8hSpo5cfatNosWGPhYIty2wrviZ6ri9l2RjKO6R6fa2we+G4Sp6w/TGjyOFEQzVNP8mr8XLQtuKJGLUpoBwyyLF7OlPZ7Kl/4Zldq4d4g0nn5sClwRTRU+DAolyNxKfOWhzeORl3TbtlbYCwKLP3kPHs7nciZ1JN3i79kGK34lW2jRMLw==',
  },
  footer: 'Decryption instructions on page 4 of the Book of Groomsh.',
}
