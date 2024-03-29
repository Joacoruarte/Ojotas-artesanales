/* eslint-disable multiline-ternary */
/* eslint-disable camelcase */
import axios from '../utils/configAxios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import Layout from '../Components/Layout'
import { transformNumberForRender } from '../utils/utils'
import s from '../styles/success-payment.module.css'
import CartContext from '../Context/CartContext/CartContext'
import SuccesPaymentCard from '../Components/SuccesPaymentCard'

export default function SuccessPayment () {
  const router = useRouter()
  const { setCart } = useContext(CartContext)
  const payment_id = router.query.payment_id
  const [products, setProducts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const secure = process.env.NODE_ENV === 'production' ? 's' : ''
    const regex = /^https?:\/\/([^\/]+)/
    const host = window.location.href.match(regex)?.[1]
    const baseURL = `http${secure}://${host}`
    if (payment_id) {
      setLoading(true)
      axios(baseURL)
        .get(`/api/successPayment?payment_id=${payment_id}`)
        .then((res) => {
          if (res.data) {
            localStorage.removeItem('cart')
            setCart([])
          }
          setProducts(res.data)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [payment_id, setCart])
  return (
        <Layout>
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
                <div className="flex max-w-[34rem] mx-auto justify-center items-center flex-col h-full">
                    <h1 className="font-montserrat text-[1.5rem]">
                        ¡Felicidades, su compra se acreditó con éxito.!
                    </h1>

                    <h2 className="font-montserrat w-full text-center">
                        Estamos gestionando el envío para que lo recibas lo
                        antes posible.
                    </h2>

                    <h3 className="font-montserrat text-left my-4 w-full">
                        Resumen de la compra:
                    </h3>
                    <div className="w-full px-4">
                        {/* COMPONETIZAR */}
                        {products.length > 0 &&
                            products.map((product) => (
                                <SuccesPaymentCard
                                    product={product}
                                    key={product.id}
                                />
                            ))}
                    </div>

                    <div className={'mt-4'}>
                        <h2 className="font-montserrat font-bold ">
                            Total:{' '}
                            ${transformNumberForRender(
                          products.reduce(
                            (a, b) => a + b.unit_price * b.quantity,
                            0
                          )
                        )}
                        </h2>
                    </div>
                </div>
            )}
        </Layout>
  )
}
