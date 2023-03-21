import {NextFunction} from 'express';

import {Request, Response} from 'express';
import categoryModel from '../models/categoryModel';
import {ICategory} from '../../interfaces/Category';
import CustomError from '../../classes/CustomError';
import {validationResult} from 'express-validator';

const categoryGetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryModel.find();
    if (!categories) {
      throw new CustomError('No categories found', 404);
    }
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const categoryGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const categoryId = req.params.id;
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
// add a new category to database
const categoryPost = async (
  req: Request<{}, {}, ICategory>,
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

    const category = await categoryModel.create(req.body);
    const messageResponse = {
      message: 'Category created',
      data: category,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const categoryPut = async (
  req: Request<{id: string}, {}, ICategory>,
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
    const categoryId = req.params.id;
    const category = await categoryModel.findByIdAndUpdate(
      categoryId,
      req.body,
      {new: true}
    );
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    const messageResponse = {
      message: 'Category updated',
      data: category,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const categoryDelete = async (
  req: Request<{id: string}, {}, {}>,
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

    const categoryId = req.params.id;
    const category = await categoryModel.findByIdAndDelete(categoryId);
    if (!category) {
      throw new CustomError('Category not found', 404);
    }
    const messageResponse = {
      message: 'Category deleted',
      data: category,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};
