import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import uploadRouter from './routes/uploadRoute';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'routes: upload',
  });
});

router.use('/upload', uploadRouter);

export default router;
