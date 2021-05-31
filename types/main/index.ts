import { IGenericImage, IMap } from '..'
import { IProduct, IProductPrice } from '../search'
import { PageBlocks } from './enums'

export interface IMainPage {
  blocks: IPageBlock[]
}

export interface IPageBlock {
  title: string
  type: PageBlocks
  content: IPageBlockContent
}

export type IPageBlockContent =
  | ISliderBlock
  | IProductsBlock
  | IMap
  | IOffersBlock[]

export type ISliderBlock = ISlide[]
export interface IProductsBlock {
  total: number
  items: IProduct[]
}

export interface IOffersBlock {
  title?: string
  link: string
  image?: IGenericImage
}

export interface ISlide {
  image: IGenericImage
  link: string
}
