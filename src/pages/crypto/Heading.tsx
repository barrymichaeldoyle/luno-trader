import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import { getAsset } from '../../reducer/selectedAsset'
import { assetLabel } from '../../utils'

const Heading: FC = () => {
  const asset = useSelector(getAsset)

  return <h2>{assetLabel(asset)}</h2>
}

export default Heading
