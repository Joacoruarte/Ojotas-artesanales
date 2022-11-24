import React, { Fragment, useContext, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Link from 'next/link'
import CartContext from '../Context/CartContext/CartContext'
import CartModal from '../Modals/Cart/CartModal'
import s from "../styles/Layout.module.css"
import DropDown from './DropDown'
import AuthContext from '../Context/AuthProvider/AuthContext'

const navigation = [
    { name: 'INICIO', href: '/', current: true },
    { name: 'CONTACTO', href: '/contacto', current: false },
    { name: 'INICIAR SESION', href: '/login', current: false },
    { name: 'REGISTRARSE', href: '/register', current: false },
]

export default function Navbar({home}) {
  const [scroll, setScroll] = useState(false);
  const cart = useContext(CartContext)
  const [open, setOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const { user , setUser } = useContext(AuthContext)
  useEffect(() => {
    const handleScroll = () => { 
      if(window.scrollY > 0){ 
        setScroll(true)
      } else { 
        setScroll(false)
      }
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  const hasToken = (item) => {
    if(item.name === 'INICIAR SESION' && user?.token){
      return false
    }
    if(item.name === 'REGISTRARSE' && user?.token){
      return false
    }
    return true
  }


  return (
    <div className=''>
        {/* PRINCIPIO DE LA NAVBAR */}
        <nav className={`shadow-sm border-b border-black border-opacity-25 ${scroll && "shadow-md border-b border-black border-opacity-25"}  border-b border-[#4444] w-full right-0 left-0 my-0 mx-auto fixed z-10 bg-primary`}>
              {/*  */}
              <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                <div className="relative flex h-16 items-center justify-between lg:border-opacity-25">
                  {/* LINKS TO NAVIGATE PAGE */}
                  <div className="flex items-center lg:px-0 px-2 ">
                    {/* OCULTAMOS ACA LOS LINKS */}
                    <div className="lg:ml-10 lg:block hidden">
                      <div className="flex items-center space-x-4">
                        {/* LINKS */}
                        <Link href="/"><a className='uppercase font-montserrat font-bold underline underline-offset-8'>Ojotas artesanales</a></Link>
                        {navigation.map((item , i) => (
                          <Fragment key={i}>
                            {hasToken(item) && (
                              <Link
                                key={i}
                                href={item.href}
                              >
                                <a className={'hover:bg-slate-800 transition-all text-black font-montserrat hover:text-white duration-300 hover:bg-opacity-75 text-xs rounded-md py-2 px-3 font-medium'}>
                                  {item.name}
                                </a>
                              </Link>
                            )}
                          </Fragment>
                        ))}
                        {user?.token && (
                          <div>
                            <DropDown/>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>


                  {/* YA QUE EN LG OCULTAMOS LOS ICONOS ACA PONEMOS MENU HAMBURGUESA */}
                  <div className='flex lg:hidden'>
                    <div className={s.DivContainerHamburguerMenu}>
                        <div onClick={() => setOpen(!open)} className={`${s.toggle} ${open && s.active}`} type="button">
                          <span className={s.toggle_line}></span>
                        </div>
                    </div>
                  </div>


                  {/* ACA ESTA EL INPUT DE BUSQUEDA (OPCIONAL) */}
                  <div className="lg:flex hidden flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                    <div className="w-full max-w-lg lg:max-w-xs">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-gray-400 focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-gray-500 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-white sm:text-sm"
                          placeholder="Buscar"
                          type="search"
                          name="search"
                        />
                      </div>
                    </div>
                  </div>

                  {/* TITLE OF E-COMMERCE */}
                  <div className='lg:hidden  flex w-full justify-center'>
                    <Link href="/"><a className={`${scroll ? "text-base" : "text-lg"} uppercase font-montserrat font-bold underline underline-offset-8 transition-all duration-300`}>Ojotas artesanales</a></Link>
                  </div>


                  {/* ICONO DEL CARRITO */}
                  <div className="flex">
                    <div onClick={()=> setOpenCart(true)} className='flex items-center ml-4'>
                      <AiOutlineShoppingCart className='w-7 h-7 cursor-pointer text-slate-600'/>
                      <div className='w-[1.2rem] h-[1.2rem] flex items-center justify-center bg-slate-600 rounded-full'>
                        <p className='text-white -mt-[1px] text-center text-xs'>{cart?.cart?.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </nav>


        {/* CART */}
        <div>
          <div onClick={()=> setOpenCart(false)} className={`${!openCart && "opacity-0 -z-10 hidden" } inset-0 transition-all duration-300 w-full h-full bg-slate-600 bg-opacity-50 z-[300] fixed`}>
          </div>
          <div className={`${openCart === true ? s.showCart : s.hideCart} sm:w-[25rem] w-[23rem] fixed right-0 bg-white px-4 py-2 h-screen shadow-xl`} style={{zIndex: 10000}}>
            <CartModal setOpenCart={setOpenCart}/>
          </div>
        </div>
    </div>
  )
}
