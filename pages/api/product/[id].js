import Product from "../../../models/Product";

export default async function getProduct(req, res) {
    const { id } = req.query
    const product = await Product.findById(id)
    res.status(200).json(product)
  }