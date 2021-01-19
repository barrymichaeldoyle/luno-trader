import { FC, useMemo } from 'react'
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

  if (!asset) return null

  const available = useMemo(
    () =>
      wallet
        ? Number(
            (Number(wallet.balance) - Number(wallet.reserved)).toFixed(
              configs[asset].precision
            )
          )
        : 0,
    [wallet]
  )

  const zarValue = useMemo(() => {
    if (wallet) return format((Number(wallet.balance) * Number(bid)).toString())
    return '-'
  }, [wallet, bid])

  if (!wallet) return null

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
        </div>
        <div>
          <div>{available}</div>
        </div>
      </ValueTable>
    </>
  )
}

export default ValueRecord
