import axios from "../../utils/configAxios";
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import XIcon from '../../Icons/XIcon'
import { TABS, TAB_SELECT , handleClickButton } from '../../utils/utils'
import ButtonForm from '../ButtonForm'

export default function EditProduct({ editedProduct , setEditedProduct , refetch , tab , setTab }) {
    const [talle , setTalle] = useState(0)
    const [select, setSelect] = useState("")
    const handleEditProduct = (e) => {
        e.preventDefault()
        axios.put("/api/products",editedProduct)
        .then(() => {
            refetch()
            setEditedProduct({})
            toast.success("Producto editado con exito")
        }).catch((err) => {
            console.log(err)
        })   
    }

    return (
        <div className='lg:mt-0 mt-44 w-full p-4 h-full min-h-screen'>
            <h1 className='titleTab'>Editar producto</h1>
            <div className='grid place-content-center w-full h-full mt-8'>
                {Object.keys(editedProduct).length > 0 ? (
                    <form onSubmit={handleEditProduct} className='flex sm:w-max w-[20rem] flex-col gap-2'>
                        <div className='flex justify-center'>
                            <Image src={editedProduct.img} objectFit="cover" width={350} height={350} alt={editedProduct.alt}/>
                        </div>
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
    )
    }
