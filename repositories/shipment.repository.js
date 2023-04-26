import Shipments from '../models/Shipments'
import dbConnect from '../utils/db'

class Shipment {
  constructor () {
    this.shipment = Shipments
  }

  async createShipment (formDetails) {
    await dbConnect()
    const shipment = await this.shipment.create(formDetails)
    shipment.save()
    return !!shipment
  }

  async getShipments (req, res) {
    await dbConnect()
    const shipments = await this.shipment.find({})
    res.status(200).json({ success: true, data: shipments })
  }
}

export default Shipment
