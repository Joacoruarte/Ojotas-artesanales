import axios from '../utils/configAxios'
import { useEffect, useState } from 'react'

export const useGetShipments = () => {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const secure = process.env.NODE_ENV === 'production' ? 's' : ''
  const regex = /^https?:\/\/([^\/]+)/
  const host = window.location.href.match(regex)?.[1]
  const baseURL = `http${secure}://${host}`

  useEffect(() => {
    const getShipments = () => {
      setLoading(true)
      axios(baseURL).get('/api/shipments')
        .then((res) => {
          setShipments(res.data.data)
        })
        .catch((err) => {
          console.log(err)
          setError(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    getShipments()
  }, [])

  return { shipments, loading, error }
}
