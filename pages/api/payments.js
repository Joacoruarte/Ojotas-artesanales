// {
//   action: 'payment.created',
//   api_version: 'v1',
//   data: { id: '57377912475' },
//   date_created: '2023-04-28T01:45:42Z',
//   id: 105730299604,
//   live_mode: true,
//   type: 'payment',
//   user_id: '206833493'

import axios from 'axios'
import Shipment from '../../repositories/shipment.repository'

export default async function payments (req, res) {
  console.log('BODY ENVIADO MERCADO PAGO:', req.body)
  const { action, data } = req.body

  if (action && action === 'payment.created') {
    console.log('PAYMENT CREADO EXISTOSAMENTE, ID:', data.id)

    const infoApi = await axios.get(
      'https://api.mercadopago.com/v1/payments/' + data.id,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN_SECRET_PROD}`
        }
      }
    )

    const responseApi = infoApi.data.additional_info.items[0]
    console.log('DESCRIPCION DE UNO DE LOS PRODUCTOS', responseApi.description)
    if (responseApi) {
      const shipmentId = responseApi.description.split('shipment_id:')[1]
      console.log('SHIPMENT ID OBTENIDO:', shipmentId)
      let shipment
      try {
        shipment = await Shipment.updateStatusShipment(shipmentId)
      } catch (error) {
        console.log('HUBO UN ERROR AL ACTUALIZAR EL SHIPMENT', error)
        return res.status(400).json({ message: 'error' })
      }

      console.log('SHIPMENT CREADO Y ACTUALIZADO CORRECTAMENTE', shipment)
      return res.status(200).json({ message: 'ok' })
    }
  }
}
