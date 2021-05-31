import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { ISearchResults } from '~/types/search'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'

const defaultResults = {
  products: [],
  categories: [],
  suppliers: [],
}

@Module({
  name: 'search',
  stateFactory: true,
  namespaced: true,
})
export default class Search extends VuexModule {
  results?: ISearchResults = defaultResults
  query: string = ''
  fetched = false
  fetching = false

  get getResults() {
    return this.results
  }

  get getQuery() {
    return this.query
  }

  get getFetched() {
    return this.fetched
  }

  @Mutation
  setResults(data: ISearchResults = defaultResults) {
    this.results = data
  }

  @Mutation
  setQuery(data: string) {
    this.query = data
  }

  @Mutation
  setFetched(data: boolean) {
    this.fetched = data
  }

  @Mutation
  setFetching(data: boolean) {
    this.fetching = data
  }

  @Mutation
  reset() {
    this.query = ''
    this.fetched = false
    this.results = defaultResults
  }

  @Action
  async fetchData() {
    this.setFetching(true)
    try {
      const { data } = await $axios({
        url: API.SEARCH,
        params: {
          search: this.query,
        },
      })
      this.setFetched(true)
      this.setResults(data.data)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(err.message)
    }
    this.setFetching(false)
  }
}
