import express, {Request} from 'express';
import {
  catDelete,
  catGet,
  catListGet,
  catPost,
  catPut,
  catGetByUser,
  catGetByBoundingBox,
  catPutAdmin,
  catDeleteAdmin,
} from '../controllers/catController';
import multer, {FileFilterCallback} from 'multer';
import {body, param, query} from 'express-validator';
import passport from '../../passport';
import {getCoordinates, makeThumbnail} from '../../middlewares';

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({dest: './uploads/', fileFilter});
const router = express.Router();

// TODO: add validation

router
  .route('/')
  .get(catListGet)
  .post(
    passport.authenticate('jwt', {session: false}),
    upload.single('cat'),
    makeThumbnail,
    getCoordinates,
    catPost
  );

router.route('/area').get(catGetByBoundingBox);

router
  .route('/user')
  .get(passport.authenticate('jwt', {session: false}), catGetByUser);

router
  .route('/admin/:id')
  .put(passport.authenticate('jwt', {session: false}), catPutAdmin)
  .delete(passport.authenticate('jwt', {session: false}), catDeleteAdmin);

router
  .route('/:id')
  .get(param('id'), catGet)
  .put(passport.authenticate('jwt', {session: false}), param('id'), catPut)
  .delete(
    passport.authenticate('jwt', {session: false}),
    param('id'),
    catDelete
  );

export default router;
