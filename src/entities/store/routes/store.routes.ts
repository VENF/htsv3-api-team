import { Router } from 'express';
import { store , getProducts, buy } from "../controllers/store.controller"
import auth from '../../../utils/private';
const router = Router();

router.post('/store', auth.private, store);
router.get('/products', auth.private, getProducts);
// recibe como body el id del producto, la catidad a comprar y,
// los creditos restantes del usuario (luego de la compra)
router.post('/products/buy', auth.private, buy);
export default router;
