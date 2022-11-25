import React, { useState } from 'react'
import { GiFlipFlops } from "react-icons/gi"
import { BiBox } from "react-icons/bi"
import { FiEdit } from "react-icons/fi"
import { handleClickButton, TABS , TAB_SELECT } from '../utils/utils'
import NavbarDashboardItem from '../Components/NavbarDashboardItem'
import { useRouter } from 'next/router'
import ProductDashboard from '../Components/ProductDashboard'
import axios from 'axios'
import Image from 'next/image'
import ButtonForm from '../Components/ButtonForm'
import XIcon from '../Icons/XIcon'
import { useGetProducts } from "../hooks/useGetProducts"
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../Components/Loading'
import CreateProducts from './add-product'


export default function Dashboard() {
  const [tab, setTab] = useState(TABS.PRODUCTS)
  const [talle , setTalle] = useState(0)
  const [editedProduct, setEditedProduct] = useState({})
  const [select, setSelect] = useState("")
  const router = useRouter()
  const { products , loading , refetch } = useGetProducts()

  const handleEditProduct = (e) => {
    e.preventDefault()
    console.log("Editando producto" , editedProduct)
    axios.put("/api/create-product",editedProduct)
    .then(() => {
        refetch()
        setEditedProduct({})
        toast.success("Producto editado con exito")
    }).catch((err) => {
        console.log(err)
    })   
  }
  return (
    <div className='flex w-full h-full'>
        <Toaster position='top-right'/>
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
                        {products && products.map(product => <ProductDashboard key={product._id} product={product} setEditedProduct={setEditedProduct} setTab={setTab}/>)}
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
            <div className='lg:mt-0 mt-44 w-full p-4 h-full min-h-screen'>
                <h1 className='titleTab'>Editar producto</h1>
                <div className='grid place-content-center w-full h-full mt-8'>
                    {Object.keys(editedProduct).length > 0 ? (
                        <form onSubmit={handleEditProduct} className='flex w-max flex-col gap-2'>
                            <Image src={editedProduct.img} objectFit="cover" width={400} height={400} alt={editedProduct.alt}/>
                            <p className='font-montserrat hover:underline underline-offset-4 cursor-pointer text-center'>Cambiar foto</p>

                            <label className='titleForInput'>Nombre:</label>
                            <input type="text" className='inputForm' value={editedProduct.name} placeholder='Nombre'/>

                            <label className='titleForInput'>Descripcion:</label>
                            <input type="text" className='inputForm' value={editedProduct.color} placeholder='Descripcion'/>

                            <label className='titleForInput'>Precio:</label>
                            <input type="number" className='inputFormNumeros' value={editedProduct.price}/>


                            <label className='titleForInput'>Stock:</label>
                            <div className='flex gap-5'>
                                <ButtonForm title={TAB_SELECT.MANUAL} select={select} onClick={()=> handleClickButton(TAB_SELECT.MANUAL , select , setSelect)}/>
                                {select === TAB_SELECT.MANUAL ? (
                                    <input className={`inputFormNumeros`} type="number" value={editedProduct.stock} onChange={({target: {value}}) => {
                                    setEditedProduct({
                                        ...editedProduct,
                                        stock: value < 0 ? 0 : value
                                    })
                                    }}/>
                                ) : (
                                    <>
                                    <ButtonForm title={TAB_SELECT.SIN_STOCK} select={select} onClick={()=> handleClickButton(TAB_SELECT.SIN_STOCK, select , setSelect)}/>
                                    <ButtonForm title={TAB_SELECT.POR_ENCARGUE} select={select} onClick={()=> handleClickButton(TAB_SELECT.POR_ENCARGUE , select , setSelect)}/>
                                    </>
                                )}
                            </div>
                            
                            <label className='titleForInput'>Talles:</label>
                            <div className='flex gap-4'>
                                {editedProduct.talles.map((talle , index) => (
                                    <div key={index} className='flex bg-white p-1 border border-slate-600 items-center gap-4'>
                                    <h3 className={"text-black"}>{talle}</h3>
                                    <XIcon onClick={()=> {
                                        setEditedProduct({
                                            ...editedProduct , 
                                            talles: editedProduct.talles.filter(item=> item !== talle)
                                        })
                                    }}/>
                                    </div>
                                ))}
                            </div>

                            <div className='flex items-center gap-2'>
                                <input className={`inputFormNumeros`} value={talle} type="number" onChange={({target: {value}}) => setTalle(value)}/>
                                <button type='button' onClick={()=> {
                                    setEditedProduct({
                                        ...editedProduct,
                                        talles: [...editedProduct.talles , talle]
                                    })
                                    setTalle(0)
                                }} className='bg-blue-500 py-4 px-1 hover:bg-blue-600 transition-all duration-300 text-white font-montserrat font-bold text-sm'>Agregar Talle</button>
                            </div>


                            <button type='submit'className='buttonSubmit'>EDITAR PRODUCTO</button>
                        </form>
                    ) : (
                        <div className='text-center font-montserrat text-lg h-[50vh] grid place-content-center'>
                            <p>No tienes ningun producto para editar</p>
                            <button className='buttonSubmit' onClick={()=> setTab(TABS.PRODUCTS)}>Elejir un producto</button>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}
