import { IGenericImage, InputTypeSchemas, InputValue } from '..'
import { AccountTypes } from '../auth/enums'
import { ILinkItem } from '../core'
import { RMethods } from '../enums'

export interface IRegistrationPageData {
  blocks: IRegistrationBlock[]
}

export interface IRegistrationBlock {
  type: AccountTypes
  title: string
  image?: IGenericImage
  description?: string
  button: ILinkItem
}

export interface IRegistrationPageForm {
  form: IFormGenBlock[]
  image: IGenericImage
  action: IApiAction
  info?: string
  title?: string
}

export interface IApiAction {
  method: RMethods
  title: string
  url: string
}

export interface IFormGenBlock {
  type: string
  title?: string
  inputs?: InputTypeSchemas[]
  items?: IDynamicRadioBlock[]
}

export interface FormValues {
  [key: string]: InputValue
}

export interface IDynamicRadioBlock {
  id: number
  key: string
  title: string
  inputs: InputTypeSchemas[]
}
