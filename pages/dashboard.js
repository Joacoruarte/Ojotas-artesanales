import React, { useState } from 'react'
import { GiFlipFlops } from "react-icons/gi"
import { BiBox } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"
import { TABS } from '../utils/utils'
import NavbarDashboardItem from '../Components/Dashboard/NavbarDashboardItem'
import { useRouter } from 'next/router'
import ProductDashboard from '../Components/Dashboard/ProductDashboard'
import { useGetProducts } from "../hooks/useGetProducts"
import { Toaster } from 'react-hot-toast'
import Loading from '../Components/Loading'
import CreateProducts from './add-product'
import EditProduct from '../Components/Dashboard/EditProduct'


export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState(TABS.PRODUCTS)
  const [editedProduct, setEditedProduct] = useState({})
  const { products , loading , refetch } = useGetProducts()


  return (
    <div className='flex w-full h-full'>
        <Toaster position='top-right'/>
        {/* SIDE BAR */}
        <div className='lg:min-w-[12.5rem]  lg:min-h-screen w-[0rem] h-24 '>
            <nav className='dashboardNavbar'>
                <h1 className='text-white font-montserrat fixed lg:top-20 top-4 w-full text-center hover:underline underline-offset-4 cursor-pointer' onClick={()=> router.push("/")}>OJOTAS ARTESANALES</h1>   
                <ul className='w-full flex lg:flex-col flex-row lg:gap-4 gap-0'>
                    <NavbarDashboardItem 
                        icon={()=> <GiFlipFlops className='navbar_dashboard_icon'/>}
                        active={tab === TABS.PRODUCTS}
                        handleTab={()=> tab !== TABS.PRODUCTS && setTab(TABS.PRODUCTS)}
                        text='Productos'
                    />
                    <NavbarDashboardItem 
                        icon={()=> <BiBox className='navbar_dashboard_icon'/>}
                        active={tab === TABS.ADD_PRODUCT}
                        handleTab={()=> tab !== TABS.ADD_PRODUCT && setTab(TABS.ADD_PRODUCT)}
                        text='Agregar Producto'
                    />
                    <NavbarDashboardItem 
                        icon={()=> <FiEdit className='navbar_dashboard_icon'/>}
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
                
                <div className='flex mt-8 w-full'>
                    <ul className='flex w-full justify-between text-center font-montserrat'>
                        <li className='sm:min-w-[6rem] w-full flex flex-col gap-4'>
                            <p className='underline sm:text-base text-sm underline-offset-4 font-bold text-[#051e34]'>Imagen</p>
                        </li>
                        <li className='lg:flex hidden lg:min-w-[6rem] w-full flex-col gap-4'>
                            <p className='underline  sm:text-base text-sm  underline-offset-4 font-bold text-[#051e34]'>Nombre</p>
                        </li>
                        <li className='lg:flex hidden lg:min-w-[6rem] w-full flex-col gap-4'>
                            <p className='underline  sm:text-base text-sm underline-offset-4 font-bold text-[#051e34]'>Descripcion</p>
                        </li>
                        <li className='sm:min-w-[6rem] w-full flex flex-col gap-4'>
                            <p className='underline  sm:text-base text-sm underline-offset-4 font-bold text-[#051e34]'>Precio</p>
                        </li>
                        <li className='sm:min-w-[6rem] w-full flex flex-col gap-4'>
                            <p className='underline  sm:text-base text-sm underline-offset-4 font-bold text-[#051e34]'>Stock</p>
                        </li>
                        <li className='sm:min-w-[6rem] w-full flex flex-col gap-4'>
                            <p className='underline  sm:text-base text-sm underline-offset-4 font-bold text-[#051e34]'>Talles</p>
                        </li>
                        <li className='sm:min-w-[6rem] w-full flex flex-col gap-4'>
                            <p className='underline sm:text-base text-sm  underline-offset-4 font-bold text-[#051e34]'>Acciones</p>
                        </li>
                    </ul>
                </div>
                <div className='flex w-full overflow-y-scroll containerScroll max-h-[78vh] flex-col gap-4 mt-4'>
                    {loading ? (
                        <Loading/>
                    ) : ( 
                    <>
                        {products && products.map(product => <ProductDashboard refetch={refetch} key={product._id} product={product} setEditedProduct={setEditedProduct} setTab={setTab}/>)}
                    </>
                    )}
                </div>
            </div>
        )}

        {tab === TABS.ADD_PRODUCT && (
            <div className='lg:mt-0 mt-44 w-full p-4 h-full min-h-screen'>
                <h1 className='titleTab'>Agregar Producto</h1>

                <CreateProducts/>
            </div>
        )}

        {tab === TABS.EDIT_PRODUCT && (
            <EditProduct 
                editedProduct={editedProduct} 
                setEditedProduct={setEditedProduct} 
                refetch={refetch} 
                setTab={setTab} 
                tab={tab}
            />
        )}
    </div>
  )
}
