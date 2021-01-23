import { ASSET, TickerPair } from './interfaces'

export const configs = {
  XBT: {
    pair: 'XBTZAR',
    precision: 6,
    minTradable: 0.0005,
    zarPrecision: 0
  },
  ETH: {
    pair: 'ETHZAR',
    precision: 6,
    minTradable: 0.0005,
    zarPrecision: 0
  },
  LTC: {
    pair: 'LTCZAR',
    precision: 4,
    minTradable: 0.001,
    zarPrecision: 0
  },
  XRP: {
    pair: 'XRPZAR',
    precision: 0,
    minTradable: 1,
    zarPrecision: 2
  }
}

export const assetLabel = (asset: ASSET | null): string => {
  switch (asset) {
    case 'SAVINGS':
      return 'Savings (BTC)'
    case 'XBT':
      return 'Bitcoin'
    case 'LTC':
      return 'Litecoin'
    case 'ETH':
      return 'Ethereum'
    case 'XRP':
      return 'Ripple'
    case 'ZAR':
      return 'Rand'
    default:
      return ''
  }
}

export const format = (price: string, float = true) => {
  const pieces = parseFloat(price)
    .toFixed(float ? 2 : 0)
    .split('')
  let ii = pieces.length - (float ? 3 : 0)
  while ((ii -= 3) > 0) pieces.splice(ii, 0, ' ')

  return pieces.join('')
}

export const pairLabel = (key: TickerPair) => {
  switch (key) {
    case 'XBTZAR':
      return 'Bitcoin'
    case 'ETHZAR':
      return 'Ethereum'
    case 'LTCZAR':
      return 'Litecoin'
    case 'XRPZAR':
      return 'Ripple'
    default:
      return ''
  }
}

export * from './interfaces'
