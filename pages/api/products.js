import dbConnect from "../../utils/db"
import Product from "../../models/Product.js"

export default async function getProducts(req, res) {
    await dbConnect()

    const products = await Product.find({})
    res.status(200).json({ success: true, count: products.length , data: products })
}