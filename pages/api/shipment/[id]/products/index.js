import Products from '../../../../../repositories/product.repository'
import Shipment from '../../../../../repositories/shipment.repository'

export default async function shipmentsProducts (req, res) {
  const shipmentRepository = new Shipment()
  const productsRepository = new Products()
  const shipment = await shipmentRepository.getShipment(req.query.id)

  const products = shipment.products_id.map(async (productId) => {
    try {
      return await productsRepository.getOneProduct(productId)
    } catch (error) {
      return null
    }
  })

  const productsData = await Promise.all(products)

  // Buscamos si hay productos que no se encontraron en la base de datos
  const notFoundProducts = productsData.filter((product) => !product)

  // Si hay productos que no se encontraron, enviamos un error 404
  if (notFoundProducts.length > 0) {
    return res.status(400).json({ message: 'No se encontraron algunos productos' })
  }

  return res.status(200).json(productsData)
}
