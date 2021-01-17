import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getBalances } from '../../../reducer/balances'
import { getTickers } from '../../../reducer/tickers'
import { ASSET, format } from '../../../utils'

const Total: FC = () => {
  const { tickers } = useSelector<any, any>(getTickers)
  const { assets } = useSelector(getBalances)

  const totalZarValue = useMemo(() => {
    let zarSum = 0
    Object.keys(assets).forEach(asset => {
      switch (asset as ASSET) {
        case 'XBT':
          if (tickers.XBTZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.XBTZAR.bid)
          break
        case 'SAVINGS':
          if (tickers.XBTZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.XBTZAR.bid)
          break
        case 'LTC':
          if (tickers.LTCZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.LTCZAR.bid)
          break
        case 'ETH':
          if (tickers.ETHZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.ETHZAR.bid)
          break
        case 'XRP':
          if (tickers.XRPZAR)
            zarSum += Number(assets[asset].balance) * Number(tickers.XRPZAR.bid)
          break
        case 'ZAR':
          zarSum += Number(assets[asset].balance)
          break
      }
    })
    return format(zarSum)
  }, [assets, tickers])

  return (
    <div>
      <div>Total</div>
      <div></div>
      <div>R {totalZarValue}</div>
      <div></div>
    </div>
  )
}

export default Total
