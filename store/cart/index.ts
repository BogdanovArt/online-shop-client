import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { PriceTypes } from '~/types/cart/enums'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'
import { defaultMeta } from '~/utils/consts'

import { IError, IPageMeta } from '~/types'
import {
  ICartIDs,
  ICategoryCart,
  IProductCart,
  ISupplierCart,
} from '~/types/cart'
import { IProduct } from '~/types/search'
import { modifyObject } from '~/utils'
import { StorageData } from '~/types/enums'
import { Request } from '~/utils/request'

@Module({
  name: 'cart',
  stateFactory: true,
  namespaced: true,
})
export default class Cart extends VuexModule {
  products: IProductCart[] = []
  suppliers: ISupplierCart[] = []
  categories: ICategoryCart[] = []
  ids: ICartIDs = {}

  priceType: PriceTypes = PriceTypes.main
  fetching = false
  meta: IPageMeta = defaultMeta
  error?: IError = undefined

  get errorData() {
    return this.error
  }

  get productIds() {
    return this.ids
  }

  get productsData() {
    return this.products
  }

  get suppliersData() {
    return this.suppliers
  }

  get categoriesData() {
    return this.categories
  }

  get isFetching() {
    return this.fetching
  }

  @Mutation
  setError(error?: IError) {
    this.error = error
  }

  @Mutation
  setProducts(data: IProductCart[]) {
    this.products = data
  }

  @Mutation
  setSuppliers(data: ISupplierCart[]) {
    this.suppliers = data
  }

  @Mutation
  setCategories(data: ICategoryCart[]) {
    this.categories = data
  }

  @Mutation
  setIds(data: ICartIDs) {
    this.ids = data
  }

  @Mutation
  setPriceType(data: PriceTypes) {
    this.priceType = data
  }

  @Mutation
  changeProduct(data: IProduct) {
    this.ids = modifyObject(this.ids, data.id, data.quantity)
  }

  @Mutation
  removeProduct(data: IProduct) {
    this.ids = modifyObject(this.ids, data.id, null)
  }

  @Mutation
  resetCartContent() {
    this.products = []
    this.categories = []
    this.suppliers = []
  }

  @Mutation
  resetCart() {
    this.products = []
    this.categories = []
    this.suppliers = []
    this.ids = {}
  }

  @Mutation
  setFetching(data: boolean) {
    this.fetching = data
  }

  @Action
  restoreIds() {
    const stringIDs = localStorage.getItem(StorageData.cart)
    if (stringIDs) {
      const ids = JSON.parse(stringIDs)
      if (ids) this.setIds(ids)
    }
  }

  @Action
  storeIds() {
    localStorage.setItem(StorageData.cart, JSON.stringify(this.ids))
  }

  @Action
  async getData() {
    this.setFetching(true)
    await Request(async () => {
      const { data } = await $axios.get(API.CART.INDEX)
      if (data?.data.products) this.setProducts(data?.data.products)
      if (data?.data.suppliers) this.setSuppliers(data?.data.suppliers)
      if (data?.data.categories) this.setCategories(data?.data.categories)
    })
    this.setFetching(false)
  }
}
