import mascotasModel from "../model/mascotas.js"

class mascotasCtrl {
    constructor() {

    }
    //metodo asincrono porq va a tener que esperar una respuesta
    async create(req, res) {
        const {sku,nombre,tipo,raza,edad,descripcion,adoptado} = req.body;
        const imagen = `/uploads/mascotas/${sku}.png`;
        try {
            //es una promesa por eso pongo await
            //const data = await mascotasModel.create(req.body);
            const data = await mascotasModel.create({sku,nombre,tipo,raza,edad,descripcion,imagen,adoptado}); //lo pasamos asi para que swagger los reconozca
            res.status(201).json(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async delete(req, res) {
         try {
            const { id } = req.params;
            const data = await mascotasModel.delete(id);
            res.status(206).json(data);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async update(req, res) {
        const {sku,nombre,tipo,raza,edad,descripcion,adoptado} = req.body;
        const imagen = `/uploads/mascotas/${sku}.png`;
        try {
            const { id } = req.params;
            //const data = await mascotasModel.update(id,req.body);
            const data = await mascotasModel.update(id,{sku,nombre,tipo,raza,edad,descripcion,imagen,adoptado});
            res.status(200).json(data);
        } catch (e) {
            res.status(500).send(e);
        }

    }

    async getAll(req, res) {
        try {
            const data = await mascotasModel.getAll();
            res.status(201).json(data);
        } catch (e) {
            res.status(500).send(e);
        }

    }

    async getOne(req, res) {
         try {
            const { id } = req.params;
            const data = await mascotasModel.getOne(id);
            res.status(201).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }

    async adoptar(req, res) {
        try {
            const {mascotaId} = req.params; //lo mando por endpoint (url)
            const {usuarioId} = req.body; //lo mando por el body
            
            if(!usuarioId) {
                return res.status(400).json({msg:"Se requiere el id del usuario"});
            }

            const data = await mascotasModel.adoptar(mascotaId,usuarioId);
            res.status(201).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).json({ mensaje: e.message });
        }
    }
}
//exportamos una instancia de la clase para que se pueda usar directo
export default new mascotasCtrl();