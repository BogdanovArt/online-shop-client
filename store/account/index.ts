import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { IPageMeta } from '~/types'

@Module({
  name: 'account',
  stateFactory: true,
  namespaced: true,
})
export default class Account extends VuexModule {
  metaData: IPageMeta | null = null

  get MetaData() {
    return this.metaData
  }

  @Mutation
  setMetaData(data: IPageMeta) {
    this.metaData = data
  }
}
