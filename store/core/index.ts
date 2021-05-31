import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { ILayout, InfoModal } from '~/types/core'
import { IError } from '~/types'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'
import { authStore } from '~/plugins/store-accessor'
import { defaultMenu } from '~/utils/consts'
import { Request } from '~/utils/request'

@Module({
  name: 'core',
  stateFactory: true,
  namespaced: true,
})
export default class Core extends VuexModule {
  layout?: ILayout = undefined
  error?: IError = undefined
  info?: InfoModal = undefined

  get errorData() {
    return this.error
  }

  get layoutData() {
    return this.layout
  }

  get infoData() {
    return this.info
  }

  @Mutation
  setError(error?: IError) {
    this.error = error
  }

  @Mutation
  setInfoData(data?: InfoModal) {
    this.info = data
  }

  @Mutation
  setLayoutData(data: ILayout) {
    this.layout = data
  }

  @Action
  async getData() {
    await Request(async () => {
      const { data } = await $axios.get(API.LAYOUT.INDEX)
      const { footer, header, account } = data
      this.setLayoutData({ footer, header })
      authStore.setAccount(account?.data)
      authStore.setMenu(account?.menu || defaultMenu)
    })
  }

  @Action
  async getInfoData(url: string) {
    await Request(async () => {
      const { data } = await $axios.get(API.INFO + url)
      this.setInfoData(data.data)
    })
  }
}
