import { MockBlockBase, defaultAnnotations } from './defaults'
import { BlockType } from '../types'

const MockToggleBase = {
  ...MockBlockBase,
  type: BlockType.TOGGLE,
}

export const MockToggle = {
  ...MockToggleBase,
  [BlockType.TOGGLE]: {
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
