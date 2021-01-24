import base64 from 'base-64'
import dotenv from 'dotenv'

dotenv.config()

const { API_KEY, API_SECRET, SAVINGS_ID } = process.env

export const Authorization = `Basic ${base64.encode(
  `${API_KEY}:${API_SECRET}`
)}`
export const savingsId = SAVINGS_ID
