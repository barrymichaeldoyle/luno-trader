import { ASSET, TickerPair } from './interfaces'

const {
  REACT_APP_API_KEY,
  REACT_APP_API_SECRET,
  REACT_APP_PROXY_URL,
  REACT_APP_SAVINGS_ID
} = process.env

export const proxyUrl = REACT_APP_PROXY_URL
export const savingsId = REACT_APP_SAVINGS_ID

export const assetLabel = (asset: ASSET): string => {
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

export const Authorization = `Basic ${btoa(
  `${REACT_APP_API_KEY}:${REACT_APP_API_SECRET}`
)}`

export const format = price => {
  const pieces = parseFloat(price).toFixed(2).split('')
  let ii = pieces.length - 3
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
