import React, { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button, Input, Row } from '../../components'
import { setAuth, updateAuth } from '../../reducer/auth'

const Credentials: FC = () => {
  const dispatch = useDispatch()
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [write, setWrite] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const isUpdatingAuth = useSelector(({ auth }) => auth.isUpdating)

  const handleSubmit = useCallback(async () => {
    setIsSaving(true)
    try {
      const auth = JSON.stringify({ apiKey, apiSecret, write })
      await AsyncStorage.setItem('auth', auth)
      dispatch(setAuth(auth))
    } catch (e) {
      console.error(e)
    } finally {
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
        {isUpdatingAuth && (
          <Button
            accessibilityLabel="Cancel Updating Authentication Credentials"
            label="Cancel"
            onPress={() => dispatch(updateAuth(false))}
            outline
            width={150}
          />
        )}
        <Button
          accessibilityLabel="Submit Authentication Credentials"
          disabled={apiKey.trim().length === 0 || apiSecret.trim().length === 0}
          label={isSaving ? 'Saving' : 'Save'}
          loading={isSaving}
          onPress={handleSubmit}
          width={150}
        />
      </Row>
    </>
  )
}

export default Credentials
