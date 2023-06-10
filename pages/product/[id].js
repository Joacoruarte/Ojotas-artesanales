/* eslint-disable multiline-ternary */
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Layout from '../../Components/Layout'
import CartContext from '../../Context/CartContext/CartContext'
import { useGetProductDetail } from '../../hooks/useGetProductDetail'
import s from '../../styles/ProductDetail.module.css'
// import { transformNumberForRender } from '../../utils/utils.js'
import toast, { Toaster } from 'react-hot-toast'
import Carousel from '../../Components/Carousel'
import Sizes from '../../Components/Sizes'
import WhatsAppModal from '../../Modals/WhatsApp/WhatsAppModal'

export default function ProductDetail () {
  const router = useRouter()
  const { id } = router.query
  const shoppingCart = useContext(CartContext)
  const [stockError, setStockError] = useState(false)
  const [open, setOpen] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState({
    size: '',
    stock: 0,
    _id: ''
  })
  const { loading, product } = useGetProductDetail(id)

  const handleChange = async () => {
    if (selectedSize.stock === 0) return
    try {
      setCartLoading(true)
      if (selectedSize.stock > product.stock[selectedSize.size].quantity) {
        setStockError(true)
        setCartLoading(false)
        setTimeout(() => setStockError(false), 3000)
        return
      } else {
        if (shoppingCart.cart.find((item) => item?._id === selectedSize._id)) {
          setCartLoading(false)
          return toast.success('Ya tienes este producto en el carrito')
        }
        localStorage.setItem(
          'cart',
          JSON.stringify([
            ...shoppingCart.cart,
            {
              ...product,
              _id: selectedSize._id,
              stock: { [selectedSize.size]: selectedSize.stock }
            }
          ])
        )
        shoppingCart.setCart([
          ...shoppingCart.cart,
          {
            ...product,
            _id: selectedSize._id,
            stock: { [selectedSize.size]: selectedSize.stock }
          }
        ])
        setCartLoading(false)
        toast.success('Agregaste este producto al carrito')
      }
    } catch (error) {
      setStockError(true)
      setCartLoading(false)
      setTimeout(() => setStockError(false), 3000)
    }
  }
  return (
    <>
      <Head>
        <title>{product?.name}</title>
        <meta name="description" content="Ojota artesanal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout home={false}>
        <Toaster position="top-center" />
        <div className={s.ContainerProductDetail}>
          {loading ? (
            <div className="w-full flex flex-col justify-center items-center h-[60vh]">
              <div className={s.lds_ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className={s.containerDataOfProduct}>
              {Object.keys(product).length > 0 && (
                <>
                  {/* CAROUSEL DE IMAGENES */}
                  {product?.img && (
                    <Carousel product={product} interval={5000} />
                  )}

                  {/* DESCRIPTION PRODUCT DETAIL */}
                  <div className={s.containerRightProduct}>
                    <h2 className="font-montserrat font-normal text-[1.5rem]">
                      {product?.name}
                    </h2>
                    {/* <p className="font-extrabold text-[2rem] font-montserrat">
                      ${transformNumberForRender(product?.price)}
                    </p> */}
                    {/* <span className="font-montserrat uppercase">
                      <b>24</b> cuotas de <b>$726,23</b>
                    </span> */}

                    <hr className="bg-[#CCC] w-full my-4" />

                    <h3 className="font-montserrat uppercase">
                      Color:{' '}
                      <span className="font-bold">{product?.description}</span>
                    </h3>

                    <div className="bg-[#CCC] h-[0.5px] w-full my-4" />

                    {/* TALLES */}
                    {product.stock && (
                      <Sizes
                        product={product}
                        selectedSize={selectedSize}
                        setSelectedSize={setSelectedSize}
                        setOpen={setOpen}
                      />
                    )}
                    {selectedSize.size !== '' && (
                      <p className="font-montserrat">
                        Disponibilidad:{' '}
                        <b className="font-sans">
                          {product.stock[selectedSize.size].quantity}
                        </b>
                      </p>
                    )}
                    <div className="bg-[#CCC] h-[0.5px] w-full my-4" />

                    {/* CANTIDAD DE PRODUCTO A ELEGIR */}
                    <div className="my-2 flex flex-col">
                      <label className="font-montserrat uppercase text-">
                        Cantidad
                      </label>
                      <input
                        placeholder="0"
                        value={selectedSize.stock}
                        type="number"
                        onChange={({ target: { value } }) =>
                          value >= 0 &&
                          setSelectedSize({
                            ...selectedSize,
                            stock: value
                          })
                        }
                        className="w-[6rem] mt-1 h-8 border py-4 px-2 border-[#ccc] outline-none transition-all duration-300"
                      />
                    </div>

                    {/* BOTON AGEGAR AL CARRITO */}
                      <button
                        disabled={Number(selectedSize.stock) === 0 || selectedSize.size === ''}
                        className={'w-full bg-black hover:bg-[#444] disabled:bg-[#71717E] disabled:pointer-events-none disabled:cursor-none text-white font-montserrat transition-all duration-300 cursor-pointer flex items-center justify-center py-2'}
                        onClick={() => handleChange()}
                      >
                        AGREGAR AL CARRITO
                        {cartLoading && (
                        <div className={`${s.lds_ring_small}`}>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                        )}
                      </button>

                    {/* ERROR STOCK */}
                    <div className="h-10 max-w-[300px]">
                      <p
                        className={`${
                          stockError ? 'opacity-100' : 'opacity-0'
                        } text-[#ac8a4f] text-[12px] mt-1 font-montserrat text-center transition-all duration-300`}
                      >
                        UY! NO TENEMOS MÁS STOCK DE ESTE PRODUCTO PARA AGREGARLO
                        AL CARRITO.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <WhatsAppModal open={open} setOpen={setOpen} />
      </Layout>
    </>
  )
}
