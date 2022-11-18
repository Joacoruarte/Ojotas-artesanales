import Product from "../../models/Product"
import { dbConnect } from "../../utils/db"

dbConnect()

export default async function getProducts(req, res) {
    const product = await Product.create(req.body)
    product.save()
    res.status(201).json({success: "Se creo el producto correctamente"})
}