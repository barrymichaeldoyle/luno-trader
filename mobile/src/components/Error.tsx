import React, { FC } from 'react'
import styled, { css } from 'styled-components/native'

import Button from './Button'
import { Row } from './styles'

const Container = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.red};
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 20px;
    width: 100%;
  `}
`

const Text = styled.Text<{ bold?: boolean }>`
  ${({ bold, theme }) => css`
    color: ${theme.white};
    font-size: 16px;
    font-weight: ${bold ? 'bold' : 'normal'};
    height: 20px;
    text-align: center;
  `}
`

interface Props {
  loading?: boolean
  message?: string
  retry?: () => void
}

const Error: FC<Props> = ({
  loading = false,
  message = 'An Error Occured',
  retry
}) => (
  <Container>
    <Row justify="center">
      <Text>{message}</Text>
    </Row>
    {retry && (
      <Row>
        <Button
          accessibilityLabel="Error Try Again"
          error
          label={loading ? 'Trying Again' : 'Try Again'}
          loading={loading}
          onPress={retry}
          outline
          style={{ marginTop: 10 }}
          width={180}
        />
      </Row>
    )}
  </Container>
)

export default Error
