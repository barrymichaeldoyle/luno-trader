import React, { FC, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { setConfig } from '../reducer/config'
import { fetchWallets } from '../reducer/wallets'
import theme from '../styles/theme'
import { Cell, Heading, Row, Text, Warning } from './styles'

const Wrapper = styled.View`
  ${({ theme }) => css`
    background-color: ${theme.darkBlue};
    border-radius: 10px;
    margin: 0 -10px;
    padding: 10px;
    width: 100%;
  `}
`

const Account = styled.TouchableOpacity<{ selected?: boolean }>`
  ${({ selected, theme }) => css`
    background-color: ${selected ? theme.green : theme.blue};
    border-radius: 10px;
    margin: 5px 0;
    padding: 10px 15px;
    width: 100%;
  `}
`

interface Props {
  isUpdating?: boolean
}

const SelectSavings: FC<Props> = ({ isUpdating = false }) => {
  const dispatch = useDispatch()
  const { apiKey, apiSecret, savingsId, write } = useSelector(
    ({ config }) => config
  )
  const wallets = useSelector(({ wallets }) => wallets.btcWallets)

  useEffect(() => {
    if (isUpdating) dispatch(fetchWallets())
  }, [])

  const handleSave = useCallback(async (id: string) => {
    try {
      const configJsonStr = JSON.stringify({
        apiKey,
        apiSecret,
        savingsId: id,
        write
      })
      await AsyncStorage.setItem('config', configJsonStr)
      dispatch(setConfig({ savingsId: id, isUpdating }))
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Wrapper style={isUpdating ? { marginBottom: 15 } : undefined}>
      {isUpdating ? (
        <Heading style={{ color: theme.white }}>Set Savings Wallet</Heading>
      ) : (
        <Warning>
          <Row justify="center">
            <Text>You have 2 Bitcoin Wallets</Text>
          </Row>
          <Row>
            <Text bold>Select Your Bitcoin Savings Account</Text>
          </Row>
        </Warning>
      )}
      {wallets.map(({ account_id, balance, reserved, unconfirmed, name }) => (
        <Account
          key={account_id}
          onPress={() => handleSave(account_id)}
          selected={account_id === savingsId}
        >
          {name && name.length > 0 && (
            <Row justify="space-between">
              <Cell
                align="left"
                bold
                color="white"
                style={{ fontSize: 14 }}
                width={108}
              >
                Account Name
              </Cell>
              <Cell align="right" color="white" style={{ fontSize: 14 }}>
                {name}
              </Cell>
            </Row>
          )}
          <Row justify="space-between">
            <Cell bold color="white" style={{ fontSize: 14 }} width={108}>
              Account ID
            </Cell>
            <Cell align="right" color="white" style={{ fontSize: 14 }}>
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
    </Wrapper>
  )
}

export default SelectSavings
