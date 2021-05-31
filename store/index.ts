import { Store, ActionTree } from 'vuex'
import cookieparser from 'cookieparser'
import {
  authStore,
  coreStore,
  initialiseStores,
} from '~/plugins/store-accessor'

const initializer = (store: Store<any>) => initialiseStores(store)

export const plugins = [initializer]

export const actions: ActionTree<any, any> = {
  async nuxtServerInit({ commit }, { req }) {
    const cookies = cookieparser.parse(req?.headers?.cookie || '')
    if (cookies && cookies.token) {
      authStore.setTokens({
        token: cookies.token,
        refresh: cookies.refresh,
      })
    } else {
      authStore.logout()
    }
    await coreStore.getData()
  },
}

export * from '~/plugins/store-accessor'
