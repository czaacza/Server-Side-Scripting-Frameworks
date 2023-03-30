import express, {Request} from 'express';
import multer, {FileFilterCallback} from 'multer';
import {getCoordinates, makeThumbnail} from '../../middlewares';
import {catPost} from '../controllers/uploadController';

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

router
  .route('/')
  .post(upload.single('cat'), makeThumbnail, getCoordinates, catPost);

export default router;
