import React, { useState } from 'react'
import Layout from "../Components/Layout"
import { useUploadImage, validateFormForProduct } from '../utils/utils'
import PlusIcon from '../Icons/PlusIcon'
import CheckIcon from '../Icons/CheckIcon'
import Trash from '../Icons/Trash'
import axios from "axios"
import s from "../styles/add-product.module.css"
import XIcon from '../Icons/XIcon'
import ButtonForm from '../Components/ButtonForm'
import Image from 'next/image'

export const TAB_SELECT ={
  MANUAL: "Agruegar Manual",
  SIN_STOCK: "Marcar sin Stock",
  POR_ENCARGUE: "Por encargue",
}

export default function CreateProducts() {
  const { img , progress , setImg ,  uploadImage }  = useUploadImage()
  const [talles , setTalles] = useState([])
  const [talle , setTalle] = useState(0) 
  const [select, setSelect] = useState("")
  const [drag , setDrag] = useState(false)
  const [stock , setStock] = useState(0)
  const [product , setProduct] = useState({
    name: "",
    alt: "Foto de calzado",
    price: 0,
    color: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(validateFormForProduct({talles,img,select,stock})) return
    if(select === TAB_SELECT.MANUAL){
        axios.post("/create-product",{
            ...product,
            img,
            talles,
            stock: String(stock),
          }).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
    }else{
        axios.post("/create-product",{
           ...product,
           img,
           talles,
           stock: select,
         }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })

    }
  }

  const handleClickButton = (tab) =>{
    if(tab === TAB_SELECT.MANUAL){
      setSelect(select !== TAB_SELECT.MANUAL ? TAB_SELECT.MANUAL: "")
    }
    if(tab === TAB_SELECT.SIN_STOCK){
      setSelect(select !== TAB_SELECT.SIN_STOCK ? TAB_SELECT.SIN_STOCK: "")
    }
    if(tab === TAB_SELECT.POR_ENCARGUE){
      setSelect(select !== TAB_SELECT.POR_ENCARGUE ? TAB_SELECT.POR_ENCARGUE: "")
    }
  } 

  return (
    <Layout>
      <div className={s.containerForm}>
        {/* PREVIEW IMAGE */}
        <div className={s.containerViewProduct}>
          <h3 className='w-full text-center -mt-5 text-xl font-montserrat font-bold underline mb-4'>Producto</h3>
          {img  ? <Image width={550} height={700} alt="Foto de producto" layout="intrinsic" objectFit='cover' src={img} className={s.imageProduct} /> : (
            <div className={s.noHasImage}>
              <h3 className={`${s.noHasImage_title} -mt-8 uppercase font-montserrat font-bold underline underline-offset-8`}>Ojotas artesanales</h3>
              <p className='font-montserrat flex items-center gap-3'>Cargar producto <PlusIcon /></p>
            </div>
          )}
          <p className='w-full text-center text-lg font-montserrat'>Ojotas artesanales</p>
        </div>
        {/* FORM */}
        <div className='w-full'>
          <h1 className='text-black font-montserrat sm:whitespace-nowrap mb-4 font-medium text-center text-xl'>Formulario de creacion de producto</h1>
            <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit}>
                {/* INPUT NOMBRE PRODUCTO */}
                <h3 className={s.titleForInput}>Nombre</h3>
                <input className={s.inputForm} type="text" value={product.name} onChange={({target: {value}}) => setProduct({...product , name: value})}/>
                {/* INPUT PARA CARGAR FOTOS */}
                <h3 className={s.titleForInput}>Cargar imagen</h3>
                <div className='flex relative items-center'>
                    <label 
                      onDragLeave={(e) => {
                        e.preventDefault()
                        e.stopPropagation();
                        setDrag(false)
                      }}
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.stopPropagation();
                        setDrag(true)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.stopPropagation();
                        uploadImage(e.dataTransfer.files[0])
                      }}
                      htmlFor ='inputFile' 
                      style={{border: drag ? "1px dashed #000" : "1px dashed #ccc"}}
                      className={`${s.labelForInputUploadImage}`}>{!img && <PlusIcon color="rgb(138, 138, 138)" />} {progress ? "Subiendo..." : img ? img.length > 30 ? img.slice(0 , 40) + "..." : img : "Formato en JPG, JPEG, PNG, WEBP"}</label>
                  {img && (
                    <>
                      <Trash onClick={()=> setImg("")} className="absolute right-10 top-16 cursor-pointer w-6 h-6"/>
                      <CheckIcon className="absolute right-4 top-[4.2rem]"/>
                    </>
                  )}
                  <input type="file" id='inputFile' className='hidden' onChange={(e)=> uploadImage(e.target.files[0])}/>
                </div>

                {/* INPUT PARA CARGAR PRECIO */}
                <h3 className={s.titleForInput}>Precio</h3>
                <input className={s.inputFormNumeros} type="number" value={product.price} onChange={({target: {value}}) => setProduct({...product , price: value})}/>
                
                {/* INPUT PARA CARGAR COLOR O DESCRIPCION */}
                <h3 className={s.titleForInput}>Color / Descripcion</h3>
                <input className={s.inputForm} type="text" value={product.color} onChange={({target: {value}}) => setProduct({...product , color: value})}/>
                
                <div className='flex gap-4'>
                  {talles.map((talle , index) => (
                    <div key={index} className='flex bg-white p-1 border border-slate-600 items-center gap-4'>
                      <h3 className={"text-black"}>{talle}</h3>
                      <XIcon onClick={()=> setTalles(talles.filter(item=> item !== talle))}/>
                    </div>
                  ))}
                </div>
                {/* INPUT PARA CARGAR TALLAS */}
                  <h3 className={s.titleForInput}>Talles</h3>
                  <div className='flex items-center gap-2'>
                    <input className={`${s.inputFormNumeros}`} value={talle} type="number" onChange={({target: {value}}) => setTalle(value)}/>
                    <button type='button' onClick={()=> {
                      setTalles([...talles , talle])
                      setTalle(0)
                    }} className='bg-blue-500 py-4 px-1 hover:bg-blue-600 transition-all duration-300 text-white font-montserrat font-bold text-sm'>Agregar Talle</button>
                  </div>


                {/* INPUT PARA CARGAR STOCK */}
                <h3 className={s.titleForInput}>Stock</h3>
                <div className='flex gap-5'>
                  <ButtonForm title={TAB_SELECT.MANUAL} select={select} onClick={()=> handleClickButton(TAB_SELECT.MANUAL)}/>
                  {select === TAB_SELECT.MANUAL ? (
                    <input className={`${s.inputFormNumeros}`} type="number" value={stock} onChange={({target: {value}}) => {
                      setStock(value < 0 ? 0 : value)
                    }}/>
                  ) : (
                    <>
                      <ButtonForm title={TAB_SELECT.SIN_STOCK} select={select} onClick={()=> handleClickButton(TAB_SELECT.SIN_STOCK)}/>
                      <ButtonForm title={TAB_SELECT.POR_ENCARGUE} select={select} onClick={()=> handleClickButton(TAB_SELECT.POR_ENCARGUE)}/>
                    </>
                  )}
                </div>

                {/* BUTTON DE SUBMIT */}
                <button type='submit' className='bg-black py-4 capitalize px-1 hover:bg-slate-600 transition-all duration-300 text-white font-montserrat text-md'>AGREGAR PRODUCTO</button>
            </form>
        </div>
      </div>
    </Layout>
  )
}
