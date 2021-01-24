import React, { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button, Input, Row } from '../../components'
import { setConfig, setIsUpdatingConfig, useSavingsId } from '../../reducer/config'

const Credentials: FC = () => {
  const dispatch = useDispatch()
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [write, setWrite] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const isUpdatingConfig = useSelector(({ config }) => config.isUpdating)
  const savingsId = useSavingsId()

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    try {
      const configJsonStr = JSON.stringify({
        apiKey,
        apiSecret,
        savingsId,
        write
      })
      await AsyncStorage.setItem('config', configJsonStr)
      dispatch(setConfig({ apiKey, apiSecret, write }))
    } catch (e) {
      console.error(e)
      setIsSaving(false)
    }
  }, [])

  return (
    <>
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
        {isUpdatingConfig && (
          <Button
            accessibilityLabel="Cancel Updating Authentication Credentials"
            label="Cancel"
            onPress={() => dispatch(setIsUpdatingConfig(false))}
            outline
            width={150}
          />
        )}
        <Button
          accessibilityLabel="Submit Authentication Credentials"
          disabled={apiKey.trim().length === 0 || apiSecret.trim().length === 0}
          label={isSaving ? 'Saving' : 'Save'}
          loading={isSaving}
          onPress={handleSave}
          width={150}
        />
      </Row>
    </>
  )
}

export default Credentials
