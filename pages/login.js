import Link from 'next/link'
import React from 'react'
import Layout from '../Components/Layout'
import s from '../styles/login.module.css'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../utils/yups'
import axios from 'axios'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  })
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/login' , { email: data.email, password: data.password })
      if(res.data.token){
        localStorage.setItem("token" , res.data.token)
        router.push("/")
      }
    } catch (error) {
        toast.error("Usuario o contraseña incorrectos")
    }
  }
  return (
    <Layout>
        <Toaster position='top-right'/>
        <div className='w-full mt-10 grid place-content-center h-full'>
            <div className={"my-4 pb-2 border-b-black border border-l-transparent border-r-transparent border-t-transparent"}>
                <h1 className='uppercase font-montserrat font-bold w-full text-lg flex justify-center '>OJOTAS ARTESANALES</h1>
            </div>
            <form className={s.formLogin} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3 className={s.titleForInput}>Email</h3>
                    <input {...register("email")} className={s.inputForm} type="text" placeholder='ej: tunombre@gmail.com' />
                </div>                
                <div>
                    <h3 className={s.titleForInput}>Contraseña</h3>
                    <input {...register("password")} className={s.inputForm} type="text" />
                </div>
                <button className='w-full hover:bg-[#444] bg-black text-white font-montserrat uppercase transition-all duration-300 cursor-pointer flex items-center justify-center py-2' type='submit'>Iniciar sesión</button>
                <p className='text-center text-sm font-montserrat'>¿No tenes cuenta? <Link href='/register' ><a className='text-black font-bold'>Crear una cuenta</a></Link></p>
            </form>
        </div>
    </Layout>
  )
}
