import { filterCssClasses, convertBlockToHTML } from '../../utils/convert-blocks'

import {
  MockParagraph,
  MockParagraphEmpty,
  MockParagraphNull,
} from '../../mockData/blocks.paragraph'
import { MockHeadingOne, MockHeadingTwo, MockHeadingThree } from '../../mockData/blocks.headings'
import { defaultAnnotations, defaultPluginConfigRes } from '../../mockData/defaults'

describe('Convert blocks', () => {
  describe('FilterCssClasses', () => {
    it('should return the bold class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, bold: true })

      expect(bold).toEqual('gs-bold')
    })

    it('should return the italic class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, italic: true })

      expect(bold).toEqual('gs-italic')
    })

    it('should return the strikethrough class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, strikethrough: true })

      expect(bold).toEqual('gs-strikethrough')
    })

    it('should return the underline class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, underline: true })

      expect(bold).toEqual('gs-underline')
    })

    it('should return the code class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, code: true })

      expect(bold).toEqual('gs-code')
    })

    it('should not return any class if color is default', () => {
      const bold = filterCssClasses({ ...defaultAnnotations })

      expect(bold).toEqual('')
    })

    it('should the color class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, color: 'brown' })

      expect(bold).toEqual('gs-brown')
    })

    it('should return bold and color class', () => {
      const bold = filterCssClasses({ ...defaultAnnotations, bold: true, color: 'orange' })

      expect(bold).toEqual('gs-bold gs-orange')
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

      expect(fn).toBe('<p><span class=gs-undefined></span></p>')
    })

    it('should return a paragraph with text', () => {
      const paragraph = [MockParagraph]

      const fn = convertBlockToHTML(paragraph, defaultPluginConfigRes)

      expect(fn).toBe('<p><span class=gs-undefined>Lorem Ipsum Lorem Ipsum</span></p>')
    })

    it('should return a heading level 2 when Notion sends a heading level 1', () => {
      const headingOne = [MockHeadingOne]

      const fn = convertBlockToHTML(headingOne, defaultPluginConfigRes)

      expect(fn).toBe('<h2><span class=gs-undefined>Heading one</span></h2>')
    })

    it('should return a heading level 3 when Notion sends a heading level 2', () => {
      const headingTwo = [MockHeadingTwo]

      const fn = convertBlockToHTML(headingTwo, defaultPluginConfigRes)

      expect(fn).toBe('<h3><span class=gs-undefined>Heading two</span></h3>')
    })

    it('should return a heading level 3 when Notion sends a heading level 2', () => {
      const headingThree = [MockHeadingThree]

      const fn = convertBlockToHTML(headingThree, defaultPluginConfigRes)

      expect(fn).toBe('<h4><span class=gs-undefined>Heading three</span></h4>')
    })
  })
})
