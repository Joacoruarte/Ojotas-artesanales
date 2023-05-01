import React, { useContext } from 'react'
import CartContext from '../Context/CartContext/CartContext'
import CartCard from './CartCard'
import { handleShowSubtotal } from '../utils/handleShowSubtotal'

export default function YourShipment () {
  const { cart, setCart } = useContext(CartContext)
  return (
        <div className="flex flex-col gap-4 font-montserrat">
            <h3 className="text-center font-sans">TU PEDIDO</h3>

            <div className="flex flex-col gap-4 bg-white w-full p-4">
                <h3 className="border-b ">PRODUCTO{cart?.length > 1 && 'S'}</h3>
                {cart &&
                    cart?.map((product, i) => (
                        <CartCard
                            product={product}
                            cart={cart}
                            setCart={setCart}
                            key={product._id}
                            border={i !== cart.length - 1}
                        />
                    ))}

                <div className='flex justify-between items-center py-4 border-t border-b'>
                        <p>TOTAL</p>
                        <p>{handleShowSubtotal(cart)}</p>
                </div>
                <button
                    type="submit"
                    className="sm:w-full hover:bg-[#444] bg-black transition-all duration-300 cursor-pointer flex items-center justify-center py-2"
                >
                    <p className="font-montserrat text-white font-extralight">
                        PAGAR
                    </p>
                </button>
            </div>
        </div>
  )
}
