import axios from 'axios'

export default async function payments (req, res) {
  const infoApi = await axios.get(
    'https://api.mercadopago.com/v1/payments/' + '57377912475',
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN_SECRET_PROD}`
      }
    }
  )

  res.status(200).json(infoApi.data)
}
