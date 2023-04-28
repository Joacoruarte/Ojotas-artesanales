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
    return shipment
  }

  async updateStatusShipment (id) {
    try {
      await dbConnect()
      const shipment = await this.shipment.findOneAndUpdate({ _id: id }, { $set: { status: 'approved' } })
      return shipment
    } catch (error) {
      return error
    }
  }

  async getShipments (req, res) {
    await dbConnect()
    const shipments = await this.shipment.find({})
    res.status(200).json({ success: true, data: shipments })
  }

  async getShipment (id) {
    await dbConnect()
    const shipment = await this.shipment.findById(id)
    return shipment._doc
  }
}

export default Shipment
