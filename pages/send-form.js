import React, { useContext, useState } from 'react'
import Layout from '../Components/Layout'
import s from '../styles/SendForm.module.css'
import axios from '../utils/configAxios'
import CartContext from '../Context/CartContext/CartContext'
import ModalTransition from '../Components/ModalTransition'
import CartCard from '../Components/CartCard'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { sendFormSchema } from '../utils/yups'
import YourShipment from '../Components/YourShipment'

export default function SendForm () {
  const { cart, setCart } = useContext(CartContext)
  const [open, setOpen] = useState(false)

  const { register, getValues, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(sendFormSchema)
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleBuyProducts = async () => {
    try {
      const res = await axios.post('/api/mercado-pago', { cart, form: getValues() })
      window.location.replace(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout noFixexNav >
        {/* FORM */}
        <div className='flex flex-col mt-2 gap-2 py-4 sm:px-20 px-4 mx-auto'>
            <div>
                <h2 className='font-montserrat font-bold border-black border-b-2 uppercase mb-4 text-center'>Envio</h2>
            </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-2">
                    <div className='flex sm:flex-row flex-col w-full pt-4 sm:gap-4 gap-8'>
                        <div className='w-full'>
                            <p className="font-montserrat text-md mb-2 py-1 border-b border-b-slate-500 font-bold">DATOS DE CONTACTO</p>
                            <div>
                                <label className='font-montserrat text-xs'>Email</label>
                                <input {...register('email')} type="email" className={`${s.input} font-montserrat`} />
                                {errors.email && <p className='text-red-500 font-montserrat text-xs'>{errors.email.message}</p>}
                            </div>

                            <p className="font-montserrat text-md mb-2 py-1 border-b border-b-slate-500 font-bold">DATOS DE LA ENTREGA</p>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Codigo postal</label>
                                <input {...register('postalCode')} type="text" className={`${s.input} max-w-[100px] font-montserrat`} />
                                {errors.postalCode && <p className='text-red-500 font-montserrat text-xs'>{errors.postalCode.message}</p>}
                            </div>

                            <p className="font-montserrat text-md mb-2 py-1 border-b border-b-slate-500 font-bold">DATOS DEL DESTINATARIO</p>
                            <div className='flex gap-2 w-full'>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='font-montserrat text-xs'>Nombre</label>
                                    <input {...register('name')} type="text" className={`${s.input} font-montserrat`} />
                                    {errors.name && <p className='text-red-500 font-montserrat text-xs'>{errors.name.message}</p>}
                                </div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='font-montserrat text-xs'>Apellido</label>
                                    <input {...register('lastName')} type="text" className={`${s.input} font-montserrat`} />
                                    {errors.lastName && <p className='text-red-500 font-montserrat text-xs'>{errors.lastName.message}</p>}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Teléfono</label>
                                <input {...register('phoneNumber')} type="text" className={`${s.input} font-montserrat`} />
                                {errors.phoneNumber && <p className='text-red-500 font-montserrat text-xs'>{errors.phoneNumber.message}</p>}
                            </div>

                            <p className="font-montserrat text-md mb-2 py-1 border-b border-b-slate-500 font-bold">DATOS DEL DOMICILIO</p>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Calle</label>
                                <input {...register('street')} type="text" className={`${s.input} font-montserrat`} />
                                {errors.street && <p className='text-red-500 font-montserrat text-xs'>{errors.street.message}</p>}
                            </div>
                            <div className='flex gap-2 w-full'>
                                <div className='flex w-full flex-col gap-2'>
                                    <label className='font-montserrat text-xs'>Numero</label>
                                    <input {...register('streetNumber')} type="text" className={`${s.input} font-montserrat w-full`} />
                                </div>
                                <div className='flex w-full flex-col gap-2'>
                                    <label className='font-montserrat text-xs'>Piso (opcional)</label>
                                    <input {...register('floor')} type="text" className={`${s.input} font-montserrat w-full`} />
                                </div>
                            </div>
                            {errors.streetNumber && <p className='text-red-500 font-montserrat text-xs'>{errors.streetNumber.message}</p>}
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>Ciudad</label>
                                <input {...register('city')} type="text" className={`${s.input} font-montserrat`} />
                                {errors.city && <p className='text-red-500 font-montserrat text-xs'>{errors.city.message}</p>}
                            </div>

                            <p className="font-montserrat text-md mb-2 py-1 border-b border-b-slate-500 font-bold">DATOS DE FACTURACION</p>
                            <div className='flex flex-col gap-2'>
                                <label className='font-montserrat text-xs'>DNI o CUIL</label>
                                <input {...register('identification')} type="text" className={`${s.input} font-montserrat`} />
                                {errors.identification && <p className='text-red-500 font-montserrat text-xs'>{errors.identification.message}</p>}
                            </div>
                        </div>

                        <div className={s.order} >
                            <YourShipment />
                        </div>
                    </div>
                </form>
            <div>
            </div>
        </div>
        <ModalTransition open={open} setOpen={setOpen}>
            <div>
                <div className='overflow-y-scroll max-h-96'>
                    {cart &&
                            cart?.map((product, i) => (
                                <CartCard
                                    product={product}
                                    cart={cart}
                                    setCart={setCart}
                                    key={product._id}
                                />
                            ))}
                </div>
                <button type='button' onClick={() => handleBuyProducts()} className="w-full mt-2 hover:bg-[#444] bg-black transition-all duration-300 cursor-pointer flex items-center justify-center py-2">
                    <p className="font-montserrat text-white font-extralight">
                        COMPRAR
                    </p>
                </button>
            </div>
        </ModalTransition>
    </Layout>
  )
}
