import { MockBlockBase, defaultAnnotations } from './defaults'
import { BlockType } from '../types'

const MockTodoBase = {
  ...MockBlockBase,
  type: BlockType.TO_DO,
}

export const MockTodoUnchecked = {
  ...MockTodoBase,
  [BlockType.TO_DO]: {
    checked: false,
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

export const MockTodoChecked = {
  ...MockTodoBase,
  [BlockType.TO_DO]: {
    checked: true,
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
