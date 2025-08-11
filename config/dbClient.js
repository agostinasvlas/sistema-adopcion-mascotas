import 'dotenv/config';
import { MongoClient } from "mongodb";
import mongoose, { mongo } from 'mongoose';

class dbClient {
    constructor() {
        this.conectarBD();
    }
    async conectarBD() {
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.SERVER_DB}/adopcion?retryWrites=true&w=majority`;
        await mongoose.connect(queryString);
        console.log("Conectado a la BD");
    }

    async cerrarConexion() {
        try {
            await mongoose.disconnect();
            console.log("Desconectado de la BD");
        } catch(e) {
            console.log("Error al cerrar la conexion ", e);
        }
    }
}

export default new dbClient();