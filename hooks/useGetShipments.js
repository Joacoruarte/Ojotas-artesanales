import axios from '../utils/configAxios'
import { useEffect, useState } from 'react'

export const useGetShipments = () => {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get('/api/shipments')
      .then((res) => {
        setShipments(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError(err)
        setLoading(false)
      })
  }, [])

  return { shipments, loading, error }
}
