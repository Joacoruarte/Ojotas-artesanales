import Image from 'next/image';
import React from 'react'
import { transformToDinero } from '../utils/utils';

export default function ProductDashboard({product}) {
  return (
    <div className='flex w-full border-b border-t py-4 border-gray-300'>
        <Image className='shadow-lg rounded-md' width={200} height={200} src={product?.img} alt={product.alt} objectFit="cover"/>

        <div className='flex w-full'>
            <ul className='flex gap-8 ml-4 font-montserrat'>
                <li className='flex flex-col gap-4'>
                    <p className='underline underline-offset-4 font-bold text-[#051e34]'>Nombre</p>
                    <p>{product.name}</p>
                </li>
                <li className='flex flex-col gap-4'>
                    <p className='underline underline-offset-4 font-bold text-[#051e34]'>Descripcion</p>
                    <p>{product.color}</p>
                </li>
                <li className='flex flex-col gap-4'>
                    <p className='underline underline-offset-4 font-bold text-[#051e34]'>Precio</p>
                    <p>{transformToDinero(product.price)}</p>
                </li>
                <li className='flex flex-col gap-4'>
                    <p className='underline underline-offset-4 font-bold text-[#051e34]'>Stock total</p>
                    <p>{product.stock}</p>
                </li>
                <li className='flex flex-col gap-4'>
                    <p className='underline underline-offset-4 font-bold text-[#051e34]'>Talles</p>
                    <p>{product.talles.join(" , ")}</p>
                </li>
            </ul>
        </div>
    </div>
  )
}
