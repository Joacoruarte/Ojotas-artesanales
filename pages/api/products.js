import Products from '../../repositories/product.repository'

export default async function getProducts (req, res) {
  const products = new Products()
  switch (req.method) {
    case 'GET':
      products.getAllProducts({ res, req })
      break
    case 'POST':
      products.createProduct({ res, req })
      break
    case 'PUT':
      products.updateProduct({ res, req })
      break
    case 'DELETE':
      products.deleteProduct({ res, req })
      break
    default:
      res.status(400).json({ success: false })
  }
}
