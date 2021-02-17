import WebSocket from 'ws'

import { getAuthHeaders, postOrder } from '../api'
import { roundPriceToPair, roundUnitsToPair } from '../common'
import { NewAccountTrade } from '../interfaces'
import { printMonitoringStart, printTrade } from '../logs'

const monitorTrades = async (
  spread: number,
  reinvestSellingGains: boolean,
  showMonitorMessage = false
) => {
  if (showMonitorMessage) printMonitoringStart()

  const headers = getAuthHeaders('/ws/account')
  const ws = new WebSocket('wss://api.valr.com/ws/account', { headers })

  ws.on('open', () =>
    setInterval(() => ws.send(JSON.stringify({ type: 'PING' })), 30000)
  )

  ws.on('message', data => {
    const message = JSON.parse(data.toString())
    if (message.type === 'NEW_ACCOUNT_TRADE') {
      if (!message.data) return console.error('NO DATA')
      const {
        price,
        quantity,
        currencyPair,
        side
      } = message.data as NewAccountTrade
      printTrade(currencyPair, side, price, quantity)
      if (side === 'buy') {
        const newRawPrice = Number(price) * (1 + spread / 100)
        const newPrice = roundPriceToPair(currencyPair, newRawPrice, 'UP')
        const newQuantity = quantity
        postOrder(currencyPair, 'sell', newPrice.toString(), newQuantity)
      } else if (side === 'sell') {
        const newRawPrice = Number(price) * (1 - spread / 100)
        const newPrice = roundPriceToPair(currencyPair, newRawPrice, 'DOWN')
        const newQuantity = roundUnitsToPair(
          currencyPair,
          (reinvestSellingGains
            ? (Number(quantity) * Number(price)) / Number(newPrice)
            : Number(quantity)) * 0.998,
          'DOWN'
        ).toString()
        postOrder(currencyPair, 'buy', newPrice.toString(), newQuantity)
      }
    }
  })

  ws.on('error', err => {
    console.log('ERROR', err.toString())
  })

  ws.on('close', () => monitorTrades(spread, false))
}

export default monitorTrades
