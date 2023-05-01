import Footer from './Footer'
import Navbar from './Navbar'
import s from '../styles/Layout.module.css'
import { BsWhatsapp } from 'react-icons/bs'

export default function Layout ({ children, noFixexNav = false }) {
  return (
    <div className={s.containerLayout}>
      <Navbar noFixexNav={noFixexNav}/>
      <main className={'w-full h-full pb-8'}>{children}</main>
        <a href="https://wa.me/5492304500203" target='_blank' rel="noreferrer">
          <div className='bg-[#25D366] text-white shadow-2xl transition-all duration-300 w-10 p-7 cursor-pointer h-10 grid place-content-center rounded-full fixed z-[100] bottom-8 right-8'>
            <BsWhatsapp className='w-8 h-8'/>
          </div>
        </a>
      <Footer />
    </div>
  )
}
