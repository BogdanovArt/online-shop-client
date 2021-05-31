import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { IGenericQuery, IPageMeta } from '~/types'
import {
  ICategoryFilters,
  ICategoryMenu,
  ICategorySorts,
} from '~/types/category'
import { RMethods } from '~/types/enums'
import { IProduct } from '~/types/search'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'
import { Request } from '~/utils/request'

@Module({
  name: 'category',
  stateFactory: true,
  namespaced: true,
})
export default class Category extends VuexModule {
  pageMeta: IPageMeta | null = null
  currentRoute: string = ''
  fetching = false

  products: IProduct[] = []
  menu: ICategoryMenu | null = null
  sort: ICategorySorts | null = null
  filters: ICategoryFilters | null = null

  get Menu() {
    return this.menu
  }

  get Sort() {
    return this.sort
  }

  get Products() {
    return this.products
  }

  get Filters() {
    return this.filters
  }

  get PageMeta() {
    return this.pageMeta
  }

  get CurrentRoute() {
    return this.currentRoute
  }

  get Fetching() {
    return this.fetching
  }

  @Mutation
  setProducts(data: IProduct[]) {
    this.products = data
  }

  @Mutation
  setMenu(data: ICategoryMenu | null = null) {
    this.menu = data
  }

  @Mutation
  setSorts(data: ICategorySorts | null = null) {
    this.sort = data
  }

  @Mutation
  setFilters(data: ICategoryFilters) {
    this.filters = data
  }

  @Mutation
  setPageMeta(data: IPageMeta | null = null) {
    this.pageMeta = data
  }

  @Mutation
  setLazyProducts(data: IProduct[]) {
    this.products.push(...data)
  }

  @Mutation
  setCurrentRoute(data: string) {
    const url = new URL(data)
    this.currentRoute = url.pathname + url.search
  }

  @Mutation
  setFetching(data: boolean) {
    this.fetching = data
  }

  @Action
  async getData({
    slug,
    params,
    lazy,
  }: {
    slug: string
    params?: IGenericQuery
    lazy?: boolean
  }) {
    this.setFetching(true)
    const req = {
      method: RMethods.GET,
      url: API.CATEGORY(slug),
      params,
    }
    const uri = $axios.getUri(req)

    await Request(async () => {
      const res = await $axios.get(uri)
      if (uri) this.setCurrentRoute(uri)
      const { products, filters, sort, menu } = res.data.data
      if (products) {
        if (lazy) {
          this.setLazyProducts(products)
        } else {
          this.setProducts(products)
        }
      }
      if (sort) this.setSorts(sort)
      if (menu) this.setMenu(menu)
      if (filters) this.setFilters(filters)
      this.setPageMeta(res.data.meta)
    })
    this.setFetching(false)
  }
}
