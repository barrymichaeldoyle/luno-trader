import { PAIR } from '../interfaces'

export const getUnitPrecision = (pair: PAIR) => {
  switch (pair) {
    case 'XRPZAR':
      return 4
    case 'ETHZAR':
    case 'BTCZAR':
    default:
      return 8
  }
}

const roundUnitsToPair = (
  pair: PAIR,
  amount: number,
  round?: 'UP' | 'DOWN'
) => {
  const precision = getUnitPrecision(pair)
  const accuracy = Math.pow(10, precision)
  const func = round === 'UP' ? 'ceil' : round === 'DOWN' ? 'floor' : 'round'
  return Number((Math[func](amount * accuracy) / accuracy).toFixed(precision))
}

export default roundUnitsToPair
