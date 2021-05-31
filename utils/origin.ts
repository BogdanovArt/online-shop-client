// const origin = process.client ? document.location.origin : 'http://nginx:8895'
const origin =
  process.env.mock ||
  (process.client ? document.location.origin : 'http://nginx:8895')

export { origin }
