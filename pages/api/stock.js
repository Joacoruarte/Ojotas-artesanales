import Product from "../../models/Product";

export default async function stock(req, res) {
    const { id } = req.body;
    const product = await Product.findById(id);
    if(product && product.stock > 0){
        return res.status(200).json({success: true , stock: product.stock})
    }else{
        return res.status(400).json({success: false , stock: 0})
    }
}
