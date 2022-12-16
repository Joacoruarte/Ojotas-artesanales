import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../../Components/Layout'
import CartContext from '../../Context/CartContext/CartContext'
import { useGetProductDetail } from '../../hooks/useGetProductDetail'
import s from "../../styles/ProductDetail.module.css"
import { transformToDinero } from "../../utils/utils.js"
import toast, { Toaster } from 'react-hot-toast';
import {ChevronLeftIcon , ChevronRightIcon} from '@heroicons/react/20/solid'

export default function ProductDetail() {
  const cart = useContext(CartContext)
  const [stock , setStock] = React.useState(0)
  const [stockError , setStockError] = React.useState(false)
  const [cartLoading , setCartLoading] = React.useState(false)
  const rowRef = React.useRef(null)
  const router = useRouter()
  const { id } = router.query
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

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
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
                    {/* IMAGE PRODUCT DETAIL */}
                    {product?.img && (
                      <>
                        <div className={s.containerImage}>
                          <ChevronLeftIcon onClick={()=> handleClick('left')} className='opacity-0 cursor-pointer duration-200 transition-all absolute z-10 w-14 h-14 bottom-[50%]'/>
                          
                          <div ref={rowRef} className={s.carrousel}>
                            {product.img.map((img , index) => (
                              <div key={index}>
                                <Image width={400} height={400} layout='responsive' objectFit="cover" src={img} alt={product.alt} />
                              </div>
                            ))}
                          </div>
                          
                          <ChevronRightIcon onClick={()=> handleClick('right')} className='opacity-0 cursor-pointer duration-200 transition-all absolute z-10 w-14 h-14 bottom-[50%] right-0'/>
                        </div>
                        {/* <div className="sm:hidden block">
                          <div className={s.containerImage}>
                              <Image width={450} height={450} objectFit="cover" layout="intrinsic"   src={product.img[0]} alt={product.alt} />
                          </div>
                        </div> */}
                      </>
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
                      <h3 className='font-montserrat uppercase'>Talles:</h3>
                      <div className='flex gap-4 flex-wrap sm:max-w-[20rem]'>
                        {product.stock && Object.keys(product?.stock)?.sort().map(talle => { 
                          return (
                            <div key={talle} className={`flex ${product.stock[talle].quantity === 0 ? "bg-gray-100 pointer-events-none cursor-none" : "cursor-pointer"} border p-1 items-center justify-between my-2`}>
                              <p className='font-montserrat uppercase'>{talle}</p>
                            </div>
                          )
                        })}
                      </div>
                      <div className='bg-[#CCC] h-[0.5px] w-full my-4'/>

                      {/* CANTIDAD DE PRODUCTO A ELEGIR*/}
                      
                      <div className='my-2 flex flex-col'>
                        <label className='font-montserrat uppercase text-'>Cantidad</label>
                        <input placeholder='0' value={stock} type='number' onChange={({target:{value}}) => value >= 0 && setStock(value)} className="w-[6rem] mt-1 h-8 border py-4 px-2 border-[#ccc] outline-none transition-all duration-300"/>
                      </div>
                      
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
                      <div className='h-10 max-w-[300px]'>
                        <p className={`${stockError ? "opacity-100" : "opacity-0"} text-[#ac8a4f] text-[12px] mt-1 font-montserrat text-center transition-all duration-300`}>UY! NO TENEMOS MÁS STOCK DE ESTE PRODUCTO PARA AGREGARLO AL CARRITO.</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
      </Layout>
    </>
  )
}

