export type ASSET = 'ZAR' | 'ETH' | 'XBT' | 'XRP' | 'LTC' | 'SAVINGS'

export interface Balance {
  account_id: string
  asset: string
  balance: string
  name: string
  reserved: string
  unconfirmed: string
}

export interface Order {
  base: string
  completed_timestamp: string
  counter: string
  creation_timestamp: string
  expiration_timestamp: string
  fee_base: string
  fee_counter: string
  limit_price: string
  limit_volume: string
  order_id: string
  pair: string
  state: 'PENDING'
  type: 'ASK' | 'BID'
}

export type STATUS = 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED'

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

export interface Orders {
  XBTZAR?: Order
  ETHZAR?: Order
  LTCZAR?: Order
  XRPZAR?: Order
}

export interface Wallets {
  XBTZAR?: Balance
  ETHZAR?: Balance
  LTCZAR?: Balance
  XRPZAR?: Balance
  SAVINGS?: Balance
}
