import express from 'express';
import {
  check,
  checkToken,
  userDelete,
  userDeleteAsAdmin,
  userGet,
  userListGet,
  userPost,
  userPut,
  userPutAsAdmin,
} from '../controllers/userController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router
  .route('/')
  .get(userListGet)
  .post(userPost)
  .put(authenticate, userPut)
  .delete(authenticate, userDelete);

router.get('/token', authenticate, checkToken);

router.route('/check').get(check);

router
  .route('/:id')
  .get(userGet)
  .put(authenticate, userPutAsAdmin)
  .delete(authenticate, userDeleteAsAdmin);

export default router;
