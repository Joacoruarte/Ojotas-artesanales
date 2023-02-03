import React from 'react'
import XIcon from '../Icons/XIcon'

export default function HeadOfSideBars ({ title, handleClick }) {
  return (
      <div className="flex items-center justify-between w-full h-10">
         <h2 className="font-bold text-[19px] font-montserrat">{title}</h2>
         <XIcon
            className="w-8 h-8 cursor-pointer"
            onClick={handleClick}
         />
      </div>
  )
}
