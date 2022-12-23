import Product from "../models/Product";
import dbConnect from "../utils/db";

class Products {
    constructor() {
        this.product = Product;
    }

    async getAllProducts(res , req) {
        await dbConnect();
        let hash = {};
        let products = await this.product.find({})
        products = products.filter(o => hash[o.pid] ? false : hash[o.pid] = true);
        return res.status(200).json({ success: true, count: products.length , data: products })    
    }

    async getProductById(res , req , id) {
        await dbConnect();
        let products = {}
        let findProducts = await this.product.find({ pid: id });

        findProducts.forEach(product => { 
            products = {
                ...product._doc,
                stock: {
                    ...products.stock,
                    [Object.keys(product._doc.stock)[0]]:  {
                        quantity: product._doc.stock[[Object.keys(product._doc.stock)[0]]],
                        _id: product._doc._id
                    },
                }
            }
        })

        return products
    }

    async getStockForProduct(res , req) { 
        await dbConnect()
        const { id , quantity } = req.body
        const product = await this.product.findById(id)

        if(product){
            const stock = product.stock[Object.keys(product.stock)[0]]
            if(quantity < stock){
                return res.status(200).json(true)
            }else{
                return res.status(400).json(false)
            }
        }

        return res.status(400).json({ error: 'Something went wrong'})
    }

    async createProduct(res , req) {
        await dbConnect();
        const { stock } = req.body
        try {
            Object.keys(stock).forEach(async(key) => {
                let transFormProduct = {
                    ...req.body,
                    pid: `${req.body.name}-${req.body.img[0].split('token=')[1]}`,
                    stock: {
                        [key]: stock[key] 
                    }
                }
                console.log(transFormProduct)
                let product = await this.product.create(transFormProduct)
                product.save()
            })
            return res.status(201).json({success: "Se creo el producto correctamente"})
        } catch (error) {
           console.log(error)
           return res.status(400).json({success: "No se pudo crear el producto"})
        }
    }

    async updateProduct(res , req) {
        await dbConnect();
        const { _id } = req.body
        const productUpdate = await this.product.findByIdAndUpdate(_id, req.body)
        productUpdate.save()
        res.status(201).json({success: "Se actualizo el producto correctamente"})
    }

    async deleteProduct(res , req) {
        await dbConnect();
        const productDelete = await this.product.findByIdAndDelete(req.body._id)
        productDelete.save()
        res.status(201).json({success: "Se elimino el producto correctamente"})
    }
}

export default Products;

