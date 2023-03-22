// TODO: create the following functions:
// - userGet - get user by id
// - userListGet - get all users
// - userPost - create new user. Remember to hash password
// - userPutCurrent - update current user
// - userDeleteCurrent - delete current user
// - checkToken - check if current user token is valid: return data from req.user. No need for database query

import {NextFunction, Request, Response} from 'express';
import CustomError from '../../classes/CustomError';
import {User} from '../../interfaces/User';
import UserModel from '../models/userModel';
import MessageResponse from '../../interfaces/DBMessageResponse';
import {validationResult} from 'express-validator';

const userGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      next(new CustomError('User not found', 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const userListGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const users = await UserModel.find();
    if (!users) {
      next(new CustomError('No users found', 404));
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const userPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => error.msg)
        .join(',');
      next(new CustomError(messages, 400));
    }

    const user = await UserModel.create(req.body);
    if (!user) {
      next(new CustomError('User not created', 404));
    }
    const messageResponse: MessageResponse = {
      message: 'User created',
      data: user,
    };
    res.status(201).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const userPutCurrent = async (
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

    const user = UserModel.findByIdAndUpdate(currentUser.id);
    if (!user) {
      next(new CustomError('User not updated', 404));
    }

    const messageResponse: MessageResponse = {
      message: 'User updated',
      data: user,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};

const userDeleteCurrent = async (
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

    const user = UserModel.findByIdAndDelete(currentUser.id);
    if (!user) {
      next(new CustomError('User not deleted', 404));
    }

    const messageResponse: MessageResponse = {
      message: 'User deleted',
      data: user,
    };
    res.status(200).json(messageResponse);
  } catch (error) {
    next(error);
  }
};
