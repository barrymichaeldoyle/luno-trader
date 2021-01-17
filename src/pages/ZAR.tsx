import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Container } from '../components'
import { selectAsset } from '../reducer/selectedAsset'

const ZAR: FC = () => {
  const dispatch = useDispatch()

  return (
    <Container>
      <h2>Rands</h2>
      <h4>Work In Progress</h4>
      <Button onClick={() => dispatch(selectAsset(null))} outline>
        Back
      </Button>
    </Container>
  )
}

export default ZAR
