import axios from '../utils/configAxios'
import { useEffect, useState } from 'react'

export const useGetProductDetail = (id) => {
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      axios
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
