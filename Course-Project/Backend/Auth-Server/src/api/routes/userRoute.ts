import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  updateUserAsAdmin,
  deleteUserAsAdmin,
  checkToken,
} from '../controllers/userController';
import { authenticate } from '../../middlewares';

const router = Router();

router
  .route('/')
  .get(getAllUsers)
  .post(addUser)
  .put(authenticate, updateUser)
  .delete(authenticate, deleteUser);

router.get('/token', authenticate, checkToken);

router
  .route('/:id')
  .get(getUserById)
  .put(authenticate, updateUserAsAdmin)
  .delete(authenticate, deleteUserAsAdmin);

export default router;
