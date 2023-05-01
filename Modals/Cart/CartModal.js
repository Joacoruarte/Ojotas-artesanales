/* eslint-disable multiline-ternary */
import React, { useContext } from 'react'
import CartContext from '../../Context/CartContext/CartContext'
import s from '../../styles/CartModal.module.css'
import CartCard from '../../Components/CartCard'
import HeadOfSideBars from '../../Components/HeadOfSideBars'
import Separator from '../../Components/Separator'
import { useRouter } from 'next/router'
import { handleShowSubtotal } from '../../utils/handleShowSubtotal'

export default function CartModal ({ open, setOpenCart }) {
  const { cart, setCart } = useContext(CartContext)
  const router = useRouter()

  const handleRedirectToSendForm = () => {
    router.push('/send-form')
  }

  return (
        <div className="flex flex-col h-full relative">
            {/* EXIT BUTTON */}
            <HeadOfSideBars
                title="CARRITO DE COMPRAS"
                handleClick={() => setOpenCart(false)}
            />

            <Separator className="mb-2" />

            <div className="flex justify-between my-1 text-xs">
                <p className="font-montserrat ">PRODUCTO</p>
                <p className="font-montserrat">SUBTOTAL</p>
            </div>

            <Separator className="mt-2" />

            {/* CART CONTENT */}

            {cart.length === 0 ? (
                <p className="text-center text-[#c09853] font-montserrat text-xs">
                    EL CARRITO DE COMPRAS ESTA VACIO
                </p>
            ) : (
                <div className="flex flex-col overflow-y-scroll max-h-[70vh] w-full">
                    {/* PRODUCTS IN CART ARRAY */}
                    {cart &&
                        cart?.map((product, i) => (
                            <CartCard
                                product={product}
                                cart={cart}
                                setCart={setCart}
                                key={product._id}
                                forShipmentForm
                                border={i !== cart.length - 1}
                            />
                        ))}
                </div>
            )}
            {/* SUBTOTAL */}
            <div className='absolute bottom-0 w-full'>
                <div className={`${s.subTotal} border-b border-t`}>
                    <span className="text-black text-xs font-montserrat">
                        SUBTOTAL{' '}
                        <span className="text-xs">
                            {'('}sin envío{')'}
                        </span>
                    </span>
                    <p className="font-bold font-montserrat">
                        {handleShowSubtotal(cart)}
                    </p>
                </div>

                <div onClick={() => handleRedirectToSendForm()} className="w-full hover:bg-[#444] bg-black transition-all duration-300 cursor-pointer flex items-center justify-center py-2">
                    <p
                        className="font-montserrat text-white font-extralight"

                    >
                        INICIAR COMPRA
                    </p>
                </div>
            </div>
        </div>
  )
}
