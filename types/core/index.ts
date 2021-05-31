import { IGenericImage } from '..'
import { MenuItemType } from './enums'

export interface ILayout {
  header: IHeader
  footer: IFooter
}

export interface IHeader {
  logo: IGenericImage
  location?: ILocationEntity
  menu_main: IMenuItem[]
}

export interface IMainMenu {
  items: IMenuItem[]
}

export interface ILocationEntity {
  title: string
  id: number
}

export interface IMenuItem {
  type: MenuItemType
  link: string
  title: string
  image?: IGenericImage
  items?: IMenuItem[]
}

export interface IFooter {
  links: IDropItem[]
  copyrights: string[]
  phones: string[]
  social: ISocialItem[]
}

export interface ISocialItem {
  image: IGenericImage
  link: string
}

export interface IDropItem {
  title: string
  link?: string
  items?: Array<IDropItem | ILinkItem>
}

export interface ILinkItem {
  title: string
  link: string
}

export interface InfoModal {
  title: string
  content: InfoBlock[]
}

export interface InfoBlock {
  title: string
  content: string
}
