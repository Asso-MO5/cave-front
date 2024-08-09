export function decimalToHex(decimal) {
  let hex = decimal.toString(16)

  while (hex.length < 6) {
    hex = '0' + hex
  }
  return '#' + hex
}
