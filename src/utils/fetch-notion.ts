import { Client, LogLevel, APIErrorCode } from '@notionhq/client'
import { RequestParameters } from '@notionhq/client/build/src/Client'
import { PaginatedList, Database, Block } from '@notionhq/client/build/src/api-types'

import { ICreatePluginConfigRes } from '../types'

const queryDatabase = (pluginOptions: ICreatePluginConfigRes): RequestParameters => ({
  path: 'databases/' + pluginOptions.get('databaseId') + '/query',
  method: 'post',
  body: pluginOptions.params,
})

const queryBlocks = (blockId: string): RequestParameters => ({
  path: 'blocks/' + blockId + '/children',
  method: 'get',
})

/**
 * Notion Client module
 *
 * @param pluginOptions - Plugin options from Gatsby Config
 * @returns
 */
const notionConnect = (pluginOptions: ICreatePluginConfigRes): Client =>
  new Client({
    auth: pluginOptions.get('token'),
    logLevel: pluginOptions.get('debug') ? LogLevel.DEBUG : undefined,
  })

/**
 * Fetch database from Notion API
 *
 * @param pluginOptions - Plugin options from Gatsby Config
 * @returns
 */
export const fetchDatabaseNotion = async (
  pluginOptions: ICreatePluginConfigRes
): Promise<PaginatedList<Database> | undefined> => {
  try {
    return await notionConnect(pluginOptions).request(queryDatabase(pluginOptions))
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error(
        'Database was not found. Please indicate another database or share your database with your integration.'
      )
    } else {
      console.error(error)
    }
  }

  return undefined
}

/**
 * Fetch blocks from Notion API based on database id
 *
 * @param pluginOptions
 * @param databaseId
 * @returns
 */
export const fetchBlocksNotion = async (
  pluginOptions: ICreatePluginConfigRes,
  databaseId: string
): Promise<PaginatedList<Block> | undefined> => {
  try {
    return await notionConnect(pluginOptions).request(queryBlocks(databaseId))
  } catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
      console.error('No blocks were found for this specific database.')
    } else {
      console.error(error)
    }
  }

  return undefined
}
