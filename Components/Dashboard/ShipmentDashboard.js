import React, { useState } from 'react'
import Table from '../Table'
import { useGetShipments } from '../../hooks/useGetShipments'
import ModalTransition from '../ModalTransition'
import Loading from '../Loading'
import ShipmentProducts from '../../Modals/ShipmentProducts'

export default function ShipmentDashboard () {
  const { shipments, loading } = useGetShipments()
  const [showModal, setShowModal] = useState({
    show: false,
    shipmentId: ''
  })
  const mergeRowsData = (shipments) => {
    const rows = shipments?.map(shipment => {
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
        Products: <button onClick={() => setShowModal({ show: true, shipmentId: shipment._id })} className='bg-sky-400 p-4 text-white hover:bg-sky-500 transition-colors'>Ver</button>
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
                  'Estado del pago',
                  'Productos'
                ]}
                rows={mergeRowsData(shipments)}
            />

            <ModalTransition
              open={showModal.show}
              setOpen={() => setShowModal({ show: false, shipmentId: '' })}
            >
              <ShipmentProducts close={() => setShowModal({ show: false, shipmentId: '' })} shipmentId={showModal.shipmentId}/>
            </ModalTransition>
          </>
            )
      }
    </div>
  )
}
