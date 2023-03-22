import express from 'express';
import {
  animalGetAll,
  animalGet,
  animalPost,
  animalPut,
  animalDelete,
} from '../controllers/animalController';

const router = express.Router();

router.route('/').get(animalGetAll).post(animalPost);
router.route('/:id').get(animalGet).put(animalPut).delete(animalDelete);

export default router;
