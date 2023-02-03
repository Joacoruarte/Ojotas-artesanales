import React from 'react'
import s from '../styles/Loading.module.css'

export default function Loading () {
  return (
    <div className='w-full flex flex-col justify-center items-center h-[60vh]'>
        <div className={s.lds_ring}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
