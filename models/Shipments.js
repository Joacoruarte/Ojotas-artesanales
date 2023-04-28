import { Schema, model, models } from 'mongoose'

export const shipmentSchema = new Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio']
  },
  postalCode: {
    type: String,
    required: [true, 'El codigo postal es obligatorio']
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  lastName: {
    type: String,
    required: [true, 'El apellido es obligatorio']
  },
  phoneNumber: {
    type: String,
    required: [true, 'El telefono es obligatorio']
  },
  street: {
    type: String,
    required: [true, 'La calle es obligatoria']
  },
  streetNumber: {
    type: String,
    required: [true, 'El numero es obligatorio']
  },
  floor: {
    type: String
  },
  city: {
    type: String,
    required: [true, 'La ciudad es obligatoria']
  },
  identification: {
    type: String,
    required: [true, 'El DNI o CUIL es obligatorio']
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected']
  }
}, {
  timestamps: true
})

export default models.Shipments || model('Shipments', shipmentSchema)
