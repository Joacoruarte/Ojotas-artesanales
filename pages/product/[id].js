import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Layout from '../../Components/Layout'
import CartContext from '../../Context/CartContext'
import { useGetProductDetail } from '../../hooks/useGetProductDetail'
import s from "../../styles/ProductDetail.module.css"
import { transformToDinero } from "../../utils/utils.js"
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetail() {
  const cart = useContext(CartContext)
  const [stock , setStock] = React.useState(0)
  const [stockError , setStockError] = React.useState(false)
  const [cartLoading , setCartLoading] = React.useState(false)
  const router = useRouter()
  const { id } = router.query
  const { loading , product } = useGetProductDetail(id)


  const handleChange = async () => {
    if(stock === 0) return
    try {
      setCartLoading(true)
      const res = await axios.post("/stock", {id})
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
      <title>{product.name}</title>
      <meta name="description" content="Ojota artesanal" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Layout home={false}>
          <Toaster 
            position="top-right"
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
                    {product.img && (
                      <>
                        <div className="sm:block hidden">
                          <div className={s.containerImage}>
                            <Image width={500} height={500} objectFit="cover" layout="responsive" src={product.img} alt={product.alt} />
                          </div>
                        </div>
                        <div className="sm:hidden block">
                          <div className={s.containerImage}>
                              <Image width={450} height={450} objectFit="cover" layout="intrinsic"   src={product.img} alt={product.alt} />
                          </div>
                        </div>
                      </>
                    )}
                    {/* DESCRIPTION PRODUCT DETAIL */}
                    <div className={s.containerRightProduct}>
                      <h2 className='font-montserrat font-normal text-[1.5rem]'>{product?.name}</h2>
                      <p className='font-extrabold text-[2rem] font-montserrat'>{transformToDinero(product?.price)}</p>
                      <span className='font-montserrat uppercase'><b>24</b> cuotas de <b>$726,23</b></span>
                      <hr className='bg-[#CCC] w-full my-4'/>
                      <h3 className='font-montserrat uppercase'>Color: <span className='font-bold'>{product?.color}</span></h3>
                      <div className='bg-[#CCC] h-[0.5px] w-full my-4'/>

                      {/* CANTIDAD DE PRODUCTO */}

                      <div className='my-2 flex flex-col'>
                        <label className='font-montserrat uppercase text-'>Cantidad</label>
                        <input placeholder='0' type='number' onChange={(e) => setStock(e.target.value)} className="w-[6rem] mt-1 h-8 focus:ring-lime-500 focus:shadow-md transition-all duration-300"/>
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

