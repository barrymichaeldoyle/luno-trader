import { TickerPair } from '../interfaces'

export const getUnitPrecision = (pair: TickerPair) => {
  switch (pair) {
    case 'XRPZAR':
      return 0
    case 'LTCZAR':
      return 4
    case 'ETHZAR':
    case 'XBTZAR':
    default:
      return 6
  }
}

const roundUnitsToPair = (
  pair: TickerPair,
  amount: number,
  round?: 'UP' | 'DOWN'
) => {
  const precision = getUnitPrecision(pair)
  const accuracy = Math.pow(10, precision)
  const func = round === 'UP' ? 'ceil' : round === 'DOWN' ? 'floor' : 'round'
  return Number((Math[func](amount * accuracy) / accuracy).toFixed(precision))
}

export default roundUnitsToPair
