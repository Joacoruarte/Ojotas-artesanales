import React from 'react'
import { FiTruck } from "react-icons/fi";
import { CiCreditCard1 } from "react-icons/ci";
import { ImWhatsapp } from "react-icons/im";

export default function Publicity() {
  return (
    <div className="w-full flex mt-20 mb-8 gap-4 justify-center m-auto">
    <div className="flex gap-2">
      <FiTruck className="w-10 h-10" />
      <div className="flex flex-col font-montserrat">
        <p className="font-bold uppercase">Envíos a todo el país</p>
        <p className="text-xs">Compra desde tu casa</p>
      </div>
    </div>

    <div className="h-12 -mt-2 w-0.5 bg-black"/>

    <div className="flex gap-2">
      <CiCreditCard1 className="w-14 -mt-2 h-14" />
      <div className="flex flex-col font-montserrat">
        <p className="font-bold uppercase">Compra en cuotas</p>
        <p className="text-[13px]">¡Con mercado pago elige <br/>las cuotas que quieras!</p>
      </div>
    </div>

    <div className="h-12 -mt-2 w-0.5 bg-black"/>

    <div className="flex gap-2">
      <ImWhatsapp className="w-10 h-10" />
      <div className="flex flex-col font-montserrat">
        <p className="font-bold uppercase">Contactanos</p>
        <p className="text-[13px]">¡Sacate todas las dudas <a href="https://wa.me/5492304500203">+5492304500203!</a></p>
      </div>
    </div>
  </div>
  )
}
