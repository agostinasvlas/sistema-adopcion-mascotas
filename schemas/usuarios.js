import mongoose from "mongoose";

const usuariosSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, //unico
            trim: true //para que no queden espacios en blancos
        },
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        telefono: {
            type: String,
            required: false
        },
        clave: {
            type: String,
            required: true
        }

    }
);

export default mongoose.model("usuarios", usuariosSchema);