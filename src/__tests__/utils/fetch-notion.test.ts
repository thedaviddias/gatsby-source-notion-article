import { fetchDatabaseNotion, fetchBlocksNotion } from '../../utils/fetch-notion'

jest.mock('@notionhq/client', () => ({
  notionConnect: jest.fn(),
  APIErrorCode: jest.fn(),
}))

describe('Fetch Notion', () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  it('should return an error if the database is not found', async () => {
    const pluginOptions = {} as any

    await fetchDatabaseNotion(pluginOptions)

    expect(console.error).toBeCalledTimes(1)
  })

  it('should return an error if the block is not found', async () => {
    const pluginOptions = {} as any

    await fetchBlocksNotion(pluginOptions, '12345')

    expect(console.error).toBeCalledTimes(1)
  })
})
