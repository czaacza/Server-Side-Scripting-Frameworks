import express from 'express';
import {getWikiImage} from '../../middlewares';
import {
  speciesGetAll,
  speciesGet,
  speciesPost,
  speciesPut,
  speciesDelete,
  speciesByAreaGet,
} from '../controllers/speciesController';

const router = express.Router();

router.route('/').get(speciesGetAll).post(getWikiImage, speciesPost);
router.route('/location').get(speciesByAreaGet);

router.route('/:id').get(speciesGet).put(speciesPut).delete(speciesDelete);

export default router;
