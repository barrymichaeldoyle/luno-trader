export type ASSET = 'ZAR' | 'ETH' | 'BTC' | 'XRP'

export type SIDE = 'buy' | 'sell'

export interface NewAccountTrade {
  price: string
  quantity: string
  currencyPair: PAIR
  tradedAt: string
  side: SIDE
  orderId: string
  id: string
}

export type PAIR = 'BTCZAR' | 'ETHZAR' | 'XRPZAR'

export type VERB = 'GET' | 'POST'
