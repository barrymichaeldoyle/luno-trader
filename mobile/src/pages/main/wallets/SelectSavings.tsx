import React, { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Cell, Row } from '../../../components'
import { setConfig } from '../../../reducer/config'
import { Wallet } from '../../../utils'

const Warning = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.orange};
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px 20px;
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

const Account = styled.TouchableOpacity`
  ${({ theme }) => css`
    background-color: ${theme.blue};
    border-radius: 10px;
    margin: 5px;
    padding: 10px 20px;
    width: 100%;
  `}
`

interface Props {
  wallets: Wallet[]
}

const SelectSavings: FC<Props> = ({ wallets }) => {
  const dispatch = useDispatch()
  const [isSaving, setIsSaving] = useState(false)
  const { apiKey, apiSecret, write } = useSelector(({ config }) => config)

  const handleSave = useCallback(async (savingsId: string) => {
    setIsSaving(true)
    try {
      const configJsonStr = JSON.stringify({
        apiKey,
        apiSecret,
        write
      })
      await AsyncStorage.setItem('config', configJsonStr)
      dispatch(setConfig({ savingsId }))
    } catch (e) {
      console.error(e)
      setIsSaving(false)
    }
  }, [])

  return (
    <>
      <Warning>
        <Row justify="center">
          <Text>You have 2 Bitcoin Wallets</Text>
        </Row>
        <Row>
          <Text bold>Select Your Bitcoin Savings Account</Text>
        </Row>
      </Warning>
      {wallets.map(({ account_id, balance, reserved, unconfirmed, name }) => (
        <Account key={account_id} onPress={() => handleSave(account_id)}>
          {name && name.length > 0 && (
            <Row justify="space-between">
              <Cell align="left" bold color="white">
                Account Name
              </Cell>
              <Cell align="right" color="white">
                {name}
              </Cell>
            </Row>
          )}
          <Row justify="space-between">
            <Cell bold color="white">
              Account ID
            </Cell>
            <Cell align="right" color="white">
              {account_id}
            </Cell>
          </Row>
          <Row justify="space-between">
            <Cell bold color="white">
              Balance
            </Cell>
            <Cell align="right" color="white">
              {balance} BTC
            </Cell>
          </Row>
          <Row justify="space-between">
            <Cell bold color="white">
              Reserved
            </Cell>
            <Cell align="right" color="white">
              {reserved} BTC
            </Cell>
          </Row>
          <Row justify="space-between">
            <Cell bold color="white">
              Unconfirmed
            </Cell>
            <Cell align="right" color="white">
              {unconfirmed} BTC
            </Cell>
          </Row>
        </Account>
      ))}
    </>
  )
}

export default SelectSavings
