import Image from 'next/image'
import React, { useState } from 'react'
import Trash from '../Icons/Trash'
import s from "../styles/CartModal.module.css";
import { transformToDinero } from '../utils/utils';

export default function CartCard({ product , cart , setCart}) {
  const [quantity , setQuantity] = useState(Object.values(product.stock)[0])
  const addMoreStock = async ({ id }) => {
    const res = await axios.post('/api/stock' , { id , quantity})
    console.log(res.data)
  }
  return (
    <>
        {product && ( 
        <div className="flex gap-2 border-b py-2">
        <div className="">
          <Image width={90} height={90} src={product.img[0]} alt={product.alt} className="object-cover w-6 h-6 object-center"/>
        </div>
        <div className={`${s.midle} flex flex-col gap-2`}>
          <span className="text-black text-sm font-montserrat">{product.name} <span className="text-xs">{"("}{product.description}{")"}</span></span>
          <span className="text-black text-sm font-montserrat">Talle: {Object.keys(product.stock)[0]}</span>
    
          <p className="font-montserrat text-sm">{transformToDinero(product.price)}</p>
          
          <div className={s.stockInputs}>
            <div onClick={()=> addMoreStock({id: product._id})} className="border border-black cursor-pointer w-10 h-10">-</div>
            <div className="border border-black w-10 h-10 text-xs ">{quantity}</div>
            <div onClick={()=> addMoreStock({id: product._id})} className="border border-black cursor-pointer w-10 h-10">+</div>
          </div>
        </div>
    
        <div className="flex flex-1 justify-end">
          <Trash className={s.trushIcon} onClick={()=> {
            localStorage.setItem("cart", JSON.stringify(cart.filter((item) => item._id !== product._id)))
            setCart(cart.filter((item) => item._id !== product._id))
          }}/>
        </div>
      </div>
      )}
    </>
  )
}
