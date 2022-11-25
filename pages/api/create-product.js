import Product from "../../models/Product"
import { dbConnect } from "../../utils/db"

dbConnect()

export default async function getProducts(req, res) {

    switch (req.method) {
        case "POST":
            const product = await Product.create(req.body)
            product.save()
            res.status(201).json({success: "Se creo el producto correctamente"})
            break;
        case "PUT":
            const { _id } = req.body
            const productUpdate = await Product.findByIdAndUpdate(_id, req.body)
            productUpdate.save()
            res.status(201).json({success: "Se actualizo el producto correctamente"})
            break;
        default:
            res.status(400).json({ success: false });
    }

}