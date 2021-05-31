export enum RMethods {
  GET = 'GET',
  POST = 'POST',
  OPTIONS = 'OPTIONS',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}

export enum Modals {
  cart = 'cartModal',
  pass = 'passwordRestoreModal',
  auth = 'authModal',
  menu = 'menuModal',
  info = 'infoModal',
}

export enum ValueTypes {
  RESTRICTED = 'restricted',
  EMAIL = 'email',
  INN = 'inn',
}

export enum RouteNames {
  index = 'index',
  search = 'search',
}

export enum Routes {
  index = '/index',
  catalog = '/catalog',
  search = '/search',
  cart = '/cart',
  order = '/cart/order',
  account = '/account',
  personal = '/account/personal',
  delivery = '/account/dostavka',
  groups = '/account/osnovnye-gruppy-tovarov',
  offers = '/account/akcii',
  suppliers = '/suppliers',
  shops = '/shops',
}

export enum GlobalEvents {
  cart = 'cart',
  login = 'login',
  logout = 'logout',
  menuMain = 'menu-main',
  menuMobile = 'menu-mobile',
  restore = 'password-restore',
  info = 'info',
  regInfo = 'reg-info',
  close = 'close',
}

export enum StorageData {
  cart = 'cart_ids',
}

export enum SortOrders {
  ASC = 'asc',
  DESC = 'desc',
}

export enum EventTypes {
  AUTO = 'auto',
  MANUAL = 'manual',
}

export enum ImageTypes {
  SVG = 'svg',
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum GetParams {
  page = 'page',
  perp = 'per_page',
  sort = 'sort',
  order = 'order',
}

export enum ListingViewTypes {
  LIST = 'detailed',
  GRID = 'grid',
  COMPACT = 'compact',
}

export enum Validations {
  verify = 'verify',
  mask = 'mask',
  regex = 'regex',
  required = 'required',
  min = 'min',
  max = 'max',
}

export enum InputTypes {
  PASSWORD = 'password',
  SIMPLE = 'input-simple',
  CHECK_BOX = 'input-checkbox',
  TEXT = 'input-text-field',
  IMAGE = 'input-image',
  RADIO = 'input-radio',
  ROW = 'input-row',
  HINT = 'input-hint',
  DROPDOWN = 'input-dropdown',
  RANGE = 'input-range',
  MAX = 'max',
  MIN = 'min',
}

export enum FormFields {
  location = 'location',
  street = 'street',
  consent = 'consent',
  receiving = 'receiving-method',
  building = 'building',
  name = 'name',
  phone = 'phone',
  payment = 'payment',
  lift = 'lift',
  assembly = 'assembly',
  comment = 'comment',
  checkout = 'sc-points',
}

export enum ContentTypes {
  html = 'block-html',
  scrollable = 'block-scrollable',
  info = 'block-info',
  warning = 'block-warning',
  hint = 'block-hint',
}

export enum ResizeMethods {
  fill = 'fill',
  fit = 'fit',
}
