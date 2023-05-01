import React from 'react'
import { BsInstagram } from 'react-icons/bs'

export default function Footer () {
  const date = new Date().getFullYear()
  return (
    <footer className='absolute border-t bottom-0 bg-slate-50 flex flex-col justify-center min-h-[10rem] w-full'>
        <div className='flex flex-col justify-center h-24 gap-4 w-full items-center'>
            <div className='flex items-center gap-2'>
                <h2 className='text-2xl font-bold underline underline-offset-4'>Redes sociales</h2>
            </div>
            <div className='flex sm:justify-start justify-center'>
                <a href='https://www.instagram.com/ojotas_artesanaless/' target="blank" className='flex items-center gap-2 hover:underline transition-all duration-300'><BsInstagram/>ojotas.artesanales_</a>
            </div>
        </div>

        <div className='flex flex-1 h-full justify-center items-center'>
          <p className='h-full'>{date} &copy; Todos los derechos reservados</p>
        </div>
    </footer>
  )
}
