import { Router } from 'express';
import { getCreditCard } from "../controllers/credit.controllers"
import auth from '../../../utils/private';
const router = Router();

router.get('/credit', auth.private, getCreditCard);
export default router;
