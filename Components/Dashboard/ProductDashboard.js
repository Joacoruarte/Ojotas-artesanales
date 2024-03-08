import Image from 'next/image'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { TABS, transformNumberForRender } from '../../utils/utils'
import Trash from '../../Icons/Trash'
import axios from '../../utils/configAxios'
import toast from 'react-hot-toast'
import Loading from '../Loading'
import Table from '../Table'

export default function ProductDashboard ({ products, loading, setEditedProduct, setTab, refetch }) {
  const handleSetEditProduct = (product) => {
    setEditedProduct(product)
    setTab(TABS.EDIT_PRODUCT)
  }

  const deleteProduct = (product) => {
    const secure = process.env.NODE_ENV === 'production' ? 's' : ''
    const regex = /^https?:\/\/([^\/]+)/
    const host = window.location.href.match(regex)?.[1]
    const baseURL = `http${secure}://${host}`
    axios(baseURL).delete('/api/products', { data: { pid: product?.pid } })
      .then(res => {
        toast.success(res.data.success)
        refetch()
      }).catch(err => {
        toast.error(err.response.data.error)
      })
  }

  const mergeRowsData = (products) => {
    const rows = products.map(product => {
      return {
        Imagen: <Image
          className="shadow-lg rounded-md"
          width={90}
          height={90}
          src={product?.img[0]}
          alt={product.alt}
          objectFit="cover"
        />,
        Nombre: product.name,
        Precio: `$${transformNumberForRender(product.price)}`,
        Stock: (
            <div className='flex flex-col gap-2'>
              {Object.keys(product.stock).sort().filter(e => e !== 'pid').map((key, i) => (
                <div key={i} className="flex items-center border-b-2 justify-around gap-2 max-w-[140px] mx-auto">
                  <p className="text-sm font-montserrat"><b>{key}</b>:</p>
                  <p className="text-sm font-montserrat">{product.stock[key]}</p>
                </div>
              ))}
            </div>
        ),
        Acciones: <div className="flex items-center justify-center sm:gap-4 sm:min-w-[6rem] gap-2 w-full">
          <button
            className="bg-[#051e34] active:scale-95 p-2 rounded-md transition-all duration-300"
            onClick={() => handleSetEditProduct(product)}
          >
            <FiEdit className="sm:w-6 sm:h-6 w-4 h-4 text-white" />
          </button>
          <button onClick={() => deleteProduct(product)} className="bg-red-600 active:scale-95 p-2 rounded-md transition-all duration-300">
            <Trash className="sm:w-6 sm:h-6 w-4 h-4 text-white" />
          </button>
        </div>
      }
    })
    return rows
  }

  return (
    <div className='w-full mt-12 rounded-lg'>
        {loading
          ? <Loading />
          : (
          <Table
              columns={[
                'Imagen',
                'Nombre',
                // 'Descripción',
                'Precio',
                'Stock',
                'Acciones'
              ]}
              rows={mergeRowsData(products)}
          />
            )}
    </div>
  )
}
