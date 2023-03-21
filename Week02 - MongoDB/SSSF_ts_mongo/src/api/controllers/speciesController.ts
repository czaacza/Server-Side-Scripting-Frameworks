import {NextFunction} from 'express';
// TODO: Controller for species model
import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {CustomError} from '../../utils/CustomError';
import {ISpecies} from '../../interfaces/Species';
import speciesModel from '../models/speciesModel';
import DBMessageResponse from '../../interfaces/DBMessageResponse';
import rectangleBounds from '../../utils/rectangleBounds';

// create speciesController functions based on categoryController
const speciesGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.find().populate('category');
    if (!species) {
      throw new CustomError('No species found', 404);
    }
    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
};

const speciesGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const speciesId = req.params.id;
    const species = await speciesModel.findById(speciesId).populate('category');
    if (!species) {
      throw new CustomError('Species not found', 404);
    }
    res.status(200).json(species);
  } catch (error) {
    next(error);
  }
};

const speciesPost = async (
  req: Request<{}, {}, ISpecies>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const species = await speciesModel.create(req.body);
    await species.populate('category');

    const messageResponse: DBMessageResponse = {
      message: 'Species created',
      data: species,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const speciesPut = async (
  req: Request<{}, {}, ISpecies>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(', ');
      throw new CustomError(messages, 400);
    }
    const speciesId = req.params.id;
    const species = await speciesModel
      .findByIdAndUpdate(speciesId, req.body, {
        new: true,
      })
      .populate('category');
    if (!species) {
      throw new CustomError('Species not found', 404);
    }
    const messageResponse: DBMessageResponse = {
      message: 'Species updated',
      data: species,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const speciesDelete = async (
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
        .join(', ');
      throw new CustomError(messages, 400);
    }
    const speciesId = req.params.id;
    const species = await speciesModel
      .findByIdAndDelete(speciesId)
      .populate('category');
    if (!species) {
      ś;
      throw new CustomError('Species not found', 404);
    }
    const messageResponse: DBMessageResponse = {
      message: 'Species deleted',
      data: species,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const speciesByAreaGet = async (
  req: Request<{}, {}, {}, {topRight: string; bottomLeft: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(', ');
      throw new CustomError(messages, 400);
    }
    const {topRight, bottomLeft} = req.query;
    const [topRightLat, topRightLng] = topRight.split(',');
    const [bottomLeftLat, bottomLeftLng] = bottomLeft.split(',');

    const topRightLatNum = Number(topRightLat);
    const topRightLngNum = Number(topRightLng);
    const bottomLeftLatNum = Number(bottomLeftLat);
    const bottomLeftLngNum = Number(bottomLeftLng);

    const bounds = rectangleBounds(
      {lat: topRightLatNum, lng: topRightLngNum},
      {lat: bottomLeftLatNum, lng: bottomLeftLngNum}
    );
  } catch (error) {
    next(error);
  }
};

export {speciesGetAll, speciesGet, speciesPost, speciesPut, speciesDelete};
