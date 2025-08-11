import mongoose from "mongoose";
import Usuarios from "../schemas/usuarios.js";
import Mascotas from "../schemas/mascotas.js";

class usuariosModel {
    async create(usuario) {
        return await Usuarios.create(usuario);
    }
    async getOneById(id) {
        return await Usuarios.findOne({_id: new mongoose.Types.ObjectId(id)});
    }
    async getOne(filtro) {
        return await Usuarios.findOne(filtro);
    }
    async getAll() {
        return await Usuarios.find();
    }
    async update(id, usuario) {
        return await Usuarios.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)},usuario);
    }
    async delete(id) {
        return await Usuarios.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }
    async getMisMascotas(id) {
        const filter = { adoptadoPor: id };
        const misMascotas = await Mascotas.find(filter);
        return misMascotas;
    }
}

export default new usuariosModel();