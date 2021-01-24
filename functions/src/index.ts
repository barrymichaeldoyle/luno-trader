import dotenv from 'dotenv'
import fetch from 'node-fetch'

import { Ticker, Tickers } from './interfaces'
import rippleTrader from './rippleTrader'

dotenv.config()

const monitorTickers = async () => {
  try {
    const res = await fetch('https://api.luno.com/api/1/tickers', {
      method: 'GET'
    })
    const json = await res.json()
    const updatedTickers: Tickers = {}
    json.tickers.forEach((ticker: Ticker) => {
      switch (ticker.pair) {
        case 'XBTZAR':
          return (updatedTickers.XBTZAR = ticker)
        case 'ETHZAR':
          return (updatedTickers.ETHZAR = ticker)
        case 'LTCZAR':
          return (updatedTickers.LTCZAR = ticker)
        case 'XRPZAR':
          return (updatedTickers.XRPZAR = ticker)
        default:
          return
      }
    })
    console.log('Tickers', updatedTickers)
    setTimeout(() => monitorTickers(), 2000)
  } catch (e) {
    console.error('Something went wrong:', e.message)
  }
}

const main = () => {
  rippleTrader()
}

main()
