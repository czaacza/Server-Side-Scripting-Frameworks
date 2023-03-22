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
import {CatModel} from '../models/catModel';
import {User} from '../../interfaces/User';
import {Point} from 'geojson';
import {Types} from 'mongoose';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

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

    const catId = req.params.catId;
    const cat = await CatModel.findById(catId);
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    res.status(200).json(cat);
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

    const cat = await CatModel.create(req.body);

    const message: DBMessageResponse = {
      message: 'Cat created',
      data: cat,
    };
    res.status(201).json(message);
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

    const catId = req.params.catId;
    const ownerId = req.body.ownerId;
    const cat = await CatModel.findByIdAndUpdate(
      catId,
      {owner: ownerId},
      {new: true}
    );
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    const message: DBMessageResponse = {
      message: 'Cat owner updated',
      data: cat,
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
    const catId = req.params.catId;
    const cat = await CatModel.findByIdAndDelete(catId);
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    const message: DBMessageResponse = {
      message: 'Cat deleted',
      data: cat,
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

    const catId = req.params.catId;
    const cat = await CatModel.findById(catId);
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }

    if (cat.owner !== (req.user as User)._id) {
      throw new CustomError('Only owner can delete cat', 403);
    }

    await CatModel.findByIdAndDelete(catId);

    const message: DBMessageResponse = {
      message: 'Cat deleted',
      data: cat,
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

    const catId = req.params.catId;
    const cat = await CatModel.findById(catId);
    if (!cat) {
      res.status(404).json({message: 'Cat not found'});
    }
    if (cat.owner !== (req.user as User)._id) {
      throw new CustomError('Only owner can update cat', 403);
    }
    await CatModel.findByIdAndUpdate(catId, req.body, {new: true});

    const message: DBMessageResponse = {
      message: 'Cat updated',
      data: cat,
    };

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};
