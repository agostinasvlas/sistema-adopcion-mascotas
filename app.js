import 'dotenv/config';
import express from 'express';
import routesMascotas from './routes/mascotas.js'
import routesUsuarios from './routes/usuarios.js';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js'

//creamos instancia de express
const app = express();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with {type: 'json'};

import path from 'path';
import { fileURLToPath } from 'url';

// reconstruir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//los middleware son app.use 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// Servir carpeta uploads como estática
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

//serve, la sirve, y setup la muestra bonita
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/pets', routesMascotas);
app.use('/users', routesUsuarios);


try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=>console.log("Servidor activo en el puerto "+ PORT));

} catch(e) {
    console.log(e);
}
process.on('SIGINT', async() => {
    dbClient.cerrarConexion();
    process.exit(0);
})