import { Schema , model , models } from "mongoose";


const productSchema = new Schema({
    pid: {
        type: String,
        required: true,
    },
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
        type: Array,
        required: [true, "La imagen es obligatoria"]
    },
    description:{
        type: String,
        required: [true, "El color es obligatorio"]
    },
    price: {
        type: Number,
        required: [true , "El precio es obligatorio"]
    },
    stock: {
        type: Object,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})


export default models.Product || model("Product", productSchema)