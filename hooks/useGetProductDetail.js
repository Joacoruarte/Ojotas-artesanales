import axios from '../utils/configAxios'
import { useEffect, useState } from 'react'

export const useGetProductDetail = (id) => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (id) {
      const secure = process.env.NODE_ENV === 'production' ? 's' : ''
      const regex = /^https?:\/\/([^\/]+)/
      const host = window.location.href.match(regex)?.[1]
      const baseURL = `http${secure}://${host}`
      setLoading(true)
      axios(baseURL)
        .get(`/api/product/${id}`)
        .then((product) => {
          console.log(product.data)
          setProduct(product.data)
          setLoading(false)
        })
        .catch(() => {
          setError(true)
          setLoading(false)
        })
    }
  }, [id])

  return { product, loading, error }
}
