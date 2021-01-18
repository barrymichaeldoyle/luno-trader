import React, { FC, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../../../components'
import { getBalances } from '../../../reducer/balances'
import { Authorization, format, proxyUrl, TickerPair } from '../../../utils'

interface Config {
  minTradable: number
  pair: TickerPair
  precision: number
}

interface Props extends Config {
  refresh: () => void
}

const BuySell: FC<Props> = ({ minTradable, pair, precision, refresh }) => {
  const [isTrading, setIsTrading] = useState(false)
  const { ask } = useSelector<any, any>(state => state.tickers.tickers[pair])
  const { assets } = useSelector(getBalances)

  const availableZar = useMemo(() => {
    if (assets.ZAR)
      return Math.floor(
        Number(assets.ZAR.balance) - Number(assets.ZAR.reserved)
      ).toString()
    return '-'
  }, [assets.ZAR])

  const minAmount = useMemo(() => Math.ceil(Number(ask) * minTradable), [ask])

  const buySell = useCallback(async () => {
    setIsTrading(true)
    const amount = prompt(
      `How much would you like to Buy In?\nAvailable: R ${format(
        availableZar
      )}\nMin: R ${format(minAmount)} (with 0% yield)`
    )
    if (
      amount === null ||
      isNaN(Number(amount)) ||
      amount.length === 0 ||
      Number(amount) < minAmount
    ) {
      setIsTrading(false)
      return alert('Invalid Input')
    }
    const expectedYieldInput = prompt(
      'What percentage yield would you like? (Eg. type `2` for 2%)\nMin: 1%'
    )
    if (
      expectedYieldInput === null ||
      isNaN(Number(expectedYieldInput)) ||
      expectedYieldInput.length === 0 ||
      Number(expectedYieldInput) < 1
    ) {
      setIsTrading(false)
      return alert('Invalid Input')
    }
    const feePercent = 0.001
    const yieldMultiplier = 1 + feePercent + Number(expectedYieldInput) / 100
    const currentAskPrice = ask
    const nextOrderPrice = currentAskPrice * yieldMultiplier
    const nextVolume = (Number(amount) / currentAskPrice) * 0.99
    try {
      const res1 = await fetch(
        `${proxyUrl}https://api.luno.com/api/1/marketorder?pair=${pair}&type=BUY&counter_volume=${amount}`,
        { method: 'POST', headers: { Authorization } }
      )
      const json1 = await res1.json()
      if (json1.error && json1.error.length > 0) return alert(json1.error)
      const res2 = await fetch(
        `${proxyUrl}https://api.luno.com/api/1/postorder?pair=${pair}&type=ASK&volume=${nextVolume.toFixed(
          precision
        )}&price=${nextOrderPrice.toFixed(0)}`,
        { method: 'POST', headers: { Authorization } }
      )
      const json2 = await res2.json()
      if (json2.error && json2.error.length > 0) return alert(json2.error)
    } catch (err) {
      console.error({ err })
      alert(`Something Went Wrong!\n${err.message}`)
    } finally {
      refresh()
      setIsTrading(false)
    }
  }, [ask])

  return (
    <div>
      <Button disabled={isTrading} onClick={buySell}>
        Buy In → Sell Out
      </Button>
    </div>
  )
}

export default BuySell
