import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import Layout from '../Components/Layout'
import Image from 'next/image';
import { transformToDinero } from '../utils/utils';
import s from "../styles/success-payment.module.css"
import CartContext from '../Context/CartContext/CartContext';

export default function SuccessPayment() {
  const router = useRouter();
  const { setCart } = useContext(CartContext)
  const payment_id =  router.query.payment_id
  const [products , setProducts] = React.useState([])
  const [loading , setLoading] = React.useState(true)
  useEffect(()=> {
    if(payment_id){
        setLoading(true)
        axios.get(`/api/successPayment?payment_id=${payment_id}`)
        .then(res => {
            if(res.data) {
                localStorage.removeItem("cart")
                setCart([])
            }
            setProducts(res.data)
            setLoading(false)
        }).catch(err => {
            console.log(err)
        })
    }
  }, [payment_id , setCart])
  return (
    <Layout>
        {
            loading ? (
                <div className='w-full flex flex-col justify-center items-center h-[60vh]'>
                    <div className={s.lds_ring}><div></div><div></div><div></div><div></div></div>
                </div>
            ):(
            <div className='flex max-w-[34rem] mx-auto justify-center items-center flex-col h-full'>
                <h1 className='font-montserrat text-[1.5rem]'>¡Felcidades su compra se acredito con exito!</h1>

                <div className=''>
                    <p className='font-montserrat text-left'>Estamos gestionando el envio para lo que recibas lo antes posible</p>
                    <p className='font-montserrat text-left'>Resumen de la compra:</p>
                </div>
                <div className='w-full px-4'>
                    {products.length > 0 && products.map((product , i) => (
                        <div className="flex gap-2 border-b py-2" key={i}>
                            <div className="">
                                <Image width={90} height={90} alt={product.alt} src={Array.isArray(product.img) ? product.img[0] : product.img} className="object-cover w-6 h-6 object-center"/>
                            </div>
                            <div className={`w-[10rem] flex flex-col gap-2`}>
                            <span className="text-black text-sm font-montserrat">{product.name} <span className="text-xs">{"("}{product.color}{")"}</span></span>

                            <p className="font-montserrat text-sm">{transformToDinero(product.price)}</p>
                            
                            <p className="w-10 h-10 text-xs ">Cantidad:{product.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`mt-4`}>
                    <h2 className='font-montserrat font-bold '>Total: {transformToDinero(products.reduce((a, b) => a + b.price, 0))}</h2>
                </div>
            </div>
            )
        }
    </Layout>
  )
}
