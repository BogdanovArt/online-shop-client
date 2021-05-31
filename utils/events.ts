export const Events = {
  set: (name: string | string[], method: (e: any) => void) => {
    if (typeof name === 'string') {
      document.addEventListener(name, method, false)
    } else if (name && name.length) {
      name.forEach((key) => {
        document.addEventListener(key, method, false)
      })
    }
  },
  remove: (name: string | string[], method: (e: any) => void) => {
    if (typeof name === 'string') {
      document.removeEventListener(name, method, false)
    } else if (name && name.length) {
      name.forEach((key) => {
        document.removeEventListener(key, method, false)
      })
    }
  },
}
