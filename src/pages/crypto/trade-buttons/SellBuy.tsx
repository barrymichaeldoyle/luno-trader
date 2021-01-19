import React, { FC, useCallback, useState } from 'react'

import { Button } from '../../../components'

interface Props {
  refresh: () => void
}

const SellBuy: FC<Props> = ({ refresh }) => {
  const [isTrading, setIsTrading] = useState(false)

  const sellBuy = useCallback(() => alert('Work In Progress'), [])

  return (
    <div>
      <Button disabled={isTrading} onClick={sellBuy}>
        Sell Out → Buy In
      </Button>
    </div>
  )
}

export default SellBuy
