// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import {Request, Response, NextFunction} from 'express';
import {Point} from 'geojson';
import CustomError from '../../classes/CustomError';
import UploadMessageResponse from '../../interfaces/UploadMessageResponse';

const catPost = async (
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

    const response: UploadMessageResponse = {
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

export {catPost};
