import mercadopago from 'mercadopago'
import Shipment from '../../repositories/shipment.repository'

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_SECRET_PROD
})

export default async function mercadoPago (req, res) {
  const { cart, form } = req.body

  const shipmentRepository = new Shipment()
  const productsId = cart.map((product) => product._id)

  const shipment = await shipmentRepository.createShipment({
    ...form,
    products_id: productsId
  })

  if (!shipment) return res.status(400).json({ success: false, message: 'Error al crear el envio' })

  const preference = {
    items: [],
    back_urls: {
      success: 'https://ojotasartesanal.com/success-payment',
      failure: 'https://ojotasartesanal.com/',
      pending: 'https://ojotasartesanal.com/'
    },
    auto_return: 'approved',
    notification_url: 'https://www.ojotasartesanal.com/api/payments',
    statement_descriptor: 'OJOTAS ARTESANALES',
    shipments: {
      cost: 1,
      mode: 'not_specified'
    }
  }

  cart.forEach((product) => preference.items.push({
    id: product._id,
    title: product.name,
    description: product.description + `size: ${JSON.stringify(product.stock)} `,
    picture_url: product.img[0],
    unit_price: product.price,
    quantity: parseInt(product.stock[Object.keys(product.stock)[0]]),
    shipment_id: shipment._doc._id
  }))

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.body.id)
      res.status(200).json(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error)
    })
}
