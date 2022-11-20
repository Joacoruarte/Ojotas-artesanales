import { Schema , model , models } from "mongoose";

const paymentSchema = new Schema({
    payment_id: {
        type: String,
        required: [true],
        trim: true
    },
    product_id: {
        type: Array,
        required: [true],
    },
}, {
    timestamps: true,
    versionKey: false
})

export default models.Payment || model("Payment", paymentSchema)