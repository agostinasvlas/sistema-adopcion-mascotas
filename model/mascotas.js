import mongoose from "mongoose";
import Mascota from "../schemas/mascotas.js";
import Usuario from "../schemas/usuarios.js";
import { ReturnDocument } from "mongodb";

class mascotasModel {
    async create(mascota) {
        return await Mascota.create(mascota);
    }
    async getAll() {
        return await Mascota.find();//puedo hacer un find con filtros
    }
    async getOne(id) {
        return await Mascota.findOne({_id:id});
    }
    async update(id, mascota) {
        return await Mascota.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, mascota, {new: true});
    }
    async delete(id) {
        return await Mascota.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }
    async adoptar(mascotaId, usuarioId) {
        //vemos si el usuario existe
        const mascota = await Mascota.findById(mascotaId);
        if(!mascota) {
            throw new Error('Mascota no encontrada');
        }
        if(mascota.adoptado) {
            throw new Error('Mascota ya adoptada');
        }

        const usuario = await Usuario.findById(usuarioId);
        if(!usuario) {
            throw new Error('Usuario adoptante no encontrado');
        }
        //findByIdAndUpdate te devuelve el doc antes de actualizarlo

        const mascotaAdoptada = await Mascota.findByIdAndUpdate(
            {_id: mascotaId },//al del video si le funciona solo mascotaId
            {
                adoptado: true,
                adoptadoPor: usuarioId
            },
            { returnDocument: 'after' } // <- Esto devuelve el documento actualizado
        );

        return mascotaAdoptada;
    }
}
export default new mascotasModel();