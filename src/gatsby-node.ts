import { PaginatedList, Database } from '@notionhq/client/build/src/api-types'

import { fetchDatabaseNotion, fetchBlocksNotion } from './utils/fetch-notion'
import { convertBlockToHTML } from './utils/convert-blocks'
import { createPluginConfig } from './utils/plugin-options'
import { ICreatePluginConfigRes, ICreatePluginConfig, IPageArticle } from './types'

function createSchemaCustomization({ actions }) {
  const { createTypes } = actions
  const typeDefs = `
    type NotionArticleTags {
      id: String
      name: String
      color: String
    }

    type NotionArticleAuthorPerson {
      email: String
    }

    type NotionCategory {
      id: String
      name: String
      color: String
    }

    type NotionArticleAuthor {
      id: String
      name: String
      avatar_url: String
      person: NotionArticleAuthorPerson
    }

    type NotionArticleFeaturedImg {
      url: String
      alt: String
    }

    type NotionArticle implements Node {
      id: String
      archived: Boolean
      author: [NotionArticleAuthor]
      body: String
      category: NotionCategory
      createdAt: Date
      featured_img: NotionArticleFeaturedImg
      published: Boolean
      tags: [NotionArticleTags]
      title: String
      updatedAt: Date
    }
  `
  createTypes(typeDefs)
}

function sourceNodes(
  { actions, createNodeId, createContentDigest },
  configOptions: ICreatePluginConfig
) {
  const { createNode } = actions

  const pluginConfig = createPluginConfig(configOptions)

  // createTypes(typeDefs)

  // Helper function to fetch and parse data
  const fetchAndParse = async (config: ICreatePluginConfigRes): Promise<PaginatedList<Database>> =>
    await fetchDatabaseNotion(config)

  /**
   * Recursively get data
   * @param pluginConfig - Take the config from gatsby conf
   * @param data - Array that contains all articles
   * @returns
   */
  const getArticlesFromDatabase = async (
    pluginConfig: ICreatePluginConfigRes,
    data = []
  ): Promise<any[]> => {
    const response = await fetchAndParse(pluginConfig)

    data = response ? data.concat(response.results) : []

    return data
  }

  // Create nodes
  const createNodes = async (pluginConfig: ICreatePluginConfigRes) => {
    await getArticlesFromDatabase(pluginConfig).then((res) => {
      res?.forEach(async (page: IPageArticle) => {
        if (page.id !== undefined && page.properties.Title.title.length) {
          const blocks = await generateBlocks(page.id)
          const nodeData = blocks && processPage(page, blocks)
          createNode(nodeData)
        }
      })
    })
  }

  const generateBlocks = async (id: string): Promise<string | undefined> => {
    const data = await fetchBlocksNotion(pluginConfig, id)
    const body = convertBlockToHTML(data.results, pluginConfig)

    return body
  }

  const processPage = (page: IPageArticle, blocks: string) => {
    const nodeId = createNodeId(`notion-article-${page.id}`)

    const articleSchema = {
      title: page.properties.Title?.title[0].text.content,
      createdAt: page.created_time,
      updatedAt: page.last_edited_time,
      archived: page.archived,
      published: page.properties['Published'].checkbox,
      author: page.properties['Author'].people,
      featured_img: {
        url: page.properties['Featured image'].url,
        alt: page.properties['Featured image alt'].rich_text[0]?.plain_text,
      },
      category: page.properties['Category'] ? page.properties['Category'].select : null,
      tags: page.properties['Tags'] ? page.properties['Tags'].multi_select : null,
      body: blocks,
    }

    const nodeData = Object.assign({}, articleSchema, {
      ...articleSchema,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: 'NotionArticle',
        content: JSON.stringify(articleSchema),
        contentDigest: createContentDigest(articleSchema),
      },
    })

    return nodeData
  }

  return createNodes(pluginConfig)
}

export { sourceNodes, createSchemaCustomization }
