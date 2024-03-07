/* eslint-disable no-return-assign */
import Product from '../models/Product'
import dbConnect from '../utils/db'

class Products {
  constructor () {
    this.product = Product
  }

  async getAllProducts (res, req) {
    try {
      await dbConnect()
    } catch (error) {
      console.log('Error al conectar a la base de datos', error)
      return res.status(400).json({ error: 'Error al conectar a la base de datos' })
    }
    try {
      let products = await this.product.find({})
      // REDUCIMOS EL ARRAY DE PRODUCTOS PARA QUE NO SE REPITAN LOS PRODUCTOS CON MISMO PID Y SUMAMOS EL STOCK DE CADA PRODUCTO
      products = Object.values(products.reduce((acc, cur) => {
        if (acc[cur.pid]) {
          acc[cur.pid].stock = { ...acc[cur.pid].stock, ...cur.stock }
        } else {
          acc[cur._doc.pid] = { ...cur._doc }
        }
        return acc
      }, {}))

      return res.status(200).json({ success: true, count: products.length, data: products })
    } catch (error) {
      console.log('Error al encontrar los productos', error)
      return res.status(400).json({ error: 'No se pudo obtener los productos' })
    }
  }

  async getOneProduct (id) {
    await dbConnect()
    const product = await this.product.findById(id)
    if (product) return product?._doc
    throw new Error('No se pudo obtener el producto')
  }

  async getProductById (res, req, id) {
    await dbConnect()
    let products = {}
    const findProducts = await this.product.find({ pid: id })

    // BUSCAMOS EL PRODUCTO CON EL PID Y SUMAMOS EL STOCK DE CADA PRODUCTO
    findProducts.forEach(product => {
      products = {
        ...product._doc,
        stock: {
          ...products.stock,
          [Object.keys(product._doc.stock)[0]]: {
            quantity: product._doc.stock[[Object.keys(product._doc.stock)[0]]],
            _id: product._doc._id
          }
        }
      }
    })

    return products
  }

  async getStockForProduct ({ req, res }) {
    await dbConnect()
    const { id, quantity, op } = req.body
    const product = await this.product.findById(id)

    if (product) {
      let stock = product.stock[Object.keys(product.stock)[0]]
      stock = Number(stock)

      if (stock === 1) return res.status(400).json({ error: 'No hay mas stock disponible para este producto' })

      if (op === '+') {
        if (quantity === stock) return res.status(400).json({ error: 'No hay mas stock disponible para este producto' })
        if (quantity < stock) return res.status(200).json(true)
      } else {
        if (quantity === stock) return res.status(200).json(true)
      }
    }

    return res.status(400).json({ error: 'Something went wrong' })
  }

  async createProduct (res, req) {
    await dbConnect()
    const { stock } = req.body
    try {
      // CREAMOS UN PRODUCTO POR CADA TALLA
      Object.keys(stock).forEach(async (key) => {
        const transFormProduct = {
          ...req.body,
          pid: `${req.body.name}-${req.body.img[0].split('token=')[1]}`,
          stock: {
            [key]: stock[key]
          }
        }
        const product = await this.product.create(transFormProduct)
        product.save()
      })
      return res.status(201).json({ success: 'Se creo el producto correctamente' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: 'No se pudo crear el producto' })
    }
  }

  async updateProduct (res, req) {
    try {
      await dbConnect()
      const { pid } = req.body
      const stocks = req.body.stock

      // BUSCAMOS TODOS LOS PRODUCTOS CON EL MISMO PID
      let products = await this.product.find({ pid })

      // ACTUALIZAMOS EL STOCK DE CADA PRODUCTO
      products = products.map(p => {
        return {
          ...req.body,
          _id: p._doc._id,
          pid,
          stock: {
            [Object.keys(p._doc.stock)[0]]: stocks[Object.keys(p._doc.stock)[0]]
          }
        }
      })

      // ACTUALIZAMOS LOS PRODUCTOS
      const updatePromises = products.map((product) => {
        return this.product.findByIdAndUpdate(product._id, product)
      })

      // ESPERAMOS A QUE SE ACTUALICEN TODOS LOS PRODUCTOS
      await Promise.all(updatePromises)

      res.status(201).json({ success: 'Se actualizo el producto correctamente' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: 'No se pudo actualizar el producto' })
    }
  }

  async deleteProduct (res, req) {
    try {
      await dbConnect()
      const { pid } = req.body

      // BUSCAMOS TODOS LOS PRODUCTOS CON EL MISMO PID
      let products = await this.product.find({ pid })

      // OBTENEMOS LOS IDS DE LOS PRODUCTOS
      products = products.map(p => p._doc._id)

      // ELIMINAMOS LOS PRODUCTOS
      const deletePromises = products.map((product) => {
        return this.product.findByIdAndDelete(product)
      })

      // ESPERAMOS A QUE SE ELIMINEN TODOS LOS PRODUCTOS
      await Promise.all(deletePromises)

      res.status(201).json({ success: 'Se elimino el producto correctamente' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: 'No se pudo eliminar el producto' })
    }
  }
}

export default Products
