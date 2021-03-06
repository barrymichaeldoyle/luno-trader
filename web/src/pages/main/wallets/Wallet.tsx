import React, { FC, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { LinkButton } from '../../../components'
import { selectAsset } from '../../../reducer/selected'
import { ASSET, assetLabel, format, savingsId } from '../../../utils'

interface Props {
  asset: ASSET
}

const { REACT_APP_SAVINGS_ID } = process.env
const showView = (account_id: string) => account_id !== REACT_APP_SAVINGS_ID

const Wallet: FC<Props> = ({ asset }) => {
  const dispatch = useDispatch()
  const tickers = useSelector(state => state.tickers.tickers)
  const wallet = useSelector(state => state.wallets.assets[asset])

  const calculateZarValue = useCallback(
    (asset: ASSET, balance: string) => {
      switch (asset) {
        case 'XBT':
          if (tickers.XBTZAR)
            return format(
              (Number(balance) * Number(tickers.XBTZAR.bid)).toString()
            )
          return '-'
        case 'SAVINGS':
          if (tickers.XBTZAR)
            return format(
              (Number(balance) * Number(tickers.XBTZAR.bid)).toString()
            )
          return '-'
        case 'LTC':
          if (tickers.LTCZAR)
            return format(
              (Number(balance) * Number(tickers.LTCZAR.bid)).toString()
            )
          return '-'
        case 'ETH':
          if (tickers.ETHZAR)
            return format(
              (Number(balance) * Number(tickers.ETHZAR.bid)).toString()
            )
          return '-'
        case 'XRP':
          if (tickers.XRPZAR)
            return format(
              (Number(balance) * Number(tickers.XRPZAR.bid)).toString()
            )
          return '-'
        case 'ZAR':
          return format(balance)
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

  const canTrade = useMemo(() => {
    if (wallet) {
      if (wallet.account_id === savingsId) return ''
      if (
        asset === 'ZAR' &&
        Number(wallet.balance) - Number(wallet.reserved) > 300
      )
        return 'Y'
      if (
        tickers[`${asset}ZAR`] &&
        (Number(wallet.balance) - Number(wallet.reserved)) *
          Number(tickers[`${asset}ZAR`].bid) >
          300
      )
        return 'Y'
    }
    return ''
  }, [asset, tickers, wallet])

  if (!wallet) return null

  return (
    <>
      {wallet.asset === 'ZAR' && <br />}
      <div key={wallet.account_id}>
        <div>{assetLabel(asset as ASSET)}</div>
        <div>
          {asset === 'ZAR'
            ? Number(wallet.balance).toFixed(2)
            : Number(wallet.balance)}
        </div>
        <div>R {calculateZarValue(asset as ASSET, wallet.balance)}</div>
        <div>{canTrade}</div>
        <div>
          {showView(wallet.account_id) && (
            <LinkButton onClick={viewAsset}>View</LinkButton>
          )}
        </div>
      </div>
      {wallet.account_id === savingsId && <br />}
    </>
  )
}

export default Wallet
