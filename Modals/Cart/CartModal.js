/* eslint-disable multiline-ternary */
import axios from '../../utils/configAxios'
import React, { useContext } from 'react'
import CartContext from '../../Context/CartContext/CartContext'
import s from '../../styles/CartModal.module.css'
import { transformToDinero } from '../../utils/utils'
import CartCard from '../../Components/CartCard'
import HeadOfSideBars from '../../Components/HeadOfSideBars'
import Separator from '../../Components/Separator'

export default function CartModal ({ open, setOpenCart }) {
  const { cart, setCart } = useContext(CartContext)

  const handleShowSubtotal = () => {
    const subtotal = cart.reduce(
      (a, b) => a + b.price * b.stock[Object.keys(b.stock)[0]],
      0
    )
    return transformToDinero(subtotal)
  }

  const handleBuyProducts = async () => {
    try {
      const res = await axios.post('/api/mercado-pago', { cart })
      window.location.replace(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className="flex flex-col">
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
                <div className="flex flex-col w-full">
                    {/* PRODUCTS IN CART ARRAY */}
                    {cart &&
                        cart?.map((product, i) => (
                            <CartCard
                                product={product}
                                cart={cart}
                                setCart={setCart}
                                key={product._id}
                            />
                        ))}
                    {/* FORM */}
                    <div className='flex flex-col gap-2'>
                        <form className="flex flex-col gap-2">
                            <p className="font-montserrat text-xs py-2 border-b">DATOS DE CONTACTO</p>
                            <div>
                                <label className='font-montserrat text-xs'>Email</label>
                                <input type="email" className={`${s.input} font-montserrat`} />
                            </div>

                            <p className="font-montserrat text-xs py-2 border-b">DATOS DE LA ENTREGA</p>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Codigo postal</label>
                                <input type="text" className={`${s.input} max-w-[100px] font-montserrat`} />
                            </div>

                            <p className="font-montserrat text-xs py-2 border-b">DATOS DEL DESTINATARIO</p>
                            <div className='flex gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-montserrat text-xs'>Nombre</label>
                                    <input type="text" className={`${s.input} font-montserrat`} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-montserrat text-xs'>Apellido</label>
                                    <input type="text" className={`${s.input} font-montserrat`} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Teléfono</label>
                                <input type="text" className={`${s.input} font-montserrat`} />
                            </div>

                            <p className="font-montserrat text-xs py-2 border-b">DATOS DEL DOMICILIO</p>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Calle</label>
                                <input type="text" className={`${s.input} font-montserrat`} />
                            </div>
                            <div className='flex gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-montserrat text-xs'>Numero</label>
                                    <input type="text" className={`${s.input} font-montserrat`} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='font-montserrat text-xs'>Piso (opcional)</label>
                                    <input type="text" className={`${s.input} font-montserrat`} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Ciudad</label>
                                <input type="text" className={`${s.input} font-montserrat`} />
                            </div>

                            <p className="font-montserrat text-xs py-2 border-b">DATOS DE FACTURACION</p>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>DNI o CUIL</label>
                                <input type="text" className={`${s.input} font-montserrat`} />
                            </div>
                        </form>
                    </div>
                    {/* SUBTOTAL */}
                    <div className={`${s.subTotal} border-b`}>
                        <span className="text-black text-xs font-montserrat">
                            SUBTOTAL{' '}
                            <span className="text-xs">
                                {'('}sin envío{')'}
                            </span>
                        </span>
                        <p className="font-bold font-montserrat">
                            {handleShowSubtotal()}
                        </p>
                    </div>

                    <div className="w-full hover:bg-[#444] bg-black transition-all duration-300 cursor-pointer flex items-center justify-center py-2">
                        <p
                            className="font-montserrat text-white font-extralight"
                            onClick={() => handleBuyProducts()}
                        >
                            INICIAR COMPRA
                        </p>
                    </div>
                </div>
            )}
        </div>
  )
}
