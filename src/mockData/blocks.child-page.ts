import { MockBlockBase, defaultAnnotations } from './defaults'
import { BlockType } from '../types'

const MockChildPageBase = {
  ...MockBlockBase,
  type: BlockType.CHILD_PAGE,
}

export const MockChildPage = {
  ...MockChildPageBase,
  [BlockType.CHILD_PAGE]: {
    checked: false,
    title: 'This is a child page',
  },
}
