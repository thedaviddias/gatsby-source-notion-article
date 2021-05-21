import { Annotations } from '@notionhq/client/build/src/api-types'
import { ICreatePluginConfig, ICreatePluginConfigRes } from '../types'

export const defaultAnnotations: Annotations = {
  bold: false,
  code: false,
  color: 'default',
  italic: false,
  strikethrough: false,
  underline: false,
}

export const defaultPluginConfigRes: ICreatePluginConfigRes = {
  get: jest.fn(),
}

export const defaultPluginConfig: ICreatePluginConfig = {
  token: '123456',
  databaseId: '12345',
  debug: false,
  unsupported: false,
}

export const MockBlockBase = {
  object: 'block',
  id: '657e68c6-1b09-478f-9912-c647e17077b8',
  created_time: '2021-05-20T15:08:53.308Z',
  last_edited_time: '2021-05-20T15:08:00.000Z',
  has_children: false,
}
