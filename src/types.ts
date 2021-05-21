import {
  Database,
  URLProperty,
  SelectProperty,
  CheckboxProperty,
  MultiSelectProperty,
} from '@notionhq/client/build/src/api-types'

export interface ICreatePluginConfig {
  token: string
  databaseId: string
  debug: boolean
  unsupported: boolean
  params?: Record<string, unknown> | undefined
}

export interface ICreatePluginConfigRes {
  params?: Record<string, unknown> | undefined
  get: (key: string) => string
}

export enum BlockType {
  PARAGRAPH = 'paragraph',
  HEADING_1 = 'heading_1',
  HEADING_2 = 'heading_2',
  HEADING_3 = 'heading_3',
  BULLET_LIST = 'bulleted_list_item',
  NUMBERED_LIST = 'numbered_list_item',
  TO_DO = 'to_do',
  TOGGLE = 'toggle',
  CHILD_PAGE = 'child_page',
}

export interface IPageArticle extends Database {
  archived: boolean
  properties: {
    ['Title']: {
      id: string
      type: 'title'
      title: Record<string, never> | any
    }
    ['Featured image']: URLProperty
    ['Featured image alt']: {
      id: string
      type: 'rich_text'
      rich_text: Record<string, never> | any
    }
    ['Category']: SelectProperty
    ['Tags']: MultiSelectProperty
    ['Published']: CheckboxProperty
  }
}
