import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { Cell, TouchableRow } from '../../../components'
import theme from '../../../styles/theme'
import { ASSET, assetLabel, format } from '../../../utils'

interface Props {
  asset: ASSET
}

const Wallet: FC<Props> = ({ asset }) => {
  const assetBid = useSelector(
    state =>
      state.tickers.tickers[`${asset === 'SAVINGS' ? 'XBT' : asset}ZAR`]?.bid
  )
  const wallet = useSelector(state => state.wallets.assets[asset])

  if (!wallet) return null

  return (
    <TouchableRow
      style={{
        marginBottom: asset === 'SAVINGS' ? 10 : 0,
        marginTop: asset === 'ZAR' ? 10 : 0
      }}
      onPress={() => console.log(asset)}
    >
      <Cell
        bold
        style={
          asset !== 'ZAR' && asset !== 'SAVINGS'
            ? { color: theme.blue }
            : undefined
        }
        width={80}
      >
        {assetLabel(asset as ASSET)}
      </Cell>
      <Cell align="right" width={90} style={{ fontVariant: ['tabular-nums'] }}>
        {asset === 'ZAR'
          ? Number(wallet.balance).toFixed(2)
          : Number(wallet.balance)}
      </Cell>
      <Cell align="right" style={{ fontVariant: ['tabular-nums'] }}>
        R{' '}
        {asset === 'ZAR'
          ? format(wallet.balance, true)
          : assetBid
          ? format((Number(wallet.balance) * Number(assetBid)).toString(), true)
          : 'loading...'}
      </Cell>
      <Cell align="right" width={20}>
        Y
      </Cell>
    </TouchableRow>
  )
}

export default Wallet
