import React from 'react'

export default function NavbarDashboardItem({ icon, text, active, handleTab }) {
  return (
    <li className='item_navbar'>
        <div onClick={handleTab} className={`item_navbar_div ${active && "bg-[#273e52]"}`}>
            {icon()}
            <p className='text-center sm:text-base text-xs whitespace-nowrap'>{text}</p>
        </div>
    </li>
  )
}
