import React from 'react'

export default function Sizes ({ product, selectedSize, setSelectedSize, setOpen }) {
  const handleSize = (size) => {
    if (product.stock[size].quantity !== 0) {
      if (selectedSize.size === size) return setSelectedSize({ ...selectedSize, size: '' })
      return setSelectedSize({ ...selectedSize, size, _id: product.stock[size]._id })
    } else {
      setOpen(true)
    }
  }
  return (
      <>
         <h3 className="font-montserrat uppercase">Talles:</h3>
         <div className="flex gap-4 flex-wrap sm:max-w-[20rem]">
            {product.stock &&
               Object.keys(product?.stock)
                 ?.sort()
                 .map((size) => {
                   return (
                        <div
                           key={size}
                           onClick={() => handleSize(size)}
                           className={`flex ${
                              product.stock[size].quantity === 0
                              ? 'bg-gray-100'
                              : selectedSize.size === size
                              ? 'bg-black text-white'
                              : 'bg-white text-black'
                           } cursor-pointer border p-1 items-center justify-between my-2`}
                        >
                           <p className="font-montserrat uppercase">{size}</p>
                        </div>
                   )
                 })}
         </div>
      </>
  )
}
