import React, { useState } from 'react'
import PlusIcon from '../Icons/PlusIcon'
import Trash from '../Icons/Trash'
import axios from '../utils/configAxios'
import XIcon from '../Icons/XIcon'
import Image from 'next/image'
import { validateFormForProduct } from '../utils/utils'
import { useUploadImage } from '../hooks/useUploadImage'
import s from '../styles/add-product.module.css'

export default function CreateProducts () {
  const { img, progress, setImg, uploadImage } = useUploadImage()
  const [drag, setDrag] = useState(false)
  const [previewImg, setPreviewImg] = useState('')
  const [product, setProduct] = useState({
    name: '',
    alt: 'Foto de calzado',
    price: 0,
    description: '',
    stock: {
      '35/36': 0,
      '37/38': 0,
      '39/40': 0,
      '41/42': 0
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const transformStock = {}
    for (const key in product.stock) {
      transformStock[key] = parseInt(product.stock[key])
    }
    setProduct({
      ...product,
      price: parseInt(product.price),
      stock: transformStock
    })

    if (validateFormForProduct({ img, stock: product.stock })) return
    console.log({
      ...product,
      img
    })
    axios.post('/api/products', {
      ...product,
      img
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
      <div className={s.containerForm}>
        {/* PREVIEW IMAGE */}
        <div className={s.containerViewProduct}>
          <h3 className='w-full text-center -mt-5 text-xl font-montserrat font-bold underline mb-4'>Producto</h3>
          {previewImg
            ? <Image width={550} height={700} alt="Foto de producto" layout="intrinsic" objectFit='cover' src={previewImg} className={s.imageProduct} />
            : (
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
                <h3 className={s.titleForInput}>Nombre</h3>

                {/* INPUT NOMBRE PRODUCTO */}
                <input className={s.inputForm} type="text" value={product.name} onChange={({ target: { value } }) => setProduct({ ...product, name: value })}/>

                <h3 className={s.titleForInput}>Cargar imagen</h3>

                {/* INPUT PARA CARGAR FOTOS */}
                <div className='flex gap-2'>
                  {img.length > 0 && img.map(ph => (
                    <div key={ph} className='flex flex-col justify-start items-center w-max gap-2'>
                      <Image onClick={() => setPreviewImg(ph)} width={100} height={100} alt="Foto de producto" objectFit='cover' src={ph} />
                      <Trash onClick={() => {
                        setImg(img.filter(p => p !== ph))
                        if (previewImg === ph) setPreviewImg('')
                      }} className="cursor-pointer w-6 h-6"/>
                    </div>
                  ))}
                </div>
                <div className='flex relative items-center'>
                    <label
                      onDragLeave={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setDrag(false)
                      }}
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setDrag(true)
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        uploadImage(e.dataTransfer.files[0])
                      }}
                      htmlFor ='inputFile'
                      style={{ border: drag ? '1px dashed #000' : '1px dashed #ccc' }}
                      className={`${s.labelForInputUploadImage}`}>{!img.length && <PlusIcon color="rgb(138, 138, 138)" />} {progress ? 'Subiendo...' : 'Formato en JPG, JPEG, PNG, WEBP'}</label>
                    <input type="file" id='inputFile' className='hidden' onChange={(e) => uploadImage(e.target.files[0])}/>
                </div>

                {/* INPUT PARA CARGAR COLOR O DESCRIPCION */}
                <h3 className={s.titleForInput}>Descripción / Color</h3>
                <input className={s.inputForm} type="text" value={product.description} onChange={({ target: { value } }) => setProduct({ ...product, description: value })}/>

                {/* INPUT PARA CARGAR PRECIO */}
                <h3 className={s.titleForInput}>Precio</h3>
                <input className={s.inputFormNumeros} type="number" value={product.price} onChange={({ target: { value } }) => setProduct({ ...product, price: value })}/>

                <h3 className={s.titleForInput}>Stock por talle</h3>

                {/* INPUT PARA CARGAR STOCK POR TALLE */}
                <div className='flex flex-col gap-4 mb-4 w-full'>
                  {Object.keys(product.stock).map((talle) => (
                    <div key={talle} className="flex items-center gap-4">
                      <div className={'flex w-[3.3rem] bg-white border p-1 items-center justify-between my-2'}>
                        <p className='font-montserrat uppercase'>{talle}</p>
                      </div>
                      <input type='number' value={product.stock[talle]} onChange={({ target: { value } }) => setProduct({
                        ...product,
                        stock: {
                          ...product.stock,
                          [talle]: value >= 0 ? value : 0
                        }
                      })} className={s.inputFormNumeros}/>

                      {product.stock[talle] > 0 && (
                        <XIcon className='cursor-pointer w-6 h-6' onClick={() => setProduct({ ...product, stock: { ...product.stock, [talle]: 0 } })}/>
                      )}
                    </div>
                  ))}
                </div>

                {/* BUTTON DE SUBMIT */}
                <button type='submit' className='bg-black py-4 capitalize px-1 hover:bg-slate-600 transition-all duration-300 text-white font-montserrat text-md'>AGREGAR PRODUCTO</button>
            </form>
        </div>
      </div>
  )
}
