import Products from '../../../../../repositories/product.repository'
import Shipment from '../../../../../repositories/shipment.repository'

export default async function shipmentsProducts (req, res) {
  const shipmentRepository = new Shipment()
  const productsRepository = new Products()
  const shipment = await shipmentRepository.getShipment(req.query.id)

  const products = shipment.products.map(async (productId) => {
    try {
      const product = await productsRepository.getOneProduct({ id: productId.id })
      return {
        ...product,
        stock: {
          [Object.keys(product.stock)[0]]: productId.quantity
        }
      }
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
