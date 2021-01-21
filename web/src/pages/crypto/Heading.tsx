import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { assetLabel } from '../../utils'

const Heading: FC = () => {
  const asset = useSelector(state => state.selected.asset)

  if (!asset) return null

  return <h2>{assetLabel(asset)}</h2>
}

export default Heading
