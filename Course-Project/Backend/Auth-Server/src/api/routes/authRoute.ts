import { Router, Request, Response, NextFunction } from 'express';
import { login, logout, register } from '../controllers/authController';
import { checkAuthenticated, checkNotAuthenticated } from '../../middlewares';

const router = Router();

router.post('/register', checkNotAuthenticated, register);
router.post('/login', checkNotAuthenticated, login);
router.post('/logout', checkAuthenticated, logout);

export default router;
