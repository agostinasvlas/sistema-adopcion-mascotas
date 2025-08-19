import { generarToken } from "../helpers/autenticacion.js";
import usuariosModel from "../model/usuarios.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";


class usuarioCtrl {
    constructor() {

    }
    async register(req, res) {
        try {
            const {email, nombre, telefono, clave} = req.body;
            const usuarioExiste = await usuariosModel.getOne({ email }); //busca por email la primera aparicion con findOne()
            if(usuarioExiste) {
                return res.status(400).json({ error: "El usuario ya existe" });
            }
            //EL usuario no existe
            const claveEncriptada = await bcrypt.hash(clave, 10);
            const data = await usuariosModel.create({ email, nombre, telefono, clave: claveEncriptada});
            res.status(201).json(data);
        } catch(e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
    async login(req, res) {
        const { email, clave } = req.body;
        const existeUsuario = await usuariosModel.getOne({ email });
        if(!existeUsuario) {
            return res.status(400).json({ error: "El usuario no existe" });
        }
        const claveValida = await bcrypt.compare(clave, existeUsuario.clave);//asincrona porque es responsabilidad de la libreria
        if(!claveValida) {
            return res.status(400).json({ error: "Clave incorrecta" });
        }
        const token = generarToken(email);
        return res.status(200).json(
            { 
                msg: "Usuario autenticado ",
                token,
                user: {
                    id: existeUsuario._id,
                    nombre: existeUsuario.nombre,
                    email: existeUsuario.email
                }
            });
    }

    async profile(req, res) {
        try {
            const data = await usuariosModel.getOne({email: req.emailConectado}); //asignado en verificar token
            res.status(201).json(data);
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
    async misMascotas(req, res) {
        try {
            const {id} = req.params;
            const existeUsuario = await usuariosModel.getOneById(id);
            if(!existeUsuario) {
                return res.status(400).json({ error: "El usuario no existe" });
            }
            const data = await usuariosModel.getMisMascotas(id);
            res.status(200).json(data);
        } catch(e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}
export default new usuarioCtrl();