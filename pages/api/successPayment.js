import axios from "axios";
import Product from "../../models/Product.js";


export default async function succesPayment(req , res) {
    const { payment_id } = req.query
    const infoApi = await axios.get(
        "https://api.mercadopago.com/v1/payments/" + payment_id,
        {
          headers: {
            Authorization:
              `Bearer ${process.env.ACCESS_TOKEN_SECRET_PROD}`,
          },
        }
      );

    if(infoApi.data.additional_info.items){
        const productsIds = infoApi.data.additional_info.items.map((product) => product.id)
        const quantitys = infoApi.data.additional_info.items.map((p) => p.quantity);
        let products = await Product.find({ _id: { $in: productsIds } })
        products = products.map((p,i)=> {
          return {
            ...p._doc,
            quantity: quantitys[i],
          }
        })
        return res.status(200).json(products)
      }
}