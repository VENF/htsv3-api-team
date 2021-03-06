import { Router } from 'express';
import { createTeam, deleteTeam, findTeam, allTeams, addUser, deleteUser } from "../controllers/team.controller"
import auth from '../../../utils/private';
const router = Router();

router.post('/team', auth.private, createTeam);
router.delete('/team/remove/:id', auth.private, deleteTeam);
router.get('/team/:id', auth.private, findTeam);
router.get('/teams', auth.private, allTeams);
// recibe como body el username y el id del team
router.post('/team/add', auth.private, addUser);
// recibe como body el username y el id del team
router.delete('/team/remove', auth.private, deleteUser);
export default router;
