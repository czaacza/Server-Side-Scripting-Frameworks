import {Router} from 'express';
import {fileUpload} from '../controllers/uploadController';
import multer, {FileFilterCallback} from 'multer';
import {getCoordinates, makeThumbnail} from '../../middlewares';

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({dest: 'uploads/', fileFilter});
const router = Router();

router
  .route('/')
  .post(upload.single('cat'), makeThumbnail, getCoordinates, fileUpload);

export default router;
