import { Context } from '@nuxt/types'

const App: { context: Context | null } = { context: null }

const $nuxt = (nuxt: Context) => {
  App.context = nuxt
}

export default $nuxt
export { App }
