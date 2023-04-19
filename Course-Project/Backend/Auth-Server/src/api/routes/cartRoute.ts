import { Router } from 'express';
import {
  getAllCarts,
  getCartByUser,
  addCart,
  updateCart,
  deleteCart,
} from '../controllers/cartController';

const router = Router();

router.get('/:userId', getCartByUser);
router.get('/', getAllCarts);
router.post('/', addCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;
