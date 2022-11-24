import React from 'react'
import { GiFlipFlops } from "react-icons/gi"
import { BiBox } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"

export default function NavbarDashboardItem({ icon, text, active, handleTab }) {
  return (
    <li className='item_navbar'>
        <div onClick={handleTab} className={`item_navbar_div ${active && "bg-[#273e52]"}`}>
            {icon()}
            <p className='text-center whitespace-nowrap'>{text}</p>
        </div>
    </li>
  )
}
