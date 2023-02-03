import React from 'react'

export default function ButtonForm ({ select, title, onClick }) {
  return (
    <button type='button' onClick={onClick} className={select !== title
      ? 'bg-blue-500 py-4 capitalize border border-blue-500 px-1 hover:border-blue-600 hover:bg-blue-600 transition-all duration-300 text-white font-montserrat font-bold text-sm'
      : 'bg-lime-500 py-4 px-1 capitalize hover:bg-lime-600 border border-lime-500 hover:border-lime-600 transition-all duration-300 text-white font-montserrat font-bold text-sm'
      }>{title}</button>
  )
}
