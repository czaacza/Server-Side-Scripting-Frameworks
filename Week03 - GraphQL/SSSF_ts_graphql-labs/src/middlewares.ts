import {NextFunction, Request, Response} from 'express';
import imageFromWikipedia from './functions/imageFromWikipedia';
import ErrorResponse from './interfaces/ErrorResponse';
import CustomError from './classes/CustomError';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`🔍 - Not Found - ${req.originalUrl}`, 404);
  next(error);
};

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // console.log(err);
  const statusCode = err.status !== 200 ? err.status || 500 : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

const getWikiImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {species_name} = req.body;
    const image = await imageFromWikipedia(species_name);
    req.body.image = image;
    next();
  } catch (error) {
    next(error);
  }
};

export {notFound, errorHandler, getWikiImage};
