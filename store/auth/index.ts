import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

import { $axios } from '~/utils/api'
import { API } from '~/utils/endpoints'
import { shortify } from '~/utils'

import { RMethods } from '~/types/enums'
import { IBasicObject, InputValue } from '~/types'
import { IAccount, IAccountMenuItem, IAuthPayload, ITokens } from '~/types/auth'
import { AccountTypes } from '~/types/auth/enums'

@Module({
  name: 'auth',
  stateFactory: true,
  namespaced: true,
})
export default class Auth extends VuexModule {
  account: IAccount | null = null
  tokens: ITokens | null = null
  menu: IAccountMenuItem[] = []

  get accountData() {
    return this.account
  }

  get shortName() {
    if (this.account) {
      switch (this.account.account_type) {
        case AccountTypes.consumer:
          return shortify(this.account?.info.name_user)
        case AccountTypes.shop:
          return this.account?.info.name_shop
        case AccountTypes.supplier:
          return this.account?.info.name_supplier
      }
    }
  }

  get authTokens() {
    return this.tokens
  }

  get accountMenu() {
    return this.menu
  }

  @Mutation
  setAccount(data: IAccount) {
    this.account = data
  }

  @Mutation
  setMenu(data: IAccountMenuItem[]) {
    this.menu = data
  }

  @Mutation
  setTokens(data: ITokens | null) {
    this.tokens = data
  }

  @Mutation
  logout() {
    this.account = null
    this.tokens = null
    this.menu = []
  }

  @Action
  async authorize(pl: IAuthPayload) {
    const res: IBasicObject = {
      data: null,
      error: null,
      status: null,
    }
    try {
      const { data, status } = await $axios({
        url: API.AUTH.LOGIN,
        method: RMethods.POST,
        data: pl,
      })
      if (data) {
        this.setAccount(data.data)
        this.setMenu(data.menu || [])
        this.setTokens(data.auth)
        res.data = data
        res.status = status
      }
      if (data.tokens) this.setTokens(data.tokens)
    } catch (err) {
      const { status, data } = err.response
      res.status = status
      res.error = data
      console.warn(res)
    }
    return res
  }

  @Action
  async restore(pl: { phone: InputValue }) {
    const res: IBasicObject = {
      data: null,
      error: null,
      status: null,
    }
    try {
      const { data, status } = await $axios({
        url: API.AUTH.RESTORE,
        method: RMethods.POST,
        data: pl,
      })
      if (data) {
        res.data = data
        res.status = status
      }
    } catch (err) {
      const { status, data } = err.response
      res.status = status
      res.error = data
      console.warn(res)
    }
    return res
  }

  @Action
  async deauthorize() {
    try {
      const { data } = await $axios({
        url: API.AUTH.LOGOUT,
        method: RMethods.POST,
      })
    } catch (err) {
      console.warn(err)
    }
    this.logout()
  }
}
