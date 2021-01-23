import React, { FC, useCallback, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button, Input } from '../../components'

const Credentials: FC = () => {
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [isStoring, setIsStoring] = useState(false)

  const [loading, setLoading] = useState(false)

  const storeData = useCallback(async value => {
    setIsStoring(true)
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('auth', jsonValue)
    } catch (e) {
      console.error(e)
      setIsStoring(false)
    }
  }, [])

  return (
    <>
      <Input
        defaultValue={apiKey}
        label="API Key"
        onChangeText={setApiKey}
        paste
      />
      <Input
        defaultValue={apiSecret}
        label="API Secret"
        onChangeText={setApiSecret}
        paste
      />
      <Button
        accessibilityLabel="Submit Authentication Credentials"
        label={loading ? 'Submitting' : 'Submit'}
        loading={loading}
        onPress={() => setLoading(!loading)}
        width={156}
      />
      <Button
        accessibilityLabel="Submit Authentication Credentials"
        label="Submit"
        loading={loading}
        onPress={() => setLoading(!loading)}
        outline
      />
      <Button
        accessibilityLabel="Submit Authentication Credentials"
        disabled
        label="Submit"
        onPress={() => console.log('Pushed the button')}
      />
      <Button
        accessibilityLabel="Submit Authentication Credentials"
        disabled
        label="Submit"
        onPress={() => console.log('Pushed the button')}
        outline
      />
      <Button
        accessibilityLabel="Submit Authentication Credentials"
        loading
        label="Submit"
        onPress={() => console.log('Pushed the button')}
      />
      <Button
        accessibilityLabel="Submit Authentication Credentials"
        loading
        label="Submit"
        onPress={() => console.log('Pushed the button')}
        outline
      />
    </>
  )
}

export default Credentials
