import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { coreStore } from '~/plugins/store-accessor'

import { IPageMeta } from '~/types'
import { ICatalogPageData } from '~/types/catalog'
import { formatError } from '~/utils'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'
import { Request } from '~/utils/request'

@Module({
  name: 'catalog',
  stateFactory: true,
  namespaced: true,
})
export default class Catalog extends VuexModule {
  pageData: ICatalogPageData | null = null
  pageMeta: IPageMeta | null = null

  get PageData() {
    return this.pageData
  }

  get PageMeta() {
    return this.pageMeta
  }

  @Mutation
  setPageData(data: ICatalogPageData | null = null) {
    this.pageData = data
  }

  @Mutation
  setPageMeta(data: IPageMeta | null = null) {
    this.pageMeta = data
  }

  @Action
  async getData() {
    await Request(async () => {
      const { data } = await $axios.get(API.CATALOG)
      this.setPageData(data.data)
      this.setPageMeta(data.meta)
    })
  }
}
