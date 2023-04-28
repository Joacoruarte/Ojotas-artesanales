import axios from 'axios'
import Shipment from '../../repositories/shipment.repository'

export default async function payments (req, res) {
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
    if (responseApi) {
      const shipmentId = responseApi.description.split('shipment_id:')[1]
      console.log('SHIPMENT ID OBTENIDO:', shipmentId)
      const shipmentRepository = new Shipment()
      let shipment
      try {
        shipment = await shipmentRepository.updateStatusShipment(
          shipmentId
        )
      } catch (error) {
        return res.status(400).json({ message: 'error' })
      }

      console.log(
        'SHIPMENT CREADO Y ACTUALIZADO CORRECTAMENTE',
        shipment
      )
      return res.status(200).json({ message: 'ok' })
    }
  }
}
