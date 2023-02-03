import Products from '../../repositories/product.repository'

export default async function stock (req, res) {
  const repository = new Products()

  switch (req.method) {
    case 'POST':
      return await repository.getStockForProduct({ req, res })
    default:
      return res.status(400).json({ error: 'Something went wrong' })
  }
}
