import React, { useState } from 'react'
import Table from '../Table'
import { useGetShipments } from '../../hooks/useGetShipments'
import axios from '../../utils/configAxios'
import ModalTransition from '../ModalTransition'
import Image from 'next/image'
import Loading from '../Loading'

export default function ShipmentDashboard () {
  const { shipments, loading } = useGetShipments()
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)

  const getProductsByShipmentId = (shipmentId) => {
    axios.get(`/api/shipment/${shipmentId}/products`)
      .then((res) => {
        setProducts(res.data)
        console.log(res.data)
        setShowModal(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const mergeRowsData = (shipments) => {
    const rows = shipments.map(shipment => {
      return {
        Email: shipment.email,
        Nombre: `${shipment.name} ${shipment.lastName}`,
        Numero: shipment.phoneNumber,
        Calle: `${shipment.street} ${shipment.streetNumber}`,
        'Codigo Postal': shipment.postalCode,
        Piso: shipment.floor || '-',
        Ciudad: shipment.city,
        'Dni o Cuil': shipment.identification,
        Estado: <span className={`${shipment.status === 'pending' ? 'text-amber-500' : shipment.status === 'approved' ? 'text-lime-600 font-bold' : 'text-red-600'}`}>{shipment.status}</span>,
        Products: <button onClick={() => getProductsByShipmentId(shipment._id)} className='bg-sky-400 p-4 text-white hover:bg-sky-500 transition-colors'>Ver</button>
      }
    })
    return rows
  }

  return (
    <div>
      {
        loading
          ? (
          <Loading/>
            )
          : (
          <>
            <Table
                columns={[
                  'Email',
                  'Nombre',
                  'Numero',
                  'Calle',
                  'Codigo Postal',
                  'Piso',
                  'Ciudad',
                  'Dni o Cuil',
                  'Estado',
                  'Productos'
                ]}
                rows={mergeRowsData(shipments)}
            />

            <ModalTransition
              open={showModal}
              setOpen={() => {
                setShowModal(false)
                setProducts([])
              }}
            >
              <div>
                  {products.map((product, i) => (
                      <div key={i} className="flex justify-center items-center">
                          <div className='w-full'>
                              <Image
                                  src={product.img[0]}
                                  width={90}
                                  height={90}
                                  alt='producto'
                                  objectFit='cover'
                                  className="rounded-md shadow-lg"
                              />
                          </div>
                          <p className="text-sm font-montserrat"><b>{product.name}</b>:</p>
                          <p className="text-sm font-montserrat">{product.description}</p>
                      </div>
                  ))}
              </div>
            </ModalTransition>

          </>
            )
      }
    </div>
  )
}
