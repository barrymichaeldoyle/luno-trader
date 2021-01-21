import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Table } from '../../components'
import { configs, format } from '../../utils'

const ValueTable = styled(Table)`
  & > div > div {
    &:nth-child(1) {
      text-align: center;
      width: 130px;
    }

    &:nth-child(2) {
      text-align: center;
      width: 130px;
    }

    &:nth-child(3) {
      text-align: center;
      width: 130px;
    }

    &:nth-child(4) {
      text-align: center;
      width: 130px;
    }
  }
`

const ValueRecord: FC = () => {
  const { ask, bid } = useSelector(
    state => state.tickers.tickers[`${state.selected.asset}ZAR`]
  )
  const asset = useSelector(state => state.selected.asset)
  const wallet = useSelector(state => asset && state.wallets.assets[asset])
  const zarWallet = useSelector(state => state.wallets.assets.ZAR)

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

  const availableValue = useMemo(
    () =>
      wallet
        ? format(
            (
              (Number(wallet.balance) - Number(wallet.reserved)) *
              Number(bid)
            ).toString()
          )
        : '0',
    [bid, wallet]
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

  const zarValue = useMemo(
    () =>
      wallet ? format((Number(wallet.balance) * Number(bid)).toString()) : '-',
    [wallet, bid]
  )

  if (!wallet || !asset) return null

  return (
    <>
      <ValueTable>
        <div>
          <div>Bid</div>
          <div>Ask</div>
          <div>Owned</div>
          <div>Value</div>
        </div>
        <div>
          <div>R {format(bid)}</div>
          <div>R {format(ask)}</div>
          <div>{Number(wallet.balance).toFixed(configs[asset].precision)}</div>
          <div>R {zarValue}</div>
          <div></div>
        </div>
      </ValueTable>
      <ValueTable>
        <div>
          <div>Available</div>
          <div>Value</div>
          <div>Available Rands</div>
        </div>
        <div>
          <div>{available}</div>
          <div>R {availableValue}</div>
          <div>R {availableZar}</div>
        </div>
      </ValueTable>
    </>
  )
}

export default ValueRecord
