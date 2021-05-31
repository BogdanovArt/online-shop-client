import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { accountStore } from '~/plugins/store-accessor'
import { IPageMeta } from '~/types'
import { IPersonalPage } from '~/types/account/personal'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'
import { Request } from '~/utils/request'

@Module({
  name: 'account/personal',
  stateFactory: true,
  namespaced: true,
})
export default class Personal extends VuexModule {
  pageData: IPersonalPage | null = null
  fetching = false

  get PageData() {
    return this.pageData
  }

  get Fetching() {
    return this.fetching
  }

  @Mutation
  setPageData(data: IPersonalPage) {
    this.pageData = data
  }

  @Mutation
  setFetching(data: boolean) {
    this.fetching = data
  }

  @Action
  async getData() {
    this.setFetching(true)
    await Request(async () => {
      const res = await $axios.get(API.ACCOUNT.PERSONAL)
      const { data, meta } = res.data
      this.setPageData(data)
      accountStore.setMetaData(meta)
    })
    this.setFetching(false)
  }
}
