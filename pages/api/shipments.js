import Shipment from '../../repositories/shipment.repository'

export default async function shipments (req, res) {
  const shipmentRepository = new Shipment()
  await shipmentRepository.getShipments(req, res)
}
