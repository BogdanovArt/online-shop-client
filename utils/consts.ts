import { MenuItemTypes } from '~/types/auth/enums'
import { Routes } from '~/types/enums'

export const defaultMeta = {
  h1: 'Базапродуктов',
  title: 'Базапродуктов | Купить продукты оптом в Курске',
  description:
    'Базапродуктов | Крупнейший аггрегатор оптовой торговли продуктами в Курске',
  breadcrumbs: [],
}

export const profileItem = {
  type: MenuItemTypes.menu,
  title: 'Профиль',
  link: Routes.personal,
  icon: 'UserIcon',
}

export const accountItem = {
  type: MenuItemTypes.menu,
  title: 'Личный кабинет',
  link: Routes.account,
  icon: 'UserIcon',
}

export const defaultMenu = [
  {
    type: MenuItemTypes.menu,
    title: 'Корзина',
    link: Routes.cart,
    icon: 'CartIcon',
  },
  {
    type: MenuItemTypes.menu,
    title: 'Поставщикам',
    link: Routes.suppliers,
    icon: 'DeliveryIcon',
  },
  {
    type: MenuItemTypes.menu,
    title: 'Магазинам',
    link: Routes.shops,
    icon: 'ShopIcon',
  },
  {
    type: MenuItemTypes.divider,
  },
  {
    type: MenuItemTypes.menu,
    title: 'Войти',
    emitter: 'login',
    icon: 'UserIcon',
  },
]

export const authorizedMenu = [
  {
    type: MenuItemTypes.menu,
    title: 'Корзина',
    link: Routes.cart,
    icon: 'CartIcon',
  },
  {
    type: MenuItemTypes.menu,
    title: 'Поставщикам',
    link: Routes.suppliers,
    icon: 'DeliveryIcon',
  },
  {
    type: MenuItemTypes.menu,
    title: 'Магазинам',
    link: Routes.shops,
    icon: 'ShopIcon',
  },
  {
    type: MenuItemTypes.divider,
  },
  {
    type: MenuItemTypes.menu,
    title: 'Личный кабинет',
    link: Routes.account,
    icon: 'UserIcon',
  },
  {
    type: MenuItemTypes.divider,
  },
  {
    type: MenuItemTypes.menu,
    title: 'Выйти',
    emitter: 'logout',
    icon: 'UserIcon',
  },
]
