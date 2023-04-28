import Shipment from '../../repositories/shipment.repository'

export default async function shipments (req, res) {
  const shipmentRepository = new Shipment()

  const shipments = await shipmentRepository.getShipments(req, res)
  return res.status(200).json(shipments)
}
