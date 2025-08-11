import express from 'express';
const route = express.Router();
import usuarioCtrl from "../controllers/usuarios.js";
import { verificarToken } from '../helpers/autenticacion.js';

route.post('/register', usuarioCtrl.register);
route.post('/login', usuarioCtrl.login);

//ruta privada, porque solo la propia persona puede entrar a su perfil
//esto es una cadena, se ejecuta verificarToken y luego profile, por eso el email
//se envia desde verificarToken por req.emailConectado a profile
route.get('/profile', verificarToken, usuarioCtrl.profile);
route.get('/:id/mismascotas',verificarToken,usuarioCtrl.misMascotas);

export default route;