import { ICategoryCart, IProductCart } from '~/types/cart'

export function findCatChildren(cat: ICategoryCart, prod: IProductCart[]) {
  return prod.filter((product) => cat.id === product.parents?.category)
}

export function categoryGrouped(cat: ICategoryCart[], prod: IProductCart[]) {
  const categories: ICategoryCart[] = JSON.parse(JSON.stringify(cat))
  const others: IProductCart[] = []
  const othersCategory: ICategoryCart = { id: 0, link: '', title: '' }
  const result = categories.filter((category, index, source) => {
    const children = findCatChildren(category, prod)
    if (children.length < 2) {
      others.push(...children)
    } else {
      category.items = children
      return true
    }
  })
  if (others.length) {
    othersCategory.items = others
    if (result.length) {
      othersCategory.title = 'Остальные товары'
      result.push(othersCategory)
    } else {
      return [othersCategory]
    }
  }
  return result
}
