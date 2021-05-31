import { InputValue } from '..'
import { ILocationEntity } from '../core'
import { Routes } from '../enums'
import { AccountTypes, MenuItemTypes } from './enums'

export interface IAccount {
  id: number
  account_type: AccountTypes
  info: IAccountInfo
}

export interface IAccountMenuItem {
  type: MenuItemTypes
  title?: string
  link?: Routes
  icon?: string
  emitter?: string
  account?: boolean
}

export interface IAccountInfo {
  name_user?: string
  name_org?: string
  name_shop?: string
  name_supplier?: string
  username: string
  phone?: number
  email?: string
  location?: ILocationEntity
  inn?: number
}

export interface ITokens {
  token: string
  refresh: string
}

export interface IAuthPayload {
  phone: InputValue
  password: InputValue
}
