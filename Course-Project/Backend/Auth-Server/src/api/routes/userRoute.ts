import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
} from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
