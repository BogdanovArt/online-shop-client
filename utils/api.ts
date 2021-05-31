import { NuxtAxiosInstance } from '@nuxtjs/axios'

import { API } from './endpoints'

import { authStore, coreStore } from '~/store'
import { RMethods } from '~/types/enums'

// eslint-disable-next-line
let $axios: NuxtAxiosInstance

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  axiosInstance.interceptors.request.use((config) => {
    const tokens = authStore.authTokens
    if (config.headers.common) {
      if (tokens && tokens.token) {
        config.headers.common.Authorization = `Bearer ${tokens.token}`
      } else {
        delete config.headers.common.Authorization
      }
    }
    return config
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const tokens = authStore.authTokens
      const code = parseInt(error.response && error.response.status)
      const originRequest = error.config

      if (!originRequest) return Promise.reject(error)

      const isRefreshRes = originRequest.url === API.AUTH.REFRESH

      if (isRefreshRes && code === 500) {
        // redirect('/')
        authStore.logout()
        await coreStore.getData()
        return Promise.reject(new Error('Error when refreshing tokens'))
      }

      if (code !== 401 || !tokens || !tokens.refresh) {
        return Promise.reject(error)
      }

      const refreshRequest = {
        url: API.AUTH.REFRESH,
        method: RMethods.POST,
        data: { refresh: tokens.refresh },
      }

      return axiosInstance(refreshRequest).then((response) => {
        const newToken = response.data.data.token
        const newRefresh = response.data.data.refresh
        if (newToken && newRefresh) {
          authStore.setTokens({
            token: newToken,
            refresh: newRefresh,
          })
          originRequest.headers.Authorization = `Bearer ${newToken}`
        }
        return axiosInstance(originRequest)
      })
    }
  )
  $axios = axiosInstance
}

export { $axios }
