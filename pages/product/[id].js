import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import Layout from '../../Components/Layout'
import CartContext from '../../Context/CartContext'
import s from "../../styles/ProductDetail.module.css"
import { products, transformToDinero } from "../../utils"

export default function ProductDetail() {
  const [product, setProduct] = React.useState({})
  const cart = useContext(CartContext)
  const [stock , setStock] = React.useState(0)
  const [stockError , setStockError] = React.useState(false)
  const router = useRouter()
  const { id } = router.query

  useEffect(()=> {
    if(products && id){
      setProduct(products.find(product => product.id === Number(id)))
    }
  }, [id])

  const handleChange = () => {
    if(stock > product?.stock){
      setStockError(true)
      setTimeout(()=> setStockError(false) , 3000)
      return 
    }
    setStockError(false)
    localStorage.setItem('cart', JSON.stringify(Array.from(new Set([...cart.cart, product]))))
    cart.setCart(Array.from(new Set([...cart.cart, product])))
  }

  return (
    <>
    <Head>
      <title>{product.name}</title>
      <meta name="description" content="Ojota artesanal" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <Layout home={false}>
          <div className={s.ContainerProductDetail}>
            {product && ( 
              <div className={s.containerDataOfProduct}>
                {/* IMAGE PRODUCT DETAIL */}
                <div className={s.containerImage}>
                  <img src={Array.isArray(product.img) ? product.img[0] : product.img} alt={product.alt} />
                </div>

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
                    <p className='font-montserrat text-white font-extralight' onClick={()=> handleChange()}>AGREGAR AL CARRITO</p>
                  </div>
                  <div className='h-10 max-w-[300px]'>
                    <p className={`${stockError ? "opacity-100" : "opacity-0"} text-[#c09853] text-[12px] mt-1 font-montserrat text-center transition-all duration-300`}>UY! NO TENEMOS MÁS STOCK DE ESTE PRODUCTO PARA AGREGARLO AL CARRITO.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
      </Layout>
    </>
  )
}
