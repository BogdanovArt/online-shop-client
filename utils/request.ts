import { formatError } from '.'
import { App } from '~/plugins/nuxt-accessor'
import { coreStore } from '~/store'

export const Request = async (func: () => Promise<void>) => {
  try {
    return await func().then(() => coreStore.setError())
  } catch (err) {
    coreStore.setError(formatError(err.config?.url, err))
    App.context?.error({
      statusCode: err.response?.status || 500,
      message: err.message,
    })
  }
}
