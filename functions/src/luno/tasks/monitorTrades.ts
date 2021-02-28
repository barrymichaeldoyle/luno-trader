import { fetchTrades, postOrder } from '../api'
import { roundPriceToPair, roundUnitsToPair } from '../common'
import { PAIR, Trade } from '../interfaces'
import { printMonitoringStart, printTrade, printTradesExecuted } from '../logs'

const makeNewTrades = async (
  trades: Trade[],
  pair: PAIR,
  spread: number,
  reinvestSellingGains: boolean
) => {
  let latestStamp = 0
  if (trades.length > 0) {
    printTradesExecuted(trades)

    interface TradeOrder {
      [x: string]: number
    }
    const askOrders: TradeOrder = {}
    const bidOrders: TradeOrder = {}

    trades.forEach(({ price, timestamp, type, volume }) => {
      if (Number(timestamp) > latestStamp) latestStamp = Number(timestamp)

      printTrade(pair, type, price, volume)

      if (type === 'BID') {
        const newRawPrice = Number(price) * (1 + spread / 100)
        const newPrice = roundPriceToPair(pair, newRawPrice, 'UP')
        askOrders[newPrice] = roundUnitsToPair(
          pair,
          Number(askOrders[newPrice] || 0) +
            roundUnitsToPair(pair, Number(volume), 'DOWN')
        )
      } else if (type === 'ASK') {
        const newRawPrice = Number(price) * (1 - spread / 100)
        const newPrice = roundPriceToPair(pair, newRawPrice, 'DOWN')
        bidOrders[newPrice] = roundUnitsToPair(
          pair,
          Number(bidOrders[newPrice] || 0) +
            roundUnitsToPair(
              pair,
              reinvestSellingGains
                ? (Number(volume) * Number(price)) / Number(newPrice)
                : Number(volume),
              'DOWN'
            )
        )
      }
    })

    Object.keys(askOrders).forEach(async price => {
      const newVolume = roundUnitsToPair(pair, askOrders[price] * 0.999, 'DOWN')
      if (newVolume > 0)
        await postOrder(pair, 'ASK', price, newVolume.toString())
    })
    Object.keys(bidOrders).forEach(
      async price =>
        await postOrder(pair, 'BID', price, bidOrders[price].toString())
    )
  }

  return latestStamp
}

const monitorTrades = async (
  pair: PAIR,
  since: number,
  spread: number,
  reinvestSellingGains: boolean,
  showMonitorMessage = false
) => {
  if (showMonitorMessage) printMonitoringStart(pair)
  const trades = await fetchTrades(pair, since)
  const latestStamp = await makeNewTrades(
    trades,
    pair,
    spread,
    reinvestSellingGains
  )
  setTimeout(
    () =>
      monitorTrades(
        pair,
        latestStamp === 0 ? since : latestStamp + 1,
        spread,
        reinvestSellingGains,
        false
      ),
    5000
  )
}

export default monitorTrades
