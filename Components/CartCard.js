import Image from 'next/image'
import React, { useState } from 'react'
import Trash from '../Icons/Trash'
import s from '../styles/CartModal.module.css'
import { transformToDinero } from '../utils/utils'
import { useGetStock } from '../hooks/useGetStock'
import Loading from './Loading'

export default function CartCard ({ product, cart, setCart }) {
  const [quantity, setQuantity] = useState(product.stock[Object.keys(product.stock)[0]])
  const { getStock, error, loading } = useGetStock()

  const addMoreStock = async ({ id, op }) => {
    // eslint-disable-next-line eqeqeq
    if (op === '-' && quantity == 1) return
    const response = await getStock({ id, quantity, op })
    if (response) {
      if (op === '+') {
        const updateStockProduct = cart.map((product) => {
          if (product._id === id) {
            return { ...product, stock: { [Object.keys(product.stock)[0]]: quantity + 1 } }
          }
          return product
        })
        localStorage.setItem('cart', JSON.stringify(updateStockProduct))
        setQuantity(Number(quantity) + 1)
        setCart(updateStockProduct)
      } else {
        const updateStockProduct = cart.map((product) => {
          if (product._id === id) {
            return { ...product, stock: { [Object.keys(product.stock)[0]]: quantity - 1 } }
          }
          return product
        })
        localStorage.setItem('cart', JSON.stringify(updateStockProduct))
        setCart(updateStockProduct)
        setQuantity(Number(quantity) - 1)
      }
    }
  }
  return (
    <div className='flex flex-col border-b'>
        {loading && (
          <div className='bg-slate-600 absolute top-0 right-0 h-screen w-[25rem] bg-opacity-20 z-[100000]'>
              <Loading/>
          </div>
        )}
        {product && (
          <div className="flex gap-2  py-2">
              <div>
                    <Image width={90} height={90} src={product.img[0]} alt={product.alt} className="object-cover w-6 h-6 object-center"/>
              </div>
              <div className={`${s.midle} flex flex-col gap-2`}>
                    <span className="text-black text-sm font-montserrat">{product.name} <span className="text-xs">{'('}{product.description}{')'}</span></span>
                    <span className="text-black text-sm font-montserrat">Talle: {Object.keys(product.stock)[0]}</span>

                    <p className="font-montserrat text-sm">{transformToDinero(product.price)}</p>

                    <div className={s.stockInputs}>
                          <div onClick={() => addMoreStock({ id: product._id, op: '-' })} className="border border-black cursor-pointer w-10 h-10">-</div>
                          <div className="border border-black w-10 h-10 text-xs ">{quantity}</div>
                          <div onClick={() => addMoreStock({ id: product._id, op: '+' })} className="border border-black cursor-pointer w-10 h-10">+</div>
                    </div>

              </div>

              <div className="flex flex-1 justify-end">
                    <Trash className={s.trushIcon} onClick={() => {
                      localStorage.setItem('cart', JSON.stringify(cart.filter((item) => item._id !== product._id)))
                      setCart(cart.filter((item) => item._id !== product._id))
                    }}/>
              </div>

        </div>
        )}
      {error?.length > 0
        ? (
      <div className=''>
        <p className='text-[#ac8a4f] font-montserrat whitespace-nowrap text-[14px]'>{error}</p>
      </div>
          )
        : null}
    </div>
  )
}
