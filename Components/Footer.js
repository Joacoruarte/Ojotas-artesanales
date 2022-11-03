import React from 'react'
import { BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className='flex justify-center items-center bg-gray-100 min-h-[10rem] w-full mt-10'>
        <div className='flex justify-around sm:flex-row flex-col sm:gap-0 gap-4 w-full items-center'>
            <div>
                <h2 className='text-2xl font-bold'>Redes sociales</h2>
                <div className='flex mt-4 sm:justify-start justify-center'>
                    <a href='https://www.instagram.com/ojotas.artesanales_/' target="blank" className='flex items-center gap-2 hover:underline transition-all duration-300'><BsInstagram/> Ojotas artesanales</a>
                </div>
            </div>
            <span>&copy; Todos los derechos reservados</span>
        </div>
    </footer>
  )
}
