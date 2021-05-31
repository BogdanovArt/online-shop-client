import { ICardTag } from '..'
import { IProduct } from '../search'

export interface IProductCart extends IProduct {
  parents?: IParentEntities
}

export interface IParentEntities {
  category: number
  supplier: number
}

export interface ISupplierCart {
  id: number
  title: string
  min_total: number
  link: string
  tags: ICardTag[]
  items?: IProductCart[]
}

export interface ICategoryCart {
  id: number
  title: string
  link: string
  items?: IProductCart[]
}

export interface ICartIDs {
  [key: number]: number
}
