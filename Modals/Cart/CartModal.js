import axios from "axios";
import Image from "next/image";
import React, { useContext } from "react";
import CartContext from "../../Context/CartContext";
import Trash from "../../Icons/Trash";
import XIcon from "../../Icons/XIcon";
import s from "../../styles/CartModal.module.css";
import { transformToDinero } from "../../utils/utils";

export default function CartModal({ open, setOpenCart }) {
  const { cart , setCart} = useContext(CartContext)

  const handleBuyProducts = async () => {
    try {
      const res = await axios.post("/mercado-pago" , { cart })
      window.location.replace(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col">

      {/* EXIT BUTTON */}
      <div className='flex items-center justify-between w-full h-10'>
          <h2 className="font-bold font-montserrat">CARRITO DE COMPRAS</h2>
          <XIcon className="w-8 h-8 cursor-pointer" onClick={()=> setOpenCart(false)}/>
      </div>
      

      <hr className="bg-slate-500 w-full my-2"/>

      <div className="flex justify-between my-1 text-xs">
        <p className="font-montserrat ">PRODUCTO</p>
        <p className="font-montserrat">SUBTOTAL</p>
      </div>

      <hr className="bg-slate-500 w-full my-2"/>

      {/* CART CONTENT */}
      
      {cart.length === 0 ? (
        <p className="text-center text-[#c09853] font-montserrat text-xs">
          EL CARRITO DE COMPRAS ESTA VACIO
        </p>
      ) : ( 
        <div className="flex flex-col w-full bg-orange-700">
          {cart.map((product , i) => (
            <div className="flex gap-2 border-b py-2" key={i}>
              <div className="">
                <Image width={90} height={90} src={Array.isArray(product.img) ? product.img[0] : product.img} className="object-cover w-6 h-6 object-center"/>
              </div>
              <div className={`${s.midle} flex flex-col gap-2`}>
                <span className="text-black text-sm font-montserrat">{product.name} <span className="text-xs">{"("}{product.color}{")"}</span></span>

                <p className="font-montserrat text-sm">{transformToDinero(product.price)}</p>
                
                <div className={s.stockInputs}>
                  <div className="border border-black cursor-pointer w-10 h-10">-</div>
                  <div className="border border-black w-10 h-10 text-xs ">{product.stock}</div>
                  <div className="border border-black cursor-pointer w-10 h-10">+</div>
                </div>
              </div>

              <div className="flex flex-1 justify-end">
                <Trash className={s.trushIcon} onClick={()=> {
                  localStorage.setItem("cart", JSON.stringify(cart.filter((item) => item._id !== product._id)))
                  setCart(cart.filter((item) => item._id !== product._id))
                }}/>
              </div>
            </div>
          ))}
          <div className={`${s.subTotal} border-b`}>
            <span className="text-black text-sm font-montserrat">Subtotal <span className="text-xs">{"("}sin envío{")"}</span></span>
            <p className="font-bold font-montserrat">{transformToDinero(cart.reduce((a, b) => a + b.price, 0))}</p>
          </div>

          <div className='w-full hover:bg-[#444] bg-black transition-all duration-300 cursor-pointer flex items-center justify-center py-2'>
              <p className='font-montserrat text-white font-extralight' onClick={()=> handleBuyProducts()}>INICIAR COMPRA</p>
          </div>
        </div>
      )}

    </div>
  );
}
