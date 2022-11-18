import Product from "../../models/Product"


export default async function getProducts(req, res) {
    const product = await Product.create(req.body)
    product.save()
    res.status(201).json({success: "Se creo el producto correctamente"})
}