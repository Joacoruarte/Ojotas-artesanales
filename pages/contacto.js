import React, { useState } from 'react'
import Layout from '../Components/Layout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import s from '../styles/login.module.css'
import { contactSchema } from '../utils/yups'
import emailJs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Contacto () {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema)
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = (data) => {
    const API_KEY = process.env.API_KEY || ''
    const TEMPLATE_ID = process.env.TEMPLATE_ID || ''
    const SERVICE_ID = process.env.SERVICE_ID || ''

    setLoading(true)
    emailJs.send(SERVICE_ID, TEMPLATE_ID, { ...data }, API_KEY)
      .then(() => {
        setLoading(false)
        toast.success('Mensaje enviado correctamente')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        toast.error('Error al enviar el mensaje, intentelo de nuevo')
      })
    reset()
  }

  return (
        <Layout>
            <Toaster position='top-right'/>
            <div className="w-full mt-2 grid place-content-center h-full">
                <h2 className='font-montserrat font-bold border-black border-b-2 uppercase mb-4 text-center'>Contacto</h2>
                <form className={s.formLogin} onSubmit={handleSubmit(onSubmit)}>
                    {/* INPUT NAME */}
                    <div>
                        <h3 className={s.titleForInput}>Name</h3>
                        <input
                            {...register('name')}
                            className={s.inputForm}
                            type="text"
                            placeholder="Nombre"
                        />
                    </div>

                    {/* INPUT EMAIL */}
                    <div>
                        <h3 className={s.titleForInput}>Email</h3>
                        <input
                            {...register('email')}
                            className={s.inputForm}
                            type="email"
                            placeholder="ej: tunombre@gmail.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 italic text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* INPUT SUBJECT */}
                    <div>
                        <h3 className={s.titleForInput}>Asunto</h3>
                        <input
                            {...register('subject')}
                            className={s.inputForm}
                            type="text"
                        />
                    </div>

                    {/* INPUT MESSAGE */}
                    <div>
                        <h3 className={s.titleForInput}>Mensaje</h3>
                        <textarea
                            {...register('message')}
                            rows={4}
                            className={s.inputForm}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    {/* BUTTON SUBMIT */}
                    <button
                        className="w-full hover:bg-[#444] bg-black text-white font-montserrat uppercase transition-all duration-300 cursor-pointer flex items-center justify-center py-2"
                        type="submit"
                    >
                        {loading ? <AiOutlineLoading3Quarters className={s.loading_icon} /> : 'ENVIAR'}
                    </button>
                </form>
            </div>
        </Layout>
  )
}
