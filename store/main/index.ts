import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'

import { IError, IPageMeta } from '~/types'
import { IMainPage } from '~/types/main'
import { defaultMeta } from '~/utils/consts'
import { Request } from '~/utils/request'

@Module({
  name: 'main',
  stateFactory: true,
  namespaced: true,
})
export default class Main extends VuexModule {
  content?: IMainPage = undefined
  metaData: IPageMeta = defaultMeta
  error?: IError = undefined

  get errorData() {
    return this.error
  }

  get pageData() {
    return this.content
  }

  get pageMeta() {
    return this.metaData
  }

  @Mutation
  setError(error?: IError) {
    this.error = error
  }

  @Mutation
  setPageData(data: IMainPage) {
    this.content = data
  }

  @Mutation
  setPageMeta(data: IPageMeta) {
    this.metaData = data
  }

  @Action
  async getData() {
    await Request(async () => {
      const { data } = await $axios.get(API.INDEX)
      if (data.data) this.setPageData(data.data)
      if (data.meta) this.setPageMeta(data.meta)
    })
  }
}
