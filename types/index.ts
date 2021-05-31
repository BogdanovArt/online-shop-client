import { ImageTypes, ValueTypes, SortOrders, InputTypes } from './enums'
import { IFormGenBlock } from './registration'

export interface IBasicObject {
  [key: string]: any
}

export interface Dictionary<T> {
  [Key: string]: T
}

export type IBasicArray = IBasicObject[]

export interface IBasicEntity {
  id: number
  title: string
  link: string
  image?: IGenericImage
  tags?: ICardTag[]
}

export interface ICardTag {
  title: string
  color?: string
  action?: string
}

export interface Route {
  path: string
  query?: IGenericQuery
  params: IGenericQuery
  fullPath: string
  name: string
  hash: string
}

export interface RawAxiosError {
  response: {
    data: IBasicObject
    status: number
    message: string
  }
}

export interface IError {
  status?: number
  message?: string
  route: string
}

export interface IPageMeta {
  h1?: string
  title: string
  breadcrumbs: ICrumb[]
  pagination?: IPaginationData
  description?: string
  sort?: ISortData
}

export interface ISortData {
  key: string
  order: SortOrders
}

export interface ICrumb {
  url?: string
  name: string
  icon?: string
}

export interface IGenericImage {
  type?: ImageTypes
  src: string
  src_mobile?: string
  name?: string
}

export interface IUploadImage extends IGenericImage {
  id: number
}

export type IQueryValue = string | null | (string | null)[]

export type IGenericQuery = Dictionary<IQueryValue>

export interface IPaginationData {
  current_page: number
  total_pages: number
  per_page?: number
}

interface IValidationField {
  value: string | number | string[]
  errorMessage: string
}

export type FileEventTarget = EventTarget & { files: FileList }

export type InputTypeSchemas =
  | InputSimpleSchema
  | InputRadioSchema
  | InputCheckBoxSchema
  | InputRowSchema
  | InputFileSchema
  | InputRangeSchema

export interface InputBase {
  type: InputTypes
  name: string
  required?: boolean
  initial?: InputValue
  placeholder?: string
  errorMessage?: string
  label?: string
}

export interface InputFileSchema extends InputBase {
  initial?: IGenericImage
  validations?: ImageValidations
}

export interface InputRangeSchema extends InputBase {
  max: number
  min: number
  items: IFormGenBlock[]
}

export interface ImageValidations {
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
  maxSize?: number
  formats: string[]
}

export interface InputSimpleSchema extends InputBase {
  valueType?: ValueTypes
  allowedCharacters?: string
  prefix?: string
  confirm?: string
  mask?: IValidationField
  regex?: IValidationField
  min?: IValidationField
  max?: IValidationField
}

export interface InputRadioSchema extends InputBase {
  selected?: string
  items: InputRadioItem[]
}

export interface InputRadioItem {
  id: number
  key: string
  title?: string
  description?: string
}

export interface InputCheckBoxSchema extends InputBase {
  value: boolean
}

export interface InputRowSchema {
  type: string
  inputs: InputTypeSchemas[]
}

export enum MapFilters {
  shop = 'shop',
  supplier = 'supplier',
  all = 'all',
}

export interface IMapFilter {
  key: MapFilters
  title: string
}

export interface IMap {
  endpoint: string
  center: number[]
  filters: IMapFilter[]
  items: IPlacemark[]
}

export interface IPlacemark {
  id: number
  type: MapFilters
  coordinates: number[]
}

export type InputValue =
  | string
  | number
  | boolean
  | null
  | IBasicObject
  | undefined

export type IComponent = Vue | Element | Vue[] | Element[]
