export function symbolMask(symbol: RegExp) {
  return (value: string) => {
    const mask = Array(value.length).fill(symbol)
    return mask
  }
}

export function innMask(symbol: RegExp) {
  return (value: string) => {
    return value.length <= 10 ? Array(10).fill(symbol) : Array(12).fill(symbol)
  }
}
