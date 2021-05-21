import { MockBlockBase, defaultAnnotations } from './defaults'

const MockParagraphBase = {
  ...MockBlockBase,
  type: 'paragraph',
}

export const MockParagraph = {
  ...MockParagraphBase,
  paragraph: {
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
  paragraph: {
    text: null,
  },
}

export const MockParagraphEmpty = {
  ...MockParagraphBase,
  paragraph: {
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
