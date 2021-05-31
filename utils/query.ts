import { IGenericQuery, IQueryValue } from '~/types'

export const Query = {
  set: ({
    query,
    key,
    value,
  }: {
    query: IGenericQuery
    value: IQueryValue
    key: string | string[]
  }) => {
    const newQuery: IGenericQuery = JSON.parse(JSON.stringify(query))
    const setValue = (fieldKey: string, fieldValue: IQueryValue) => {
      newQuery[fieldKey] = fieldValue
      if (!fieldValue) delete newQuery[fieldKey]
    }
    if (typeof key === 'string') {
      setValue(key, value)
      return newQuery
    }
    if (Array.isArray(key)) {
      if (Array.isArray(value)) {
        key.forEach((Key, index) => {
          setValue(Key, value[index])
        })
      } else {
        key.forEach((Key, index) => {
          setValue(Key, value)
        })
      }
    }
    return newQuery
  },
}
