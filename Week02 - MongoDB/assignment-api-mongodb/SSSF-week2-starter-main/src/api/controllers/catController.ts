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

const catGetByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
