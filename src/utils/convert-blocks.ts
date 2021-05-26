import { Annotations, BlockBase } from '@notionhq/client/build/src/api-types'
import { BlockType, ICreatePluginConfigRes } from '../types'

export const filterCssClasses = ({
  bold,
  code,
  color,
  italic,
  strikethrough,
  underline,
}: Annotations): string => {
  const annotationsList = [
    bold ? 'gs-bold' : '',
    code ? 'gs-code' : '',
    italic ? 'gs-italic' : '',
    strikethrough ? 'gs-strikethrough' : '',
    underline ? 'gs-underline' : '',
    color !== 'default' ? `gs-${color}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return annotationsList
}

const convertToHTML = (texts): string => {
  if (!texts) {
    return null
  }

  const htmlOutput = texts.map((value) => {
    const { annotations, text } = value

    const classes = filterCssClasses(annotations)
    const content = text.content.replace(/^\s+|\s+$/g, '')

    return `<span ${classes.length ? `class=${classes}` : ''}>${
      text.link ? `<a href=${text.link.url}>${content}</a>` : content
    }</span>`
  })

  return htmlOutput.join('').replace(/\r?\n|\r/g, '')
}

export const convertBlockToHTML = (blocks, options: ICreatePluginConfigRes): string => {
  const allBlocks = blocks.map((block: BlockBase) => {
    const { type, id } = block
    const value = block[type]

    switch (type) {
      case BlockType.PARAGRAPH:
        return `<p>${convertToHTML(value.text)}</p>`
      case BlockType.HEADING_1:
        return `<h2>${convertToHTML(value.text)}</h2>`
      case BlockType.HEADING_2:
        return `<h3>${convertToHTML(value.text)}</h3>`
      case BlockType.HEADING_3:
        return `<h4>${convertToHTML(value.text)}</h4>`
      case BlockType.BULLET_LIST:
      case BlockType.NUMBERED_LIST:
        return `<li>${convertToHTML(value.text)}</li>`
      case BlockType.TO_DO:
        return `<div class="gs-todo"><label for="${id}"><input type="checkbox" id="${id}" ${
          value.checked ? 'checked' : ''
        } />${' '}${convertToHTML(value.text)}</label></div>`
      case BlockType.TOGGLE:
        return `<details class="gs-toggle"><summary>${convertToHTML(
          value.text
        )}</summary>It's a toggle!</details>`
      case BlockType.CHILD_PAGE:
        return `<p class="gs-child-page">${value.title}</p>`
      default:
        return options.get('unsupported')
          ? `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`
          : ''
    }
  })

  return allBlocks.join('')
}
