import {
  IBasicArray,
  IBasicObject,
  IError,
  IGenericQuery,
  RawAxiosError,
} from '~/types'

export function highLighter(str: string, query: string) {
  return str.replace(new RegExp(query, 'gi'), (match) => {
    return '<span class="highlighted">' + match + '</span>'
  })
}

export function debounce(f: any, ms: number): any {
  let timer: NodeJS.Timer | null = null
  return (...args: any[]) => {
    const onComplete = () => {
      f.apply(null, args)
      timer = null
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(onComplete, ms)
  }
}

export function modifyObject(object: any, key: string | number, value?: any) {
  const copy = JSON.parse(JSON.stringify(object))
  if (value) {
    copy[key] = value
  } else {
    delete copy[key]
  }
  return copy
}

export function pricify(val: number) {
  const price = Math.ceil(val)
  if (price.toString().length >= 10) {
    const short = (val / 1e9).toFixed(1)
    return short.toLocaleString() + ' млрд'
  } else if (price.toString().length >= 7) {
    const short = (val / 1e6).toFixed(1)
    return short.toLocaleString() + ' млн'
  }
  return price.toLocaleString()
}

export function shortify(name?: string) {
  if (name) {
    const names = name.split(' ')
    if (names.length > 1) {
      const full = names[0]
      const short = names[1].charAt(0).toUpperCase()
      return `${full} ${short}.`
    }
  }
  return name
}

export const copy = (entity: IBasicObject | IBasicArray) => {
  return JSON.parse(JSON.stringify(entity))
}

export const arRemove = (
  array: IBasicArray,
  element: IBasicObject,
  field: string
) => {
  const index = array.findIndex((el) => el[field] === element[field])
  if (index > -1) array.splice(index, 1)
}

export const formatError = (route: string, rawErr?: RawAxiosError): IError => {
  const Error = {
    status: 500,
    message: 'Ошибка при обращении к серверу',
    route,
  }
  if (rawErr?.response) {
    const { status, data } = rawErr.response
    if (status) Error.status = status
    if (data && data.message) Error.message = data.message
  }
  return Error
}

export const compare = (itemA: IGenericQuery, itemB: IGenericQuery) => {
  const keysA = Object.keys(itemA)
  const keysB = Object.keys(itemB)
  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i]
    if (key !== keysB[i]) return false
    if (itemA[key]?.toString() !== itemB[key]?.toString()) return false
  }
  return true
}
