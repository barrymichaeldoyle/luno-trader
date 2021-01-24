import React, { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button, Heading, Input, Row, Text, Warning } from '../../components'
import SelectSavings from '../../components/SelectSavings'
import { setConfig, setIsUpdatingConfig } from '../../reducer/config'

const Credentials: FC = () => {
  const dispatch = useDispatch()
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [write, setWrite] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const config = useSelector(({ config }) => config)
  const [isUpdatingCredentials, setIsUpdatingCredentials] = useState(
    !config.isUpdating
  )

  const handleSaveCredentials = useCallback(async () => {
    setIsSaving(true)
    try {
      const configJsonStr = JSON.stringify({
        apiKey,
        apiSecret,
        savingsId: config.savingsId,
        write
      })
      await AsyncStorage.setItem('config', configJsonStr)
      setIsUpdatingCredentials(false)
      dispatch(
        setConfig({ apiKey, apiSecret, write, isUpdating: config.isUpdating })
      )
    } catch (e) {
      console.error(e)
      setIsSaving(false)
    }
  }, [])

  return (
    <>
      {config.isUpdating && <SelectSavings isUpdating />}
      {isUpdatingCredentials ? (
        <>
          {config.isUpdating && (
            <Heading style={{ marginBottom: 10 }}>Update API Key</Heading>
          )}
          <Warning>
            <Text bold>Provide Read-only Credentials</Text>
          </Warning>
          <Input
            defaultValue={apiKey}
            label="API Key"
            onChangeText={value => setApiKey(value)}
            paste
          />
          <Input
            defaultValue={apiSecret}
            label="API Secret"
            onChangeText={value => setApiSecret(value)}
            paste
          />
          <Row>
            {config.isUpdating && (
              <Button
                accessibilityLabel="Cancel Updating Authentication Credentials"
                label="Cancel"
                onPress={() =>
                  config.isUpdating
                    ? setIsUpdatingCredentials(false)
                    : dispatch(setIsUpdatingConfig(false))
                }
                outline
                width={150}
              />
            )}
            <Button
              accessibilityLabel="Submit Authentication Credentials"
              disabled={
                apiKey.trim().length === 0 || apiSecret.trim().length === 0
              }
              label={isSaving ? 'Saving' : 'Save'}
              loading={isSaving}
              onPress={handleSaveCredentials}
              width={150}
            />
          </Row>
        </>
      ) : (
        <Button
          accessibilityLabel="Update Credentials"
          label="Update Credentials"
          onPress={() => setIsUpdatingCredentials(true)}
          style={{ width: '100%' }}
        />
      )}
      {config.isUpdating && (
        <Button
          accessibilityLabel="Back Out From Settings"
          label="Back"
          onPress={() => dispatch(setIsUpdatingConfig(false))}
          outline
          style={{ marginTop: 15, width: '100%' }}
        />
      )}
    </>
  )
}

export default Credentials
