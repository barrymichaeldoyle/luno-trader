import { PAIR } from '../interfaces'

export const getPricePrecision = (pair: PAIR) => {
  switch (pair) {
    case 'XRPZAR':
      return 2
    case 'ETHZAR':
    case 'BTCZAR':
    default:
      return 0
  }
}

const roundPriceToPair = (
  pair: PAIR,
  amount: number,
  round?: 'UP' | 'DOWN'
) => {
  const precision = getPricePrecision(pair)
  const accuracy = Math.pow(10, precision)
  const func = round === 'UP' ? 'ceil' : round === 'DOWN' ? 'floor' : 'round'
  return Number((Math[func](amount * accuracy) / accuracy).toFixed(precision))
}

export default roundPriceToPair
