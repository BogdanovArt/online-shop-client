import { Dictionary } from '..'
import { IFormGenBlock } from '../registration'
import { IProduct } from '../search'

export interface ICategoryPage {
  sort?: ICategorySorts
  filters: {}
  menu: ICategoryMenu
  products: IProduct[]
}

export interface ICategorySorts {
  title: string
  items: ICategorySort[]
  initial?: number
}

export type ICategoryFilters = IFormGenBlock[]

export interface ICategorySort {
  title: string
  params: Dictionary<string>
}

export interface ICategoryMenu {
  heading: ICategoryMenuItem
  items: ICategoryMenuItem[]
}

export interface ICategoryMenuItem {
  title: string
  link: string
}
