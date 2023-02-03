import Products from '../../../repositories/product.repository'

export default async function getProduct (req, res) {
  const { id } = req.query
  const product = await new Products().getProductById(req, res, id)
  return res.status(200).json(product)
}
