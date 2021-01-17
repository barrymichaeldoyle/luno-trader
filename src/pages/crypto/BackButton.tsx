import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '../../components'
import { selectAsset } from '../../reducer/selectedAsset'

const BackButton: FC = () => {
  const dispatch = useDispatch()

  return (
    <Button onClick={() => dispatch(selectAsset(null))} outline>
      Back
    </Button>
  )
}

export default BackButton
