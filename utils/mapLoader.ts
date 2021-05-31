export function ymapLoader() {
  return new Promise((resolve, reject) => {
    if ((window as any).ymaps || document.getElementById('yandex-maps-loader'))
      return resolve(null)
    const yandexMapScript = document.createElement('SCRIPT')

    const apiKey = ''
    const lang = 'ru_RU'
    const version = '2.1'
    const coordorder = 'latlong'
    const debug = false

    const mode = debug ? 'debug' : 'release'
    const settingsPart = `lang=${lang}${
      apiKey && `&apikey=${apiKey}`
    }&mode=${mode}&coordorder=${coordorder}`
    const link = `https://api-maps.yandex.ru/${version}/?${settingsPart}`
    yandexMapScript.setAttribute('src', link)
    yandexMapScript.setAttribute('async', '')
    yandexMapScript.setAttribute('defer', '')
    yandexMapScript.setAttribute('id', 'yandex-maps-loader')
    document.head.appendChild(yandexMapScript)
    yandexMapScript.onload = () => {
      ;(window as any).ymaps.ready(() => {
        resolve(null)
      })
    }
    yandexMapScript.onerror = reject
  })
}
