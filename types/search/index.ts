import { IBasicEntity, ICrumb } from '..'

export interface ISearchResults {
  products: IProduct[]
  categories: ICrumb[][]
  suppliers: ISupplier[]
}

export interface IProduct extends IBasicEntity {
  rating: string
  price: IProductPrices
  quantity: number
  sku?: string
  stock?: number
  packing?: string
  description?: string
}

export interface ISupplier extends IBasicEntity {
  categories: string[]
  total: {
    products?: number
    categories?: number
  }
}

export interface IProductPrices {
  main: IProductPrice
  secondary: IProductPrice
}

export interface IProductPrice {
  value: number
  currency: string
  suffix?: string
}
