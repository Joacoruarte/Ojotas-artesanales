import Products from '../../../../../repositories/product.repository'
import Shipment from '../../../../../repositories/shipment.repository'

export default async function shipmentsProducts (req, res) {
  const shipmentRepository = new Shipment()
  const productsRepository = new Products()
  const shipment = await shipmentRepository.getShipment(req.query.id)

  const products = shipment.products_id.map(async (productId) => {
    return await productsRepository.getOneProduct(productId)
  })

  const productsData = await Promise.all(products)

  return res.status(200).json(productsData)
}
