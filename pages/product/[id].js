import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Layout from '../../Components/Layout'
import CartContext from '../../Context/CartContext/CartContext'
import { useGetProductDetail } from '../../hooks/useGetProductDetail'
import s from "../../styles/ProductDetail.module.css"
import { transformToDinero } from "../../utils/utils.js"
import toast, { Toaster } from 'react-hot-toast';
import Carousel from '../../Components/Carousel'
import Sizes from '../../Components/Sizes'
import WhatsAppModal from '../../Modals/WhatsApp/WhatsAppModal'

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const cart = useContext(CartContext)
  const [stock , setStock] = useState(0)
  const [stockError , setStockError] = useState(false)
  const [open, setOpen] = useState(false);
  const [cartLoading , setCartLoading] = useState(false)
  const [selectedSize, setSelectedSize] = useState(0);
  const { loading , product } = useGetProductDetail(id)

  const handleChange = async () => {
    if(stock === 0) return
    try {
      setCartLoading(true)
      const res = await axios.post("/api/stock", {id})
      setCartLoading(false)
      if(stock > Number(res.data.stock)){
        setStockError(true)
        setTimeout(()=> setStockError(false) , 3000)
        return
      }else{
        if(cart.cart.find(item => item._id === id)){
          return toast.success("Ya tienes este producto en el carrito")
        }
        localStorage.setItem("cart", JSON.stringify(Array.from(new Set([...cart.cart , {...product , stock: stock}].map(JSON.stringify))).map(JSON.parse)))
        cart.setCart(Array.from(new Set([...cart.cart , {...product , stock: res.data.stock}].map(JSON.stringify))).map(JSON.parse))
        toast.success("Agregaste este producto al carrito")
      }
    } catch (error) {
      setStockError(true)
      setCartLoading(false)
      setTimeout(()=> setStockError(false) , 3000)
      return 
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
          <Toaster 
            position="top-center"
          />
          <div className={s.ContainerProductDetail}>
            {loading ? (
              <div className='w-full flex flex-col justify-center items-center h-[60vh]'>
                <div className={s.lds_ring}><div></div><div></div><div></div><div></div></div>
              </div>
            ) : ( 
              <div className={s.containerDataOfProduct}>
                {product && (
                  <>
                    {/* CAROUSEL DE IMAGENES */}
                    {product?.img && (
                      <Carousel product={product}/>
                    )}

                    {/* DESCRIPTION PRODUCT DETAIL */}
                    <div className={s.containerRightProduct}>
                      <h2 className='font-montserrat font-normal text-[1.5rem]'>{product?.name}</h2>
                      <p className='font-extrabold text-[2rem] font-montserrat'>{transformToDinero(product?.price)}</p>
                      <span className='font-montserrat uppercase'><b>24</b> cuotas de <b>$726,23</b></span>
                      
                      <hr className='bg-[#CCC] w-full my-4'/>
                      
                      <h3 className='font-montserrat uppercase'>Color: <span className='font-bold'>{product?.description}</span></h3>
       
                      <div className='bg-[#CCC] h-[0.5px] w-full my-4'/>

                      {/* TALLES */}
                      {product.stock && (
                        <Sizes 
                          product={product} 
                          selectedSize={selectedSize} 
                          setSelectedSize={setSelectedSize}
                          setOpen={setOpen}
                        />
                      )}                      

                      <div className='bg-[#CCC] h-[0.5px] w-full my-4'/>

                      {/* CANTIDAD DE PRODUCTO A ELEGIR*/}
                      <div className='my-2 flex flex-col'>
                        <label className='font-montserrat uppercase text-'>Cantidad</label>
                        <input placeholder='0' value={stock} type='number' onChange={({target:{value}}) => value >= 0 && setStock(value)} className="w-[6rem] mt-1 h-8 border py-4 px-2 border-[#ccc] outline-none transition-all duration-300"/>
                      </div>
                      
                      {/* BOTON AGEGAR AL CARRITO */}
                      <div className='w-full hover:bg-[#444] bg-black transition-all duration-300 cursor-pointer flex items-center justify-center py-2'>
                        <p className='font-montserrat flex text-white font-extralight' onClick={()=> handleChange()}>AGREGAR AL CARRITO 
                        </p>
                        {cartLoading && <div className={`${s.lds_ring_small}`}>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>}
                      </div>

                      {/* ERROR STOCK */}
                      <div className='h-10 max-w-[300px]'>
                        <p className={`${stockError ? "opacity-100" : "opacity-0"} text-[#ac8a4f] text-[12px] mt-1 font-montserrat text-center transition-all duration-300`}>UY! NO TENEMOS MÁS STOCK DE ESTE PRODUCTO PARA AGREGARLO AL CARRITO.</p>
                      </div>

                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        <WhatsAppModal open={open} setOpen={setOpen}/>
      </Layout>
    </>
  )
}

