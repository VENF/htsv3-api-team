import { Router } from 'express';
import { createRepository, getRepositorys, getRepository, getRepositoryFromUser, deleteRepo } from "../controllers/repositorys.controller"
import auth from '../../../utils/private';
const router = Router();

// Ruta para crear un repositorio para un usuario
router.post('/repository', auth.private, createRepository)
// Ruta para obtener todos los repositorios
router.get('/repositorys', auth.private, getRepositorys)
// Ruta para obtener todos los repositorios de un usuario
router.get('/repositorys/user', auth.private, getRepositoryFromUser)
// Ruta para obtener un repositorio
router.get('/repository/:id', auth.private, getRepository)
// Ruta para actualizar un repositorio
router.put('/repository/update/:id', auth.private,)
// Ruta para eliminar un repositorio)
router.delete('/repository/remove/:id', auth.private, deleteRepo)

export default router;
