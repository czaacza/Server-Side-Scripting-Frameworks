import express from 'express';
import authRouter from './routes/authRoute';
import userRouter from './routes/userRoute';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
