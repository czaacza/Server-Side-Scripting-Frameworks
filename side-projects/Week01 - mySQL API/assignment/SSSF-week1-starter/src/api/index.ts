import express from 'express';

import userRoute from './routes/userRoute';
import catRoute from './routes/catRoute';
import authRoute from './routes/authRoute';
import MessageResponse from '../interfaces/MessageResponse';
import passport from 'passport';

const router = express.Router();

router.use(passport.initialize());

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'routes: auth, user, cat',
  });
});

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/cat', catRoute);

export default router;
