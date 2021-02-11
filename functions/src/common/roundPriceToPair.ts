import { TickerPair } from '../interfaces'

export const getPricePrecision = (pair: TickerPair) => {
  switch (pair) {
    case 'XRPZAR':
      return 2
    case 'LTCZAR':
    case 'ETHZAR':
    case 'XBTZAR':
    default:
      return 0
  }
}

const roundPriceToPair = (
  pair: TickerPair,
  amount: number,
  round?: 'UP' | 'DOWN'
) => {
  const precision = getPricePrecision(pair)
  const accuracy = Math.pow(10, precision)
  const func = round === 'UP' ? 'ceil' : round === 'DOWN' ? 'floor' : 'round'
  return Number((Math[func](amount * accuracy) / accuracy).toFixed(precision))
}

export default roundPriceToPair
