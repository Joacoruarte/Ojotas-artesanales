import axios from '../utils/configAxios'
import { useEffect, useState } from 'react'

export const useGetProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const secure = process.env.NODE_ENV === 'production' ? 's' : ''
  const regex = /^https?:\/\/([^\/]+)/
  const host = window.location.href.match(regex)?.[1]
  const baseURL = `http${secure}://${host}`

  useEffect(() => {
    setLoading(true)
    axios(baseURL)
      .get('/api/products')
      .then((products) => {
        setProducts(products.data.data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const refetch = () => {
    setLoading(true)
    axios(baseURL)
      .get('/api/products')
      .then((products) => {
        setProducts(products.data.data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }

  return { products, loading, error, refetch }
}
