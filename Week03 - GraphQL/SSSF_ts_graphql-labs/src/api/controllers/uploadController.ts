import {Request, Response, NextFunction} from 'express';
import {Point} from 'geojson';
import CustomError from '../../classes/CustomError';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

const fileUpload = async (
  req: Request<{}, {}, {}, {}, {coords: Point}>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError('file not valid', 400);
      throw err;
    }

    const filename = req.file.filename;

    const response = {
      message: 'file uploaded',
      data: {
        filename: filename,
        location: res.locals.coords,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export {fileUpload};
