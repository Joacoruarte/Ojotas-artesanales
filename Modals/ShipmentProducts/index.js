import Image from 'next/image'
import axios from '../../utils/configAxios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading'
import XIcon from '../../Icons/XIcon'

export default function ShipmentProducts ({ shipmentId, close }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const getProductsByShipmentId = (shipmentId) => {
    setLoading(true)
    axios
      .get(`/api/shipment/${shipmentId}/products`)
      .then((res) => {
        setProducts(res.data)
        console.log(res.data)
      })
      .catch(() => {
        setError(
          'Ups! Hubo un error al obtener los productos de este envio.'
        )
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (shipmentId) getProductsByShipmentId(shipmentId)
  }, [shipmentId])

  return (
        <div>
            <div className='w-full flex justify-end'>
                <XIcon onClick={close} />
            </div>
            {loading
              ? (
                <Loading />
                )
              : (
                <>
                    {error.length > 0
                      ? (
                        <div className='h-60 grid place-content-center w-full'>
                            <p className="text-red-600">{error}</p>
                        </div>
                        )
                      : (
                        <div className='flex flex-col gap-2 overflow-y-scroll max-h-[15rem]'>
                            {products.map((product, i) => (
                                <div
                                    key={i}
                                    className="flex justify-start items-center gap-4 border-b pb-4"
                                >
                                    <div className="shadow-md">
                                        <Image
                                            src={product?.img[0]}
                                            width={90}
                                            height={90}
                                            alt="producto"
                                            objectFit="cover"
                                            className="rounded-md shadow-lg"
                                        />
                                    </div>
                                    <div>
                                        <div className='flex gap-2'>
                                            <p className="text-sm font-montserrat">
                                                <b>{product.name}</b>:
                                            </p>
                                            <p className="text-sm font-montserrat">
                                                ({product.description})
                                            </p>
                                        </div>
                                        <p className='text-sm font-montserrat'>Cantidad: {product.stock[Object.keys(product.stock)[0]]}</p>
                                        <p className='text-sm font-montserrat'>Talle: {Object.keys(product.stock)[0]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                </>
                )}
        </div>
  )
}
