import { dbConnect } from "../../utils/db"
import Product from "../../models/Product.js"

dbConnect()

export default async function getProducts(req, res) {
    console.log("ENVIROMENT", process.env.MONGODB_URI);
    const products = await Product.find({})
    res.status(200).json({ success: true, count: products.length , data: products })
}