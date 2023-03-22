import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import mongoose from 'mongoose';
import CustomError from '../../classes/CustomError';
import Animal from '../models/animalModel';
import DBMessageResponse from '../../interfaces/DBMessageResponse';

// create animalController based on speciesController and categoryController
const animalGetAll = async (
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

    const animals = await Animal.find().populate({
      path: 'species',
      populate: {path: 'category'},
    });
    if (!animals) {
      throw new CustomError('No animals found', 404);
    }
    res.status(200).json(animals);
  } catch (error) {
    next(error);
  }
};

const animalGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      throw new CustomError(messages, 400);
    }

    const animalId = req.params.id;
    const animal = await Animal.findById(animalId).populate({
      path: 'species',
      populate: {path: 'category'},
    });
    if (!animal) {
      throw new CustomError('Animal not found', 404);
    }
    res.status(200).json(animal);
  } catch (error) {
    next(error);
  }
};

const animalPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      throw new CustomError(messages, 400);
    }

    const animal = await Animal.create(req.body);
    animal.populate({
      path: 'species',
      populate: {path: 'category'},
    });

    if (!animal) {
      throw new CustomError('Animal not created', 400);
    }
    const messageResponse: DBMessageResponse = {
      message: 'Animal created',
      data: animal,
    };
    res.status(201).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const animalPut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      throw new CustomError(messages, 400);
    }

    const animalId = req.params.id;
    const animal = await Animal.findByIdAndUpdate(animalId, req.body, {
      new: true,
    }).populate({
      path: 'species',
      populate: {path: 'category'},
    });
    if (!animal) {
      throw new CustomError('Animal not found', 404);
    }
    const messageResponse: DBMessageResponse = {
      message: 'Animal updated',
      data: animal,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const animalDelete = async (
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
      throw new CustomError(messages, 400);
    }
    const animal = await Animal.findByIdAndDelete(req.params.id).populate({
      path: 'species',
      populate: {path: 'category'},
    });
    if (!animal) {
      throw new CustomError('Animal not found', 404);
    }
    const messageResponse: DBMessageResponse = {
      message: 'Animal deleted',
      data: animal,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

export {animalGetAll, animalGet, animalPost, animalPut, animalDelete};
