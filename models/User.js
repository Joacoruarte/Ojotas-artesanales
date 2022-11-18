import { Schema , model , models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    phone: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false
})

export default models.User || model("User", userSchema)