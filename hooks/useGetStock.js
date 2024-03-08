import axios from '../utils/configAxios'
import { useState } from 'react'

export const useGetStock = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const secure = process.env.NODE_ENV === 'production' ? 's' : ''
  const regex = /^https?:\/\/([^\/]+)/
  const host = window.location.href.match(regex)?.[1]
  const baseURL = `http${secure}://${host}`

  const getStock = async ({ id, quantity, op }) => {
    try {
      setLoading(true)
      const res = await axios(baseURL).post('/api/stock', { id, quantity: Number(quantity), op })
      setLoading(false)
      return res.data
    } catch (error) {
      setLoading(false)
      setError(error.response.data.error)
      setTimeout(() => setError(''), 2000)
    }
  }

  return { getStock, loading, error }
}
