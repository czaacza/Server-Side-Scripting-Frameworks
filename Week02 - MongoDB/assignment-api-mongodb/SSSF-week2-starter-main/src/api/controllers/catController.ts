import {NextFunction} from 'express';
// TODO: create following functions:
// - catGetByUser - get all cats by current user id
// - catGetByBoundingBox - get all cats by bounding box coordinates (getJSON)
// - catPutAdmin - only admin can change cat owner
// - catDeleteAdmin - only admin can delete cat
// - catDelete - only owner can delete cat
// - catPut - only owner can update cat
// - catGet - get cat by id
// - catListGet - get all cats
// - catPost - create new cat

import {Request, Response} from 'express';
import CatModel from '../models/catModel';
import {User} from '../../interfaces/User';
import {Cat} from '../../interfaces/Cat';
import {Point} from 'geojson';
import {Types} from 'mongoose';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import rectangleBounds from '../../utils/rectangleBounds';

const catListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const cats = await CatModel.find().populate('owner');
    if (!cats || cats.length === 0) {
      next(new CustomError('No cats found', 404));
    }

    res.status(200).json(cats);
  } catch (error) {
    next(error);
  }
};

const catGetByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const currentUser = req.user as User;
    const cats = await CatModel.find({owner: currentUser._id});
    if (!cats) {
      res.status(404).json({message: 'No cats found'});
    }
    res.status(200).json(cats);
  } catch (error) {
    next(error);
  }
};

const catGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }
    const catId = req.params.id;

    const cat = await CatModel.findById(catId).populate('owner');
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    res.status(200).json(cat);
  } catch (error) {
    next(error);
  }
};

const catGetByBoundingBox = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }
    const {topRight, bottomLeft} = req.query;
    const [topRightLat, topRightLng] = (topRight as string).split(',');
    const [bottomLeftLat, bottomLeftLng] = (bottomLeft as string).split(',');

    const topRightLatNum = Number(topRightLat);
    const topRightLngNum = Number(topRightLng);
    const bottomLeftLatNum = Number(bottomLeftLat);
    const bottomLeftLngNum = Number(bottomLeftLng);

    const bounds = rectangleBounds(
      {lat: topRightLatNum, lng: topRightLngNum},
      {lat: bottomLeftLatNum, lng: bottomLeftLngNum}
    );

    const cats = await CatModel.find({
      coords: {
        $geoWithin: {
          $geometry: bounds,
        },
      },
    }).populate('owner');

    if (!cats || cats.length === 0) {
      next(new CustomError('No cats found', 404));
    }

    res.status(200).json(cats);
  } catch (error) {
    next(error);
  }
};

const catPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }
    const catToSend = {
      ...req.body,
      filename: req.file!.filename,
      coords: res.locals.coords as Point,
      owner: (req.user as User)._id,
    };

    const cat = await CatModel.create(catToSend);

    cat.populate('owner');

    const message: DBMessageResponse = {
      message: 'Cat created',
      data: cat as Cat,
    };
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const catPut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const catId = req.params.id;
    const cat = await CatModel.findById(catId);

    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }

    if ((cat as Cat).owner.toString() !== (req.user as User)._id) {
      throw new CustomError('Only owner can update cat', 403);
    }
    const catResult = await CatModel.findByIdAndUpdate(catId, req.body, {
      new: true,
    }).populate('owner');

    const message: DBMessageResponse = {
      message: 'Cat updated',
      data: catResult as Cat,
    };

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const catDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const catId = req.params.id;
    const cat = await CatModel.findById(catId);
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }

    if ((cat as Cat).owner.toString() !== (req.user as User)._id) {
      throw new CustomError('Only owner can delete cat', 403);
    }

    const catResult = await CatModel.findByIdAndDelete(catId).populate('owner');

    const message: DBMessageResponse = {
      message: 'Cat deleted',
      data: catResult as Cat,
    };
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const catPutAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    if ((req.user as User).role !== 'admin') {
      throw new CustomError('Only admin can change cat owner', 403);
    }

    const catId = req.params.id;

    const cat = await CatModel.findByIdAndUpdate(catId, req.body, {
      new: true,
    }).populate('owner');
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    const message: DBMessageResponse = {
      message: 'Cat owner updated',
      data: cat as Cat,
    };

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const catDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    if ((req.user as User).role !== 'admin') {
      throw new CustomError('Only admin can delete cat', 403);
    }
    const catId = req.params.id;
    const cat = await CatModel.findByIdAndDelete(catId).populate('owner');
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    const message: DBMessageResponse = {
      message: 'Cat deleted',
      data: cat as Cat,
    };
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export {
  catGet,
  catGetByUser,
  catGetByBoundingBox,
  catListGet,
  catPost,
  catPut,
  catDelete,
  catPutAdmin,
  catDeleteAdmin,
};
