// import {
//   HeadingOneBlock,
//   HeadingThreeBlock,
//   HeadingTwoBlock,
// } from '@notionhq/client/build/src/api-types'
import { MockBlockBase, defaultAnnotations } from './defaults'

const MockHeadingOneBase = {
  ...MockBlockBase,
  type: 'heading_1',
}

const MockHeadingTwoBase = {
  ...MockBlockBase,
  type: 'heading_2',
}

const MockHeadingThreeBase = {
  ...MockBlockBase,
  type: 'heading_3',
}

export const MockHeadingOne = {
  ...MockHeadingOneBase,
  heading_1: {
    text: [
      {
        type: 'text',
        text: {
          content: 'Heading one',
        },
        annotations: [defaultAnnotations],
        plain_text: 'Heading one from Notion',
        href: null,
      },
    ],
  },
}

export const MockHeadingTwo = {
  ...MockHeadingTwoBase,
  heading_2: {
    text: [
      {
        type: 'text',
        text: {
          content: 'Heading two',
        },
        annotations: [defaultAnnotations],
        plain_text: 'Heading two from Notion',
        href: null,
      },
    ],
  },
}

export const MockHeadingThree = {
  ...MockHeadingThreeBase,
  heading_3: {
    text: [
      {
        type: 'text',
        text: {
          content: 'Heading three',
        },
        annotations: [defaultAnnotations],
        plain_text: 'Heading three from Notion',
        href: null,
      },
    ],
  },
}
