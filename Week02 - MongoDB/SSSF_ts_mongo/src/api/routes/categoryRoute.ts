import express from 'express';
import {
  categoryGetAll,
  categoryGet,
  categoryPost,
  categoryPut,
  categoryDelete,
} from '../controllers/categoryController';

const router = express.Router();

router.route('/').get(categoryGetAll).post(categoryPost);
router.route('/:id').get(categoryGet).put(categoryPut).delete(categoryDelete);

export default router;
