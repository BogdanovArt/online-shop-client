import { ResizeMethods } from '~/types/enums'

interface ResizePayload {
  link: string
  size: number[] | number
  quality?: number
  method?: ResizeMethods
}

const defaultPayload = {
  link: '',
  quality: 80,
  size: [200, 200],
  method: ResizeMethods.fill,
}

const Resizer = (payload: ResizePayload): string => {
  const { link, size, quality, method } = { ...defaultPayload, ...payload }

  const file = link.substr(link.lastIndexOf('/') + 1)
  if (!file) {
    return link
  }

  let sizeString

  if (typeof size === 'number') {
    sizeString = `${size}x${size}`
  } else if (size.length < 2) {
    sizeString = `${size[0]}x${size[0]}`
  }

  return `/resize_images/${sizeString}/${quality}/${method}/uploads/${file}`
}

export default Resizer
