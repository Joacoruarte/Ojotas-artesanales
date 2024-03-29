import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import HeadOfSideBars from '../../Components/HeadOfSideBars'
import AuthContext from '../../Context/AuthProvider/AuthContext'

export default function SideBarModal ({ setOpen }) {
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)
  return (
    <div>
      <HeadOfSideBars
        title='OJOTAS ARTESANALES'
        handleClick={() => setOpen(false)}
      />

      <hr className="bg-slate-500 w-full my-2" />

      <ul className="flex flex-col gap-8 text-lg mt-8 font-montserrat">
        <li
          onClick={() => {
            router.push('/')
            setOpen(false)
          }}
          className="cursor-pointer"
        >
          Inicio
        </li>
        <li
          onClick={() => {
            router.push('/contacto')
            setOpen(false)
          }}
          className="cursor-pointer"
        >
          Contacto
        </li>
        {!user?.token
          ? (
          <>
            <li
              onClick={() => {
                router.push('/login')
                setOpen(false)
              }}
            >
              Iniciar Sesion
            </li>
            <li
              onClick={() => {
                router.push('/register')
                setOpen(false)
              }}
              className="cursor-pointer"
            >
              Registrarse
            </li>
          </>
            )
          : (
          <>
            <li>
            <div className='bg-[#CCC] h-[0.5px] w-full'/>
              <p className="my-4">
                Ingreso como <b>{user.email}</b>
              </p>
              <div className='bg-[#CCC] h-[0.5px] w-full mb-4'/>
              {user.role === 'ADMIN' && (
                <div
                  onClick={() => {
                    router.push('/dashboard')
                    setOpen(false)
                  }}
                >
                  <p className="cursor-pointer w-max hover:underline hover:underline-offset-2">Panel Admin</p>
                  <div className='bg-[#CCC] h-[0.5px] w-full my-4'/>
                </div>
              )}
            </li>
            <li
              onClick={() => {
                setOpen(false)
                localStorage.removeItem('user')
                setUser({})
              }}
              className="cursor-pointer"
            >
              Cerrar sesion
            </li>
          </>
            )}
      </ul>
    </div>
  )
}
