import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse';
import CustomError from './classes/CustomError';
import userModel from './api/models/userModel';
import { UserOutput } from './interfaces/User';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // console.log('errorhanler', err);
  const statusCode = err.status !== 200 ? err.status || 500 : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      next(new CustomError('No token provided', 401));
      return;
    }

    const token = bearer.split(' ')[1];

    if (!token) {
      next(new CustomError('No token provided', 401));
      return;
    }

    const userFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserOutput;

    const user = await userModel.findById(userFromToken.id).select('-password');

    if (!user) {
      next(new CustomError('Token not valid', 403));
      return;
    }

    const userOutput: UserOutput = {
      id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    res.locals.user = userOutput;

    next();
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export { notFound, errorHandler, authenticate };
