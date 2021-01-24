export type ASSET = 'ZAR' | 'ETH' | 'XBT' | 'XRP' | 'LTC' | 'SAVINGS'

export interface Order {
  base: string
  completed_timestamp: number
  counter: string
  creation_timestamp: number
  expiration_timestamp: number
  fee_base: string
  fee_counter: string
  limit_price: string
  limit_volume: string
  order_id: string
  pair: string
  state: 'PENDING' | 'COMPLETE'
  type: 'ASK' | 'BID' | 'BUY' | 'SELL'
}

export interface Orders {
  XBTZAR?: Order
  ETHZAR?: Order
  LTCZAR?: Order
  XRPZAR?: Order
}

export interface Trade {
  base: string
  counter: string
  fee_base: string
  fee_counter: string
  is_buy: boolean
  order_id: string
  pair: string
  price: string
  sequence: number
  timestamp: number
  type: 'ASK' | 'BID'
  volume: string
}

export interface Ticker {
  ask: string
  bid: string
  last_trade: string
  pair: string
  rolling_24_hour_volume: string
  status: 'ACTIVE'
  timestamp: string
}

export type TickerPair = 'XBTZAR' | 'ETHZAR' | 'LTCZAR' | 'XRPZAR'

export interface Tickers {
  XBTZAR?: Ticker
  ETHZAR?: Ticker
  LTCZAR?: Ticker
  XRPZAR?: Ticker
}

export interface Wallet {
  account_id: string
  asset: string
  balance: string
  name?: string
  reserved: string
  unconfirmed: string
}

export interface Wallets {
  XBT?: Wallet
  ETH?: Wallet
  LTC?: Wallet
  XRP?: Wallet
  SAVINGS?: Wallet
  ZAR?: Wallet
}
