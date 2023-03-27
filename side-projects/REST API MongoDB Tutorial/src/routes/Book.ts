import { Schemas, ValidateSchema } from './../middleware/ValidateSchema';
import { Router } from 'express';
import controller from '../controllers/Book';

const router = Router();

router.post('/', ValidateSchema(Schemas.book.create), controller.createBook);
router.get('/:bookId', controller.readBook);
router.get('/', controller.readAll);
router.put(
  '/:bookId',
  ValidateSchema(Schemas.book.create),
  controller.updateBook
);
router.delete('/:bookId', controller.deleteBook);

export = router;
