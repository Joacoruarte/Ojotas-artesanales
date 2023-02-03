import React, { useEffect, useState } from 'react'
import CartContext from './CartContext'

export default function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cartStorage = localStorage.getItem('cart')
      if (cartStorage) {
        setCart(JSON.parse(cartStorage))
      } else {
        localStorage.setItem('cart', JSON.stringify([]))
      }
    }
  }, [])

  return (
    <CartContext.Provider value={{
      cart,
      setCart
    }}>
        {children}
    </CartContext.Provider>
  )
}
