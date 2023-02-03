import React from 'react'
import ModalTransition from '../../Components/ModalTransition'
import WhatsAppIcon from '../../Icons/WhatsAppIcon'
import MailIcon from '../../Icons/MailIcon'

export default function WhatsAppModal ({ open, setOpen }) {
  return (
      <ModalTransition open={open} setOpen={setOpen}>
        <div className="flex flex-col mt-4 px-4 gap-2 font-montserrat justify-center items-center min-h-[15rem] sm:min-w-[30rem] min-w-[8.5rem]">
            <h3 className="sm:text-xl text-lg text-center">¡Ups! No contamos con este talle actualmente.</h3>
            <p className="sm:text-lg text-[15px] text-center">Contactanos para encargar tu talle</p>

            <a href="https://wa.me/5492304500203" className="flex items-center w-48 px-4 py-2 rounded-3xl mt-4 text-white font-semibold bg-[#128c7e]" target="_blank" rel="noreferrer"><WhatsAppIcon/></a>

            <div className="flex items-center">
                <span className="sm:w-36 w-28 h-[0.5px] bg-[#ccc]"></span>
                <span className="mx-2 mt-1">O</span>
                <span className="sm:w-36 w-28 h-[0.5px] bg-[#ccc]"></span>
            </div>

            <p className="flex items-center gap-2 sm:text-lg text-base"><MailIcon className="sm:w-10 sm:h-10 w-8 h-8 text-gray-500"/>claudiamtc945@gmail.com</p>
        </div>
      </ModalTransition>
  )
}
