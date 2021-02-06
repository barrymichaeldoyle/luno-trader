import base64 from 'base-64'

const { API_KEY, API_SECRET } = process.env

export const Authorization = `Basic ${base64.encode(
  `${API_KEY}:${API_SECRET}`
)}`

const options = (method: 'GET' | 'POST') => ({
  method,
  headers: { Authorization }
})

export default options
