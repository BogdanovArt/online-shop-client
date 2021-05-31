import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Core from '~/store/core'
import Search from '~/store/search'
import Main from '~/store/main'
import Cart from '~/store/cart'
import Auth from '~/store/auth'
import Registration from '~/store/registration'
import Personal from '~/store/account/personal'
import Account from '~/store/account'
import Catalog from '~/store/catalog'
import Category from '~/store/category'

/* eslint-disable */
let coreStore: Core
let searchStore: Search
let indexStore: Main
let cartStore: Cart
let authStore: Auth
let registrationStore: Registration
let personalStore: Personal
let accountStore: Account
let catalogStore: Catalog
let categoryStore: Category
/* eslint-enable */

function initialiseStores(store: Store<any>): void {
  coreStore = getModule(Core, store)
  searchStore = getModule(Search, store)
  indexStore = getModule(Main, store)
  cartStore = getModule(Cart, store)
  authStore = getModule(Auth, store)
  registrationStore = getModule(Registration, store)
  personalStore = getModule(Personal, store)
  accountStore = getModule(Account, store)
  catalogStore = getModule(Catalog, store)
  categoryStore = getModule(Category, store)
}

export {
  initialiseStores,
  coreStore,
  searchStore,
  indexStore,
  cartStore,
  authStore,
  registrationStore,
  personalStore,
  accountStore,
  catalogStore,
  categoryStore,
}
