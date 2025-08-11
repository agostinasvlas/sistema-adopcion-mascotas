import mongoose from "mongoose";

const mascotaSchema = mongoose.Schema(
    {
        sku: {
            type: Number,
            unique: true,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true,
            enum: [
                'perro','gato','conejo'
            ],
        },
        raza: {
            type: String
        },
        edad: {
            type: Number,
            min: [0, 'La edad debe ser mayor a 0'],
            max: [30, 'La edad no parece correcta']
        },
        descripcion: {
            type: String
        },
        imagen: {
            type: String,
            default: null,
        },
        adoptado: {
            type: Boolean,
            default: false,
        },
        adoptadoPor: { //referencia al esquema 'usuarios' por objectId
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            default: null, //porque no todas las mascotas estan adoptadas
        }
    }, { timestamps: true }
);

export default mongoose.model('mascotas', mascotaSchema);
//nombre de la coleccion mascotas, basado en el mascotaSchema