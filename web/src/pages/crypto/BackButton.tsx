import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '../../components'
import { selectAsset } from '../../reducer/selected'

const BackButton: FC = () => {
  const dispatch = useDispatch()

  return (
    <Button onClick={() => dispatch(selectAsset(undefined))} outline>
      Back
    </Button>
  )
}

export default BackButton
