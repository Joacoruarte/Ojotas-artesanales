import React, { useState } from 'react'
import { GiFlipFlops } from "react-icons/gi"
import { BiBox } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"
import { TABS } from '../utils/utils'
import NavbarDashboardItem from '../Components/NavbarDashboardItem'
import { useRouter } from 'next/router'
import ProductDashboard from '../Components/ProductDashboard'
import axios from 'axios'

export default function Dashboard({ products}) {
  const [tab, setTab] = useState(TABS.PRODUCTS)
  const router = useRouter()
  return (
    <div className='flex w-full h-full'>
        {/* SIDE BAR */}
        <div className='lg:min-w-[12.5rem]  lg:min-h-screen w-[0rem] h-24 '>
            <nav className='dashboardNavbar'>
                <h1 className='text-white font-montserrat fixed lg:top-20 top-4 w-full text-center hover:underline underline-offset-4 cursor-pointer' onClick={()=> router.push("/")}>OJOTAS ARTESANALES</h1>   
                <ul className='w-full flex lg:flex-col flex-row lg:gap-4 gap-0'>
                    <NavbarDashboardItem 
                    icon={()=> <GiFlipFlops className='w-8 h-8'/>}
                    active={tab === TABS.PRODUCTS}
                    handleTab={()=> tab !== TABS.PRODUCTS && setTab(TABS.PRODUCTS)}
                    text='Productos'
                    />
                    <NavbarDashboardItem 
                    icon={()=> <BiBox className='w-8 h-8'/>}
                    active={tab === TABS.ADD_PRODUCT}
                    handleTab={()=> tab !== TABS.ADD_PRODUCT && setTab(TABS.ADD_PRODUCT)}
                    text='Agregar Producto'
                    />
                    <NavbarDashboardItem 
                    icon={()=> <FiEdit className='w-8 h-8'/>}
                    active={tab === TABS.EDIT_PRODUCT}
                    handleTab={()=> tab !== TABS.EDIT_PRODUCT && setTab(TABS.EDIT_PRODUCT)}
                    text='Editar producto'
                    />
                </ul> 
            </nav>
        </div>
        
        {tab === TABS.PRODUCTS && ( 
            <div className='lg:mt-0 mt-44 w-full p-4 h-full min-h-screen'>
                <h1 className='titleTab'>Productos</h1>
                
                <div className='flex w-full flex-col gap-4 mt-4'>
                    {products && products.map(product => <ProductDashboard key={product._id} product={product}/>)}
                </div>
            </div>
        )}

        {tab === TABS.ADD_PRODUCT && (
            <div className='lg:mt-0 mt-44 w-full p-4 h-full min-h-screen'>
                <h1 className='titleTab'>Agregar Producto</h1>
            </div>
        )}

        {tab === TABS.EDIT_PRODUCT && (
            <div className='lg:mt-0 mt-44 w-full p-4 h-full min-h-screen'>
                <h1 className='titleTab'>Editar producto</h1>
                <div className='flex flex-col gap-4 w-full mt-4'>
                    {products && products.map(product => <ProductDashboard key={product._id} product={product}/>)}
                </div>
            </div>
        )}
    </div>
  )
}

export async function getServerSideProps() {
    const res = await axios.get("/api/products")
    const products = await res.data.data
    return {
      props: {
        products
      }, 
    }
  }


