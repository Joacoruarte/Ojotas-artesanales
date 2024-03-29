import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import Layout from '../Components/Layout'
import s from '../styles/login.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../utils/yups'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import AuthContext from '../Context/AuthProvider/AuthContext'
import axios from '../utils/configAxios'

export default function Login () {
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema)
  })

  useEffect(() => {
    if (user?.token) {
      router.push('/')
    }
  }, [user, router])

  const onSubmit = async (data) => {
    const secure = process.env.NODE_ENV === 'production' ? 's' : ''
    const regex = /^https?:\/\/([^\/]+)/
    const host = window.location.href.match(regex)?.[1]
    const baseURL = `http${secure}://${host}`
    try {
      const res = await axios(baseURL).post('/api/login', { email: data.email, password: data.password })
      if (res.data.token) {
        setUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data))
        router.push('/')
      }
    } catch (error) {
      toast.error('Usuario o contraseña incorrectos')
    }
  }
  return (
    <Layout>
        <Toaster position='top-right'/>
        <div className='w-full mt-2 grid place-content-center h-full'>
            <form className={s.formLogin} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3 className={s.titleForInput}>Email</h3>
                    <input {...register('email')} className={s.inputForm} type="email" placeholder='ej: tunombre@gmail.com' />
                </div>
                <div>
                    <h3 className={s.titleForInput}>Contraseña</h3>
                    <input {...register('password')} className={s.inputForm} type="password" />
                </div>
                <button className='w-full hover:bg-[#444] bg-black text-white font-montserrat uppercase transition-all duration-300 cursor-pointer flex items-center justify-center py-2' type='submit'>Iniciar sesión</button>
                <p className='text-center text-sm font-montserrat'>¿No tenes cuenta? <Link href='/register' ><a className='text-black font-bold'>Crear una cuenta</a></Link></p>
            </form>
        </div>
    </Layout>
  )
}
