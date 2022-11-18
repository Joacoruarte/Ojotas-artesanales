import { Schema , model , models } from "mongoose";


const productSchema = new Schema({
    name:{
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        maxlength: [40, "El nombre no puede tener mas de 50 caracteres"]
    },
    alt: {
        type: String,
        default: "Foto de calzado"
    },
    img: {
        type: String,
        required: [true, "La imagen es obligatoria"]
    },
    color:{
        type: String,
        required: [true, "El color es obligatorio"]
    },
    price: {
        type: Number,
        required: [true , "El precio es obligatorio"]
    },
    talles: {
        type: Array,
        default: []
    },
    stock: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})


export default models.Product || model("Product", productSchema)