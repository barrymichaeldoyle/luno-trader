import React, { FC, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../../../components'
import { Authorization, configs, proxyUrl } from '../../../utils'

interface Props {
  refresh: () => void
}

const SellBuy: FC<Props> = ({ refresh }) => {
  const [isTrading, setIsTrading] = useState(false)
  const asset = useSelector(state => state.selected.asset)
  const bid = useSelector(
    state => asset && state.tickers.tickers[configs[asset].pair]?.bid
  )
  const wallet = useSelector(state => asset && state.wallets.assets[asset])

  const available = useMemo(
    () =>
      wallet && asset
        ? Number(
            (Number(wallet.balance) - Number(wallet.reserved)).toFixed(
              configs[asset].precision
            )
          )
        : 0,
    [asset, wallet]
  )

  const sellBuy = useCallback(async () => {
    if (asset && bid && wallet) {
      const { minTradable } = configs[asset]
      const amount = prompt(
        `How much would you like to Sell Out?\nAvailable: ${available} ${asset}\nMin: ${minTradable} ${asset}`
      )
      if (
        amount === null ||
        isNaN(Number(amount)) ||
        amount.length === 0 ||
        Number(amount) < minTradable
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
      const yieldMultiplier = 1 - Number(expectedYieldInput) / 100
      const currentBidPrice = Number(bid)
      const nextOrderPrice = currentBidPrice * yieldMultiplier
      const nextVolume = Number(amount) * (2 - yieldMultiplier - 0.001)

      try {
        const res1 = await fetch(
          `${proxyUrl}https://api.luno.com/api/1/marketorder?pair=${configs[asset].pair}&type=SELL&base_volume=${amount}`,
          { method: 'POST', headers: { Authorization } }
        )
        const json1 = await res1.json()
        if (json1.error && json1.error.length > 0) return alert(json1.error)
        const res2 = await fetch(
          `${proxyUrl}https://api.luno.com/api/1/postorder?pair=${
            configs[asset].pair
          }&type=BID&volume=${nextVolume.toFixed(
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
  }, [asset, available, bid, refresh, wallet])

  if (!asset || !wallet) return null

  return (
    <div>
      <Button disabled={isTrading} onClick={sellBuy}>
        Sell Out → Buy In
      </Button>
    </div>
  )
}

export default SellBuy
