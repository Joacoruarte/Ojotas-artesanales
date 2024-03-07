import Products from '../../../repositories/product.repository'

export default async function getProduct (req, res) {
  const { id } = req.query
  return await new Products().getProductById({ req, res, id })
}
