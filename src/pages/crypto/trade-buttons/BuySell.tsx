import React, { FC, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../../../components'
import { Authorization, configs, format, proxyUrl } from '../../../utils'

interface Props {
  refresh: () => void
}

const BuySell: FC<Props> = ({ refresh }) => {
  const [isTrading, setIsTrading] = useState(false)
  const asset = useSelector(state => state.selected.asset)
  const zarWallet = useSelector(state => state.wallets.assets.ZAR)
  const ask = useSelector(
    state => asset && state.tickers.tickers[configs[asset].pair]?.ask
  )

  const availableZar = useMemo(
    () =>
      zarWallet
        ? Math.floor(
            Number(zarWallet.balance) - Number(zarWallet.reserved)
          ).toString()
        : '0',
    [zarWallet]
  )

  const minAmount = useMemo(
    () =>
      asset && Math.ceil(Number(ask) * configs[asset].minTradable).toString(),
    [asset, ask]
  )

  const buySell = useCallback(async () => {
    if (asset && ask) {
      setIsTrading(true)
      const amount = prompt(
        `How much would you like to Buy In?\nAvailable: R ${format(
          availableZar
        )}\nMin: R ${format(minAmount ?? '0')}`
      )
      if (
        amount === null ||
        isNaN(Number(amount)) ||
        amount.length === 0 ||
        Number(amount) < Number(minAmount)
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
      const yieldMultiplier = 1 + Number(expectedYieldInput) / 100 + 0.001
      const currentAskPrice = Number(ask)
      const nextOrderPrice = currentAskPrice * yieldMultiplier
      const nextVolume = (Number(amount) / currentAskPrice) * 0.99
      try {
        const res1 = await fetch(
          `${proxyUrl}https://api.luno.com/api/1/marketorder?pair=${configs[asset].pair}&type=BUY&counter_volume=${amount}`,
          { method: 'POST', headers: { Authorization } }
        )
        const json1 = await res1.json()
        if (json1.error && json1.error.length > 0) return alert(json1.error)
        const res2 = await fetch(
          `${proxyUrl}https://api.luno.com/api/1/postorder?pair=${
            configs[asset].pair
          }&type=ASK&volume=${nextVolume.toFixed(
            configs[asset].precision
          )}&price=${nextOrderPrice.toFixed(configs[asset].zarPrecision)}`,
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
    }
  }, [asset, ask, availableZar, minAmount, refresh])

  if (!ask || !asset) return null

  return (
    <div>
      <Button disabled={isTrading} onClick={buySell}>
        Buy In → Sell Out
      </Button>
    </div>
  )
}

export default BuySell
