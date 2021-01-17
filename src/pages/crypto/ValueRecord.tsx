import { FC, useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Table } from '../../components'
import { format } from '../../utils'

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
  const { ask, bid } = useSelector<any, any>(
    state => state.tickers.tickers[`${state.selectedAsset}ZAR`]
  )
  const { balance } = useSelector<any, any>(
    state => state.balances.assets[state.selectedAsset] ?? ''
  )

  const zarValue = useMemo(() => {
    if (balance.length > 0)
      return format((Number(balance) * Number(bid)).toString())
    return '-'
  }, [balance, bid])

  return (
    <ValueTable>
      <div>
        <div>Bid</div>
        <div>Ask</div>
        <div>Owned</div>
        <div>Value</div>
      </div>
      <div>
        <div>{Number(bid)}</div>
        <div>{Number(ask)}</div>
        <div>{Number(balance)}</div>
        <div>R {zarValue}</div>
        <div></div>
      </div>
    </ValueTable>
  )
}

export default ValueRecord
