import express from 'express';
const route = express.Router();
import mascotasCtrl from '../controllers/mascotas.js'
import { verificarToken } from '../helpers/autenticacion.js';

//como todas las rutas refieren a mascota solo va / y si es neces un id
route.get('/', mascotasCtrl.getAll);
route.get('/:id', mascotasCtrl.getOne);
route.post('/', mascotasCtrl.create);

//primero mascotaId para posteriormente agregar operaciones sobre esa mascota
route.post('/:mascotaId/adoptar', verificarToken, mascotasCtrl.adoptar);

//actualizar y eliminar son privadas
route.put('/:id', verificarToken, mascotasCtrl.update);
route.delete('/:id', verificarToken, mascotasCtrl.delete);

export default route;