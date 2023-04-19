import { Router } from 'express';
import {
  getAllOrders,
  getUserOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';

const router = Router();

router.get('/:userId', getUserOrders);
router.get('/', getAllOrders);
router.post('/', addOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
// something
