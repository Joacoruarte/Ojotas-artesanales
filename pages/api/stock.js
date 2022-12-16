import Products from "../../repositories/product.repository";

export default async function stock(req, res) {
    const repository = new Products()
    const product = await repository.getProductById(req , res)
    
    if(product && product.stock > 0){
        return res.status(200).json({success: true , stock: product.stock})
    }else{
        return res.status(400).json({success: false , stock: 0})
    }
}
