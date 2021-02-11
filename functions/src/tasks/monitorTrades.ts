import { fetchTrades, postOrder } from '../api'
import { roundPriceToPair, roundUnitsToPair } from '../common'
import { TickerPair, Trade } from '../interfaces'
import { printMonitoringStart, printTrade, printTradesExecuted } from '../logs'

const makeNewTrades = async (
  trades: Trade[],
  pair: TickerPair,
  spread: number,
  doneStamps: number[]
) => {
  const newTrades = trades.filter(
    ({ timestamp }) => !doneStamps.includes(timestamp)
  )
  const newDoneStamps = [...doneStamps]
  if (newTrades.length > 0) {
    printTradesExecuted(newTrades)

    interface TradeOrder {
      [x: string]: number
    }
    const askOrders: TradeOrder = {}
    const bidOrders: TradeOrder = {}

    newTrades.forEach(({ price, timestamp, type, volume }) => {
      printTrade(pair, type, price, volume)
      newDoneStamps.push(timestamp)

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
              (Number(volume) * Number(price)) / Number(newPrice)
            )
        )
      }
    })

    Object.keys(askOrders).forEach(
      async price =>
        await postOrder(
          pair,
          'ASK',
          price,
          roundUnitsToPair(pair, askOrders[price] * 0.999, 'DOWN').toString()
        )
    )
    Object.keys(bidOrders).forEach(
      async price =>
        await postOrder(pair, 'BID', price, bidOrders[price].toString())
    )
  }

  return newDoneStamps
}

const monitorTrades = async (
  pair: TickerPair,
  startTime: number,
  spread = 1,
  doneStamps: number[],
  showMonitorMessage = false
) => {
  if (showMonitorMessage) printMonitoringStart(pair)
  const trades = await fetchTrades(pair, startTime)
  const newDoneStamps = await makeNewTrades(trades, pair, spread, doneStamps)
  setTimeout(
    async () => monitorTrades(pair, startTime, spread, newDoneStamps, false),
    5000
  )
}

export default monitorTrades
