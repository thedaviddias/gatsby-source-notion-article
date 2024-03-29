import { filterCssClasses, convertBlockToHTML } from '../../utils/convert-blocks'

import {
  MockParagraph,
  MockParagraphEmpty,
  MockParagraphNull,
} from '../../mockData/blocks.paragraph'
import { MockHeadingOne, MockHeadingTwo, MockHeadingThree } from '../../mockData/blocks.headings'
import { MockTodoUnchecked, MockTodoChecked } from '../../mockData/blocks.todo'
import { MockToggle } from '../../mockData/blocks.toggle'
import { MockChildPage } from '../../mockData/blocks.child-page'
import { defaultAnnotations, defaultPluginConfigRes } from '../../mockData/defaults'

describe('Convert blocks', () => {
  describe('FilterCssClasses', () => {
    it('should return the bold class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, bold: true })

      expect(bold).toEqual('data-notion-annotation="bold"')
    })

    it('should return the italic class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, italic: true })

      expect(bold).toEqual('data-notion-annotation="italic"')
    })

    it('should return the strikethrough class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, strikethrough: true })

      expect(bold).toEqual('data-notion-annotation="strikethrough"')
    })

    it('should return the underline class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, underline: true })

      expect(bold).toEqual('data-notion-annotation="underline"')
    })

    it('should return the code class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, code: true })

      expect(bold).toEqual('data-notion-annotation="code"')
    })

    it('should not return any class if color is default', () => {
      const bold = filterCssClasses({ ...defaultAnnotations })

      expect(bold).toEqual('')
    })

    it('should the color class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, color: 'brown' })

      expect(bold).toEqual('data-notion-color="brown"')
    })

    it('should return bold and color class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, bold: true, color: 'orange' })

      expect(bold).toEqual('data-notion-annotation="bold" data-notion-color="orange"')
    })
  })

  describe('convertBlockToHTML', () => {
    it("should return null if text doesn't exist", () => {
      const nullParagraph = [MockParagraphNull]

      const fn = convertBlockToHTML(nullParagraph, defaultPluginConfigRes)

      expect(fn).toBe('<p>null</p>')
    })

    it('should return an empty paragraph', () => {
      const emptyParagraph = [MockParagraphEmpty]

      const fn = convertBlockToHTML(emptyParagraph, defaultPluginConfigRes)

      expect(fn).toBe('<p><span></span></p>')
    })

    it('should return a paragraph with text', () => {
      const paragraph = [MockParagraph]

      const fn = convertBlockToHTML(paragraph, defaultPluginConfigRes)

      expect(fn).toBe('<p><span>Lorem Ipsum Lorem Ipsum</span></p>')
    })

    it('should return a heading level 2 when Notion sends a heading level 1', () => {
      const headingOne = [MockHeadingOne]

      const fn = convertBlockToHTML(headingOne, defaultPluginConfigRes)

      expect(fn).toBe('<h2><span>Heading one</span></h2>')
    })

    it('should return a heading level 3 when Notion sends a heading level 2', () => {
      const headingTwo = [MockHeadingTwo]

      const fn = convertBlockToHTML(headingTwo, defaultPluginConfigRes)

      expect(fn).toBe('<h3><span>Heading two</span></h3>')
    })

    it('should return a heading level 3 when Notion sends a heading level 2', () => {
      const headingThree = [MockHeadingThree]

      const fn = convertBlockToHTML(headingThree, defaultPluginConfigRes)

      expect(fn).toBe('<h4><span>Heading three</span></h4>')
    })

    it('should return an unchecked todo item', () => {
      const todoItemUnchecked = [MockTodoUnchecked]

      const fn = convertBlockToHTML(todoItemUnchecked, defaultPluginConfigRes)

      expect(fn).toBe(
        '<div data-notion="todo"><label for="657e68c6-1b09-478f-9912-c647e17077b8"><input type="checkbox" id="657e68c6-1b09-478f-9912-c647e17077b8"  /> <span>Lorem Ipsum Lorem Ipsum</span></label></div>'
      )
    })

    it('should return a checked todo item', () => {
      const todoItemChecked = [MockTodoChecked]

      const fn = convertBlockToHTML(todoItemChecked, defaultPluginConfigRes)

      expect(fn).toBe(
        '<div data-notion="todo"><label for="657e68c6-1b09-478f-9912-c647e17077b8"><input type="checkbox" id="657e68c6-1b09-478f-9912-c647e17077b8" checked /> <span>Lorem Ipsum Lorem Ipsum</span></label></div>'
      )
    })

    it('should return a toggle', () => {
      const toggle = [MockToggle]

      const fn = convertBlockToHTML(toggle, defaultPluginConfigRes)

      expect(fn).toBe(
        '<details data-notion="toggle"><summary><span>Lorem Ipsum Lorem Ipsum</span></summary>It\'s a toggle!</details>'
      )
    })

    it('should return a child page', () => {
      const childPage = [MockChildPage]

      const fn = convertBlockToHTML(childPage, defaultPluginConfigRes)

      expect(fn).toBe('<p data-notion="child-page">This is a child page</p>')
    })

    it('should return empty if block is not supported', () => {
      const noSupported = []

      const fn = convertBlockToHTML(noSupported, defaultPluginConfigRes)

      expect(fn).toBe('')
    })

    it('should return a message if block is not supported', () => {
      const noSupported = [{}]

      const fn = convertBlockToHTML(noSupported, { get: () => 'unsupported' })

      expect(fn).toBe('❌ Unsupported block (undefined)')
    })
  })
})
