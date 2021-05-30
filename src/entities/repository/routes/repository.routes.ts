import { Router } from 'express';
import { createRepository } from "../controllers/repositorys.controller"
import auth from '../../../utils/private';
const router = Router();

// Ruta para crear un repositorio para un usuario
router.post('/repository', auth.private, createRepository)
// Ruta para obtener todos los repositorios
router.get('/repositorys', auth.private,)
// Ruta para obtener todos los repositorios de un usuario
router.get('/repositorys/:email', auth.private,)
// Ruta para obtener un repositorio
router.get('/repositorys/:id', auth.private,)
// Ruta para actualizar un repositorio
router.put('/repository/update/:id', auth.private,)
// Ruta para eliminar un repositorio)
router.delete('/repository/remove/:id', auth.private,)

export default router;
