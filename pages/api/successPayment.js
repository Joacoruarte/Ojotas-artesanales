/* eslint-disable camelcase */
import axios from 'axios'
import Payment from '../../models/Payment.js'
import Product from '../../models/Product.js'
import dbConnect from '../../utils/db.js'

export default async function succesPayment (req, res) {
  await dbConnect()
  const { payment_id } = req.query
  const infoApi = await axios.get(
    'https://api.mercadopago.com/v1/payments/' + payment_id,
    {
      headers: {
        Authorization:
              `Bearer ${process.env.ACCESS_TOKEN_SECRET_PROD}`
      }
    }
  )

  function getSize (str) {
    // Obtener la posición del inicio del objeto después de "size:"
    const start = str.indexOf('size: ') + 5
    const end = str.indexOf('ship')
    // Obtener la parte del string que contiene el objeto
    const objStr = str.substring(start, end)
    return JSON.parse(objStr.trim())
  }

  const responseApi = infoApi.data.additional_info.items
  if (responseApi) {
    const productsIds = responseApi.map((product) => product.id)
    let products = await Product.find({ _id: { $in: productsIds } })
    const payment = await Payment.create({
      payment_id,
      product_id: productsIds
    })
    payment.save()

    products = products.map((product, i) => {
      const equals = responseApi.find((item) => item.id === product._id.toString())
      if (equals) {
        const stockObject = getSize(equals.description)
        const calc = parseInt(product.stock[Object.keys(product.stock)[0]]) - parseInt(stockObject[Object.keys(stockObject)[0]])
        const validateKey = Object.keys(product.stock)[0].split('/').join('') === Object.keys(stockObject)[0]
        return {
          ...product,
          stock: {
            ...product.stock,
            [validateKey ? Object.keys(product.stock)[0] : '']: calc < 0 ? 0 : calc
          }
        }
      }
      return { ...product }
    })
    products.forEach(async (product) => {
      try {
        await Product.findOneAndUpdate({ _id: product._doc._id }, { $set: { stock: product.stock < 0 ? 0 : product.stock } })
      } catch (err) {
        console.log(err)
      }
    })

    return res.status(200).json(responseApi)
  }
}
