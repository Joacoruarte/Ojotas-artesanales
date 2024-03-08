import Link from 'next/link'
import React from 'react'
import Layout from '../Components/Layout'
import s from '../styles/register.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../utils/yups'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import axios from '../utils/configAxios'

export default function Register () {
  const router = useRouter()
  const { handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    const secure = process.env.NODE_ENV === 'production' ? 's' : ''
    const regex = /^https?:\/\/([^\/]+)/
    const host = window.location.href.match(regex)?.[1]
    const baseURL = `http${secure}://${host}`
    const user = await axios(baseURL).post('/api/user', {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: 'USER'
    })

    if (user.data.success) {
      toast.success('Usuario creado con exito')
      return router.push('/login')
    }
  }

  return (
    <Layout>
        <Toaster
            position='top-right'
        />
        <div className='w-full mt-2 grid place-content-center h-full'>
            <form className={s.formRegister} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3 className={s.titleForInput}>Nombre</h3>
                    <input {...register('name')} className={s.inputForm} type="text" placeholder='ej: María Perez' />
                    <p className={s.error}>{errors.name?.message}</p>
                </div>
                <div>
                    <h3 className={s.titleForInput}>Email</h3>
                    <input {...register('email')} className={s.inputForm} type="email" placeholder='ej: tunombre@gmail.com' />
                    <p className={s.error}>{errors.email?.message}</p>
                </div>

                <div>
                    <h3 className={s.titleForInput}>Telefono {`(${'Opcional'})`}</h3>
                    <input {...register('phone')} className={s.inputForm} type="text" placeholder='ej: 1123445577'/>
                </div>

                <div>
                    <h3 className={s.titleForInput}>Contraseña</h3>
                    <input {...register('password')} className={s.inputForm} type="password" />
                    <p className={s.error}>{errors.password?.message}</p>
                </div>

                <div>
                    <h3 className={s.titleForInput}>Confirmar Contraseña</h3>
                    <input {...register('confirmPassword')} className={s.inputForm} type="password" />
                    <p className={s.error}>{errors.confirmPassword?.message}</p>
                </div>

                <button className='w-full hover:bg-[#444] bg-black text-white font-montserrat uppercase transition-all duration-300 cursor-pointer flex items-center justify-center py-2' type='submit'>Registrarse</button>
                <p className='text-center text-sm font-montserrat'>¿Ya tenes una cuenta? <Link href='/login' ><a className='text-black font-bold'>Inicia sesión</a></Link></p>
            </form>
        </div>
    </Layout>
  )
}
