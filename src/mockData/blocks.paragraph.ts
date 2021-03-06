import { MockBlockBase, defaultAnnotations } from './defaults'
import { BlockType } from '../types'

const MockParagraphBase = {
  ...MockBlockBase,
  type: 'paragraph',
}

export const MockParagraph = {
  ...MockParagraphBase,
  [BlockType.PARAGRAPH]: {
    text: [
      {
        type: 'text',
        text: {
          content: 'Lorem Ipsum Lorem Ipsum',
        },
        annotations: [defaultAnnotations],
        plain_text: 'Lorem Ipsum Lorem Ipsum',
        href: null,
      },
    ],
  },
}

export const MockParagraphNull = {
  ...MockParagraphBase,
  [BlockType.PARAGRAPH]: {
    text: null,
  },
}

export const MockParagraphEmpty = {
  ...MockParagraphBase,
  [BlockType.PARAGRAPH]: {
    text: [
      {
        type: 'text',
        text: {
          content: '',
        },
        annotations: [defaultAnnotations],
        plain_text: '',
        href: null,
      },
    ],
  },
}
