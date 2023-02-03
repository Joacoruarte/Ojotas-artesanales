import axios from '../utils/configAxios'
import { useEffect, useState } from 'react'

export const useGetProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
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
    axios
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
