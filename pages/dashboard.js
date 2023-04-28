import React, { useState } from 'react'
import { GiFlipFlops } from 'react-icons/gi'
import { BiBox } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { TABS } from '../utils/utils'
import { BsBoxSeam } from 'react-icons/bs'
import NavbarDashboardItem from '../Components/Dashboard/NavbarDashboardItem'
import { useRouter } from 'next/router'
import ProductDashboard from '../Components/Dashboard/ProductDashboard'
import { Toaster } from 'react-hot-toast'
import CreateProducts from './add-product'
import { useGetProducts } from '../hooks/useGetProducts'
import ShipmentDashboard from '../Components/Dashboard/ShipmentDashboard'

export default function Dashboard () {
  const router = useRouter()
  const { products, loading, refetch } = useGetProducts()
  const [tab, setTab] = useState(TABS.PRODUCTS)
  const [editedProduct, setEditedProduct] = useState({})

  return (
        <div className="flex w-full h-full">
            <Toaster position="top-right" />
            {/* SIDE BAR */}
            <div className="lg:min-w-[12.5rem]  lg:min-h-screen w-[0rem] h-24 ">
                <nav className="dashboardNavbar">
                    <h1
                        className="text-white font-montserrat fixed lg:top-20 top-4 w-full text-center hover:underline underline-offset-4 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        OJOTAS ARTESANALES
                    </h1>
                    <ul className="w-full flex lg:flex-col flex-row lg:gap-4 gap-0">
                        <NavbarDashboardItem
                            icon={() => (
                                <GiFlipFlops className="navbar_dashboard_icon" />
                            )}
                            active={tab === TABS.PRODUCTS}
                            handleTab={() =>
                              tab !== TABS.PRODUCTS && setTab(TABS.PRODUCTS)
                            }
                            text="Productos"
                        />
                        <NavbarDashboardItem
                            icon={() => (
                                <BiBox className="navbar_dashboard_icon" />
                            )}
                            active={tab === TABS.ADD_PRODUCT}
                            handleTab={() =>
                              tab !== TABS.ADD_PRODUCT &&
                                setTab(TABS.ADD_PRODUCT)
                            }
                            text="Agregar Producto"
                        />
                        <NavbarDashboardItem
                            icon={() => (
                                <FiEdit className="navbar_dashboard_icon" />
                            )}
                            active={tab === TABS.EDIT_PRODUCT}
                            handleTab={() =>
                              tab !== TABS.EDIT_PRODUCT &&
                                setTab(TABS.EDIT_PRODUCT)
                            }
                            text="Editar producto"
                        />
                        <NavbarDashboardItem
                            icon={() => (
                                <BsBoxSeam className="navbar_dashboard_icon" />
                            )}
                            active={tab === TABS.SHIPMENTS}
                            handleTab={() =>
                              tab !== TABS.SHIPMENTS &&
                                setTab(TABS.SHIPMENTS)
                            }
                            text="Envios"
                        />
                    </ul>
                </nav>
            </div>

            {tab === TABS.PRODUCTS && (
                <div className="lg:mt-0 mt-44 w-full p-4 h-full min-h-screen">
                    <h1 className="titleTab sm:flex hidden">Productos</h1>
                    <ProductDashboard
                        setEditedProduct={setEditedProduct}
                        setTab={setTab}
                        products={products}
                        loading={loading}
                        refetch={refetch}
                    />
                </div>
            )}

            {tab === TABS.ADD_PRODUCT && (
                <div className="lg:mt-0 mt-44 w-full p-4 h-full min-h-screen">
                    <h1 className="titleTab">Agregar Producto</h1>
                    <CreateProducts />
                </div>
            )}

            {tab === TABS.EDIT_PRODUCT && (
                <div className="lg:mt-0 mt-44 w-full p-4 h-full min-h-screen">
                    <h1 className="titleTab">Editar producto</h1>
                    {Object.keys(editedProduct).length === 0
                      ? (
                        <div className="grid place-content-center w-full h-[80vh]">
                            <div className='flex flex-col gap-4'>
                                <h1 className="text-2xl font-montserrat">
                                    No hay productos para editar
                                </h1>
                                <button
                                    className="bg-black hover:bg-[#444] disabled:bg-[#71717E] disabled:pointer-events-none disabled:cursor-none text-white font-montserrat transition-all duration-300 cursor-pointer flex items-center justify-center py-2"
                                    onClick={() => setTab(TABS.PRODUCTS)}
                                >
                                    VOLVER A PRODUCTOS
                                </button>
                            </div>
                        </div>
                        )
                      : (
                            <CreateProducts
                                edit={editedProduct}
                                setEdit={setEditedProduct}
                                refetch={refetch}
                                setTab={() => setTab(TABS.PRODUCTS)}
                                tab={tab}
                            />
                        )}
                </div>
            )}

            {tab === TABS.SHIPMENTS && (
                <div className="lg:mt-0 mt-44 w-full p-4 h-full min-h-screen">
                    <h1 className="titleTab">Envios</h1>
                    <ShipmentDashboard />
                </div>
            )}
        </div>
  )
}
