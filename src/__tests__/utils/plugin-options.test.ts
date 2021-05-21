import { createPluginConfig } from '../../utils/plugin-options'
import { defaultPluginConfig } from '../../mockData/defaults'

describe('createPluginConfig', () => {
  beforeEach(() => {
    console.error = jest.fn()
  })

  it('should return an error message if no token', () => {
    const options = {} as any

    createPluginConfig(options)

    expect(console.error).toBeCalledTimes(1)
  })

  it('should return an error message if no databaseId', () => {
    const options = {
      token: '123456',
    } as any

    createPluginConfig(options)

    expect(console.error).toBeCalledTimes(1)
  })

  it('should return databaseId using get', () => {
    const options = {
      token: '123456',
      databaseId: '12345',
    } as any

    const fn = createPluginConfig(options).get('databaseId')

    expect(console.error).toBeCalledTimes(0)
    expect(fn).toBe(options.databaseId)
  })

  it('should return undefined if not params', () => {
    const fn = createPluginConfig(defaultPluginConfig)

    expect(console.error).toBeCalledTimes(0)
    expect(fn.params).toBeUndefined
  })
})
