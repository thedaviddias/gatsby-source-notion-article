import { ICreatePluginConfigRes, ICreatePluginConfig } from '../types'
import { ERROR_MSG_TOKEN, ERROR_MSG_DATABASEID } from '../constants'

const defaultOptions = {
  debug: false,
  unsupported: false,
}

export const createPluginConfig = (
  pluginOptions: ICreatePluginConfig
): ICreatePluginConfigRes | undefined => {
  const conf = { ...defaultOptions, ...pluginOptions }

  if (!conf.token) {
    console.error(ERROR_MSG_TOKEN)
    return
  }

  if (!conf.databaseId) {
    console.error(ERROR_MSG_DATABASEID)
    return
  }

  return {
    params: conf.params,
    get: (key) => conf[key],
  }
}
