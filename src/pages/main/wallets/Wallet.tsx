import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LinkButton } from '../../../components'
import { getWallet } from '../../../reducer/balances'
import { selectAsset } from '../../../reducer/selectedAsset'
import { getTickers } from '../../../reducer/tickers'
import { ASSET, assetLabel, format } from '../../../utils'

interface Props {
  asset: ASSET
}

const { REACT_APP_SAVINGS_ID } = process.env
const showView = (account_id: string) => account_id !== REACT_APP_SAVINGS_ID

const Wallet: FC<Props> = ({ asset }) => {
  const dispatch = useDispatch()
  const { tickers } = useSelector<any, any>(getTickers)
  const { account_id, balance } = useSelector(getWallet(asset))

  const calculateZarValue = useCallback(
    (asset: ASSET, balance: string) => {
      switch (asset) {
        case 'XBT':
          if (tickers.XBTZAR)
            return format(Number(balance) * Number(tickers.XBTZAR.bid))
          return '-'
        case 'SAVINGS':
          if (tickers.XBTZAR)
            return format(Number(balance) * Number(tickers.XBTZAR.bid))
          return '-'
        case 'LTC':
          if (tickers.LTCZAR)
            return format(Number(balance) * Number(tickers.LTCZAR.bid))
          return '-'
        case 'ETH':
          if (tickers.ETHZAR)
            return format(Number(balance) * Number(tickers.ETHZAR.bid))
          return '-'
        case 'XRP':
          if (tickers.XRPZAR)
            return format(Number(balance) * Number(tickers.XRPZAR.bid))
          return '-'
        case 'ZAR':
          return format(Number(balance))
        default:
          return '-'
      }
    },
    [tickers]
  )

  const viewAsset = useCallback(() => dispatch(selectAsset(asset)), [
    dispatch,
    asset
  ])

  return (
    <div key={account_id}>
      <div>{assetLabel(asset as ASSET)}</div>
      <div>
        {asset === 'ZAR' ? Number(balance).toFixed(2) : Number(balance)}
      </div>
      <div>R {calculateZarValue(asset as ASSET, balance)}</div>
      <div>
        {showView(account_id) && (
          <LinkButton onClick={viewAsset}>View</LinkButton>
        )}
      </div>
    </div>
  )
}

export default Wallet
