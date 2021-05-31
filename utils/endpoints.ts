import { origin } from '~/utils/origin'

export const API = {
  LAYOUT: {
    INDEX: `${origin}/api/layout/`,
    MENU: `${origin}/api/layout/menu/`,
  },
  INDEX: `${origin}/api/index/`,
  CART: {
    INDEX: `${origin}/api/cart/`,
    ORDER: `${origin}/api/cart/orders/`,
    LOCATION: `${origin}/api/cart/deliveries/`,
    FORM: `${origin}/api/cart/form/`,
  },
  PRODUCTS: {
    LIST: `${origin}/api/products/`,
    GET: `${origin}/api/catalog/products/`,
  },
  FAV: {
    SUB: `${origin}/api/subscription/`,
  },
  AUTH: {
    INDEX: `${origin}/api/auth/`,
    LOGIN: `${origin}/api/auth/login/`,
    LOGOUT: `${origin}/api/auth/logout/`,
    REFRESH: `${origin}/api/auth/refresh/`,
    RESTORE: `${origin}/api/auth/restore`,
  },
  REGISTRATION: {
    INDEX: `${origin}/api/registration/`,
  },
  ACCOUNT: {
    INDEX: `${origin}/api/account`,
    PERSONAL: `${origin}/api/account/personal`,
  },
  INFO: `${origin}/api/`,
  ORDER: `${origin}/api/orders/`,
  CATALOG: `${origin}/api/catalog/`,
  CATEGORY: (slug: string) => `${origin}/api${slug}`,
  CONTENT: `${origin}/api/content/`,
  SEARCH: `${origin}/api/search/`,
}
